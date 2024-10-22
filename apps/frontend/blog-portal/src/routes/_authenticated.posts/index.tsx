import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/posts/')({
  component: PostListPage,
})

function PostListPage() {
  return (
    <div className="p-2">
      <h3>Post List Page</h3>
    </div>
  )
}
