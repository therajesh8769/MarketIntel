import React from 'react';
import Hero from './Hero';
import Awards from './Awards';
import Stats from './Stats';
 import Pricing from './Pricing';
 import Eduction from './Eduction';
import OpenAccount from '../OpenAccount.js';
 import Navbar from '../Navbar';
import Footer from '../Footer';
function Homepage() {
    return ( 
        <>
        

        <Hero/>
         <Awards/>
        <Stats/>
        <Pricing/>
        <Eduction/>
         <OpenAccount/> 
        


        
        </>
     );
}

export default Homepage;