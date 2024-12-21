import React from 'react';
import MetricsCard from '../components/MetricsCard';
import ArticleList from '../components/ArticleList';
import AdjectivesMetrics from '../components/AdjectivesMetrics';
import EntityMetrics from '../components/EntityMetrics';
import SentimentAnalysis from '../components/SentimentAnalysis';
import { mockEntityMetrics } from '../data/mockData';
import { calculateMetrics } from '../components/articleAnalytics';
import loadArticles from '../components/articleLoader';
import { Article } from '../types';

const Home: React.FC = () => {
  const articles = loadArticles();
  const metrics = calculateMetrics(articles);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
        </div>

        <div className="mt-8 md:mt-12">
          <h2 className="text-xl font-semibold mb-4">Notas</h2>
          <ArticleList articles={articles} />
        </div>
      </div>
    </div>
  );
};

export default Home;