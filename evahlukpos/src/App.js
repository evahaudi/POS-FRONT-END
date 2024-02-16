import React from 'react'
import { Routes, Route } from 'react-router-dom'
import WaiterLogin from './views/login/WaiterLogin'
import Register from './views/signup/Register'
import Layout from './views/global/Layouts'
import RequireAuth from './context/RequireAuth'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'
import ManagerLogin from './views/login/ManagerLogin'
import ChefLogin from './views/login/ChefLogin'
import WaiterSidebar from './views/global/WaiterSidebar'
import ManagerSidebar from './views/global/ManagerSidebar'
import ChefSidebar from './views/global/ChefSidebar'
import AboutUs from './views/pages/About'
import Home from './views/pages/Home'
import ContactUs from './views/pages/Contact'
import CustomLogin from './views/login/Customlogin'

const ROLES = {
  isChef: 'isChef',
  isWaiter: 'isWaiter',
  Admin: 5150,
  isManager: 'isManager'
}

function App () {
  const [theme, colorMode] = useMode()

  return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Layout>
                        <Routes>
                            {/* public routes */}
                            <Route
                                path="/waiterLogin"
                                element={<WaiterLogin />}
                            />
                            <Route path="/chefLogin" element={<ChefLogin />} />
                            <Route
                                path="/managerLogin"
                                element={<ManagerLogin />}
                            />
                            <Route path="/register" element={<Register />} />
                            <Route path="/contact" element={<ContactUs />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/login" element={<CustomLogin />} />
                            <Route path="/" element={<Home />} />

                            {/* protected  routes */}
                            <Route
                                element={
                                    <RequireAuth
                                        allowedRoles={[ROLES.isWaiter]}
                                    />
                                }
                            >
                                <Route
                                    path="waitersidebar"
                                    element={<WaiterSidebar />}
                                />
                            </Route>
                            <Route
                                element={
                                    <RequireAuth
                                        allowedRoles={[ROLES.isManager]}
                                    />
                                }
                            >
                                <Route
                                    path="managersidebar"
                                    element={<ManagerSidebar />}
                                />
                            </Route>
                            <Route
                                element={
                                    <RequireAuth
                                        allowedRoles={[ROLES.isChef]}
                                    />
                                }
                            >
                                <Route
                                    path="chefsidebar"
                                    element={<ChefSidebar />}
                                />
                            </Route>
                        </Routes>
                    </Layout>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
  )
}

export default App
