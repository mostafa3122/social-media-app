import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

import NotFound from '../pages/NotFound/NotFound'
import Posts from '../pages/Posts/Posts'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/auth/Login/Login'
import Register from '../pages/auth/Register/Register'
import ProtectAuthRoute from './ProtectAuthRoute'
import ProtectRoute from './ProtectRoute'
import PostDetails from '../pages/PostDetails/PostDetails'


let routes = createBrowserRouter([

    {
        path: '/', element: <Layout />, children: [
            { index: true, element: <ProtectRoute><Posts /></ProtectRoute> },
            { path: 'login', element: <ProtectAuthRoute><Login /></ProtectAuthRoute> },
            { path: '/posts', element: <ProtectRoute><Posts /></ProtectRoute> },
            { path: '/post-details/:id', element: <ProtectRoute><PostDetails /></ProtectRoute> },
            { path: '/register', element: <ProtectAuthRoute><Register /></ProtectAuthRoute> },
            { path: '/profile', element: <ProtectRoute><Profile /></ProtectRoute> },
            { path: '*', element: <NotFound /> },
        ]
    }
])


export default routes
