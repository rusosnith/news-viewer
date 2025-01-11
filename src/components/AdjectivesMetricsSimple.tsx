import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import type { Article } from '../types';

interface AdjectivesMetricsProps {
  metrics: Article['metrics'];
}

export default function AdjectivesMetricsSimple({ metrics }: AdjectivesMetricsProps) {
  const percentage = metrics?.adjectives.perc_adjectives.value * 100;
  const maxValue = 679; // Valor máximo según la imagen
  
  return (
    <div className="bg-white rounded-lg p-6 h-[200px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Adjetivos</h3>
        <div className="flex items-center gap-2">
          <span className="text-purple-500 text-2xl font-medium">
            {metrics?.adjectives.num_adjectives.value}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span>{metrics?.adjectives.num_adjectives.value} Adjetivos</span>
          <span className="text-purple-500">Max: {maxValue} ({percentage.toFixed(0)}%)</span>
        </div>
        <div className="flex h-2">
          <div className="bg-purple-500 rounded-l-full" style={{ width: `${percentage}%` }} />
          <div className="bg-purple-100 rounded-r-full flex-grow" />
        </div>
      </div>
    </div>
  );
} 