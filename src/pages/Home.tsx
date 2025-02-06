import React, { useState } from 'react';
import MetricsCard from '../components/MetricsCard';
import ArticleList from '../components/ArticleList';
import AdjectivesMetrics from '../components/AdjectivesMetrics';
import EntityMetrics from '../components/EntityMetrics';
import SentimentAnalysis from '../components/SentimentAnalysis';
import { mockEntityMetrics } from '../data/mockData';
import { calculateMetrics } from '../components/articleAnalytics';
import loadArticles from '../components/articleLoader';

const ARTICLES_PER_PAGE = 10;

const Home: React.FC = () => {
  const articles = loadArticles();
  const metrics = calculateMetrics(articles);
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el total de páginas
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  // Obtener los artículos de la página actual
  const getCurrentPageArticles = () => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    return articles.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">The trust editor</h1>
          <p className="text-sm md:text-base text-gray-500">Una herramienta con IA para ayudar a las redacciones a mejorar las noticias</p>
        </div>

        <div className="mb-8">
          <MetricsCard metrics={metrics} />
        </div>

{/* TODO: volver a poner con datos reales */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div>
            <EntityMetrics metrics={mockEntityMetrics} />
          </div>
          <div>
            <AdjectivesMetrics metrics={{ total: 315, max: 679 }} />
          </div>
          <div>
            <SentimentAnalysis
              negative={39}
              neutral={46}
              positive={15}
            />
          </div>
        </div> */}

        <div className="mt-8 md:mt-12">
          <h2 className="text-xl font-semibold mb-4">Notas</h2>
          <ArticleList articles={getCurrentPageArticles()} />
          
          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Anterior
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border rounded-md ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;