import { User2, Flag, Calendar, Shield } from 'lucide-react';
import type { Article, EntityMetrics } from '../types';

interface EntityMetricsProps {
  entities: Article['entities'];
}

export default function EntityMetrics({ entities }: EntityMetricsProps) {

  const metrics: EntityMetrics = {
    Fecha: 0,
    Lugar: 0,
    Misceláneo: 0,
    Organización: 0,
    Persona: 0,
  };

  if (entities?.entities_list) {
    entities.entities_list.forEach(entity => {
      (metrics as any)[entity.type]++;  
    });
  }

  const total = Object.values(metrics).reduce((acc, value) => acc + value, 0);

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
          value={metrics.Persona}
          percentage={(metrics.Persona / 100) * 100}
        />
        <MetricItem
          icon={Flag}
          label="Lugares"
          value={metrics.Lugar}
          percentage={(metrics.Lugar / 100) * 100}
        />
        <MetricItem
          icon={Calendar}
          label="Fechas"
          value={metrics.Fecha}
          percentage={(metrics.Fecha / 100) * 100}
        />
        <MetricItem
          icon={Shield}
          label="Organizaciones"
          value={metrics.Organización}
          percentage={(metrics.Organización / 100) * 100}
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
  console.log(value)
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