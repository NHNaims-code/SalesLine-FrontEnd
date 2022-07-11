import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Delete, Post, Update } from '../../Adapters/xhr';
import { UserContext } from '../../App';
import MUIDialog from '../../components/Dailog/MUIDialog';
import DataTable from '../../components/DataTable/MUITable';
import UpdateExpenseItem from '../AddExpense/UpdateExpenseItem';

export default function AllExpenseItems() {

  const [allExpenseItems, setAllExpenseItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [open, setOpen] = useState(false)
  const [updateData, setUpdateData] = useState(null)

  const [loading, setLoading] = useState(true)

  const getAllExpenseItems = async() => {
    try {
      const response = await Post("expenseItem",{token: loggedInUser.token})
      console.log("log:", response)
      if(!response.data == false){        
        setAllExpenseItems(response.data)
      }
      setLoading(false)
    } catch (error) {
      toast.warn("Try Again")
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllExpenseItems()
  }, [open])

  const columns = [
      { field: 'item_name', title: 'Item Name', width: 70 },
      { field: 'description', title: 'Description', width: 70 },
      { field: 'amount', title: 'Amount', width: 70 }
  ]


  const handleEdit = async(rowData) => {
    console.log("hit")
    await Swal.fire({
      title: `Edit ExpenseItem`,
      html:
        `<input id="item_name" class="swal2-input" value="${rowData.item_name}">` +
        `<input id="description" class="swal2-input" value="${rowData.description}">` +
        `<input id="amount" class="swal2-input" value="${rowData.amount}">`,
      focusConfirm: false,
      preConfirm: async() => {
          const item_name = document.getElementById('item_name').value
          const description = document.getElementById('description').value
          const amount = document.getElementById('amount').value

          console.log("result : ", {item_name, description, amount})
          try {
            const updatedResult = await Update(`expenseItem/updateExpenseItem/${rowData._id}`, {item_name, description, amount})
            console.log("updated result :", updatedResult)
            setAllExpenseItems(updatedResult.data)
          } catch (error) {
            toast.warn('Try Again!')
          }
      }
    })
  }

  const handleDelete = async(rowData) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {


          Delete(`expenseItem/deleteExpenseItem/${rowData._id}`).then(result => {
            setAllExpenseItems(result.data)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }).catch(err => {
            toast.warn("Try Again!")
          })         
        
      }
    })
  }
  
  return (
    <div>
      <DataTable loading={loading} tableTitle="All Expense Items" columns={columns} rows={allExpenseItems} handleEdit={(row)=>{setOpen(true); setUpdateData(row)}} handleDelete={handleDelete}/>
      <MUIDialog open={open} setOpen={setOpen} content={<UpdateExpenseItem updateData={updateData} setOpen={setOpen}/>}/>

    </div>
  )
}
