import { createFileRoute, redirect } from "@tanstack/react-router";

// TODO: get authenticated state from context
const isAuthenticated = () => true;

export const Route = createFileRoute("/posts/")({
  component: PostListPage,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/",
        // search: {
        //   redirect: location.href,
        // },
      });
    }
  },
});

function PostListPage() {
  return (
    <div className="p-2">
      <h3>Post List Page</h3>
    </div>
  );
}
