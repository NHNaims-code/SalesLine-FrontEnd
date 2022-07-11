import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Delete, Post, Update } from '../../Adapters/xhr';
import { UserContext } from '../../App';
import MUIDialog from '../../components/Dailog/MUIDialog';
import DataTable from '../../components/DataTable/MUITable';
import RegisterProductOrService from '../RegisterProductOrService'
import UpdateProductOrService from '../RegisterProductOrService/UpdateProductOrService';

export default function AllProductOrService() {

  const [allProductOrServices, setAllProductOrServices] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [updateData, setUpdateData] = useState(null)

  const history = useHistory()
  useEffect(() => {
    if(!loggedInUser.user.isAdmin){
      history.push('/login')
    }
  }, [])

  const getAllProductOrServices = async() => {
    try {
      const response = await Post("productOrService",{token: loggedInUser.token})
      console.log("log:", response)
      if(!response.data == false){
        console.log("response data", response.data)
        setAllProductOrServices(response.data)
      }
      setLoading(false)
    } catch (error) {
      toast.warn("Try Again")
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllProductOrServices()
  }, [open])

  const columns = [
      { field: 'name', title: 'Item Name', width: 70 },
      { field: 'expire', title: 'Expiry Date', width: 70 },
      { field: 'unit', title: 'Units', width: 70 },
      { field: 'description', title: 'Description', width: 70 },
      { field: 'price', title: 'Price', width: 70 },
      { field: 'quantity', title: 'Quantity', width: 70 }
  ]


  // const handleEdit = async(rowData) => {
  //   console.log("hit")
  //   await Swal.fire({
  //     title: `Edit ProductOrService`,
  //     html:
  //       `<input id="name" class="swal2-input" value="${rowData.name}">` +
  //       `<input id="expire" class="swal2-input" value="${rowData.expire}">` +
  //       `<input id="unit" class="swal2-input" value="${rowData.unit}">` +
  //       `<input id="description" class="swal2-input" value="${rowData.description}">` +
  //       `<input id="price" class="swal2-input" value="${rowData.price}">` +
  //       `<input id="quantity" class="swal2-input" value="${rowData.quantity}">` ,
  //     focusConfirm: false,
  //     preConfirm: async() => {
  //         const name = document.getElementById('name').value
  //         const expire = document.getElementById('expire').value
  //         const unit = document.getElementById('unit').value
  //         const description = document.getElementById('description').value
  //         const price = document.getElementById('price').value
  //         const quantity = document.getElementById('quantity').value

  //         console.log("result : ", {name, expire, unit, description, price, quantity})
  //         try {
  //           const updatedResult = await Update(`productOrService/updateProductOrService/${rowData._id}`, {name, expire, unit, description, price, quantity})
  //           console.log("updated result :", updatedResult)
  //           setAllProductOrServices(updatedResult.data)
  //         } catch (error) {
  //           toast.warn('Try Again!')
  //         }
  //     }
  //   })
  // }

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


          Delete(`productOrService/deleteProductOrService/${rowData._id}`).then(result => {
            setAllProductOrServices(result.data)
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
      <DataTable loading={loading} tableTitle="All ProductOrServices" columns={columns} rows={allProductOrServices} handleEdit={(rowData) => {setUpdateData(rowData); setOpen(true); }} handleDelete={handleDelete}/>
      <MUIDialog open={open} setOpen={setOpen} content={<UpdateProductOrService updateData={updateData} setOpen={setOpen}/>}/>
      
    </div>
  )
}
