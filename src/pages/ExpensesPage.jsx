import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { deleteItem, fetchData } from '../helpers'
import Table from '../component/Table'
import { toast } from 'react-toastify'

export async function expensesLoader (){
    // const userName = fetchData("userName");
    // const budgets = fetchData("budgets");
    const expenses = await fetchData("expenses")
    return{ expenses}
 }

 //  action 
 export  async function expensesAction({request}) {
   const data = await request.formData();
   const {_action, ...Values} = Object.fromEntries(data)
   if (_action === "deleteExpense" ) {
      try {
        // create expense
        deleteItem({
         key:"expenses",
         id:Values.expenseId
        })
  
        return toast.success("Expense deleted");
      } catch (e){
           throw new Error("There was a problem deleting your Expense")
      }
    }
 }

const ExpensesPage = () => {
    const  {expenses} = useLoaderData()
  return (
    <div className='grid-lg'>
       <h1>All Expenses</h1> 
       {
        expenses && expenses.length > 0 ? (
         <div className="grid-md">
            <h2> Recent Expenses <small>({expenses.length} total)</small></h2>
            <Table expenses={expenses} />
         </div>
        ): <p>No Expenses</p>
       }
    </div>
  )
}

export default ExpensesPage