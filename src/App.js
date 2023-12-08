import Home from "./Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root";
import Details from "./Details";
import NotFound from "./NotFound";
import ErrorComponent from "./ErrorComponent";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorComponent />}>
        <Route index element={<Home />} />
        <Route path="/details/:nameParameter" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
