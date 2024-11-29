import { useState } from 'react';
import MetricsCard from '../components/MetricsCard';
import ArticleList from '../components/ArticleList';
import AdjectivesMetrics from '../components/AdjectivesMetrics';
import EntityMetrics from '../components/EntityMetrics';
import SentimentAnalysis from '../components/SentimentAnalysis';
import type { Article, Metrics, EntityMetrics as EntityMetricsType } from '../types';

const mockMetrics: Metrics = {
  authors: 8,
  articles: 25,
  reviewed: 12,
  pending: 6,
  unreviewed: 7,
};

const mockEntityMetrics: EntityMetricsType = {
  people: 76,
  places: 12,
  dates: 28,
  organizations: 38
};

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Escala la pelea de Milei con gobernadores...',
    author: 'John Snow',
    status: 'pending',
    date: '16 Feb, 2024 02:09',
  },
  {
    id: '2',
    title: 'Artículo Título 3',
    author: 'John Snow',
    status: 'unreviewed',
  },
  {
    id: '3',
    title: 'Artículo Título 6',
    author: 'Eric Idle',
    status: 'reviewed',
    quality: 78,
  },
  {
    id: '4',
    title: 'Artículo Título 8',
    author: 'Eva Wallace',
    status: 'pending',
  },
];

export default function Home() {
  const [metrics] = useState<Metrics>(mockMetrics);
  const [articles] = useState<Article[]>(mockArticles);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">The trust editor</h1>
          <p className="text-gray-500">Una herramienta con IA para ayudar a las redacciones a mejorar las noticias</p>
        </div>

        <div className="mb-8">
          <MetricsCard metrics={metrics} />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2">
            <EntityMetrics metrics={mockEntityMetrics} />
          </div>
          <div>
            <AdjectivesMetrics metrics={{ total: 315, max: 679 }} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2">
            <SentimentAnalysis
              negative={39}
              neutral={46}
              positive={15}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Notas</h2>
          <ArticleList articles={articles} />
        </div>
      </div>
    </div>
  );
}