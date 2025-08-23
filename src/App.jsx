import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthRegister from "./pages/AuthRegister";
import AuthLogin from "./pages/AuthLogin";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CheckAuth />
    },
    {
      path: "/auth",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>
      ),
      children: [
        {
          path: "register",
          element: <AuthRegister />
        },
        { path: "login", element: <AuthLogin /> }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
