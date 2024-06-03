import React, { Fragment } from 'react'

import Navbar from '../Components/Navbar/Navbar'
import CreateUser from '../Components/AdminCreate/CreateUser'

function UsercreatePage(){
  return (
    <Fragment>
        <Navbar />
        <CreateUser />
    </Fragment>
  )
}

export default UsercreatePage
