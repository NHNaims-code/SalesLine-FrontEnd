import { Button } from '@mui/material'
import React from 'react'
import { useHistory } from 'react-router-dom'

export default function NotFound() {

  const history = useHistory()

  return (
    <div className=' mt-[200px] flex justify-center items-center'>
      <div className='flex flex-col '>
        <h1 className='text-3xl mb-4'>Page Not Found</h1>
        <Button onClick={() => history.push("/")} type="submit" sx={{backgroundColor: "#625038", marginTop: '25px'}} variant="contained" >Go Home</Button>
      </div>
    </div>
  )
}
