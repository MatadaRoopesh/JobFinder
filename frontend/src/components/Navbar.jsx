import React from "react";
import { Link, useNavigate } from 'react-router-dom'; import { useAuth } from '../context/AuthContext';
export default function Navbar() { const { user, logout } = useAuth(); const nav = useNavigate(); return <nav><Link className="brand" to="/">Job<span>Finder</span></Link><div className="navlinks">{user && <><Link to="/dashboard">Dashboard</Link><Link to="/saved">Saved Jobs</Link><Link to="/applications">Applications</Link><button onClick={() => { logout(); nav('/login') }}>Logout</button></>}</div></nav> }
