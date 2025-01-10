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

const tagColors = {
  Persona: {
    base: 'bg-cyan-100',
    hover: 'bg-cyan-200',
    label: 'Persona',
    filter: 'entities'
  },
  Lugar: {
    base: 'bg-cyan-100',
    hover: 'bg-cyan-200',
    label: 'Lugar',
    filter: 'entities'
  },
  Organización: {
    base: 'bg-cyan-100',
    hover: 'bg-cyan-200',
    label: 'Organización',
    filter: 'entities'
  },
  Misceláneo: {
    base: 'bg-cyan-100',
    hover: 'bg-cyan-200',
    label: 'Misceláneo',
    filter: 'entities'
  },
  Fecha: {
    base: 'bg-cyan-100',
    hover: 'bg-cyan-200',
    label: 'Fecha',
    filter: 'entities'
  },
  Adjetivo: {
    base: 'bg-purple-100',
    hover: 'bg-purple-200',
    label: 'Adjetivo',
    filter: 'adjectives'
  }
};

const ArticleContent: React.FC<ArticleContentProps> = ({ title, content, author, date, activeFilters,entities, adjectives }) => {
  const processedContent = useMemo(() => {


    let processedText = content.split('\n').map((paragraph) => `<p>${paragraph.trim()}</p>`).join('\n');

    entities?.entities_list.forEach(({type, text: word}) => {
      const regex = new RegExp(`\\b${word}\\b`, "g");
      const tagType = type as keyof typeof tagColors;
      const shouldShow = !activeFilters.includes(tagColors[tagType].filter);

      if (shouldShow) {
        processedText = processedText.replace(
          regex,
          `<span class="relative inline-block peer cursor-pointer tag">
            <span class="relative inline-block text-black transition-opacity ${tagColors[tagType].base} hover:bg-opacity-100 px-1 peer-none:bg-opacity-100 [.tag:hover_&:not(:hover)]:bg-opacity-40">
              ${word}
              <span class="absolute right-0 top-full text-[0.7rem] px-1 opacity-0 group-hover:opacity-100 whitespace-nowrap ${tagColors[tagType].base} z-10">
                ${tagColors[tagType].label}
              </span>
            </span>
          </span>`
        );
      } else {
        processedText = processedText.replace(regex, word);
      }
    });

    Array.isArray(adjectives?.adjectives_list) && adjectives.adjectives_list.forEach((adjective) => {
      const regex = new RegExp(`\\b${adjective.text}\\b`, "g");
      const shouldShow = !activeFilters.includes('adjectives');

      if (shouldShow) {
        processedText = processedText.replace(
          regex,
          `<span class="relative inline-block peer cursor-pointer tag">
            <span class="relative inline-block text-black transition-opacity bg-purple-100 hover:bg-opacity-100 px-1 peer-none:bg-opacity-100 [.tag:hover_&:not(:hover)]:bg-opacity-40">
              ${adjective.text}
              <span class="absolute right-0 top-full text-[0.7rem] px-1 opacity-0 group-hover:opacity-100 whitespace-nowrap bg-purple-100 z-10">
                Adjetivo
              </span>
            </span>
          </span>`
        );
      } else {
        processedText = processedText.replace(regex, adjective.text);
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
      <div className="prose max-w-none" dangerouslySetInnerHTML={{__html:processedContent}}>
      </div>
    </div>
  );
};

export default ArticleContent;
