import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faNewspaper, 
  faUsers, 
  faCheck,
  faExclamation 
} from '@fortawesome/free-solid-svg-icons';

interface MetricsCardProps {
  metrics: {
    totalArticles: number;
    totalAuthors: number;
    totalCategories: number;
  };
}

export default function MetricsCard({ metrics }: MetricsCardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <p className="text-2xl font-semibold">{metrics.totalArticles}</p>
        <p className="text-sm text-gray-500">Artículos</p>
      </div>
      <div>
        <p className="text-2xl font-semibold">{metrics.totalAuthors}</p>
        <p className="text-sm text-gray-500">Autores</p>
      </div>
      <div>
        <p className="text-2xl font-semibold">{metrics.totalCategories}</p>
        <p className="text-sm text-gray-500">Categorías</p>
      </div>
    </div>
  );
}