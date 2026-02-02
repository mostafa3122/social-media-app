import React, { useContext } from 'react'
import { UserContext } from '../components/context/UserContext/UserContext'
import { Navigate } from 'react-router-dom'

function ProtectRoute({ children }) {
    const { token } = useContext(UserContext)
    if (!token) {
        return <Navigate to={"/login"} />
    }
    else {
        return children
    }
}

export default ProtectRoute
