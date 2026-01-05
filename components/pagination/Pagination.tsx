'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  resultName?:string ;
}

export default function Pagination({ totalItems, itemsPerPage=3,resultName = 'result' }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const btnStyle = {
    className: "px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
  }
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of <span className="font-medium">{totalItems}</span> {resultName}
      </p>
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            {...btnStyle}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-zinc-900 dark:text-zinc-50">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            {...btnStyle}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}