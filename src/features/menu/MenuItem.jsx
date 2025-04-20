import { formatCurrency } from "../../Utlities/helpers";
import Button from "../../UI/Button"
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentQuantityById } from "../cart/CartSlice";
import { DeleteItem } from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";


function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart(e) {
    
  const newItem = {
    pizzaId:id,
    name,
    quantity:1,
    unitPrice,
    totalPrice:unitPrice * 1
  };
  dispatch(addItem(newItem));
}
  return (
    <li className="flex gap-4 justify-start 
    items-start py-2">
      <img className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`} src={imageUrl} alt={name} />
      <div className="flex grow flex-col capitalize pt-0.5" >
        <p className="text-stone-900 font-medium">{name}</p>
        <p className="italic text-sm text-stone-500">{ingredients.join(", ")}</p>
        <div className="flex justify-between items-end">
          {!soldOut ? <p className=" text-sm">{formatCurrency(unitPrice)}</p> : <p className="uppercase font-medium text-stone-500">Sold out</p>}
        
          {isInCart &&
           <div className="flex items-center gap-3 sm:gap-8">
            <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/>
            <DeleteItem pizzaId={id}/> 
          </div>}
         {!soldOut && !isInCart && (<Button type = "small" onClick={handleAddToCart}>ADD TO CART</Button>)} 
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
