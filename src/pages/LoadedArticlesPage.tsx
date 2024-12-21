import React from 'react';
import loadArticles from '../components/articleLoader';

const LoadedArticlesPage: React.FC = () => {
    const articles = loadArticles();

    return (
        <div>
            <h1>Loaded Articles</h1>
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
