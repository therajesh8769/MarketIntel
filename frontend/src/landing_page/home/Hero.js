import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 
function Hero() {
   const navigate = useNavigate();
   return (
      <div className='container p-5 text-center'>
         <div className='row'>

            <img className='mb-5 ' src='media/homeHero.png' alt='hero-image' />
            <h1 className='mt-5'>
               Invest in Everything
            </h1>
            <p >
               Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
            </p>
            <Button
               onClick={() => navigate('/signup')}
               className='btn btn-primary mt-5 p-1 fs-5'
               style={{ width: '30%', margin: '0 auto' }}
            >
               Sign up for free
            </Button>
         </div>

      </div>
   );
}

export default Hero;