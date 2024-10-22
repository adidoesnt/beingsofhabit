import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: EditPostPage,
})

function EditPostPage() {
  const { postId } = Route.useParams()

  return (
    <div className="p-2">
      <h3>Edit Post Page: {postId}</h3>
    </div>
  )
}
