import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faLocationDot, 
  faCalendarDays, 
  faBuilding, 
  faEllipsis, 
  faChevronDown 
} from '@fortawesome/free-solid-svg-icons';
import type { Article, EntityMetrics } from '../types';
import { useState } from 'react';

interface EntityMetricsProps {
  entities: Article['entities'];
}

const typeConfig = {
  Persona: { icon: faUser, label: "Personas" },
  Lugar: { icon: faLocationDot, label: "Lugares" },
  Fecha: { icon: faCalendarDays, label: "Fechas" },
  Organización: { icon: faBuilding, label: "Organizaciones" },
  Misceláneo: { icon: faEllipsis, label: "Otros" },
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

  // Filtrar y ordenar las categorías por cantidad
  const sortedCategories = Object.entries(metrics)
    .filter(([_type, count]) => count > 0)
    .sort(([_typeA, countA], [_typeB, countB]) => countB - countA);

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Entidades</h3>
        <span className="text-cyan-500 text-2xl font-medium">{total}</span>
      </div>
      
      <div className="space-y-4">
        {sortedCategories.map(([type, count]) => {
          const sortedEntities = Object.entries(entityCounts[type])
            .sort(([, a], [, b]) => b - a);
          
          if (sortedEntities.length === 0) return null;

          const percentage = (count / total) * 100;

          return (
            <div key={type} className="border rounded-lg p-4">
              <button
                onClick={() => toggleSection(type)}
                className="w-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon 
                      icon={typeConfig[type as keyof typeof typeConfig].icon} 
                      className="w-5 h-5 text-cyan-500" 
                    />
                    <span className="font-medium">
                      {typeConfig[type as keyof typeof typeConfig].label}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">{count}</span>
                  </div>
                  <FontAwesomeIcon 
                    icon={faChevronDown}
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