import React, { Fragment } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import AdminEdit from '../Components/AdminEdit/AdminEdit'

function AdminEditPage(){
  return(
    <Fragment>
        <Navbar />
        <AdminEdit />
    </Fragment>
  )
}

export default AdminEditPage
