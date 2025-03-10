import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './signup';
import Login from './login';
const MenuToggle = () => {
    const navigate = useNavigate();
    return (

        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Accounts
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/Accounts/signup')}>
                    <Signup />
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/Accounts/login')}>
                    <Login />
                </Dropdown.Item>
                <Dropdown.Item onClick={() => alert('Something else here')}>
                    Something else here
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        // <div class="dropdown">
        //     <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //         Accounts
        //     </a>

        //     <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        //         <a class="dropdown-item" href="/Accounts/signup"><Signup /></a>
        //         <a class="dropdown-item" href="/Accounts/login"><Login /></a>
        //         <a class="dropdown-item" href="#">Something else here</a>
        //     </div>
        // </div >
    );
}

export default MenuToggle;
