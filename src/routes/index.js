import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './../views/Home';
import LogIn from './../views/LogIn';
import NotFound from './../views/NotFound';

export default function CvRoutes() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/login" element={ <LogIn/> }/>
                <Route path="*" element={ <NotFound/> }/>
            </Routes>
        </Router>
    )
}