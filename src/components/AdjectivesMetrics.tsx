import { Clock } from 'lucide-react';
import type { AdjectiveMetrics } from '../types';

interface AdjectivesMetricsProps {
  metrics: AdjectiveMetrics;
}

export default function AdjectivesMetrics({ metrics }: AdjectivesMetricsProps) {
  const percentage = Math.round((metrics.total / metrics.max) * 100);
  
  return (
    <div className="bg-white rounded-lg p-6 h-[200px] flex flex-col">
      <div className="flex justify-between items-center mb-auto">
        <h3 className="text-xl font-medium">Adjetivos</h3>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-500" />
          <span className="text-purple-500 text-2xl font-medium">{metrics.total}</span>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>{metrics.total} Adjetivos</span>
          <span className="text-purple-500">Max: {metrics.max} ({percentage}%)</span>
        </div>
        <div className="bg-purple-100 rounded-full">
          <div
            className="h-2 bg-purple-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}