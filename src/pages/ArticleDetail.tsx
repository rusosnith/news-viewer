import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ArticleHeader from '../components/ArticleHeader';
import ArticleContent from '../components/ArticleContent';
import EntityMetrics from '../components/EntityMetrics';
import SentimentAnalysis from '../components/SentimentAnalysis';
import AdjectivesMetrics from '../components/AdjectivesMetrics';
import SourcesMetrics from '../components/SourcesMetrics';
import loadArticles from '../components/articleLoader';
import { Article } from '../types';

export default function ArticleDetail() {
  const { id } = useParams();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const articles: Article[] = loadArticles();
  const article = articles.find(a => a.id === id) || {
    id: '',
    titulo: '',
    autor: '',
    status: '',
    entities: [],
    adjectives: [],
    sentiment: { negative: 0, neutral: 0, positive: 0 },
    sources: [],
    cuerpo: '',
    fecha: '',
    hora: '',
    link_noticia: '',
    link_foto: '',
    categorias: [],
    tags: [],
    comentarios: [],
    reacciones: [],
    volanta: '',
    fecha_resumen: '',
    etiquetas: [],
    resumen: '',
    medio: ''
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">The trust editor</h1>
          <p className="text-sm md:text-base text-gray-500">Una herramienta con IA para ayudar a las redacciones a mejorar las noticias</p>
        </div>

        {/* Overview Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <EntityMetrics metrics={article.entities} />
            <AdjectivesMetrics metrics={article.adjectives} />
            <SentimentAnalysis
              negative={article.sentiment.negative}
              neutral={article.sentiment.neutral}
              positive={article.sentiment.positive}
            />
          </div>
        </div>

        {/* Article Section */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Artículo</h2>
          <ArticleHeader 
            article={article}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <ArticleContent
                title={article.titulo}
                content={article.cuerpo || ''}
                author={article.autor}
                date={article.fecha || ''}
                activeFilters={activeFilters}
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <EntityMetrics metrics={article.entities} />
              <AdjectivesMetrics metrics={article.adjectives} />
              <SentimentAnalysis
                negative={article.sentiment.negative}
                neutral={article.sentiment.neutral}
                positive={article.sentiment.positive}
              />
              <SourcesMetrics sources={article.sources} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}