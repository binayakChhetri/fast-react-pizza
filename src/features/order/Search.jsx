import { useState } from "react";
import { useNavigate } from "react-router";

function SearchOrder() {
  const [query, setquery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    // This will navigate to the order/orderID page if it exists
    navigate(`/order/${query}`);
    setquery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Order #"
        value={query}
        onChange={(e) => {
          setquery(e.target.value);
        }}
        className="w-28 rounded-full 
        px-4 py-2 text-sm placeholder:text-stone-400 font-semibold tracking-wider
      bg-yellow-100 
        focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50  
        transition-all duration-300
        sm:focus:w-72 sm:w-64"
      ></input>
    </form>
  );
}

export default SearchOrder;
