import { getAllBooksAsync, getAllAuthorsAsync } from '@/lib/data';
import BooksClient from '@/components/BooksClient';

export default async function BooksPage() {
  const books = await getAllBooksAsync();
  const authors = await getAllAuthorsAsync();

  return <BooksClient initialBooks={books} authors={authors} />;
}
