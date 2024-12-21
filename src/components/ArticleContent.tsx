import { useMemo } from 'react';

interface ArticleContentProps {
  title: string;
  content: string;
  author: string;
  date: string;
  activeFilters: string[];
}

const tagColors = {
  person: {
    base: 'bg-blue-100',
    hover: 'bg-blue-200',
    label: 'Persona',
    filter: 'entities'
  },
  place: {
    base: 'bg-green-100',
    hover: 'bg-green-200',
    label: 'Lugar',
    filter: 'entities'
  },
  organization: {
    base: 'bg-yellow-100',
    hover: 'bg-yellow-200',
    label: 'Organización',
    filter: 'entities'
  },
  adjective: {
    base: 'bg-purple-100',
    hover: 'bg-purple-200',
    label: 'Adjetivo',
    filter: 'adjectives'
  },
  date: {
    base: 'bg-orange-100',
    hover: 'bg-orange-200',
    label: 'Fecha',
    filter: 'entities'
  }
};

export default function ArticleContent({ title, content, author, date, activeFilters }: ArticleContentProps) {
  const processedContent = useMemo(() => {
    const entities = {
      person: ['Milei', 'Lali Espósito', 'Macri', 'Javier Milei'],
      place: ['Justicia'],
      organization: ['La Libertad Avanza', 'PRO', 'Presidencia'],
      adjective: ['duras', 'draconiano', 'innecesarios', 'vulnerables', 'esenciales', 'económico', 'sociales', 'públicos', 'central', 'drástica'],
      date: ['16 Feb, 2024']
    };

    let processedText = content;

    Object.entries(entities).forEach(([type, words]) => {
      words.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const tagType = type as keyof typeof tagColors;
        const shouldShow = activeFilters.length === 0 || 
                         (tagColors[tagType].filter === 'entities' && activeFilters.includes('entities')) ||
                         (tagColors[tagType].filter === 'adjectives' && activeFilters.includes('adjectives'));
        
        if (shouldShow) {
          processedText = processedText.replace(
            regex,
            `<span class="relative inline-block group cursor-pointer">
              <span class="relative inline-block text-black">
                <span class="absolute inset-0 transition-all duration-200 ${tagColors[tagType].base} group-hover:${tagColors[tagType].hover}"></span>
                <span class="relative px-1">${word}</span>
                <span class="absolute right-0 top-full text-[0.7rem] px-1 opacity-0 group-hover:opacity-100 whitespace-nowrap ${tagColors[tagType].base}">
                  ${tagColors[tagType].label}
                </span>
              </span>
            </span>`
          );
        } else {
          processedText = processedText.replace(regex, word);
        }
      });
    });

    return processedText;
  }, [content, activeFilters]);

  return (
    <div className="bg-white rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
        <span>{author}</span>
        <span>{date}</span>
      </div>
      <div className="prose max-w-none">
        {content.split('\n').map((_paragraph, index) => (
          <p 
            key={index} 
            className="mb-4 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        ))}
      </div>
    </div>
  );
}