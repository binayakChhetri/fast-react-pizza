import Home from "./UI/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Order, { loader as orderLoader } from "./features/order/Order";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Error from "./UI/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import {action as updateOrderAction} from "./features/order/UpdateOrder"
// createBrowserRouter -> This is a function where we define our routes
// In createBrowserRouter function we pass an array of objects where each object is one route

// This type of routing is necessary in react router 6.4 inorder to enable data fetching or data loading
// with react router

//  The old way still works but with it we can't fetch data or submit datas through forms
const router = createBrowserRouter([
  {
    //This provides layout to the application. Therefore we don't need to provide path in this
    // It is called layout route in react since it doesn' have path
    element: <AppLayout />,

    // This error component will be rendered if we navigate to the path that does not exists
    errorElement: <Error />,

    // Note;:- Each of the errors will bubbled up to the parent route, unless it is handled in the route itself

    //We define nested route using the given code below
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        // Step 2: Providing the loader to the route
        loader: menuLoader,
        // Here if the errors happens in this route, it won't bubble up in the parent route.
        // Because it is handled in the route itself
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        // Step 2: Providing the loader to the route
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action:updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
