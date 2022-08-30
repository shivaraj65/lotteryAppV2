import React,{useState} from 'react';
import axios from 'axios';
import './signup.css';
import Wallpaper from '../../assets/images/bg-side-001-clean.jpg'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup=()=>{
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
    const [name,setname] = useState("")
    const [passwordTest, setpasswordTest] = useState(null)
    const [qr,setQR] = useState(null)
    const [code,setcode] = useState("")

    //password test function
    const passwordTestfunc=(data)=>{
        if(!data.match(/[a-z]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a small letter";         
        }else if(!data.match(/[A-Z]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a capital letter";         
        } else if(!data.match(/[0-9]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a number";         
        }else if(!(data.length >= 8)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "minimum password lenght must be 8";         
        }else{
            setpasswordTest(true)        
          document.getElementById("password-validation-text").innerHTML = ""; 
        }
      }

    //form submit handler
    const submitHandlerRegister=(event)=>{ 
        event.preventDefault();
        if(passwordTest ===false){           
            alert("Kindly enter a password as per our Password Policy.");
        }else{            
            const json ={Email: emailid,Name:name,Password: pass};                            
            const config  = { headers: { 'Content-Type' : 'application/json' } }            
            axios.post('https://server-lotteryapp.herokuapp.com/signupUser', JSON.stringify(json),config)
                .then(function (response) { 
                    if(response.data.status==="failed"){
                        setPopupContent(response.data.message);
                        handleShow();
                    } else {
                        // window.sessionStorage.setItem('userEmail',emailid);
                        console.log(response.data);
                        setQR(response.data.qr);
                        setPageNav(1);
                    }                             
                })
                .catch(function (error) {                    
                    alert("Something went wrong Try Again!");
                });
        }  
    }

    const submitHandlerQR=(event)=>{
        event.preventDefault();
        const json ={Token:code,Email:emailid};                            
        const config  = { headers: { 'Content-Type' : 'application/json' } }
        axios.post('https://server-lotteryapp.herokuapp.com/tokenVerify  ', JSON.stringify(json),config)
                .then(function (response) { 
                    if(response.data.status==="failed"){
                        setPopupContent(response.data.message);
                        handleShow();
                    } else {
                        setPopupContent(response.data.message);
                        handleShow();                                                            
                    }                             
                })
                .catch(function (error) {                    
                    alert("Something went wrong Try Again!");
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
                    <h5 className="text-primary font-weight-bold h3 font-style-02 mb-0" style={{letterSpacing: "2px"}}>Lottery App</h5>
                </div>
                {pageNav==null ?
                    <div className="login-wrapper my-auto py-1 ">
                        <form onSubmit={submitHandlerRegister}>
                        <div className="form-group">
                            <label htmlFor="name" className='text-secondary'>Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name"
                                required 
                                autoFocus
                                className="form-control text-info font-weight-bold" 
                                placeholder="enter your name"
                                value={name}
                                onChange={(e)=>{setname(e.target.value)}}
                                />
                        </div>
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
                                onChange={(e)=>{
                                    setpass(e.target.value)
                                    passwordTestfunc(e.target.value);
                                }}
                                />
                                <p id="password-validation-text" className="text-danger text-center pt-1"></p>
                        </div>
                        <button 
                            className="btn btn-block login-btnn font-style-03 font-weight-bold" 
                            type="submit"
                            style={{letterSpacing: "4px"}}
                            >Signup &gt;</button>
                        </form>                                        
                        <p className="login-wrapper-footer-text">Already have an account? <Link to="/login" className='pl-2'>Login here</Link></p>
                    </div>
                     :null}    
                    {pageNav==1?
                        <div className='card border p-3 mt-2 text-center'>
                            <h5 className="text-blue font-weight-bold  font-style-03 m-0" style={{letterSpacing: "2px"}}>STEP-2</h5>
                            <p className=" text-secodary text-center mb-0">Scan the QR code in any TOTP Authenticator! and Enter the code </p>    
                            <p className=" text-dark text-center mb-0">Google Authenticator is suggested</p>    
                            <img src={qr} height="200px" width="200px" alt="login image1" className="m-auto"/>
                            <form onSubmit={submitHandlerQR}>
                                <div className="form-group mb-2">                                    
                                    <input 
                                        type="text" 
                                        name="code" 
                                        id="code"
                                        required 
                                        autoFocus
                                        className="form-control text-blue font-weight-bold"                                        
                                        value={code}
                                        onChange={(e)=>{setcode(e.target.value)}}
                                        />
                                </div>                             
                                <button 
                                    className=" py-2 btn btn-block login-btnn btn-primary font-style-03 font-weight-bold" 
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

export default React.memo(Signup);