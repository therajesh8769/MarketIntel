import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/products.css'
function Universe() {
    return ( 
        <>
       <div className='container mt-5'>
        <div className='row text-center text-muted'>
            <h4 className='text-muted '>
            Want to know more about our technology stack? Check out the <Link to="#" style={{textDecoration:'none'}}>MarketIntel.tech</Link> blog.
            </h4>
            <h3 className='text-muted '>
                The MarketIntel Universe
            </h3>
            <p >
            Extend your trading and investment experience even further with our partner platforms
            </p>
            <div className='row text-muted mx-6 mt-5 '>
                <div className='col-12 col-sm-4'>
                   <a href='#' style={{textDecoration:'none'}}>
                   <img src='/media/ZerodhaFundhouse.png' className='universeImage'></img>
                    <span className='universe-text'>
                        our assest management venture that is creating simple and transparent index funds to help you save for your goals.

                    </span> 

                   </a>

                </div>
                <div className='col-12 col-sm-4'>
                   <a href='#' style={{textDecoration:'none'}}>
                   <img src='/media/streakLogo.png ' className='universeImage'></img>
                    <span className='universe-text'>
                        Systematic trading platform that allows you to create and backtest strategies without coding.
                        
                    </span> 

                   </a>

                </div>
                <div className='col-12 col-sm-4'>
                   <a href='#' style={{textDecoration:'none'}}>
                   <img src='/media/sensibullLogo.svg ' className='universeImage'></img>
                    <span className='universe-text'>
                        Systematic trading platform that allows you to create and backtest strategies without coding.
                        
                    </span> 

                   </a>

                </div>
                

            </div>
            <div className='row text-muted mx-6 mt-5 '>
                <div className='col-12 col-sm-4'>
                   <a href='#' style={{textDecoration:'none'}}>
                   <img src='/media/smallcaseLogo.png' className='universeImage'></img>
                    <span className='universe-text'>
                        our assest management venture that is creating simple and transparent index funds to help you save for your goals.

                    </span> 

                   </a>

                </div>
                <div className='col-12 col-sm-4'>
                   <a href='#' style={{textDecoration:'none'}}>
                   <img src='/media/tijoriLogo.png ' className='universeImage'></img>
                    <span className='universe-text'>
                        Systematic trading platform that allows you to create and backtest strategies without coding.
                        
                    </span> 

                   </a>

                </div>
                <div className='col-12 col-sm-4'>
                   <a href='#' style={{textDecoration:'none'}}>
                   <img src='/media/dittoLogo.png ' className='universeImage'></img>
                    <span className='universe-text'>
                        Systematic trading platform that allows you to create and backtest strategies without coding.
                        
                    </span> 

                   </a>

                </div>
                

            </div>

        </div>

       </div>
        </>
     );
}

export default Universe;