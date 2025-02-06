import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import type { Article } from '../types';

type ArticleStatus = 'pendiente' | 'aprobado' | 'revisar';

const getRandomStatus = (): ArticleStatus => {
  const statuses: ArticleStatus[] = ['pendiente', 'aprobado', 'revisar'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getStatusConfig = (status: ArticleStatus) => {
  switch (status) {
    case 'pendiente':
      return { color: 'text-gray-500', bgColor: 'bg-gray-50' };
    case 'aprobado':
      return { color: 'text-green-600', bgColor: 'bg-green-50' };
    case 'revisar':
      return { color: 'text-red-600', bgColor: 'bg-red-50' };
  }
};

const ArticleList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <div className="space-y-4">
      {articles.map((article) => {
        const status = getRandomStatus();
        const statusConfig = getStatusConfig(status);
        
        return (
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
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-blue-600 px-2">
                    {article.titulo}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      Fecha: <span className="font-semibold">{article.fecha}</span>
                    </span>
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      Sección: <span className="font-semibold">{article.seccion}</span>
                    </span>
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      Autor: <span className="font-semibold">{article.autor}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm px-2 py-1 rounded min-w-[140px] ${statusConfig.bgColor} ${statusConfig.color}`}>
                    Estado: <span className="font-semibold">{status}</span>
                  </span>
                  <div className="text-gray-400 group-hover:text-blue-500 flex items-center gap-1">
                    <span className="text-sm">Abrir</span>
                    <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;