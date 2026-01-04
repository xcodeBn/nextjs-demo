import Link from 'next/link';
import Image from 'next/image';
import { getAllAuthors, getBooksByAuthorId } from '@/lib/data';
import AuthorsClient from '@/components/AuthorsClient';


export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <AuthorsClient authors={authors} />
  );
}
