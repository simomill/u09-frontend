import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FeedView from "./pages/feedView";
import PhotoView from "./pages/PhotoView";
import UserPage from "./pages/userPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPAge";

function App() {
    return (
        <div className="App">
            <main>
                <Router>
                    <Routes>
                        <Route path="/" element={<FeedView />} />
                        <Route path="/photo" element={<PhotoView />} />
                        <Route path="/user" element={<UserPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;
