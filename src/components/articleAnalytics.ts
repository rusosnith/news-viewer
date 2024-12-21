import loadArticles from './articleLoader';
import { Article } from '../types';

interface Metrics {
    totalArticles: number;
    totalAuthors: number;
    totalCategories: number;
}

export function calculateMetrics(articles: Article[]): Metrics {
    const totalArticles = articles.length;
    const totalAuthors = new Set(articles.map(article => article.autor)).size;
    const totalCategories = new Set(articles.flatMap(article => article.categorias)).size;

    return {
        totalArticles,
        totalAuthors,
        totalCategories,
    };
}
