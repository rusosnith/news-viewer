import inputArticles from '../data/news_demo_input.json';
import outputData from '../data/news_demo_output.json';
import { Article } from '../types';


const loadArticles = (): Article[] => {
    return inputArticles.map(article => {
        const output: Partial<Article> = outputData.find(data => data.id === article.id) as any || {};
        return {
            ...article,
            adjectives: output.adjectives || {},
            entities: output.entities as any || {},
            metrics: output.metrics as any || {},
            sentiment: output.sentiment || {},
            sources: output.sources || {},
            status: output.status || 'desconocido'
        };
    });
};

export default loadArticles;

export function calculateMetrics() {
  // Your implementation here
  return {
    totalArticles: 0,
    totalAuthors: 0,
    totalCategories: 0,
    totalWords: 0,
  };
}
