import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Books from "./components/Books";
import Categories from "./components/Categories";

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to={'/books'}><p className={"m-3"}>Books</p></Link>
                    <Link to={'/categories'}><p className={"m-3"}>Categories</p></Link>

                </nav>
                <Routes>
                    <Route path={'/books'} element={<Books/>}></Route>
                    <Route path={'/categories'} element={<Categories/>}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
