import React from 'react';
import { Link } from 'react-router-dom';
function Hero() {
    return ( 
        <>
      <div className='container'>
        <div className='row'>
            <div className='col-12 text-center my-5'>
                <h1 className='fs-1'>Technology</h1>
                <p className='fs-4'>Sleek,modern,and intutive trading platforms</p>
                <p className='fs-5'>Check out our <Link to='#' style={{textDecoration:'none'}}>investment offerings 
                 <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </Link>
                </p>

            </div>
            
            

        </div>
        <hr></hr>

      </div>
        </>
     );
}

export default Hero;