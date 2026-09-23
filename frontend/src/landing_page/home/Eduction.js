import React from 'react';

function Eduction() {
    return (
        <div className='container mt-5 mb-5'>
            <div className='row'>
                {/* Image on the left for larger screens, full-width for smaller screens */}
                <div className='col-12 col-md-6'>
                    <img src='media/varsity1.png' className='img-fluid mb-3' alt='Varsity'></img>
                </div>

                {/* Text on the right for larger screens, full-width for smaller screens */}
                <div className='col-12 col-md-6'>
                    <h1 className='my-4'>Free and open market education</h1>
                    <p className='mb-3'>
                        Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.
                    </p>
                    <a href='#' style={{ textDecoration: 'none' }}>
                        Varsity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>
                    <p className='my-3'>
                        TradingQ&A, the most active trading and investment community in India for all your US market-related queries.
                    </p>
                    <a href='#' style={{ textDecoration: 'none' }}>
                        TradingQ&A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Eduction;
