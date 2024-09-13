import { Link } from "react-router-dom";
import SearchOrder from "../features/order/Search";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="bg-yellow-400 uppercase px-4 py-3 sm:px-6 border-b 
    border-stone-200 flex items-center justify-between">
    
    
      <Link to="./" className="tracking-[5px]">Fast React Pizza Co.</Link>
      <SearchOrder />
      <Username/>
    </header>
  );
}

export default Header;
