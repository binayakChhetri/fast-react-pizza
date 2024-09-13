import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // Step 3: Provide data to the page
  // We use useLoaderData() hook for that. Its available in the react router by default
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2" >
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}
// Step 1: Create a loader
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
