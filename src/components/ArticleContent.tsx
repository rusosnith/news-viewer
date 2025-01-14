import React, { useMemo } from 'react'

import { Article } from '../types';

interface ArticleContentProps {
  title: string;
  content: string;
  author: string;
  date: string;
  activeFilters: string[];
  entities: Article['entities'];
  adjectives?: Article['adjectives'];
}


const createHighlightedSpan = (text: string, tooltip: string, baseColor: string, hoverColor: string) => (
    `<span class="relative inline-block text-black ${baseColor} hover:${hoverColor} px-1 group cursor-pointer">
  ${text}
 <span class="absolute left-0 top-full mt-0 text-xs px-1 hidden group-hover:block ${hoverColor} whitespace-nowrap z-10">
 ${tooltip}
 </span>
</span>`  
);

const ArticleContent: React.FC<ArticleContentProps> = ({ 
  title, content, author, date, activeFilters, entities, adjectives 
}) => {
  const processedContent = useMemo(() => {
    // Configuración de los diferentes tipos de resaltado
    const highlightConfigs = [
      {
        items: entities?.entities_list || [],
        filterType: 'entities',
        getTooltip: (item: any) => item.type,
        colors: { base: 'bg-cyan-100', hover: 'bg-cyan-300' }
      },
      {
        items: adjectives?.adjectives_list || [],
        filterType: 'adjectives',
        getTooltip: (item: any) => Object.values(item.features).filter(Boolean).join('. '),
        colors: { base: 'bg-purple-100', hover: 'bg-purple-400' }
      }
    ];

    // Procesar el texto una sola vez
    let processedText = content.split('\n').map(p => `<p>${p.trim()}</p>`).join('\n');

    // Aplicar cada tipo de resaltado
    highlightConfigs.forEach(config => {
      if (!activeFilters.includes(config.filterType)) {
        const uniqueItems = new Set<string>();
        
        processedText = config.items.reduce((text, item) => {
          const word = item.text || item;
          if (uniqueItems.has(word)) return text;
          uniqueItems.add(word);

          const regex = new RegExp(`\\b${word}\\b`, "g");
          return text.replace(
            regex,
            createHighlightedSpan(word, config.getTooltip(item), config.colors.base, config.colors.hover)
          );
        }, processedText);
      }
    });

    return processedText;
  }, [content, activeFilters, entities, adjectives]);

  return (
    <div className="bg-white rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
        <span>{author}</span>
        <span>{date}</span>
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: processedContent}} />
    </div>
  );
};

export default ArticleContent;
