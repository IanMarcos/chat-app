import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './../views/Home';
import NotFound from './../views/NotFound';
import SignIn from './../views/SignIn';
import SignUp from '../views/SignUp';

export default function CvRoutes() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/signin" element={ <SignIn/> }/>
                <Route path="/signup" element={ <SignUp/> }/>
                <Route path="*" element={ <NotFound/> }/>
            </Routes>
        </Router>
    )
}