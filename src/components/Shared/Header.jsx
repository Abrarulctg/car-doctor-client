import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { AuthContex } from '../Provider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContex);

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("Logout successful")
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        {
            user?.email && <li><NavLink to="/bookings">Bookings</NavLink></li>
        }
    </>
    return (
        <div>
            <div className="navbar bg-base-100 h-28 mb-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl"><img src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <a onClick={handleLogout} className="btn btn-outline btn-warning">Logout</a>
                            :
                            <Link to="/login"><a className="btn btn-outline btn-warning">Login</a></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;