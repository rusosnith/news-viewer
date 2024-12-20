import MetricsCard from '../components/MetricsCard';
import ArticleList from '../components/ArticleList';
import AdjectivesMetrics from '../components/AdjectivesMetrics';
import EntityMetrics from '../components/EntityMetrics';
import SentimentAnalysis from '../components/SentimentAnalysis';
import newsDemoInput from '../data/news_demo_input.json';


// Since the JSON is an array of articles, we'll use it directly
// Map the JSON data to match the Article interface
const articles = newsDemoInput.map(article => ({
  id: article.id,
  hora: article.hora,
  link_noticia: article.link_noticia,
  link_foto: article.link_foto,
  autor: article.autor,
  categorias: article.categorias,
  cuerpo: article.cuerpo,
  volanta: article.volanta,
  fecha: article.fecha,
  fecha_resumen: article.fecha_resumen,
  etiquetas: article.etiquetas,
  titulo: article.titulo,
  resumen: article.resumen,
  medio: article.medio,
  title: article.titulo, // Assuming 'titulo' is the title
  author: article.autor, // Assuming 'autor' is the author
  status: 'reviewed' as 'reviewed' // Ensuring the status is one of the allowed values
}));

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">The trust editor</h1>
          <p className="text-sm md:text-base text-gray-500">Una herramienta con IA para ayudar a las redacciones a mejorar las noticias</p>
        </div>

        <div className="mb-8">
          <MetricsCard metrics={{ authors: 0, articles: 0, reviewed: 0, pending: 0, unreviewed: 0 }} /> {/* Adjust this if you have metrics data */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
            <ArticleList articles={articles} />
            </div>
          {/* Add other components as needed */}
        </div>
      </div>
    </div>
  );
}