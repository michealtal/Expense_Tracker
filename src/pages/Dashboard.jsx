import React from 'react'
import { Link, NavLink, useLoaderData } from 'react-router-dom'
import { createBudget, createExpense, deleteItem, fetchData, wait } from '../helpers'
import Intro from '../component/Intro';
import { toast } from 'react-toastify';
import AddBudgetForm from '../component/AddBudgetForm';
import AddExpenseForm from '../component/AddExpenseForm';
import BudgetItem from '../component/BudgetItem';
import Table from '../component/Table';

//loader
export function dashboardLoader (){
   const userName = fetchData("userName");
   const budgets = fetchData("budgets");
   const expenses = fetchData("expenses")
   return{ userName,budgets, expenses}
}

export async function dashboardAction({request}) {
  await  wait()
  const data = await request.formData();
  const {_action, ...Values} =  Object.fromEntries(data)

  if (_action === "newUser" ) {
    
    try {
     localStorage.setItem("userName", JSON.stringify(Values.userName))
   
     return toast.success(`Welcome ${Values. userName}`)
    } catch (error) {
      throw new Error(" There was an error  creating your account")
    }
  }
  if (_action === "createBudget" ) {
    try {
      // create budget
      createBudget({
        name: Values.newBudget,
        amount: Values.newBudgetAmount,
    })

      return toast.success("Budget Created");
    } catch (e){
         throw new Error("There was a problem creating your budget")
    }
  }
  if (_action === "createExpense" ) {
    try {
      // create expense
      createExpense({
        name:Values.newExpense,
        amount:Values.newExpenseAmount,
        budgetId: Values.newExpenseBudget,
      })

      return toast.success(`Expense ${Values.newExpense} Created`);
    } catch (e){
         throw new Error("There was a problem creating your Expense")
    }
  }
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
const Dashboard = () => {
 const {userName, budgets,expenses} = useLoaderData()
  return (
    <>
      
         {userName ? (
         <div className='dashboard'>
          <h1>Welcome back, <span className='accent'>{userName}</span></h1>
         <div className='grid-sm'>
         {
          budgets && budgets.length > 0 ? (
           <div className='grid-lg'>
            <div className='flex-lg'>
            <AddBudgetForm />
               <AddExpenseForm  budgets={budgets}/>
           </div>
            <h2>Existing Budget</h2>
            <div className="budgets">
              {
                budgets.map((budget) =>(
                  <BudgetItem key={budget.id} budget={budget} />
                ))
              }
            </div>
              {
               expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table expenses={expenses.sort((a,b) => b.createdAt - a.createdAt
                      ).slice(0,8)
                      }
                      />
                      {expenses.length > 8 && (
                        <Link to="expenses" className='btn btn--dark'>
                        View all expenses
                        </Link>
                      )} 
                  </div>
               )
              }
           </div>
          ):(
            <div className="grid-sm">
              <p>Personal  budgeting is the secret to finincial freedom</p>
              <p>Create a budget to get started </p>
              <AddBudgetForm />
            </div>
          )
       }
         </div>
         </div>) : <Intro />}
        </>
  )
}

export default Dashboard