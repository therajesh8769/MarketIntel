import React from 'react';

function Pricing() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <h1 className='mb-3'>Unbeatable pricing</h1>
                    <p>
                        We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.
                    </p>
                    <a href='#' style={{ textDecoration: 'none' }}>
                        See pricing <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='row justify-content-around text-center'>
                        <div className='col-4'>
                            <img src='media/pricing-eq.svg' className='img-fluid' alt='Free account opening'/>
                            <p>Free account opening</p>
                        </div>
                        <div className='col-4'>
                            <img src='media/pricing-eq.svg' className='img-fluid' alt='Free equity delivery and direct mutual funds'/>
                            <p>Free equity delivery and direct mutual funds</p>
                        </div>
                        <div className='col-4'>
                            <img src='media/image.png' className='img-fluid' alt='Intraday and F&O'/>
                            <p>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
