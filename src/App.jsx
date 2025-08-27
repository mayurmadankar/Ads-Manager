import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthRegister from "./pages/auth/AuthRegister";
import AuthLogin from "./pages/auth/AuthLogin";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/auth/AuthLayout";
import Dashboard from "./pages/user-view/Dashboard";
import AdsLayout from "./components/ads-view/AdsLayout";

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
    },
    {
      path: "/ads",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated}>
          <AdsLayout />
        </CheckAuth>
      ),
      children: [
        {
          path: "dashboard",
          element: <Dashboard />
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
