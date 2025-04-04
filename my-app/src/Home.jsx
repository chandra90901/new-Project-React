import React, { useEffect, useState } from "react";

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse user data from localStorage
        }
    }, []);

    return (
        <div style={{ padding: "150px" }}>
            <h1>Hi {user ? user.firstname : "Guest"}</h1>
            <h1>Welcome to Ram Super Market</h1>
            <p>Your one-stop shop for fresh groceries and more!</p>

        </div>
    );
};

export default Home;
