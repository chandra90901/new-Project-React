import { useState } from 'react';
import Signup from './Home/Signup';
import Login from './Home/Login';
import Profile from './Profile';

const Super = () => {
    const [page, setPage] = useState('signup');

    const renderPage = () => {
        switch (page) {
            case 'signup':
                return <Signup setPage={setPage} />;
            case 'login':
                return <Login setPage={setPage} />;
            case 'home':
                return <Profile setPage={setPage} />;
            default:
                return <Signup setPage={setPage} />;
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {renderPage()}
        </div>
    );
};

export default Super;