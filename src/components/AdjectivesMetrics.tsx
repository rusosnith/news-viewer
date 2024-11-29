import type { AdjectiveMetrics } from '../types';

interface AdjectivesMetricsProps {
  metrics: AdjectiveMetrics;
}

export default function AdjectivesMetrics({ metrics }: AdjectivesMetricsProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        Adjetivos
        <span className="text-xs text-gray-500">(a word naming an attribute of a noun)</span>
      </h3>

      <div className="mt-4">
        <div className="relative">
          <div className="h-2 bg-purple-100 rounded-full">
            <div
              className="h-2 bg-purple-500 rounded-full"
              style={{ width: `${(metrics.total / metrics.max) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-purple-600">{metrics.total} Adjetivos</span>
            <span className="text-gray-500">Max. {metrics.max}</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <div className="flex flex-wrap gap-2">
            {['rápido', 'lento', 'grande', 'pequeño', 'hermoso', 'feo', 'nuevo', 'viejo', 'alto', 'bajo'].map((adj) => (
              <span key={adj} className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full">
                {adj}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}