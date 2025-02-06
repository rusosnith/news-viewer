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

type SortField = 'fecha' | 'autor' | 'seccion';
type SortOrder = 'asc' | 'desc';

const Home: React.FC = () => {
  const articles = loadArticles();
  const metrics = calculateMetrics(articles);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('fecha');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Ordenar artículos
  const getSortedArticles = () => {
    return [...articles].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'fecha':
          // Convertir las fechas a formato DD/MM/YYYY antes de comparar
          const [diaA, mesA, anioA] = a.fecha.split('/').map(Number);
          const [diaB, mesB, anioB] = b.fecha.split('/').map(Number);
          const fechaA = new Date(anioA, mesA - 1, diaA);
          const fechaB = new Date(anioB, mesB - 1, diaB);
          comparison = fechaB.getTime() - fechaA.getTime();
          break;
        case 'autor':
          // Normalizar strings para comparación (quitar acentos, mayúsculas)
          const autorA = a.autor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const autorB = b.autor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          comparison = autorA.localeCompare(autorB);
          break;
        case 'seccion':
          comparison = a.seccion.localeCompare(b.seccion);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  // Calcular el total de páginas con los artículos ordenados
  const sortedArticles = getSortedArticles();
  const totalPages = Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE);

  // Obtener los artículos de la página actual
  const getCurrentPageArticles = () => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    return sortedArticles.slice(startIndex, endIndex);
  };

  // Manejar cambio de ordenamiento
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1); // Resetear a la primera página al cambiar el ordenamiento
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Notas</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <div className="flex gap-2">
                {[
                  { id: 'fecha', label: 'Fecha' },
                  { id: 'autor', label: 'Autor' },
                  { id: 'seccion', label: 'Sección' }
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => handleSort(id as SortField)}
                    className={`px-3 py-1 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-1
                      ${sortField === id ? 'bg-blue-50 border-blue-200' : ''}`}
                  >
                    {label}
                    {sortField === id && (
                      <span className="text-blue-500">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
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