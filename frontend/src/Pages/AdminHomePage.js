import React, { Fragment } from 'react'
import AdminHome from '../Components/AdminHome/AdminHome'
import Navbar from '../Components/Navbar/Navbar'

function AdminHomePage(){
  return (
    <Fragment>
      <Navbar />
      <AdminHome />
    </Fragment>
  )
}

export default AdminHomePage
