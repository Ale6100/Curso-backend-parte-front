import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Register from './components/session/Register';
import Login from './components/session/Login';
import Home from './components/Home';
import Error404 from './components/Error404';
import Profile from './components/Profile';
import CheckLogger from './components/session/CheckLogger';
import PersonalContextProvider from "./components/PersonalContext";
import Cart from './components/Cart';
import Creditos from './components/Creditos';
import PasswordRestoreRequest from './components/session/PasswordRestoreRequest';
import RestorePassword from './components/session/RestorePassword';
import Contacto from './components/Contacto';
import ProductDetailContainer from './containers/ProductDetailContainer';
import CrudProducts from './components/crudProducts/CrudProducts';

function App() {
    return (
      <PersonalContextProvider>
      <BrowserRouter>
        <NavBar />
        <CheckLogger />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetailContainer />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/formUsers/register" element={<Register />}/>
          <Route path='/formUsers/login' element={<Login />} />
          <Route path="/formUsers/passwordRestoreRequest" element={<PasswordRestoreRequest />} />
          <Route path="/formUsers/restorePassword" element={<RestorePassword />} />
          <Route path="/formAdmins/CrudProducts" element={<CrudProducts />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Creditos />
      </BrowserRouter>
      </PersonalContextProvider>
    )
}

export default App
