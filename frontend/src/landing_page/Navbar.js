import React from 'react';
import './styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom'; // Ensure to import useNavigate
import { useAuth } from '../context/AuthContext'; // Import your custom hook

function Navbar() {
    const { isLoggedIn, logout } = useAuth(); // Use the Auth context
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/'); // Redirect to home page after logout    <img className="img-fluid" style={{ width: '140px', height: '80px',opacity:"1"}} src="media/newlogo.jpg" alt="Logo" />
    };

    return (
        <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: 'white' }}>
            <div className="container-fluid" style={{ marginLeft: '80px' }}>
                <Link className="navbar-brand" to="/">
                  <h2 style={{color:"#2a9df4", fontFamily:"PT Serif"}}>MarketIntel</h2>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5 mr-5">
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <button className="nav-link active Link" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link active Link" aria-current="page" to="/signup">
                                    Signup
                                </Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link active Link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active Link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active Link" to="/pricing">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active Link" to='/support'>Support</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
