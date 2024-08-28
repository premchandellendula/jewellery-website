import {BrowserRouter, Route, Routes} from 'react-router-dom'
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

function App() {

  return (
    <>
      {/* <BrowserRouter> */}
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

          <Route path='/profile' element={<Logout />}/>

          <Route path='/admin' element={<PrivateRoute />}>
            <Route path='/admin/' element={<AdminLanding />} />
            <Route path='/admin/categories' element={<AdminCategories />} />
            <Route path='/admin/category/:id/products' element={<AdminCategory />} />
            <Route path='/admin/gallery' element={<AdminGallery />} />
            <Route path='/admin/works' element={<AdminWorks />} />
            <Route path='/admin/product/:id' element={<AdminProduct />} />
            <Route path='/admin/works/:id' element={<AdminWork />} />
          </Route>
        </Routes>
      {/* </BrowserRouter> */}
    </>
  )
}

export default App
