import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Search from "./pages/Search";
import { ThemeProvider } from "next-themes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/gifs/:page?",
      element: <Search />,
    },
    {
      path: "/stickers/:page?",
      element: <Search />,
    },
    {
      path: "/gifs/search/:search?/:page?",
      element: <Search />,
    },
    {
      path: "/stickers/search/:search?/:page?",
      element: <Search />,
    },
    {
      path: "*",
      element: <Navigate to="/gifs" replace />,
    },
  ]);

  return (
    <ThemeProvider attribute="class">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
