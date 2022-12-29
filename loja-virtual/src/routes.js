import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Index from './pages/Index/Index';
import IndexCart from './pages/Cart/Index'
import Navbar from './Components/Navbar/Index';


export default function AppRouter() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/' element={<Navbar />}>
                </Route>
                <Route path='/cart' element={<IndexCart />} />

            </Routes>
        </Router>
    )

}

