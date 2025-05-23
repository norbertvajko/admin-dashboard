import { Skeleton } from "@/components/ui/skeleton";

export const AdminMainViewSkeleton = () => {
  return (
    <div className="space-y-8 p-4 lg:p-4">
      {/* SectionCards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-44 w-full rounded-2xl" />
        ))}
      </div>

      {/* ChartAreaInteractive Skeleton */}
      <Skeleton className="h-[400px] w-full rounded-2xl" />

      {/* DataTable Skeleton */}
      <div className="space-y-3">
        {/* Table Header */}
        <Skeleton className="h-12 w-full rounded-xl" />
        {/* Table Rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};
