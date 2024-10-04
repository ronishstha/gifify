import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./pages/Search";

function App() {
  const router = createBrowserRouter([
    {
      path: "/:search?/:page?",
      element: <Search />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
