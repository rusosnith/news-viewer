import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import type { Article } from '../types';

interface SourcesMetricsProps {
  metrics: Article['metrics'];
  sources?: Article['sources'];
}

export default function SourcesMetrics({ metrics, sources }: SourcesMetricsProps) {
  if (!metrics?.sources) return null;

  const sourcesMetrics = metrics.sources;
  
  const metricsData = [
    { 
      key: 'num_afirmaciones',
      label: 'Citas Identificadas',
      value: sourcesMetrics.num_afirmaciones?.value || 0
    },
    {
      key: 'num_afirmaciones_explicitas',
      label: 'Citas Explícitas',
      value: sourcesMetrics.num_afirmaciones_explicitas?.value || 0
    },
    {
      key: 'num_conectores',
      label: 'Conectores',
      value: sourcesMetrics.num_conectores?.value || 0
    },
    {
      key: 'num_conectores_unique',
      label: 'Conectores Únicos',
      value: sourcesMetrics.num_conectores_unique?.value || 0
    },
    {
      key: 'num_referenciados',
      label: 'Referenciados',
      value: sourcesMetrics.num_referenciados?.value || 0
    },
    {
      key: 'num_referenciados_unique',
      label: 'Referenciados Únicos',
      value: sourcesMetrics.num_referenciados_unique?.value || 0
    }
  ];

  const totalCitas = sourcesMetrics.num_afirmaciones?.value || 0;

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Fuentes</h3>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faQuoteLeft} className="w-5 h-5 text-amber-500" />
          <span className="text-amber-500 text-2xl font-medium">{totalCitas}</span>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="grid grid-cols-2 gap-3">
          {metricsData.map((metric) => (
            <div key={metric.key} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{metric.label}</span>
              <span className="text-amber-500 font-medium">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>

      {Array.isArray(sources) && sources.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Citas en el texto</h4>
          <div className="space-y-3">
            {sources.map((source, index) => (
              <div key={index} className="text-sm border-l-2 border-amber-300 pl-3">
                {source.components?.afirmacion && (
                  <p className="text-gray-600 italic">"{source.text}"</p>
                )}
                {source.components?.conector?.text && (
                  <p className="text-amber-600 text-xs mt-1">
                    {source.components.conector.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}