import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./pages/Search";
import { ThemeProvider } from "next-themes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/:search?/:page?",
      element: <Search />,
    },
  ]);

  return (
    <ThemeProvider attribute="class">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
