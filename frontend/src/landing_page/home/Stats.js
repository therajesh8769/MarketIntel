import React from 'react';
function Stats() {
    return ( 
        <div className='container mt-5 mb-5 my-5'>
            <div className='row'>
                <div className='col-12 col-md-6 mb-3 mb-md-0'>
                    <img className='img-fluid' src='media/zlecosystem.png' alt="MarketIntel Ecosystem" />
                </div>
                <div className='col-12 col-md-6'>
                    <h1 className=''>Trust with confidence</h1>
                    <h3 className='mb-4 mt-4'>Customer-first always</h3>
                    <p>That's why 1.5+ crore customers trust MarketIntel with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>
                    
                    <h3 className='mb-4 mt-4'>No spam or gimmicks</h3>
                    <p>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
                    
                    <h3 className='mb-4 mt-4'>The MarketIntel universe</h3>
                    <p>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>

                    <h3 className='mb-4 mt-4'>Do better with money</h3>
                    <p className='mb-3 ' style={{wordSpacing:'1px'}}>
                        With initiatives like
                        <a href="#" className='link-opacity-50' style={{textDecoration:"none"}}>Nudge</a> 
                        and
                        <a href="#" className='link-opacity-50 spacing' style={{textDecoration:"none"}}>Kill Switch</a>,
                        we don't just facilitate transactions, but actively help you do better with your money.
                    </p>
                </div>
            </div>
        </div>
     );
}

export default Stats;