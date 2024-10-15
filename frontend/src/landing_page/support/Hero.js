import React from 'react';
import '../styles/support.css';
import { Link } from 'react-router-dom';
function Hero() {
    return (
        <>
            <div className='support_hero'>
                <div className='container'>
                    <div className='row mt-4  mr-5'>
                        <div className="row-container">
                            <span className="left-word">Support portal</span>
                            <a href='#' style={{ textDecoration: 'none', color: 'white' }}> <span style={{ textDecorationLine: 'underline' }}>Track ticket</span></a>
                        </div>
                        <div className='col-12 col-md-6 column1'>


                            <div className='mt-5'>
                                <input className='searchBox' placeholder='Eg:how do i activate F&O, why is my orde getting rejecting'></input>
                            </div>

                            <div className='row my-4'>
                                <div className='col-12 col-md-4 my-1'>
                                    <a href='#' className="supportLink">Track account opening</a>
                                </div>
                                <div className='col-12 col-md-4 my-1'>
                                    <a href='#' className="supportLink">Track segment activation</a>
                                </div>
                                <div className='col-12 col-md-4 my-1'>
                                    <a href='#' className="supportLink">Intraday margins</a>
                                </div>
                                <div className='col-12 col-md-4 my-1'>
                                    <a href='#' className="supportLink">Kite user manual</a>
                                </div>
                            </div>




                        </div>
                        <div className='col-12 col-md-6'>
                            <div className="row-container">
                                <span className="left-word">Featured</span>

                            </div>
                            <div className='row mt-4'>

                                <p>
                                    Due to the settlement holiday on Monday,
                                    your account balance will not include the following credits on 16 September, 2024:
                                </p>
                                <ul>
                                    <li>Intraday profits made in the Equity segment on Sept 13, 2024.</li>
                                    <li>Credits from trades made in NFO, Currency, and Commodity derivatives on Sept 13, 2024.
                                        This will include options premium credits, futures M2M profits, etc.
                                        <Link to='#' className='supportLink'>Read more</Link>.</li>
                                </ul>
                            </div>

                        </div>

                    </div>
                    

                </div>
            </div>
            
        </>
    );
}

export default Hero;
