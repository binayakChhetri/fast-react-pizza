import { useFetcher } from "react-router-dom"
import Button from "../../UI/Button"
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({order}) {
    // To write data we do not use fetcher.load, but instead we use a form component that the fetcher provide us.
    const fetcher = useFetcher();
    return (
        <fetcher.Form method='PATCH' className="text-right">
            <Button type="primary">
                Make Priority
            </Button>
        </fetcher.Form>
    )
}

export default UpdateOrder;


// Re-validation => Re-validation basically means that the react-router knows the data has changed as a result of this action.
// So, whenever that happens it will automatically fetch datas in the background and re-render the page.
export async function action({request, params}) {
    const data = {priority:true};
    console.log(data);
    await updateOrder(params.orderId,data);
    return null;
}