import React, { Suspense } from "react";
import PersonalContextProvider from "./components/PersonalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import CheckLogger from './components/session/CheckLogger';
import Loading from "./components/Loading";
import Creditos from './components/Creditos';

const Home = React.lazy(() => import("./components/Home"))
const ProductDetailContainer = React.lazy(() => import("./containers/ProductDetailContainer"))
const Contacto = React.lazy(() => import("./components/Contacto"))
const Cart = React.lazy(() => import("./components/Cart"))
const Profile = React.lazy(() => import("./components/Profile"))
const Register = React.lazy(() => import("./components/session/Register"))
const Login = React.lazy(() => import("./components/session/Login"))
const PasswordRestoreRequest = React.lazy(() => import("./components/session/PasswordRestoreRequest"))
const RestorePassword = React.lazy(() => import("./components/session/RestorePassword"))
const CrudProducts = React.lazy(() => import("./components/crudProducts/CrudProducts"))
const Error404 = React.lazy(() => import("./components/Error404"))

function App() {
    return (
        <PersonalContextProvider>
            <BrowserRouter>
                <NavBar />
                <CheckLogger />
                <div className="mx-auto max-w-5xl">
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/product/:id' element={<ProductDetailContainer />} />
                            <Route path="/contacto" element={<Contacto />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/formUsers/register" element={<Register />} />
                            <Route path='/formUsers/login' element={<Login />} />
                            <Route path="/formUsers/passwordRestoreRequest" element={<PasswordRestoreRequest />} />
                            <Route path="/formUsers/restorePassword" element={<RestorePassword />} />
                            <Route path="/formAdmins/CrudProducts" element={<CrudProducts />} />
                            <Route path="*" element={<Error404 />} />
                        </Routes>
                    </Suspense>
                </div>
                <Creditos />
            </BrowserRouter>
        </PersonalContextProvider>
    )
}

export default App
