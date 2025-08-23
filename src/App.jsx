import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthRegister from "./pages/AuthRegister";
import AuthLogin from "./pages/AuthLogin";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/auth/AuthLayout";

function App() {
  const isAuthenticated = false;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CheckAuth isAuthenticated={isAuthenticated} />
    },
    {
      path: "/auth",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated}>
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
