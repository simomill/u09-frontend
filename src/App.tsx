import React, { useEffect, useState } from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import FeedView from "./pages/feedView";
import PhotoView from "./pages/PhotoView";
import UserPage from "./pages/userPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import { checkIsLoggedIn, logout } from "./Services/auth.service";
import TestAuthPage from "./pages/TestAuthPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if user is logged in on page load
    useEffect(() => {
        const isLoggedIn = checkIsLoggedIn();
        setIsLoggedIn(isLoggedIn.token);
        setIsAdmin(isLoggedIn.token);
    }, []);


    return (
        <div className="App">
            <main>

                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={isLoggedIn ? <FeedView /> : <LoginPage />}
                        />
                        <Route
                            path="/photo"
                            element={isLoggedIn ? <PhotoView /> : <LoginPage />}
                        />
                        <Route
                            path="/user/:id"
                            element={isLoggedIn ? <UserPage /> : <LoginPage />}
                        />
                        <Route
                            path="/dashboard"
                            element={isAdmin ? <Dashboard /> : <NotFound />}
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/auth-test" element={<TestAuthPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;
