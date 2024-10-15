import React from 'react';
import Hero from './Hero';
import LeftImage from './LeftImage';
import RightImage from './RightImage';
import Universe from './Universe';
function ProductPage() {
    return (
        <>
            <Hero />
            <LeftImage imageURL="/media/kite.png"
                productName="Kite"
                productDescription="Our ultra-fast flagship trading platform with streaming market data,
                 advanced charts, an elegant UI, and more.
                 Enjoy the Kite experience seamlessly on your Android and iOS devices.

"
                LinkUrl1=""
                LinkUrl2=""
                googePlay=""
                appStore=""
                LinkName1={<span>try now <i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>}
                LinkName2={<span>learn more <i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>}

            />
            <RightImage imageURL="/media/console.png"
                productName='Console'
                productDescription='The central dashboard for your Zerodha account.
                Gain insights into your trades and investments with in-depth reports and visualisations.'
                LinkUrl1=""
                LinkName1={<span>learn more <i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>}


            />
            <LeftImage imageURL='/media/coin.png'
                productName='Coin'
                productDescription='Buy direct mutual funds online, commission-free, delivered directly to your Demat account.
              Enjoy the investment experience on your Android and iOS devices.'
                LinkUrl1=""
                LinkUrl2=""
                LinkName1={<span>coin <i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>}
                LinkName2=""
                googePlay=""
                appStore=""

            />
            <RightImage imageURL="media/kiteconnect.png"
                productName="Kite Connect API"
                productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup,
             build your investment app and showcase it to our clientbase."
                LinkName1={<span>Kite Connect <i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>}
                LinkName2=""
                LinkUrl1=""
                LinkUrl2=""

            />
            <LeftImage imageURL="/media/varsity1.png"
                productName="Varsity mobile"
                productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations.
              Content is broken down into bite-size cards to help you learn on the go."
                googePlay=""
                appStore=""
               
            />

            <Universe />
        </>
    );
}

export default ProductPage;