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
import AddProduct from './pages/admin/AddProduct'
import AddWorks from './pages/admin/AddWorks'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/about' element={<About />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/products' element={<Products />} />


          <Route path='/admin/' element={<AdminLanding />} />
          <Route path='/admin/product' element={<AddProduct />} />
          <Route path='/admin/work' element={<AddWorks />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
