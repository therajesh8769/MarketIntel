import React from 'react';
import '../styles/products.css'
function RightImage({
    imageURL,
    productName,
    productDescription,
    LinkUrl1,
    LinkName1,
   



}) {
    return (
        <>
            <div className='container'>
                <div className='row my-3'>
                    <div className='col-12 col-md-6 rightText'>
                        <h1 className='fs-2'>{productName}</h1>
                        <p className='text-muted fs-6'>
                            {productDescription}
                            <br></br>
                            <a href={LinkUrl1} style={{ textDecoration: 'none' }} > {LinkName1}   </a>
                        </p>
                       

                    </div>
                    <div className='col-12 col-md-6 rightImage'>
                        <img src={imageURL} alt='#'></img>

                    </div>
                </div>


            </div>
        </>
    );
}

export default RightImage;