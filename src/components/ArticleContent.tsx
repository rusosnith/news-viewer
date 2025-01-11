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
  `<span class="relative inline-block text-black ${baseColor} hover:${hoverColor} px-1 cursor-pointer group">
    ${text}
    <span class="absolute left-0 top-full mt-1 text-xs px-1 opacity-0 group-hover:opacity-100 ${hoverColor} whitespace-nowrap z-10">
      ${tooltip}
    </span>
  </span>`
);

const ArticleContent: React.FC<ArticleContentProps> = ({ 
  title, content, author, date, activeFilters, entities, adjectives 
}) => {
  const processTextHighlights = (
    text: string,
    items: Array<any>,
    filterType: string,
    getTooltip: (item: any) => string,
    colors: { base: string, hover: string }
  ) => {
    if (activeFilters.includes(filterType)) return text;
    
    const uniqueItems = new Set<string>();

    return items?.reduce((processedText, item) => {
      const word = item.text || item;
      if (uniqueItems.has(word)) return processedText;
      uniqueItems.add(word);

      const regex = new RegExp(`\\b${word}\\b`, "g");
      return processedText.replace(
        regex,
        createHighlightedSpan(word, getTooltip(item), colors.base, colors.hover)
      );
    }, text);
  };

  const processedContent = useMemo(() => {
    let processedText = content.split('\n').map(p => `<p>${p.trim()}</p>`).join('\n');

    // Procesar entidades
    processedText = processTextHighlights(
      processedText,
      entities?.entities_list || [],
      'entities',
      (item) => item.type,
      { base: 'bg-cyan-100', hover: 'bg-cyan-300' }
    );  

    // Procesar adjetivos
    processedText = processTextHighlights(
      processedText,
      adjectives?.adjectives_list || [],
      'adjectives',
      (item) => Object.values(item.features).filter(Boolean).join('. '),
      { base: 'bg-purple-100', hover: 'bg-purple-300' }
    );

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
