import  React,{ useState } from 'react';
import './App.css';
import { Alert } from './component/Alert';
import { ExpenseForm } from './component/ExpenseForm';
import ExpenseList from './component/ExpenseList';
import uuid from 'uuid/v4';
import { MdEdit } from 'react-icons/md';


const initialExpense = [
  { id:uuid(), charge: "rent", amount:1600 },
  { id:uuid(), charge: "car payment", amount:400 },
  { id:uuid(), charge: "credit card bill", amount:1200 }
];
function App() { 
  // ***************** state values ***************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpense)
  // single expense
  const [charge, setCharge] = useState('')
  // console.log("charge"+charge);
  // console.log("setcharge"+setCharge);
  
  // edit
  const [edit, setEdit] = useState(false)
    
  //edit item
  const [id, setId] = useState(0)
  // single amount
  const [amount, setAmount] = useState('')
  // console.log("amount"+amount);

  //alert
  const [alert,setAlert] = useState({show:false})
  
  //***************** functionality ************** */
  const handleCharge = e =>{
    // console.log(`charge : ${e.target.value}`)
    setCharge(e.target.value)
  }

  const handleAmount = e =>{
    // console.log(`amount : ${e.target.value}`)
    setAmount(e.target.value)
  }
  // **********handle alert **********
  const handleAlert = ({type,text}) => {
    setAlert({show:true,type,text})
    setTimeout(()=>{
      setAlert({show:false})
    },3000)
  }
  // ********handle submit*********** 
  const handleSubmit = e => {
    e.preventDefault()  
       // console.log(charge, amount);
    if (charge !=='' && amount > 0){
      if(edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id?{...item,charge,amount}
          :item
        })
        setExpenses(tempExpenses)
        setEdit(false)
        handleAlert({ type: "success", text:"item edited" })
      }
      else {
        const singleExpense = {id:uuid(), charge,amount}
        // setExpenses([...expenses, singleExpense])
        initialExpense = [...initialExpense,singleExpense]
        handleAlert({ type: "success", text:"item added" })
      }

     
      setCharge("")
      setAmount("")
     
      
      
    }
    else{
      handleAlert({ type: "danger", text:"charge cann't be empty value and amount value has to be bigger than zero" })
        }   
  }
  // clear all items
  const clearItems = () => {
    setExpenses([])
    handleAlert({ type: "danger", text: "all item deleted" })
  }



  // handle delete
  const handleDelete = id => {
    // console.log(`item deleted : ${id}`)
    let tempExpenses = expenses.filter(item => item.id !== id)
    setExpenses(tempExpenses)
    handleAlert({ type:"danger", text:"item deleted" })

  }
// handle Edit
  const handleEdit = id => {
    // console.log(`item edited : ${id}`);       
    let expense = expenses.find(item => item.id === id)
    console.log(expense);
    let {charge, amount} = expense       
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
    
  }
  
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text} />}
    
    <h1>budget calculator</h1>
    <main className="App">
    <ExpenseForm charge={charge} amount={amount} 
      handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit} edit={edit}

    />
    <ExpenseList expenses={expenses} charge={charge} clearItems={clearItems} 
      handleDelete={handleDelete} handleEdit={handleEdit}
    />
    </main>
    <h1>
      total spending : {" "}
      <span className="total">
        $ {expenses.reduce((acc,curr)=>{
          return (acc += parseInt(curr.amount))
        },0)}
      </span>
    </h1>
    </>

  );
}

export default App;
