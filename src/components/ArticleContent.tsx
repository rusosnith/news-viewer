import React, { useMemo } from 'react'

import { Article } from '../types';

interface ArticleContentProps {
  title: string;
  content: string;
  author: string;
  date: string;
  activeFilters: string[];
  entities: Article['entities'];
}

const tagColors = {
  Persona: {
    base: 'bg-blue-100',
    hover: 'bg-blue-200',
    label: 'Persona',
    filter: 'entities'
  },
  Lugar: {
    base: 'bg-green-100',
    hover: 'bg-green-200',
    label: 'Lugar',
    filter: 'entities'
  },
  Organización: {
    base: 'bg-yellow-100',
    hover: 'bg-yellow-200',
    label: 'Organización',
    filter: 'entities'
  },
  Misceláneo: {
    base: 'bg-purple-100',
    hover: 'bg-purple-200',
    label: 'Misceláneo',
    filter: 'entities'
  },
  Fecha: {
    base: 'bg-orange-100',
    hover: 'bg-orange-200',
    label: 'Fecha',
    filter: 'entities'
  }
};

const ArticleContent: React.FC<ArticleContentProps> = ({ title, content, author, date, activeFilters,entities }) => {
  console.log(entities)
  const processedContent = useMemo(() => {


    let processedText = content.split('\n').map((paragraph) => `<p>${paragraph.trim()}</p>`).join('\n');

    entities?.entities_list.forEach(({type, text: word}) => {
      const regex = new RegExp(`\\b${word}\\b`, "g");
      const tagType = type as keyof typeof tagColors;
      const shouldShow = 
      (tagType === 'Organización' || tagType === 'Persona')
      ? !activeFilters.includes('entities') : true

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

    return processedText;
  }, [content, activeFilters]);

  return (
    <div className="bg-white rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
        <span>{author}</span>
        <span>{date}</span>
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{__html:processedContent}}>
      </div>
    </div>
  );
};

export default ArticleContent;