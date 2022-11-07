import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FeedView from "./pages/FeedPage";
import PhotoView from "./pages/PhotoView";
import UserPage from "./pages/UserProfilePage";
import RegisterPage from "./pages/RegistrationPage";
import { checkIsLoggedIn } from "./Services/auth.service";
import TestAuthPage from "./pages/TestAuthPage";
import NotFound from "./pages/404Page";
import Dashboard from "./pages/DashboardPage";
import Unauth from "./pages/401Page";
import LoginPage from "./pages/LoginPage";

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
                            element={
                                isAdmin ? (
                                    <Dashboard />
                                ) : isLoggedIn ? (
                                    <Unauth />
                                ) : (
                                    <LoginPage />
                                )
                            }
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
