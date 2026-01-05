import { getAllBooksAsync, getAllAuthorsAsync } from '@/lib/data';
import BooksClient from '@/components/BooksClient';

export default async function BooksPage() {

  const [books, authors] = await Promise.all([
  getAllBooksAsync(),
  getAllAuthorsAsync(),
]);

  return <BooksClient initialBooks={books} authors={authors} />;
}
