import RootLayout from "./Layout/RootLayout";
import { PostListLayout, TodoListLayout, UserListLayout, PostPageLayout, UserPageLayout, NotFound } from "./pages";
import { Navigate, createBrowserRouter, useRouteError } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, ...PostListLayout },
      {
        path: "/posts",
        errorElement: <ErrorPage page={'Posts List'} />,
        children: [
          {
            index: true, ...PostListLayout
          },
          {
            path: ':postId',
            errorElement: <ErrorPage page={'Post'} />,
            ...PostPageLayout
          }
        ]
      },
      {
        path: "/users",
        errorElement: <ErrorPage page={'Users List'} />,
        children: [
          { index: true, ...UserListLayout },
          {
            path: ':userId', ...UserPageLayout
          }
        ]

      },
      {
        path: "/todos",
        errorElement: <ErrorPage page={'Todo List'} />,
        ...TodoListLayout

      },
      {
        path: "*",
        element: <NotFound />

      },
    ]
  },

]);
function ErrorPage({ page }) {
  const error = useRouteError()
  return (
    <>
      <h1>Error - Something went wrong! while loading this {page}</h1>
      {import.meta.env.MODE !== 'production' && (
        <div className="error-container">
          <pre>{error.message}</pre>
          <div className="error-stack-container">
            <pre className="error-stack">{error.stack}</pre>
          </div>
        </div>
      )}
    </>
  )
}
export default router;
