import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPublisherByIdAsync, getBooksByPublisherId, getAuthorById } from '@/lib/data';
import BookCard from '@/components/BookCard';

interface PublisherPageProps {
  params: Promise<{ id: string }>;
}

export default async function PublisherPage({ params }: PublisherPageProps) {
  const { id } = await params;
  const publisher = await getPublisherByIdAsync(parseInt(id));

  if (!publisher) {
    notFound();
  }

  const publisherBooks = getBooksByPublisherId(publisher.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/publishers" 
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-8 inline-block"
      >
        ← Back to Publishers
      </Link>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-8 mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {publisher.name}
        </h1>
        <div className="flex flex-wrap gap-4 text-zinc-600 dark:text-zinc-400 mb-6">
          <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
             {publisher.location}
          </span>
          <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
             Founded {publisher.foundedYear}
          </span>
          <a 
            href={publisher.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full hover:underline"
          >
             Official Website 
          </a>
        </div>
        
        <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
          {publisher.description}
        </p>
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        Books Published by {publisher.name}
      </h2>

      {publisherBooks.length === 0 ? (
        <p className="text-zinc-500 italic">No books found for this publisher.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publisherBooks.map((book) => {
            const author = getAuthorById(book.authorId);
            return (
              <BookCard 
                key={book.id} 
                book={book} 
                authorName={author?.name || 'Unknown Author'} 
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
