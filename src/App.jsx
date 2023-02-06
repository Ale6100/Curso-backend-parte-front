import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Error404 from './components/Error404';
import Profile from './components/Profile';
import CheckLogger from './components/CheckLogger';
import PersonalContextProvider from "./components/PersonalContext";
import Cart from './components/Cart';
import Creditos from './components/Creditos';
import PasswordRestoreRequest from './components/PasswordRestoreRequest';
import RestorePassword from './components/RestorePassword';
import AddProducts from './components/AddProducts';
import AddAdmin from './components/AddAdmin';
import Contacto from './components/Contacto';
import ProductDetailContainer from './containers/ProductDetailContainer';

function App() {
    return (
      <PersonalContextProvider>
      <BrowserRouter>
        <NavBar />
        <CheckLogger />
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetailContainer />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/formUsers/register" element={<Register />}/>
          <Route path='/formUsers/login' element={<Login />} />
          <Route path="/formUsers/passwordRestoreRequest" element={<PasswordRestoreRequest />} />
          <Route path="/formUsers/restorePassword" element={<RestorePassword />} />
          <Route path="/formAdmins/AddProducts" element={<AddProducts />} />
          <Route path="/formAdmins/AddAdmin" element={<AddAdmin />} />
        </Routes>
        <Creditos />
      </BrowserRouter>
      </PersonalContextProvider>
    )
}

export default App
