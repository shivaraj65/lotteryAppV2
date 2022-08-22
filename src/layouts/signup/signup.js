import React,{useState} from 'react';
import axios from 'axios';
import './signup.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
// import GoogleLogin from 'react-google-login';

const Signup=()=>{
    let navigate = useNavigate();
    const [email,setemail]=useState("");
    const [name,setname]=useState("");
    const [password,setpassword]=useState("");
    const [passwordTest, setpasswordTest] = useState(null)

    const [popupContent,setPopupContent]=useState("")

    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //google signup response logger...
    // const responseGoogle = (response) => {
    //     console.log(response);
    // }

     //password test function
     const passwordTestfunc=(data)=>{
        if(!data.match(/[a-z]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a small letter"; 
        //   console.log("has no small letters");
        }else if(!data.match(/[A-Z]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a capital letter"; 
        //   console.log("has no cap letters")
        } else if(!data.match(/[0-9]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a number"; 
        //   console.log("has no a number")
        }else if(!(data.length >= 8)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "minimum password lenght must be 8"; 
        //   console.log("has no 8 digits")
        }else{
            setpasswordTest(true)
        //   console.log("good password")
          document.getElementById("password-validation-text").innerHTML = ""; 
        }
      }

    //form submit handler
    const submitHandlerRegister=(event)=>{
        event.preventDefault();
        if(passwordTest ===false){           
                alert("Kindly enter a password as per our Password Policy.");
        }else{
            // axios 
            const json ={Email: email,Name:name,Password: password};    
            // console.log(QueryString.stringify(formData));  
            //header configuration for the CORS
            const config  = {
                    headers: {
                        'Content-Type': 'application/json',
                    }
            }
            // console.log(json)
            axios.post('http://localhost:3001/signupUser', JSON.stringify(json),config)
                .then(function (response) {
                    // alert(response.data);
                    setPopupContent(response.data);
                    handleShow();
                })
                .catch(function (error) {
                    // console.log("error")
                    alert("error from frontend");
                });
        }//end of else       
    }

    return(
        <div className="register">
            <div className="form-signin-1 card shadow m-automt-5 px-3 py-4 width-register custom-background-12" >
                <div className="text-center ">
                    <h3 className="font-weight-bold register-heading h1 font-style-01 text-info pb-1" style={{opacity:"1"}}>Sign up</h3>                                               
                    <hr className='divider'/>                    
                </div>
                {/* <GoogleLogin
                        clientId="200562665634-61d156hkr51lq5u0a2nnlr17rljfcekq.apps.googleusercontent.com"
                        // render={renderProps => (
                        // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                        // )}
                        buttonText="Signup with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    /> */}
                    {/* <hr/> */}
                    {/* <p className='text-center text-info font-weight-bold'>or</p> */}
                <form onSubmit={submitHandlerRegister} className="mt-3">
                {/* <form> */}                    
                    <div className="form-group mb-3">
                        <label className="text-dark font-italic font-weight-bold">Email address</label>
                        <input 
                            type="email" 
                            value={email}
                            className="form-control text-info font-weight-bolder" 
                            onChange={(e)=>{
                                setemail(e.target.value);
                            }}
                            required 
                            autoFocus/>
                        <small id="emailHelp" className="form-text text-secondary">Your secrect stays safe with us!</small>
                    </div>
                    <div className="form-group my-3">
                        <label className="text-dark font-italic font-weight-bold">Name</label>
                        <input 
                            type="text" 
                            value={name}
                            className="form-control text-info font-weight-bolder"
                            onChange={(e)=>{
                                setname(e.target.value);
                            }} 
                            required/>
                    </div>                    
                    <div className="form-group pb-2">
                        <label className="text-dark font-italic font-weight-bolder">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            className="form-control text-info font-weight-bold" 
                            onChange={(e)=>{
                                setpassword(e.target.value)
                                passwordTestfunc(e.target.value);
                            }}
                            required/>
                        <p id="password-validation-text" className="text-danger text-center pt-1"></p>
                    </div>                   
                    <div className='row mb-2'>
                        <div className='col-md-6'>
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary btn-block mt-2 mb-2 font-weight-bold "
                                onClick={()=>{navigate("/login")}}
                                >Login</button>
                        </div>
                        <div className='col-md-6'>
                            <button type="submit" className="btn btn-info btn-block mt-2 mb-2 font-weight-bold font-style-01" style={{letterSpacing:"2px"}}>SUBMIT</button>
                        </div>
                    </div>                    
                </form>
            </div>
            {/* popup  */}
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
                    <Button variant="info" onClick={handleClose}>
                        Close
                    </Button>
                {/* <Button variant="primary">Understood</Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default React.memo(Signup);