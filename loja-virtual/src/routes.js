import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index';


export default function AppRouter() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Index />} />
            </Routes>
        </Router>
    )

}

