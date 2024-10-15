import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/products.css'
function LeftImage({
    imageURL,
    productName,
    productDescription,
    LinkUrl1,
    LinkUrl2,
    
    googePlay,
    appStore,
    LinkName1,
    LinkName2,
}) {
    
    return ( 
        <>
        <div className='container'>
        <div className='row my-3'>
                <div className='col-12 col-md-6'>
                    <img src={imageURL} alt='#'></img>

                </div>
                <div className='col-12 col-md-6 product_text'>
                <h1 className='fs-2'>{productName}</h1>
                <p className='text-muted fs-6'>
                  {productDescription}
                </p>
                
                <a href={LinkUrl1} style={{textDecoration:'none'}} >{LinkName1}   </a>
               
               <a href={LinkUrl2} style={{textDecoration:'none'}} className='products_links '>{LinkName2}    </a>

                
           
               
              
               <p className='my-4'> 
               <a href={googePlay} style={{textDecoration:'none'}}>
               <img src='/media/appStoreBadge.svg' className='mr-3'></img>
               </a>
               <a href={appStore} style={{textDecoration:'none'}}>
               <img src='/media/googlePlayBadge.svg' className='mx-5'></img>
               </a>
               
               </p>

                </div>
            </div>
           

        </div>
        </>
     );
}

export default LeftImage;