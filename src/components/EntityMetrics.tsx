import { User2, Flag, Calendar, Shield, ChevronDown } from 'lucide-react';
import type { Article, EntityMetrics } from '../types';
import { useState } from 'react';

interface EntityMetricsProps {
  entities: Article['entities'];
}

const typeConfig = {
  Persona: { icon: User2, label: "Personas" },
  Lugar: { icon: Flag, label: "Lugares" },
  Fecha: { icon: Calendar, label: "Fechas" },
  Organización: { icon: Shield, label: "Organizaciones" },
  Misceláneo: { icon: Shield, label: "Otros" },
};

export default function EntityMetrics({ entities }: EntityMetricsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const entityCounts: Record<string, Record<string, number>> = {
    Persona: {},
    Lugar: {},
    Fecha: {},
    Organización: {},
    Misceláneo: {},
  };

  // Contar ocurrencias de cada entidad por tipo
  entities?.entities_list?.forEach(entity => {
    if (!entityCounts[entity.type][entity.text]) {
      entityCounts[entity.type][entity.text] = 0;
    }
    entityCounts[entity.type][entity.text]++;
  });

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-medium mb-6">Entidades</h3>
      
      <div className="space-y-4">
        {Object.entries(entityCounts).map(([type, entities]) => {
          const sortedEntities = Object.entries(entities)
            .sort(([, a], [, b]) => b - a);
          
          if (sortedEntities.length === 0) return null;

          const TypeIcon = typeConfig[type as keyof typeof typeConfig].icon;
          const percentage = (metrics[type as keyof EntityMetrics] / total) * 100;

          return (
            <div key={type} className="border rounded-lg p-4">
              <button
                onClick={() => toggleSection(type)}
                className="w-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TypeIcon className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{typeConfig[type as keyof typeof typeConfig].label}</span>
                    <span className="text-gray-400 text-sm">
                      ({metrics[type as keyof EntityMetrics]})
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform text-gray-400
                      ${expandedSection === type ? 'transform rotate-180' : ''}`}
                  />
                </div>
                
                <div className="bg-cyan-100 rounded-full">
                  <div 
                    className="h-2 bg-cyan-500 rounded-full transition-all" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </button>

              {expandedSection === type && (
                <div className="mt-4 text-sm text-gray-600">
                  {sortedEntities.map(([name, count], index) => (
                    <span key={name} className="inline-block">
                      {name} <span className="text-gray-400">{count}</span>
                      {index < sortedEntities.length - 1 && (
                        <span className="mx-2 text-gray-300">-</span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}