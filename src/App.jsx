import { createBrowserRouter, RouterProvider } from "react-router-dom";
//library import
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import MainPage, {MainLoader} from "./layout/Main";
//action
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainPage />,
    errorElement:<Error/>,
    loader:MainLoader,
    children:[

      {
        index:true,
        element:<Dashboard />,
        errorElement:<Error/>,
        loader:dashboardLoader,
        action:dashboardAction,
      },
      {
        path:"budget/:id",
        element:<BudgetPage />,
        loader:budgetLoader,
        action:budgetAction,
        errorElement:<Error/>,
        children: [
          {
            path:"delete",
            action: deleteBudget,
          }
        ]
      },
      {
        path:"expenses",
        element:<ExpensesPage />,
        loader:expensesLoader,
        action:expensesAction,
        errorElement:<Error/>
      },
      {
        path:'logout',
        action:logoutAction,
      }
    ]
  },
])
function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App;
