import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './Footer';
import NavBar from './NavBar';

const SuperMarket = () => {
    return (
        <Router>
            <NavBar />
            <menu>
                <div className="container mt-5">
                    <h1>Welcome to Ram Super Market</h1>
                    <p>Your one-stop shop for fresh groceries and more!</p>
                </div>
            </menu>
            <Footer />
        </Router >
    );
};

export default SuperMarket;