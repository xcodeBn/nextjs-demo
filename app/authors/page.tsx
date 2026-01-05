import Link from 'next/link';
import Image from 'next/image';
import { getAllAuthorsAsync, getBooksByAuthorId } from '@/lib/data';
import AuthorsClient from '@/components/AuthorsClient';


export default async function AuthorsPage() {
  const authors = await getAllAuthorsAsync();

  return (
    <AuthorsClient authors={authors} />
  );
}
