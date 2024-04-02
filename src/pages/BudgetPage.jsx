import React from 'react'
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers'
import { useLoaderData } from 'react-router-dom';
import BudgetItem from '../component/BudgetItem';
import AddExpenseForm from '../component/AddExpenseForm';
import Table from '../component/Table';
import { toast } from 'react-toastify';

//loader
export async function budgetLoader({params}) {
  const budget = await  getAllMatchingItems({
    category: "budgets",
    key:"id",
    value:params.id
  }) [0];
  const expenses = await  getAllMatchingItems({
    category: "expenses",
    key:"budgetId",
    value:params.id
  });

  if (!budget) {
    throw new  Error("The budget you're trying to find doesnt exist");
  }

  return { budget, expenses };
}

// action 
export  async function budgetAction({request}) {
    const data = await request.formData();
    const {_action, ...Values} = Object.fromEntries(data)

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
const BudgetPage = () => {
    const {budget, expenses} = useLoaderData()
  return (
    <div className='grid-lg' style={{
        "--accent": budget.color,
    }}>
        {budget.name}
        <h1 className='h2'>
            <span className='accent'>{budget.name}</span>
            Overview
        </h1>
        <div className="flex-lg">
          <BudgetItem budget={budget} showDelete={true}/>
          <AddExpenseForm budgets={[budget]}/>  
        </div>
        {
            expenses && expenses.length > 0 && (
               <div className="grid-md">
                <h2>
                  <span className="accent">{budget.name}</span> Expenses
                </h2>
                <Table expenses={expenses} showBudget={false}/>
               </div> 
            )
        }
        </div>
  )
}

export default BudgetPage