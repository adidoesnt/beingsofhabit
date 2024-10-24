import { ErrorBoundary } from '@/components/ErrorBoundary'
import { columns } from '@/components/postList/Columns'
import { DataTable } from '@/components/postList/DataTable'
import { apiClient } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback } from 'react'

export const Route = createFileRoute('/_authenticated/_layout/posts/')({
  component: PostListPage,
})

function PostListPage() {
  const fetchPosts = useCallback(async () => {
    try {
      const now = new Date().toISOString()
      const { data: posts } = await apiClient.get(`/posts`)
      if (!posts) throw new Error('No posts returned')
      return posts
    } catch (error) {
      console.error('Failed to fetch posts', error)
    }
  }, [])

  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  if (isPending) return <div>Loading...</div>
  if (error)
    return (
        <ErrorBoundary
            errorMessage={"Unable to fetch posts."}
        />
    );

  return (
    <div className="p-2">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
