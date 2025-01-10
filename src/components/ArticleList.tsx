import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleCheck, 
  faCircleExclamation, 
  faCircleXmark,
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import type { Article } from '../types';

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: Article['status']) => {
    switch (status) {
      case 'reviewed':
        return <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />;
      case 'pending':
        return <FontAwesomeIcon icon={faCircleExclamation} className="text-yellow-500" />;
      case 'unreviewed':
        return <FontAwesomeIcon icon={faCircleXmark} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Link
          key={article.id}
          to={`/article/${article.id}`}
          className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{article.titulo}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{article.autor || 'sin autor'}</span>
                {article.fecha && <span>— {article.fecha}</span>}
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className={`flex items-center space-x-2 ${getStatusColor(article.status || 'unknown')}`}>
                {article.status === 'unreviewed' && <FontAwesomeIcon icon={faCircleXmark} className="text-red-500" />}
                <span className="font-medium">{article.status}</span>
                {article.metrics?.quality && <span>{article.metrics.quality}%</span>}
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <span className="text-sm font-medium">Abrir artículo</span>
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}