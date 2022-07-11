import { Grid } from '@mui/material'
import React from 'react'
import SideBar from './SideBar'

export default function Layout({children}) {
  return (
    <div>
      <div className='flex'>
        <SideBar/>
        <div className='p-[26px] w-full'>
          {children}
        </div>
      </div>
      <footer className='py-4 bg-black text-white text-center'>
        All right Reserved - 2022
      </footer>
    </div>
  )
}
