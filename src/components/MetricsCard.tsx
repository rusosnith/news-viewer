interface MetricsCardProps {
  metrics: {
    authors: number;
    articles: number;
    reviewed: number;
    pending: number;
    unreviewed: number;
  };
}

export default function MetricsCard({ metrics }: MetricsCardProps) {
  return (
    <div className="grid grid-cols-5 gap-4 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <p className="text-2xl font-semibold">{metrics.authors}</p>
        <p className="text-sm text-gray-500">Autores</p>
      </div>
      <div>
        <p className="text-2xl font-semibold">{metrics.articles}</p>
        <p className="text-sm text-gray-500">Artículos</p>
      </div>
      <div>
        <p className="text-2xl font-semibold text-green-600">{metrics.reviewed}</p>
        <p className="text-sm text-gray-500">Revisados</p>
      </div>
      <div>
        <p className="text-2xl font-semibold text-yellow-500">{metrics.pending}</p>
        <p className="text-sm text-gray-500">Pendientes</p>
      </div>
      <div>
        <p className="text-2xl font-semibold text-red-500">{metrics.unreviewed}</p>
        <p className="text-sm text-gray-500">Sin revisión</p>
      </div>
    </div>
  );
}