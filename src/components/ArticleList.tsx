import { ChevronRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Article } from '../types';

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
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
              <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{article.author}</span>
                {article.date && <span>{article.date}</span>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${getStatusColor(article.status)}`}>
                {article.status === 'unreviewed' && <AlertTriangle className="w-4 h-4" />}
                <span className="font-medium">{article.status}</span>
                {article.quality && <span>{article.quality}%</span>}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}