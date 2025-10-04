import { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchComponent } from '@/components/search'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Search - Hon. Samuel Okudzeto Ablakwa',
  description: 'Search through news, speeches, media and content from Hon. Samuel Okudzeto Ablakwa.',
}

function SearchFallback() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-12 w-full" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Search</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find news articles, speeches, reports, and media content from the office of 
            Hon. Samuel Okudzeto Ablakwa, Minister for Foreign Affairs.
          </p>
        </div>
        
        <Suspense fallback={<SearchFallback />}>
          <SearchComponent />
        </Suspense>
      </div>
    </div>
  )
} 