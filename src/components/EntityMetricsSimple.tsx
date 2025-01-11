import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faLocationDot, 
  faCalendarDays, 
  faBuilding, 
  faEllipsis
} from '@fortawesome/free-solid-svg-icons';
import type { Article, EntityMetrics } from '../types';

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

export default function EntityMetricsSimple({ entities }: EntityMetricsProps) {
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
    <div className="bg-white rounded-lg p-6 h-[200px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Entidades</h3>
        <div className="flex items-center gap-2">
          <span className="text-cyan-500 text-2xl font-medium">{total}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(metrics).map(([type, count]) => (
          <div key={type} className="flex flex-col items-center">
            <FontAwesomeIcon 
              icon={typeConfig[type as keyof typeof typeConfig].icon} 
              className="w-4 h-4 text-cyan-500 mb-1" 
            />
            <span className="text-sm text-gray-500">
              {typeConfig[type as keyof typeof typeConfig].label}
            </span>
            <span className="text-sm font-medium text-gray-600">{count}</span>
            <div className="w-full bg-cyan-100 rounded-full h-1.5 mt-1">
              <div 
                className="h-full bg-cyan-500 rounded-full" 
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 