import { Skeleton } from '@/components/ui/skeleton'

export default function GeneratorLoading() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-48 w-full" />
          </div>

          <Skeleton className="h-12 w-full" />
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  )
}
