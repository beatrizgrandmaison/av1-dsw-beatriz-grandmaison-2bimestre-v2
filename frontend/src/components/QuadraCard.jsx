export default function QuadraCard({ quadra, onExcluir }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">{quadra.nome}</h2>
      <p className="text-gray-600">{quadra.tipo}</p>
      <p className="mt-2 font-medium">R$ {quadra.valorHora}/hora</p>
      <button
        type="button"
        onClick={() => onExcluir(quadra.id)}
        className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
      >
        Excluir
      </button>
    </div>
  );
}
