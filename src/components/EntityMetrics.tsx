import { User, MapPin, Calendar, Building } from 'lucide-react';
import type { EntityMetrics } from '../types';

interface EntityMetricsProps {
  metrics: EntityMetrics;
}

export default function EntityMetrics({ metrics }: EntityMetricsProps) {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        Entidades
        <span className="text-xs text-gray-500">(People, places, dates and organizations)</span>
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <User className="w-4 h-4 text-blue-500 mr-2" />
          <div className="flex-1">
            <div className="h-2 bg-blue-100 rounded-full">
              <div 
                className="h-2 bg-blue-500 rounded-full" 
                style={{ width: `${(metrics.people / 100) * 100}%` }}
              />
            </div>
          </div>
          <span className="ml-2 text-sm text-gray-600">{metrics.people}</span>
        </div>

        <div className="flex items-center">
          <MapPin className="w-4 h-4 text-blue-500 mr-2" />
          <div className="flex-1">
            <div className="h-2 bg-blue-100 rounded-full">
              <div 
                className="h-2 bg-blue-500 rounded-full" 
                style={{ width: `${(metrics.places / 100) * 100}%` }}
              />
            </div>
          </div>
          <span className="ml-2 text-sm text-gray-600">{metrics.places}</span>
        </div>

        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-blue-500 mr-2" />
          <div className="flex-1">
            <div className="h-2 bg-blue-100 rounded-full">
              <div 
                className="h-2 bg-blue-500 rounded-full" 
                style={{ width: `${(metrics.dates / 100) * 100}%` }}
              />
            </div>
          </div>
          <span className="ml-2 text-sm text-gray-600">{metrics.dates}</span>
        </div>

        <div className="flex items-center">
          <Building className="w-4 h-4 text-blue-500 mr-2" />
          <div className="flex-1">
            <div className="h-2 bg-blue-100 rounded-full">
              <div 
                className="h-2 bg-blue-500 rounded-full" 
                style={{ width: `${(metrics.organizations / 100) * 100}%` }}
              />
            </div>
          </div>
          <span className="ml-2 text-sm text-gray-600">{metrics.organizations}</span>
        </div>
      </div>
    </div>
  );
}