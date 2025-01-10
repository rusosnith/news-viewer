import { Article } from "../types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';


interface SourcesMetricsProps {
  metrics: Article['metrics'];
}

export default function SourcesMetrics({ metrics }: SourcesMetricsProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        Fuentes
        <span className="text-xs text-gray-500">(credible references)</span>
      </h3>

      <div className="mt-4 space-y-3">
        {Array.isArray(metrics?.sources) && metrics.sources.map((source: { link: string; name: string }, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <FontAwesomeIcon icon={faQuoteLeft} className="w-5 h-5 text-gray-500" />
            <a
              href={source.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              {source.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}