import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ArticleHeader from '../components/ArticleHeader';
import ArticleContent from '../components/ArticleContent';
import EntityMetrics from '../components/EntityMetrics';
import SentimentAnalysis from '../components/SentimentAnalysis';
import AdjectivesMetrics from '../components/AdjectivesMetrics';
import SourcesMetrics from '../components/SourcesMetrics';
import { mockArticles, mockEntityMetrics, mockSources } from '../data/mockData';

export default function ArticleDetail() {
  const { id } = useParams();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const article = mockArticles.find(a => a.id === id) || mockArticles[0];

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
            <EntityMetrics metrics={mockEntityMetrics} />
            <AdjectivesMetrics metrics={{ total: 315, max: 679 }} />
            <SentimentAnalysis
              negative={39}
              neutral={46}
              positive={15}
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
                title={article.title}
                content={article.content || ''}
                author={article.author}
                date={article.date || ''}
                activeFilters={activeFilters}
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <EntityMetrics metrics={mockEntityMetrics} />
              <AdjectivesMetrics metrics={{ total: 315, max: 679 }} />
              <SentimentAnalysis
                negative={39}
                neutral={46}
                positive={15}
              />
              <SourcesMetrics sources={mockSources} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}