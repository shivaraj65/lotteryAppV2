import React,{useState,useEffect} from 'react'
import axios from 'axios'
import * as QueryString from "query-string"
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./redirecter.css";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Redirecter=()=>{
    let {id}=useParams();
    let navigate = useNavigate();

    const [responseData,setResponseData]=useState("")
    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // let history = useHistory();
    // const redirect=(path)=>{
    //     history.push(path)
    // }

    useEffect(()=>{
        // alert(id);
        // axios 
        let formData = {ID:id};    
        // console.log(quizID);
        //header configuration for the CORS
        const config  = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin':'*'
        }}
        axios.post('http://localhost:3001/changeVerification', 
        QueryString.stringify(formData),config)
        .then(function (response) {
            console.log(response.data);
            if(response.data ==="success"){
                setResponseData("verification success")
                handleShow()
            }else if(response.data ==="failed"){
                setResponseData("verification failed.")
                handleShow()
            }
        })
        .catch(function (error) {
            alert("Error!! Check your Network and Try again.")
        });
    },[])

    return(
        <div className="custom-findQuiz-bg-edit fullscreen-custom">
            
                <div className="pt-4 text-center">
                    <div className="p-4 card form-signin mt-4">
                        <h5 className="text-secondary">verifying your Account</h5>
                        <hr/>
                        <h5 className="text-info">{id}</h5>
                        <div class="d-flex align-items-center mt-4 mx-4">
                            <strong>Verifying...</strong>
                            <div class="spinner-grow text-secondary ml-auto" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                >
                <Modal.Header>
                <Modal.Title className="text-secondary font-style-01 font-weight-bold">Lottery App</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-success text-center font-weight-bold font-style-03 ">
                    {responseData}
                </Modal.Body>
                <Modal.Footer>

                <Button 
                    variant="outline-info" 
                    onClick={()=>{navigate('/')}}
                    >
                    Return to Home
                </Button>
                </Modal.Footer>
            </Modal>                            
        </div>
    )
}
export default React.memo(Redirecter)