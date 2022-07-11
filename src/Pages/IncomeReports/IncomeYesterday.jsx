import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Delete, Post, Update } from '../../Adapters/xhr';
import { UserContext } from '../../App';
import MUIDialog from '../../components/Dailog/MUIDialog';
import DataTable from '../../components/DataTable/MUITable';
import UpdatePayment from '../AddPayment/UpdatePayment';

export default function IncomeYesterday() {

  const [allpayment, setallpayment] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [updateData, setUpdateData] = useState(null)

  const getallpayment = async() => {
    try {
      const response = await Post("payment",{token: loggedInUser.user_token})
      console.log("log:", response)

      if(!response.data == false){                
        const todaysData = [];
  
        response.data.map(data => {
          const date = data.created_date;
          const createdDate = new Date(date).getDate();
          const today = new Date()
          const yesterday = today.setDate(today.getDate()-1);
  
          console.log("created: ", createdDate, "today: ", yesterday)
          if(createdDate == new Date(yesterday).getDate()){
            console.log("push: ", {...data, customer: data?.customer?.customer_name, product_name: data?.product?.name})
            todaysData.push({...data, customer: data?.customer?.customer_name, product_name: data?.product?.name});
          }
        })
        setallpayment(todaysData)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.warn("Try Again")
      setLoading(false)
    }
  }

  useEffect(() => {
    getallpayment()
  }, [open])

  const columns = [
      { field: 'product_name', title: 'Name', width: 70 },
      { field: 'amount', title: 'Amount', width: 70 },
      { field: 'customer', title: 'Customer', width: 70 },
      { field: 'note', title: 'Notes', width: 70 },
      { field: 'invoice_no', title: 'Invoice No.', width: 70 }
  ]


  const handleEdit = async(rowData) => {
    console.log("hit")
    await Swal.fire({
      title: `Edit payment`,
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
            const updatedResult = await Update(`payment/updatepayment/${rowData._id}`, {item_name, description, cost_price, unit, date_time})
            console.log("updated result :", updatedResult)
            setallpayment(updatedResult.data)
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


          Delete(`payment/deletepayment/${rowData._id}`).then(result => {
            setallpayment(result.data)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }).catch(err => {
            console.log(err)
            toast.warn("Try Again!")
          })         
        
      }
    })
  }
  
  return (
    <div>
      <DataTable loading={loading} tableTitle="Yesterday Income" columns={columns} rows={allpayment} handleEdit={(rowData) => {setUpdateData(rowData); setOpen(true)}} handleDelete={handleDelete}/>
      <MUIDialog open={open} setOpen={setOpen} content={<UpdatePayment updateData={updateData} setOpen={setOpen}/>}/>
      
    </div>
  )
}
