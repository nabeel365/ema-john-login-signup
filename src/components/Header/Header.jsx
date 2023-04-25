import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';


const handleSignOut = () => {
    logOut()
    .then(result => {})
        .catch(error => console.log(error));
}

const Header = () => {
const {user, logOut} = useContext(AuthContext)

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/sign-up">Sign Up</Link> 
                &nbsp; &nbsp; &nbsp;
                {user && <span className='welcome'>Welcome {user.username} <Link to="/login"><button onClick={handleSignOut} className='sign-out'>Sign Out</button></Link> </span> }
            </div>
        </nav>
    );
};

export default Header;