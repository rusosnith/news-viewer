import React from 'react';
import loadArticles from '../components/articleLoader';

const LoadedArticlesPage: React.FC = () => {
    const articles = loadArticles();

    return (
        <div>
            <h1>Loaded Articles</h1>
            {articles.map(article => (
                <div key={article.id} className="mb-6 p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold">{article.titulo}</h2>
                    <p><strong>ID:</strong> {article.id}</p>
                    <p><strong>Author:</strong> {article.autor}</p>
                    <p><strong>Date:</strong> {article.fecha}</p>
                    <p><strong>Source:</strong> {article.medio}</p>
                    
                    {/* Resumen de métricas */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Metrics Summary</h3>
                        <ul className="list-disc pl-5">
                            <li>Adjectives: {article.metrics?.adjectives?.num_adjectives?.value || 0}</li>
                            <li>Entities: {article.metrics?.entities?.num_entidades?.value || 0}</li>
                            <li>Sources: {article.metrics?.sources?.num_afirmaciones?.value || 0}</li>
                            <li>Unique References: {article.metrics?.sources?.num_referenciados_unique?.value || 0}</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadedArticlesPage;
