import React from 'react';

interface ArticleContentProps {
  title: string;
  content: string;
  author: string;
  date: string;
  activeFilters: string[];
  entities?: { text: string; type: string; start_char: number; end_char: number }[];
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
  }
};

const ArticleContent: React.FC<ArticleContentProps> = ({ title, content, author, date, activeFilters, entities = [] }) => {
  const highlightText = (text: string, highlights: { text: string; type: string; start_char: number; end_char: number }[]) => {
    let highlightedText = text;
    if (!Array.isArray(highlights)) {
      return text;
    }
    highlights.forEach(highlight => {
      const highlightText = text.substring(highlight.start_char, highlight.end_char);
      const tagType = highlight.type as keyof typeof tagColors;
      if (tagColors[tagType]) {
        const highlightedEntity = `
          <span class="relative inline-block group cursor-pointer">
            <span class="relative inline-block text-black">
              <span class="absolute inset-0 transition-all duration-200 ${tagColors[tagType].base} group-hover:${tagColors[tagType].hover}"></span>
              <span class="relative px-1">${highlightText}</span>
              <span class="absolute right-0 top-full text-[0.7rem] px-1 opacity-0 group-hover:opacity-100 whitespace-nowrap ${tagColors[tagType].base}">
                ${tagColors[tagType].label}
              </span>
            </span>
          </span>`;
        highlightedText = highlightedText.replace(new RegExp(`\\b${highlightText}\\b`, 'g'), highlightedEntity);
      }
    });
    return highlightedText;
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{author}</p>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: highlightText(content, entities) }} />
    </div>
  );
};

export default ArticleContent;