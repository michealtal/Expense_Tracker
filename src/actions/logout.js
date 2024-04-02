import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";


export async function logoutAction() {
// delete function
deleteItem({
    key:"userName"
})
deleteItem({
    key:"budgets"
})
deleteItem({
    key:"expenses"
})
toast.success("You've deleted your account !")
return redirect("/")
}