import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArticleContent from '../components/ArticleContent';
import EntityMetrics from '../components/EntityMetrics';
import SentimentAnalysis from '../components/SentimentAnalysis';
import AdjectivesMetrics from '../components/AdjectivesMetrics';
import SourcesMetrics from '../components/SourcesMetrics';
import type { Article, EntityMetrics as EntityMetricsType } from '../types';

const mockArticle: Article & { content: string } = {
  id: '1',
  title: 'Escala la pelea de Milei con gobernadores e intendentes por el costo del ajuste y los dialoguistas buscan una salida',
  author: 'John Snow',
  status: 'pending',
  date: '16 Feb, 2024 02:09',
  content: `Con duras críticas, el presidente defendió la decisión de no enviar más fondos para salarios docentes y transporte. Más mandatarios provinciales y municipales amagan con ir a la Justicia si no hay un encuentro clave y el factor Macri.

El choque de Milei y la cantante pop Lali Espósito no puede entenderse si no se lo incorpora en esta misma secuencia de presidente aplicando sin contemplaciones un "Plan Motosierra" que tiene como objetivo un ajuste de más del 5% del Producto. La casi totalidad de los políticos surgidos del voto popular -que no son de La Libertad Avanza ni del PRO- están en pie de guerra por esos recursos: de gobernadores a intendentes, de diputados a senadores.

Cada uno a su manera emprendió la resistencia al draconiano plan fiscal que propone Milei como primer paso para romper un statu quo de estancamiento económico, crecimiento de la pobreza y deterioro acelerado de la calidad de vida.

Los gobernadores e intendentes, principales afectados por el recorte de fondos, han manifestado su preocupación por el impacto en los servicios públicos esenciales. La educación, el transporte y la salud son los sectores más vulnerables ante esta política de ajuste.

El presidente Milei, por su parte, mantiene firme su postura de reducir el gasto público y eliminar lo que considera "gastos innecesarios". Su equipo económico argumenta que estas medidas son fundamentales para controlar la inflación y estabilizar la economía.

La tensión entre el gobierno nacional y las provincias continúa escalando, mientras diversos sectores sociales y políticos buscan alternativas para mitigar el impacto de las medidas. El rol de los "dialoguistas" se vuelve crucial en este contexto, intentando tender puentes entre las diferentes posiciones.

Los analistas económicos señalan que el éxito o fracaso de este plan de ajuste podría definir el rumbo económico del país en los próximos años. La capacidad de negociación entre las partes y la posibilidad de alcanzar consensos serán determinantes para la implementación de las reformas propuestas.

Mientras tanto, la sociedad observa con preocupación el desarrollo de los acontecimientos, especialmente aquellos sectores más vulnerables que podrían verse afectados por los recortes en programas sociales y servicios públicos.`
};

const mockEntityMetrics: EntityMetricsType = {
  people: 76,
  places: 12,
  dates: 28,
  organizations: 38
};

const mockSources = [
  { name: "2024 Inflation (INDEC)", link: "#" },
  { name: "Signals of Milei", link: "#" },
  { name: "Economic Report 2024", link: "#" },
  { name: "2024 Inflation (INDEC)", link: "#" }
];

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<typeof mockArticle | null>(null);
  const [entityMetrics, setEntityMetrics] = useState<EntityMetricsType>(mockEntityMetrics);

  useEffect(() => {
    // In a real app, fetch article data based on id
    setArticle(mockArticle);
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">The trust editor</h1>
          <p className="text-gray-500">Una herramienta con IA para ayudar a las redacciones a mejorar las noticias</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <ArticleContent
              title={article.title}
              content={article.content}
              author={article.author}
              date={article.date}
            />
          </div>
          <div className="space-y-6">
            <EntityMetrics metrics={entityMetrics} />
            <AdjectivesMetrics metrics={{ total: 315, max: 679 }} />
            <SentimentAnalysis
              negative={39}
              neutral={46}
              positive={15}
            />
            <SourcesMetrics sources={mockSources} />
          </div>
        </div>
      </div>
    </div>
  );
}