import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart"
import store from "../../Store";
import { formatCurrency } from "../../Utlities/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Getting the cart price
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch();

  const {
    username, 
    status:addressStatus,
    position, 
    address, 
    error:errorAddress
  }  = useSelector(state => state.user);

  const isLoadingAddress = addressStatus === "loading";


  // Storing the result of the action function
  const formErrors = useActionData();


  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart/>
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      {/* 
        No need to write the path i.e "/order/new" for the action because React will simply match the closest route 
        Totally fine even if we enter the path for the action
      */}
      {/* This form is the react router form */}
      <Form method="POST" >
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow"   
            type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full"   
            type="tel" name="phone" required />
            {formErrors?.phone && <p className="mt-2 text-xs bg-red-100 text-red-700 p-2 rounded-md">{formErrors.phone}</p>}
          </div>
        
      
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center bg-slate-60 relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input 
            className="input w-full"  
            type="text" 
            name="address" 
            defaultValue={address}
            disabled={isLoadingAddress}
            required 
            />
            {addressStatus === 'error' && 
            <p className="mt-2 text-xs bg-red-100 text-red-700 p-2 rounded-md">
              {errorAddress}
            </p>}

          </div>

          {!position.latitude && !position.longitude && 
          <span className="absolute right-[5px] top-[35px] md:right-[5px] md:top-[5px] z-50">            
            <Button 
            type="small" 
            disabled={isLoadingAddress} 
            onClick={(e) =>{
              e.preventDefault(); 
              dispatch(fetchAddress());
            }}>
              Get position
            </Button>
          </span> }           
        </div>

        <div className="flex items-center gap-5  mb-12">
          <input
          className="h-6 w-6 accent-yellow-400 
          focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to give your order priority?</label>
        </div>

        <div >
          {/* Below code allows us to get data into the action without it being a form field  */}
          {/* When we submit the form, the cart data will also be there */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" 
          value={ 
            position.latitude && position.longitude ?
            `${position.latitude}, ${position.longitude}` : 
            ''
            } />
          <Button disabled={isSubmitting || isSubmitting} type="primary">
            {isSubmitting ? "Placing order......" : `Order now for ${formatCurrency (totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}



// Whenever the form will be submitted, behind the scenes, React Router will then call
// this action function and it will pass in the request that was submitted.

export async function action({ request }) {
  // This is just a regular web API.
  // formData is provided by the browser

  //In short, below 2 lines code are simply used to get the data from the form
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  // Clearing the cart after making the order
  // We can't do this because the dispatch hook can only be called inside of a component,but this is not a component.
  // const dispatch = useDispatch();
  // dispatch(clearCart);


  // Instead we'll directly import the store object into this function. 
  // However, this practice should not be over-used, as it will bring performance issue.
  // On the store object, we'll call the dispatch function for clearing the cart.
  store.dispatch(clearCart()); // Do not overuse


  // Handling the errors in form actions
  const errors = {};
  if (!isValidPhone(data.phone))
    errors.phone =
      "Please give us your correct phone number. We need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect.
  const newOrder = await createOrder(order);
  // "redirect" -> another function that is provided by the react router, which will basically create a new response/request
  return redirect(`/order/${newOrder.id}`);

  // return null;
}

export default CreateOrder;
