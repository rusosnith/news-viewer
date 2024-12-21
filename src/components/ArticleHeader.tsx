import type { Article } from '../types';

interface ArticleHeaderProps {
  article: Article;
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const filters = [
  { id: 'entities', label: 'Entidades', color: 'blue' },
  { id: 'adjectives', label: 'Adjetivos', color: 'purple' },
  { id: 'sentiments', label: 'Sentimientos', color: 'orange' },
  { id: 'sources', label: 'Fuentes', color: 'amber' },
];

export default function ArticleHeader({ article, activeFilters, onFilterChange }: ArticleHeaderProps) {
  const getStatusColor = (status: Article['status']) => {
    switch (status) {
      case 'reviewed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-500';
      case 'unreviewed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-8">
          <div className="text-sm">
            <span className="text-gray-600">Autor: </span>
            <span className="font-medium">{article.autor || 'sin autor'}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Estado: </span>
            <span className={`font-medium ${getStatusColor(article.status)}`}>
              {article.status}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Calidad: </span>
            <span className="font-medium">
              {article.metrics?.quality ? `${article.metrics.quality}%` : 'Sin revisión'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <span className="text-sm font-medium text-gray-600 mr-2">Resaltar:</span>
        {filters.map(({ id, label, color }) => (
          <button
            key={id}
            onClick={() => toggleFilter(id)}
            className={`px-3 py-1.5 rounded-md transition-colors duration-200 text-sm font-medium
              ${activeFilters.includes(id)
                ? `bg-gray-200 text-gray-500`
                : `bg-${color}-100 text-${color}-600 hover:bg-${color}-200`
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}