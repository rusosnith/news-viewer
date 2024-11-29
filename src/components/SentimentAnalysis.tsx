interface SentimentAnalysisProps {
  negative: number;
  neutral: number;
  positive: number;
}

export default function SentimentAnalysis({ negative, neutral, positive }: SentimentAnalysisProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        Sentimientos
        <span className="text-xs text-gray-500">(Identifying and categorizing opinions expressed)</span>
      </h3>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                  Negativo
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-red-600">
                  {negative}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
              <div style={{ width: `${negative}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200">
                  Neutral
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {neutral}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div style={{ width: `${neutral}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500"></div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  Positivo
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-green-600">
                  {positive}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div style={{ width: `${positive}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}