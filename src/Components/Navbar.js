import React from 'react';
import { NavLink } from 'react-router-dom';
import ikona from'../assets/ikona.png'
import '../App.css';
import Profile from './Profile';
import { useState } from 'react';
import '../Styles/Navbar.css';
import { useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/user';
import { useContext } from 'react';
const Navbar = ({onProfileClick}) => {
    const { isLogged, login } = useContext(UserContext);


    return (
    <div>
        <nav class="navbar navbar-expand-lg p-0 shadow-sm bg-white on-top">
        <div class="container-fluid h-100  mx-3">
            <img src={ikona} alt="Logo" class="navbar-brand logo"/>
        <div class="collapse navbar-collapse position-relative" >
            <ul class="navbar-nav">
                <li className="nav-item">
                <NavLink to="" className={({ isActive }) => (isActive ? 'active nav-link  my-navbar' : 'nav-link my-navbar')}>Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/books" className={({ isActive }) => (isActive ? 'active nav-link my-navbar' : 'nav-link my-navbar')}>Books</NavLink>
                </li>
                <li className="nav-item dropdown">
                <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active nav-link my-navbar' : 'nav-link my-navbar')} >
                    Category
                </NavLink>
                </li>
                <li className="nav-item" >
                <NavLink to="/offers" className={({ isActive }) => (isActive ? 'active nav-link my-navbar' : 'nav-link my-navbar')}>Offers</NavLink>
                </li>
            </ul>
            
            <div class="position-absolute end-0 row">
                <div class="col pt-2">
                {isLogged &&<NavLink to="/cart" className={({ isActive }) => (isActive ? 'cart-active' : 'cart')} >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                </NavLink>}
                </div>
                <div class="col  pt-2">
                    {isLogged && <div role="button"  onClick={onProfileClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </div>}
                </div>
                <div class="pt-2">
                {!isLogged && <div role ="button" onClick={login}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg><br/>
                    <span>Log in</span>
                </div>}
                </div>
            </div>
            
        
            </div>
        </div>
    </nav>
    </div>
)}
export default Navbar;