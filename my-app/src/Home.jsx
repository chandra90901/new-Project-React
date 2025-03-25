import React from 'react';

const Home = () => {
    const email = localStorage.getItem("email");
    return (
        <div>
            <h1>Welcome to Ram Super Market</h1>
            <p>Your one-stop shop for fresh groceries and more!</p>
            <ul>
                <li style={{ border: '1px solid black' }}>
                    <li>{email ? email : "Guest"}</li>
                </li>
            </ul>

        </div>
    );
};

export default Home;