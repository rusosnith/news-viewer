import inputArticles from '../data/news_demo_input.json';
import outputData from '../data/news_demo_output.json';

interface Article {
    id: string;
    hora: string;
    link_noticia: string;
    link_foto: string;
    autor: string;
    categorias: string[];
    cuerpo: string;
    volanta: string;
    fecha: string;
    fecha_resumen: string;
    etiquetas: string[];
    titulo: string;
    resumen: string;
    medio: string;
    // Add additional fields from output data
    adjectives?: any;
    entities?: any;
    metrics?: any;
    sentiment?: any;
    sources?: any;
}

const loadArticles = (): Article[] => {
    return inputArticles.map(article => {
        const output = outputData.find(data => data.id === article.id);
        return {
            ...article,
            ...output
        };
    });
};

export default loadArticles;
