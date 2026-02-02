import React from 'react'

import { Outlet } from 'react-router-dom'
import NavbarApp from '../NavbarApp/NavbarApp'
import FooterApp from '../FooterApp/FooterApp'

function Layout() {
    return (
        <div className='flex min-h-screen flex-col justify-between dark:text-white dark:bg-gray-900'>
            <NavbarApp />
            <div className=' bg-slate-100 dark:bg-gray-900 flex-grow-1'>
                <Outlet />
            </div>
            <FooterApp />

        </div>
    )
}

export default Layout
