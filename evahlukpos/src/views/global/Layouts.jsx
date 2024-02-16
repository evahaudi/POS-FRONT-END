import React from 'react'
import { useLocation } from 'react-router-dom'
import MyAppBar from '../pages/Theappbar'
import Footer from '../pages/Thefooter'

const Layout = ({ children }) => {
    const location = useLocation()

    const isSidebarRoute = () => {
        return (
            location.pathname === '/waitersidebar' ||
            location.pathname === '/managersidebar' ||
            location.pathname === '/chefsidebar'
        )
    }

    return (
        <div>
            {!isSidebarRoute() && <MyAppBar />}
            <main className="App">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
