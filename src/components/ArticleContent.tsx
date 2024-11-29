interface ArticleContentProps {
  title: string;
  content: string;
  author: string;
  date: string;
}

export default function ArticleContent({ title, content, author, date }: ArticleContentProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
        <span>{author}</span>
        <span>{date}</span>
      </div>
      <div className="prose max-w-none">
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}