import React from 'react'
import './landing.css';
import { useNavigate } from "react-router-dom";

const Landing=()=>{
    let navigate = useNavigate();

    return(
        <div className=''>           
            <header className="masthead">
                <div className="container pt-4">
                    <div className="row  align-items-center justify-content-center text-center">
                        <div className="col-lg-10 align-self-end">
                            <h1 className="text-uppercase display-1 text-gradient-01 font-style-01">lottery app</h1>
                            <hr className="divider my-4 bg-secondary" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white font-weight-light mb-5 font-style-01">Welcome to the World of fortune.</p>
                            <h4 className="text-white-50 font-weight-light mb-5 ">Join with us</h4>
                            <button  
                                className='btn btn-light btn-lg loginbutton px-4 py-2 text-info' 
                                onClick={()=>{
                                    navigate("/signup")
                                }}>
                                Signup
                            </button>
                            <p className="text-white font-weight-light mt-5">Already have an Account 
                                <button 
                                    className="btn btn-info btn-sm loginbutton ml-3 px-3"
                                    onClick={()=>{
                                        navigate("/login");
                                    }}    
                                >login</button>
                            </p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default React.memo(Landing);


