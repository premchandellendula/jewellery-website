import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Signup from './pages/login/Signup'
import Signin from './pages/login/Signin'
import Landing from './pages/landing/Landing'
import About from './pages/about/About'
import Categories from './pages/category/Categories'
import Gallery from './pages/gallery/Gallery'
import Contact from './pages/contact/Contact'
import Products from './pages/product/Products'
import AdminLanding from './pages/admin/AdminLanding'
import AdminCategories from './pages/admin/AdminCategories'
import AdminGallery from './pages/admin/AdminGallery'
import AdminWorks from './pages/admin/AdminWorks'
import Works from './pages/works/Works'
import Work from './pages/works/Work'
import CategoryProducts from './pages/product/CategoryProducts'
import Product from './pages/product/Product'
import AdminProduct from './pages/admin/AdminProduct'
import AdminCategory from './pages/admin/AdminCategory'
import AdminWork from './pages/admin/AdminWork'
import Logout from './components/login/Logout'
import PrivateRoute from './pages/auth/PrivateRoute'
import { useEffect } from 'react'
import { isTokenExpired } from './utils/auth'
import Cart from './pages/cart/Cart'
import Profile from './pages/profile/Profile'
import Address from './pages/profile/Address'
import WishList from './pages/profile/WishList'
import ChangePassword from './pages/profile/ChangePassword'
import ProfileOrders from './pages/profile/ProfileOrders'
import Orders from './pages/orders/Orders'
import UserRoute from './pages/auth/UserRoute'
import AdminRoute from './pages/auth/AdminRoute'
import ScrollToTop from './components/utils/ScrollToTop'

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/about' element={<About />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products' element={<Products />} />
        <Route path='/category/:id/products' element={<CategoryProducts />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/works' element={<Works />} />
        <Route path='/works/:id' element={<Work />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />

        <Route path='/profile' element={<UserRoute />}>
          <Route index element={<Profile />} />
          <Route path='address' element={<Address />} />
          <Route path='orders' element={<ProfileOrders />} />
          <Route path='wishlist' element={<WishList />} />
          <Route path='changepassword' element={<ChangePassword />} />
        </Route>
        <Route path='/admin' element={<AdminRoute />}>
          <Route index element={<AdminLanding />} />
          <Route path='categories' element={<AdminCategories />} />
          <Route path='category/:id/products' element={<AdminCategory />} />
          <Route path='gallery' element={<AdminGallery />} />
          <Route path='works' element={<AdminWorks />} />
          <Route path='product/:id' element={<AdminProduct />} />
          <Route path='works/:id' element={<AdminWork />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
