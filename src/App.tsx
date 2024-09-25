import Footer from "./component/Footer";
import Header from "./component/Header";
import Main from "./component/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Products = lazy(() => import("./component/Products"));

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route
                        path="/products"
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <Products />
                            </Suspense>
                        }
                    />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
