import React, { useState, useMemo } from 'react';
import MetricsCard from '../components/MetricsCard';
import ArticleList from '../components/ArticleList';
import AdjectivesMetrics from '../components/AdjectivesMetrics';
import EntityMetrics from '../components/EntityMetrics';
import SentimentAnalysis from '../components/SentimentAnalysis';
import { mockEntityMetrics } from '../data/mockData';
import { calculateMetrics } from '../components/articleAnalytics';
import loadArticles from '../components/articleLoader';
import HomeMetrics from '../components/HomeMetrics';

const ARTICLES_PER_PAGE = 10;

type SortField = 'fecha' | 'autor' | 'seccion';
type SortOrder = 'asc' | 'desc';

const Home: React.FC = () => {
  const articles = loadArticles();
  const metrics = calculateMetrics(articles);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('fecha');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedAutor, setSelectedAutor] = useState<string>('');
  const [selectedSeccion, setSelectedSeccion] = useState<string>('');

  // Obtener las opciones disponibles basadas en los filtros actuales
  const { autores, secciones, autoresDisponibles, seccionesDisponibles } = useMemo(() => {
    const autoresSet = new Set(articles.map(a => a.autor));
    const seccionesSet = new Set(articles.map(a => a.seccion));
    
    // Obtener todas las opciones
    const autores = Array.from(autoresSet).sort();
    const secciones = Array.from(seccionesSet).sort();
    
    // Filtrar opciones disponibles basadas en la selección actual
    const autoresDisponibles = new Set(
      articles
        .filter(a => !selectedSeccion || a.seccion === selectedSeccion)
        .map(a => a.autor)
    );
    
    const seccionesDisponibles = new Set(
      articles
        .filter(a => !selectedAutor || a.autor === selectedAutor)
        .map(a => a.seccion)
    );

    return {
      autores,
      secciones,
      autoresDisponibles,
      seccionesDisponibles
    };
  }, [articles, selectedAutor, selectedSeccion]);

  // Filtrar y ordenar artículos
  const getFilteredAndSortedArticles = () => {
    return [...articles]
      .filter(article => {
        if (selectedAutor && article.autor !== selectedAutor) return false;
        if (selectedSeccion && article.seccion !== selectedSeccion) return false;
        return true;
      })
      .sort((a, b) => {
        let comparison = 0;
        
        switch (sortField) {
          case 'fecha':
            const [diaA, mesA, anioA] = a.fecha.split('/').map(Number);
            const [diaB, mesB, anioB] = b.fecha.split('/').map(Number);
            const fechaA = new Date(anioA, mesA - 1, diaA);
            const fechaB = new Date(anioB, mesB - 1, diaB);
            comparison = fechaB.getTime() - fechaA.getTime();
            break;
          case 'autor':
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

  const filteredAndSortedArticles = getFilteredAndSortedArticles();
  const totalPages = Math.ceil(filteredAndSortedArticles.length / ARTICLES_PER_PAGE);

  // Obtener los artículos de la página actual
  const getCurrentPageArticles = () => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    return filteredAndSortedArticles.slice(startIndex, endIndex);
  };

  // Reset página al cambiar filtros
  const handleFilterChange = (type: 'autor' | 'seccion', value: string) => {
    if (type === 'autor') {
      setSelectedAutor(value);
    } else {
      setSelectedSeccion(value);
    }
    setCurrentPage(1);
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">The trust editor</h1>
          <p className="text-lg text-gray-600">
            Una herramienta con IA para ayudar a las redacciones a mejorar las noticias
          </p>
        </div>

        <HomeMetrics articles={articles} />

        <div className="mt-8 md:mt-12">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <h2 className="text-xl font-semibold">Notas</h2>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 md:ml-auto">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Filtrar por:</span>
                <div className="flex gap-4">
                  <div className="w-48">
                    <select
                      value={selectedAutor}
                      onChange={(e) => handleFilterChange('autor', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    >
                      <option value="">Todos los autores</option>
                      {autores
                        .filter(autor => !selectedSeccion || autoresDisponibles.has(autor))
                        .map(autor => (
                          <option key={autor} value={autor}>
                            {autor}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-48">
                    <select
                      value={selectedSeccion}
                      onChange={(e) => handleFilterChange('seccion', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    >
                      <option value="">Todas las secciones</option>
                      {secciones
                        .filter(seccion => !selectedAutor || seccionesDisponibles.has(seccion))
                        .map(seccion => (
                          <option key={seccion} value={seccion}>
                            {seccion}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
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
          </div>
          
          <div className="mt-6">
            <ArticleList articles={getCurrentPageArticles()} />
          </div>
          
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