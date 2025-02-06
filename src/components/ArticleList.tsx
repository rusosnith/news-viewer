import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleCheck, 
  faCircleExclamation, 
  faCircleXmark,
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import type { Article } from '../types';

const ArticleList: React.FC<{ articles: Article[] }> = ({ articles }) => {
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
        <div
          key={article.id}
          className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
        >
          <Link
            to={`/article/${article.id}`}
            className="block hover:no-underline"
          >
            <div className="flex justify-between items-start">
              <div className="flex-grow pr-8">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-blue-600">
                  {article.titulo}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="bg-gray-50 px-2 py-1 rounded">
                    Fecha: {article.fecha}
                  </span>
                  <span className="bg-gray-50 px-2 py-1 rounded">
                    Sección: {article.seccion}
                  </span>
                  <span className="bg-gray-50 px-2 py-1 rounded">
                    Autor: {article.autor}
                  </span>
                </div>
              </div>
              <div className="text-gray-400 group-hover:text-blue-500 absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="text-sm">Abrir</span>
                <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;