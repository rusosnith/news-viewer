import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFaceFrown, 
  faFaceMeh, 
  faFaceSmile 
} from '@fortawesome/free-regular-svg-icons';

interface SentimentAnalysisProps {
  negative: number;
  neutral: number;
  positive: number;
}

export default function SentimentAnalysis({ negative, neutral, positive }: SentimentAnalysisProps) {
  return (
    <div className="bg-white rounded-lg p-6 h-[200px] flex flex-col">
      <div className="mb-auto">
        <h3 className="text-xl font-medium">Sentimientos</h3>
        <p className="text-xs text-gray-500">Identifying and categorizing opinions expressed</p>
      </div>

      <div className="flex gap-4">
        <SentimentBar
          label="Negativo"
          value={negative}
          colorClass="bg-red-500"
          bgColorClass="bg-red-100"
          textColorClass="text-red-600"
        />
        <SentimentBar
          label="Neutral"
          value={neutral}
          colorClass="bg-gray-500"
          bgColorClass="bg-gray-100"
          textColorClass="text-gray-600"
        />
        <SentimentBar
          label="Positivo"
          value={positive}
          colorClass="bg-green-500"
          bgColorClass="bg-green-100"
          textColorClass="text-green-600"
        />
      </div>
    </div>
  );
}

function SentimentBar({ 
  label, 
  value, 
  colorClass, 
  bgColorClass,
  textColorClass 
}: { 
  label: string; 
  value: number; 
  colorClass: string;
  bgColorClass: string;
  textColorClass: string;
}) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${bgColorClass} ${textColorClass}`}>
          {label}
        </span>
        <span className={`text-xs font-semibold ${textColorClass}`}>
          {value}%
        </span>
      </div>
      <div className={`rounded-full ${bgColorClass}`}>
        <div 
          className={`h-2 rounded-full ${colorClass}`}
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}