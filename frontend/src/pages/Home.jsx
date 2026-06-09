import { useEffect, useState } from "react";
import api from "../services/api";
import QuadraCard from "../components/QuadraCard";

const defaultQuadras = [
  { id: 1, nome: "Quadra Society", tipo: "Futebol", valorHora: 80 },
  { id: 2, nome: "Quadra Premium", tipo: "Futebol", valorHora: 120 },
];

function Home() {
  const [quadras, setQuadras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [valorHora, setValorHora] = useState("");

  useEffect(() => {
    carregarQuadras();
  }, []);

  async function carregarQuadras() {
    try {
      const resposta = await api.get("/quadras");
      setQuadras(resposta.data);
      setErro("");
    } catch (error) {
      console.error(error);
      // Se falhar, usa as defaultQuadras silenciosamente
      setQuadras(defaultQuadras);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  async function cadastrarQuadra(e) {
    e.preventDefault();

    try {
      await api.post("/quadras", {
        nome,
        tipo,
        valorHora: Number(valorHora),
      });

      setNome("");
      setTipo("");
      setValorHora("");

      carregarQuadras();
    } catch (erro) {
      console.error(erro);
    }
  }

  async function excluirQuadra(id) {
    try {
      await api.delete(`/quadras/${id}`);
      carregarQuadras();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6">
        ArenaGo
      </h1>

      {erro && (
        <p className="mb-4 text-red-600 font-medium">{erro}</p>
      )}

      <form
        onSubmit={cadastrarQuadra}
        className="bg-white p-4 rounded-lg shadow mb-6"
      >
        <input
          className="border p-2 rounded w-full mb-2"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full mb-2"
          type="text"
          placeholder="Tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full mb-2"
          type="number"
          placeholder="Valor Hora"
          value={valorHora}
          onChange={(e) => setValorHora(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Cadastrar
        </button>
      </form>

      <div className="grid gap-4">
        {quadras.length === 0 && (
          <p>Nenhuma quadra cadastrada.</p>
        )}
        {quadras.map((quadra) => (
          <QuadraCard
            key={quadra.id}
            quadra={quadra}
            onExcluir={excluirQuadra}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
