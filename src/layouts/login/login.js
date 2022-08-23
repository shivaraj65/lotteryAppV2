import React, {useState} from 'react';
import './login.css';
import Wallpaper from '../../assets/images/bg-side-001-clean.jpg'
import axios from 'axios'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login=()=>{
    let navigate = useNavigate();
    const [pageNav,setPageNav] = useState(null)

    // states and function for the modal
    const [popupContent,setPopupContent]=useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //states to hold the data of the input fields
    const [emailid, setemailid] = useState("")
    const [pass, setpass] = useState("")
    const [otp,setOTP] = useState("")

    //form submit handler
    const submitHandlerLogin=(event)=>{
        event.preventDefault();           
        const json ={Email: emailid,Password: pass};            
        const config  = {headers: {'Content-Type': 'application/json'}}
        axios.post('http://localhost:3001/loginWebsiteUser', JSON.stringify(json),config)
            .then(function (response) {              
                if(response.data.status==="success"){
                    window.sessionStorage.setItem('userName', response.data.name);
                    window.sessionStorage.setItem('userEmail',response.data.email);
                    window.sessionStorage.setItem('userID',response.data.id);
                    setPageNav(1);
                }else{
                    setPopupContent(response.data);
                    handleShow();
                }
            })
            .catch(function (error) {
                alert("error from frontend");
            });
    }

    const submitHandlerOTP = (event)=>{
        event.preventDefault();  
        const json ={Email: window.sessionStorage.getItem("userEmail"),Token:otp};            
        const config  = {headers: {'Content-Type': 'application/json'}}
        axios.post('http://localhost:3001/logintotp', JSON.stringify(json),config)
        .then(function (response) {              
            if(response.data.status==="success"){
                navigate("/dashboard/"+window.sessionStorage.getItem("userID"));                
            }else{
                setPopupContent(response.data);
                handleShow();
            }
        })
        .catch(function (error) {
            alert("error from frontend");
        });       
    }

    return(
        <div>
            <div className="container-fluid">
            <div className='closeButton'>
                    <button 
                        className='btn p-0 '
                        onClick={()=>{
                        navigate("/");
                    }}><img src="https://img.icons8.com/fluency/35/000000/delete-sign.png"/></button>                    
                </div>
            <div className="row">
                <div className="col-sm-7 px-0 mx-0 d-none d-sm-block">
                    <img src={Wallpaper} alt="login image1" className="login-img"/>
                </div>

                <div className="col-sm-5 login-section-wrapper">
                <div className="">
                    <h5 className="text-blue font-weight-bold h3 font-style-02 mb-0" style={{letterSpacing: "2px"}}>Lottery App</h5>
                </div>
                {pageNav=== null ? 
                    <div className="login-wrapper my-auto py-1">
                        <form onSubmit={submitHandlerLogin}>
                        <div className="form-group">
                            <label htmlFor="email" className='text-secondary'>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                required 
                                className="form-control text-info font-weight-bold" 
                                placeholder="email@example.com"
                                value={emailid}
                                onChange={(e)=>{setemailid(e.target.value)}}
                                />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" className='text-secondary'>Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                required
                                className="form-control text-info font-weight-bold" 
                                placeholder="enter your passsword"
                                value={pass}
                                onChange={(e)=>{setpass(e.target.value)}}
                                />
                        </div>
                        <button 
                            className="btn btn-block login-btnn font-style-03 font-weight-bold" 
                            type="submit"
                            style={{letterSpacing: "4px"}}
                            >Login &gt;</button>
                        </form>
                        <p className="login-wrapper-footer-text">Don't have an account? <Link to="/signup" className='pl-2'>Signup here</Link></p>
                    </div>
                :null}
                {pageNav===1?
                    <div className='border p-3 mt-2 text-center'>
                        <p className=" text-dark text-center font-style-03 ">Enter the TOTP from the Authenticator App. </p>
                        <hr/>
                        <img className='mb-4' src="https://img.icons8.com/fluency/150/000000/password-check.png"/>
                        <form onSubmit={submitHandlerOTP}>
                        <div className="form-group ">                                    
                            <input 
                                type="text" 
                                name="code" 
                                id="code"
                                required 
                                autoFocus
                                placeholder="enter your OTP"
                                className="form-control text-secondary font-weight-bold"                                        
                                value={otp}
                                onChange={(e)=>{setOTP(e.target.value)}}
                                />
                        </div>                             
                        <button 
                            className=" py-2 btn btn-block login-btnn text-blue border shadow font-style-03 font-weight-bold" 
                            type="submit"
                            style={{letterSpacing: "4px"}}
                            >Verify &gt;</button>
                        </form>
                    </div>
                :null}

                </div>                
            </div>
            </div>

            {/* popup */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                >
                <Modal.Header>
                <Modal.Title>Lottery App</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {popupContent}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default React.memo(Login);