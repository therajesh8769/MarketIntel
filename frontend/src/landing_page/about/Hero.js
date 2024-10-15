import React from 'react';
import TypingEffect from '../TypingEffect';
import { Link } from 'react-router-dom';
import '../styles/imageStyle.css';
function Hero() {
    const missionStatements = [
        "We pioneered the discount broking model in India. Now, we are breaking ground with our technology."

    ];
    return (<>
        <div className='container'>
            <div className='row mx-3 my-5'>
                <div className='col-12'>
                    <h1 className='text-center fs-2'><TypingEffect text={missionStatements} speed={50} /></h1>

                </div>

            </div>
            <hr></hr>
            <div className='row mx-3 my-5'>
                <div className='col-12 col-md-6 text-muted fs-6'>
                    <p >We kick-started operations on the 15th of August,
                        2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost,
                        support, and technology.
                        We named the company Zerodha, a combination of Zero and "Rodha",
                        the Sanskrit word for barrier.</p>

                        <p>Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.</p>

                        <p>Over 1+ Crore clients place millions of orders every day through our powerful ecosystem of investment platforms,
                        contributing over 15% of all Indian retail trading volumes.
                    </p>

                </div>
                <div className='col-12 col-md-6 text-muted fs-6'>
                    <p>
                    In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.
                    </p>
                    <p>
                   <Link style={{textDecoration:'none'}} to='#'> Rainmatter</Link>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.
                    </p>
                    <p>
                    And yet, we are always up to something new every day. Catch up on the latest updates on our  <Link style={{textDecoration:'none'}} to='#'> blog</Link> or see what the media is  <Link style={{textDecoration:'none'}} to='#'> Saying about us</Link>.
                    </p>

                </div>

            </div>
            <div className='row ml-10 my-5 '>
              <div className='col-12 col-md-4 text-center'>
              <h1 className='fs-2 '>People</h1>
                <img src="/media/img_77100.jpg" class="rounded mx-auto d-block rounded_img" alt="#"></img>
                <h3 className='fs-4 my-3'>Rajesh Yadav</h3>
                <p className='text-muted'>Developer, CTO</p>

              </div>
              <div className='col-12 col-md-8 fs-6'>
                <p>
                Rajesh bootstrapped and developed this website in 2010 to overcome the hurdles he faced during his decade long stint as developer.
                </p>
                <p>
                He is a student of Indian Institute of Engineering Science and Technology,Shibpur.He is passionate about the coding and developing solution for new age problems.
                </p>
                <p>
                    Connect on <a href='https.//www.instagram.com/hy_raj_26/' style={{textDecoration:'none'}}>Instagram</a> / <a href='https://x.com/hy_raj_26' style={{textDecoration:'none'}}>Twitter</a> / <a href='https://www.linkedin.com/in/hyraj26/' style={{textDecoration:'none'}}>linkedin</a>
                </p>

              </div>
            </div>

        </div>
    </>);
}

export default Hero;