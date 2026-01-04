'use client';


import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import Pagination from './pagination/Pagination';
import { Publisher } from '@/lib/data';
interface PublishersClientProps {
  initialPublishers: Publisher[];
}

type SortKey = 'name' | 'location' | 'foundedYear';
type SortOrder = 'asc' | 'desc';

export default function PublishersClient({ initialPublishers }: PublishersClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 5;

  // Handle sorting logic
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // Filter and Sort publishers
  const filteredAndSortedPublishers = useMemo(() => {
    const result = initialPublishers.filter(pub =>
      pub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [initialPublishers, searchQuery, sortKey, sortOrder]);

  const paginatedPublishers = filteredAndSortedPublishers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (query: string) => {
    if (query === searchQuery) return;
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        Publishers
      </h1>

      <SearchBar onSearch={handleSearch} placeholder="Filter by name or location..." />

      <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-lg shadow-md mt-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <th 
                className="px-6 py-4 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                onClick={() => handleSort('name')}
              >
                Name <SortIcon column="name" currentSortKey={sortKey} sortOrder={sortOrder} />
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                onClick={() => handleSort('location')}
              >
                Location <SortIcon column="location" currentSortKey={sortKey} sortOrder={sortOrder} />
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                onClick={() => handleSort('foundedYear')}
              >
                Founded <SortIcon column="foundedYear" currentSortKey={sortKey} sortOrder={sortOrder} />
              </th>
              <th className="px-6 py-4">Website</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {paginatedPublishers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                  No publishers found.
                </td>
              </tr>
            ) : (
              paginatedPublishers.map((pub) => (
                <tr key={pub.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-50">
                    {pub.name}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {pub.location}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {pub.foundedYear}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    <a 
                      href={pub.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Visit site
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/publishers/${pub.id}`}
                      className="text-zinc-900 dark:text-zinc-50 font-medium hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination 
        totalItems={filteredAndSortedPublishers.length} 
        itemsPerPage={itemsPerPage} 
      />
    </div>
  );
}

function SortIcon({ column, currentSortKey, sortOrder }: { column: SortKey; currentSortKey: SortKey; sortOrder: SortOrder }) {
  if (currentSortKey !== column) return <span className="ml-1 opacity-20">↕</span>;
  return sortOrder === 'asc' ? <span className="ml-1">↑</span> : <span className="ml-1">↓</span>;
}
