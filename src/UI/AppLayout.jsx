import { Outlet, useNavigation } from "react-router";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";
function AppLayout() {
  // With useNavigation, we can know whether the data we are fetching have loaded or not
  // With the help of  it we can display loader if the data is being currently fetched
  // This navigation state is universal for the entire application.
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      
      <Header />
      <div className="overflow-scroll ">
        <main className="max-w-3xl mx-auto">
          {/* Rendering routes inside another route . It is done by using 
          the outlet component provided by react router*/}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
