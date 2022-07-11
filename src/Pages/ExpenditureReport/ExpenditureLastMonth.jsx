import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Delete, Post, Update } from '../../Adapters/xhr';
import { UserContext } from '../../App';
import MUIDialog from '../../components/Dailog/MUIDialog';
import DataTable from '../../components/DataTable/MUITable';
import UpdateSpentMoney from '../SpentMoney/UpdateSpentMoney';

export default function ExpenditureLastMonth() {

  const [allspents, setAllspents] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [updateData, setUpdateData] = useState(null)

  const getAllExpenseItems = async() => {
    try {
      const response = await Post("spent",{token: loggedInUser.user_token})
      console.log("log:", response)

      if(!response.data == false){        
        const todaysData = [];
  
        response.data.map(data => {
          const date = data.created_date;
          const createdDate = new Date(date).getMonth();
          const today = new Date()
          const lastMonthDate = today.setMonth(today.getMonth()-1);
          const lastMonth = new Date(lastMonthDate).getMonth()
  
          console.log("created: ", createdDate, "today: ", lastMonth)
          if(createdDate == lastMonth){
            todaysData.push({...data, item_name: data?.item?.item_name || data?.item_name});
          }
        })
        setAllspents(todaysData)
      }
      setLoading(false)
    } catch (error) {
      // toast.warn("Try Again")
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllExpenseItems()
  }, [open])

  const columns = [
    { field: 'item_name', title: 'Item Name', width: 70 },
    { field: 'description', title: 'Description', width: 70 },
    { field: 'cost_price', title: 'Amount', width: 70 },
    { field: 'unit', title: 'Units', width: 70 },
    { field: 'date_time', title: 'Date/Time', width: 70 },
]



const handleEdit = async(rowData) => {
  console.log("hit")
  await Swal.fire({
    title: `Edit spent`,
    html:
      `<input id="item_name" class="swal2-input" value="${rowData.item_name}">` +
      `<input id="description" class="swal2-input" value="${rowData.description}">` +
      `<input id="unit" class="swal2-input" value="${rowData.unit}">`+
      `<input id="cost_price" class="swal2-input" value="${rowData.cost_price}">`+
      `<input id="date_time" class="swal2-input" value="${rowData.date_time}">`,
    focusConfirm: false,
    preConfirm: async() => {
        const item_name = document.getElementById('item_name').value
        const description = document.getElementById('description').value
        const cost_price = document.getElementById('cost_price').value
        const unit = document.getElementById('unit').value
        const date_time = document.getElementById('date_time').value

        try {
          const updatedResult = await Update(`spent/updatespent/${rowData._id}`, {item_name, description, cost_price, unit, date_time})
          console.log("updated result :", updatedResult)
          setAllspents(updatedResult.data)
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


          Delete(`spent/deleteSpent/${rowData._id}`).then(result => {
            setAllspents(result.data)
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
      <DataTable loading={loading} tableTitle="Last Month Expenditure" columns={columns} rows={allspents} handleEdit={(rowData) => {setUpdateData(rowData); setOpen(true)}} handleDelete={handleDelete}/>
      <MUIDialog open={open} setOpen={setOpen} content={<UpdateSpentMoney updateData={updateData} setOpen={setOpen}/>}/>
    </div>
  )
}
