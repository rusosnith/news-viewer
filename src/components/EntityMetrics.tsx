import { User2, Flag, Calendar, Shield } from 'lucide-react';
import type { EntityMetrics } from '../types';

interface EntityMetricsProps {
  metrics: EntityMetrics;
}

export default function EntityMetrics({ metrics }: EntityMetricsProps) {
  const total = metrics.people + metrics.places + metrics.dates + metrics.organizations;

  return (
    <div className="bg-white rounded-lg p-6 h-[200px] flex flex-col">
      <div className="flex justify-between items-center mb-auto">
        <h3 className="text-xl font-medium">Entidades</h3>
        <span className="text-cyan-500 text-2xl font-medium">{total}</span>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <MetricItem
          icon={User2}
          label="Personas"
          value={metrics.people}
          percentage={(metrics.people / 100) * 100}
        />
        <MetricItem
          icon={Flag}
          label="Lugares"
          value={metrics.places}
          percentage={(metrics.places / 100) * 100}
        />
        <MetricItem
          icon={Calendar}
          label="Fechas"
          value={metrics.dates}
          percentage={(metrics.dates / 100) * 100}
        />
        <MetricItem
          icon={Shield}
          label="Organizaciones"
          value={metrics.organizations}
          percentage={(metrics.organizations / 100) * 100}
        />
      </div>
    </div>
  );
}

function MetricItem({ 
  icon: Icon, 
  label, 
  value, 
  percentage 
}: { 
  icon: any; 
  label: string; 
  value: number; 
  percentage: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        <Icon className="w-5 h-5" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="bg-cyan-100 rounded-full">
        <div 
          className="h-2 bg-cyan-500 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-700 mt-1 block">{value}</span>
    </div>
  );
}