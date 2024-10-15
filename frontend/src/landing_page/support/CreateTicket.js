import React from 'react';
import { Link } from 'react-router-dom';
function CreateTicket() {
    return (
         <>
         <div className='container'>
            <div className=' row mt-4 mr-5'>
                      <h2 className='text-muted mb-5'>To create a ticket, select a relevant topic</h2>
                        <div className='col-12 col-md-4'>
                        <h3 style={{fontWeight:"400",margin:'17px 0 30px 0'}}>Account Opening</h3>
                         <p > <Link  to="#" style={{textDecoration:"none"}}>Getting started</Link></p>
                          
                         <p > <Link to="#" style={{textDecoration:"none"}}>Online</Link></p>
                          
                          <p><Link to="#" style={{textDecoration:"none"}}>Offline</Link></p>
                         
                          <p >
                          <Link to="#" style={{textDecoration:"none"}}>Charges</Link>
                          </p>
                         
                          <p >
                          <Link to="#" style={{textDecoration:"none"}}>Company, Partnership and HUF</Link>
                          </p>
                          
                         <p >
                         <Link to="#" style={{textDecoration:"none"}}>Non Resident Indian (NRI)</Link>
                         </p>
                         

                        </div>
                       
                        <div className='col-12 col-md-4'>
                        <h3 style={{fontWeight:"400", margin:'15px 0 30px 0px'}}>Your MarketIntel Account</h3>
                         <p > <Link  to="#" style={{textDecoration:"none"}}>Login credentials</Link></p>
                          
                         <p > <Link to="#" style={{textDecoration:"none"}}>Your Profile</Link></p>
                          
                          <p><Link to="#" style={{textDecoration:"none"}}>Account modification and segment addition</Link></p>
                         
                          <p >
                          <Link to="#" style={{textDecoration:"none"}}>CMR & DP ID</Link>
                          </p>
                         
                          <p >
                          <Link to="#" style={{textDecoration:"none"}}>Nomination</Link>
                          </p>
                          
                         <p >
                         <Link to="#" style={{textDecoration:"none"}}>Transfer and conversion of shares</Link>
                         </p>
                         

                        </div>
                        
                        <div className='col-12 col-md-4'>
                        <h3 style={{fontWeight:"400",margin:'15px 0 30px 0px'}}>Trading and Markets</h3>
                         <p > <Link  to="#" style={{textDecoration:"none"}}>Trading FAQs</Link></p>
                          
                         <p > <Link to="#" style={{textDecoration:"none",marginBottom:"20px"}}>Kite</Link></p>
                          
                          <p><Link to="#" style={{textDecoration:"none",marginBottom:"20px"}}>Margins</Link></p>
                         
                          <p >
                          <Link to="#" style={{textDecoration:"none",marginBottom:"20px"}}>Product and order types</Link>
                          </p>
                         
                          <p >
                          <Link to="#" style={{textDecoration:"none",marginBottom:"20px"}}>Corporate actions</Link>
                          </p>
                          
                         <p >
                         <Link to="#" style={{textDecoration:"none",marginBottom:"20px"}}>Kite features</Link>
                         </p>
                        </div>

                    </div>
                    <div className=' row mt-4 mr-5'>
                     
                        <div className='col-12 col-md-4'>
                        <h3 style={{fontWeight:"400",margin:'17px 0 30px 0'}}>Funds</h3>
                         <p > <Link  to="#" style={{textDecoration:"none"}}>Fund withdrawal</Link></p>
                          
                         <p > <Link to="#" style={{textDecoration:"none"}}>Adding funds</Link></p>
                          
                          <p><Link to="#" style={{textDecoration:"none"}}>Adding bank accounts</Link></p>
                         
                          <p >
                          <Link to="#" style={{textDecoration:"none"}}>eMandates</Link>
                          </p>
                         
                          
                         

                        </div>
                       
                        <div className='col-12 col-md-4'>
                        <h3 style={{fontWeight:"400", margin:'15px 0 30px 0px'}}>Console</h3>
                         <p > <Link  to="#" style={{textDecoration:"none"}}>IPO</Link></p>
                          
                         <p > <Link to="#" style={{textDecoration:"none"}}>Portfolio</Link></p>
                          
                          <p><Link to="#" style={{textDecoration:"none"}}>Funds statement</Link></p>
                         
                          <p >
                          <Link to="#" style={{textDecoration:"none"}}>Profile</Link>
                          </p>
                         
                          <p >
                          <Link to="#" style={{textDecoration:"none"}}>Reports</Link>
                          </p>
                          
                         <p >
                         <Link to="#" style={{textDecoration:"none"}}>Referral program</Link>
                         </p>
                         

                        </div>
                        
                        <div className='col-12 col-md-4'>
                        <h3 style={{fontWeight:"400",margin:'15px 0 30px 0px'}}>Coin</h3>
                         <p > <Link  to="#" style={{textDecoration:"none"}}>Understanding mutual funds and coin</Link></p>
                          
                         <p > <Link to="#" style={{textDecoration:"none",marginBottom:"20px"}}>Coin app</Link></p>
                          
                          <p><Link to="#" style={{textDecoration:"none",marginBottom:"20px"}}>Coin web</Link></p>
                         
                          <p >
                          <Link to="#" style={{textDecoration:"none",marginBottom:"20px"}}>Transcations</Link>
                          </p>
                         
                          <p  >
                          <Link to="#" style={{textDecoration:"none",marginBottom:"20px"}}>National Pension Scheme (NPS)</Link>
                          </p>
                          
                         
                        </div>

                    </div>

            </div>
    </> );
}

export default CreateTicket;