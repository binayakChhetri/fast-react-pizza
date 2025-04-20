import { getOrder } from "../../services/apiRestaurant";
import { useFetcher, useLoaderData } from "react-router-dom";
import OrderItem from "./OrderItem"

// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../Utlities/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

/* const order = {
  id: "ABCDEF",
  customer: "Jonas",
  phone: "123456789",
  address: "Arroios, Lisbon , Portugal",
  priority: true,
  estimatedDelivery: "2027-04-25T10:00:00",
  cart: [
    {
      pizzaId: 7,
      name: "Napoli",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      pizzaId: 5,
      name: "Diavola",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      pizzaId: 3,
      name: "Romana",
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    },
  ],
  position: "-9.000,38.000",
  orderPrice: 95,
  priorityPrice: 19,
}; */

function Order() {
  // Step 3: Provide data to the page
  // We use useLoaderData() hook for that. Its available in the react router by default
  const order = useLoaderData();

  // Here, we'll get the datas from the another route i.e menu route without the need 
  // of user going there.
  // For this we'll use the "useFetcher" hook.
  const fetcher = useFetcher();

  // Right after this component(Order) mounts, we want to fetch the menu data.
  useEffect(function(){
    // This will basically load the data from the menu and store in this fetcher object.
    // Then we can retrive the data when we want.

    // Just like normal page navigation, this fetcher can also be in different state.
    // By default the fetcher is in "idle" state.
    if (!fetcher.data && fetcher.state === "idle") fetcher.load('/menu');
    },
    [fetcher]
  ); 
  const pizzas = fetcher.data;

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff.
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex justify-between items-center gap-2 flex-wrap font-semibold">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2 uppercase text-sm">
          {priority && <span className="bg-red-500 text-red-50 px-3 py-1 rounded-full tracking-wide">Priority</span>}
          <span className="bg-green-500 text-green-50 px-3 py-1 rounded-full tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) =>
           (<OrderItem 
           item={item} 
           key={item.pizzaId}
           ingredients={fetcher.data?.find
            (pizza => pizza.id === item.pizzaId)?.ingredients ?? []}
           isLoadingIngredients={fetcher.state === "loading"}
           />))}

      </ul>


      <div className="space-y-2 px-6 py-5 bg-stone-200">
        <p className="text-sm font-medium text-stone-600" >Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-nold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order}/>}
    </div>
  );
}

// Step 1: Create a loader
export async function loader({ params }) {
  // We can get the params with the help of React Router
  // Therefore, we don't need to use the useParams hook as it can only be used inside of the component since its a hook
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
