import loadArticles from './articleLoader';

interface Metrics {
    totalArticles: number;
    totalAuthors: number;
    totalCategories: number;
    totalWords: number;
}

export function calculateMetrics(): Metrics {
    const articles = loadArticles();
    const totalArticles = articles.length;
    const totalAuthors = new Set(articles.map(article => article.autor)).size;
    const totalCategories = new Set(articles.flatMap(article => article.categorias)).size;
    const totalWords = articles.reduce((sum, article) => sum + article.cuerpo.split(' ').length, 0);

    return {
        totalArticles,
        totalAuthors,
        totalCategories,
        totalWords
    };
}
