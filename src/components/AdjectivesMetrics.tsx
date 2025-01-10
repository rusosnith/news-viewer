import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import type { Article } from '../types';

interface AdjectivesMetricsProps {
  metrics: Article['metrics'];
  adjectives?: Article['adjectives'];
}

const featureLabels = {
  Gender: {
    Masc: 'Masculino',
    Fem: 'Femenino',
    Neut: 'Neutro'
  },
  Number: {
    Sing: 'Singular',
    Plur: 'Plural'
  },
  Degree: {
    Pos: 'Positivo',
    Cmp: 'Comparativo',
    Sup: 'Superlativo'
  },
  VerbForm: {
    Part: 'Participio'
  },
  NumType: {
    Ord: 'Ordinal',
    Card: 'Cardinal'
  }
};

export default function AdjectivesMetrics({ metrics, adjectives }: AdjectivesMetricsProps) {
  const percentage = metrics?.adjectives.perc_adjectives.value * 100;
  const sortedAdjectives = adjectives?.adjectives_freq.sort((a, b) => b[1] - a[1]) || [];

  // Agrupar adjetivos por características
  const featureCounts = adjectives?.adjectives_list.reduce((acc, adj) => {
    Object.entries(adj.features).forEach(([feature, value]) => {
      if (!acc[feature]) acc[feature] = {};
      if (!acc[feature][value]) acc[feature][value] = 0;
      acc[feature][value]++;
    });
    return acc;
  }, {} as Record<string, Record<string, number>>) || {};
  
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        Adjetivos
        <span className="text-xs text-gray-500">(descriptive words)</span>
      </h3>

      {/* Métricas generales */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>{metrics?.adjectives.num_adjectives.value} Adjetivos</span>
          <span className="text-purple-500">({percentage.toFixed(1)}%)</span>
        </div>
        <div className="bg-purple-100 rounded-full">
          <div
            className="h-2 bg-purple-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Categorías de adjetivos */}
      <div className="mt-6 space-y-4">
        {Object.entries(featureCounts).map(([feature, values]) => (
          <div key={feature}>
            <h4 className="text-sm font-medium text-gray-700 mb-2">{feature}</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(values)
                .sort(([,a], [,b]) => b - a)
                .map(([value, count]) => (
                  <div key={value} className="flex items-center justify-between text-sm bg-purple-50 p-2 rounded">
                    <span className="text-gray-600">{featureLabels[feature]?.[value] || value}</span>
                    <span className="text-purple-500 font-medium">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lista de adjetivos más frecuentes */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Más frecuentes</h4>
        <div className="space-y-2">
          {sortedAdjectives.slice(0, 5).map(([adjective, count], index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{adjective}</span>
              <span className="text-purple-500 font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}