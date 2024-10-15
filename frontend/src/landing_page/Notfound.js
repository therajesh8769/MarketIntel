import React from 'react';
import { Link } from 'react-router-dom';
function Notfound() {
    return ( 
         <>
    <div className='container p-5 text-center'>
           
           <h3>
            404
           </h3>
           <h6>We couldn’t find the page you were looking for. Visit <Link style={{textDecoration:'none'}} to='/'>MarketIntel’s home page</Link></h6>
           


       </div>
    </>
    );
}

export default Notfound;