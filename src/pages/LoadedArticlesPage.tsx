import React from 'react';
import loadArticles from '../components/articleLoader';
import { calculateMetrics } from '../components/articleAnalytics';

const LoadedArticlesPage: React.FC = () => {
    const articles = loadArticles();
    const metrics = calculateMetrics(articles);

    return (
        <div>
            <h1>Loaded Articles</h1>
            <div>
                <h2>Metrics</h2>
                <p><strong>Total Articles:</strong> {metrics.totalArticles}</p>
                <p><strong>Total Authors:</strong> {metrics.totalAuthors}</p>
                <p><strong>Total Categories:</strong> {metrics.totalCategories}</p>
                <p><strong>Total Words:</strong> {metrics.totalWords}</p>
            </div>
            {articles.map(article => (
                <div key={article.id}>
                    <h2>{article.titulo}</h2>
                    <p>{article.cuerpo}</p>
                    <p><strong>Author:</strong> {article.autor}</p>
                    <p><strong>Date:</strong> {article.fecha}</p>
                    <p><strong>Source:</strong> {article.medio}</p>
                    {/* Add more fields as needed */}
                </div>
            ))}
        </div>
    );
};

export default LoadedArticlesPage;
