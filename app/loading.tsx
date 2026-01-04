const SkeletonBox = ({ className = "" }) => (
    <div className={`bg-zinc-200 dark:bg-zinc-800 rounded ${className}`}></div>
);

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
            {/* Title Skeleton */}
            <SkeletonBox className="h-10 w-48 mb-8" />

            {/* Search Bar Skeleton */}
            <SkeletonBox className="h-12 w-full rounded-lg mb-8" />

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-zinc-900 rounded-lg h-96 shadow-sm border border-zinc-200 dark:border-zinc-800"
                    >
                        <SkeletonBox className="h-64 rounded-t-lg" />
                        <div className="p-6 space-y-4">
                            <SkeletonBox className="h-6 w-3/4" />
                            <SkeletonBox className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}