
import {  useSelector } from "react-redux";
import { formatCurrency } from "../../Utlities/helpers";
import { DeleteItem } from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./CartSlice";



function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currQuantity = useSelector(getCurrentQuantityById(pizzaId));

  
  return (
    <li className="sm:flex sm:justify-between sm:items-center py-3">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity = {currQuantity}/>
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
