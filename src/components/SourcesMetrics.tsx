interface Source {
  name: string;
  link: string;
}

interface SourcesMetricsProps {
  sources: Source[];
}

export default function SourcesMetrics({ sources }: SourcesMetricsProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        Fuentes
        <span className="text-xs text-gray-500">(credible references)</span>
      </h3>

      <div className="mt-4 space-y-3">
        {sources.map((source, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
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