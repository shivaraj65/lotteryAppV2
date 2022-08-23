import React,{useEffect,useState} from 'react';
import './dashboard.css';
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const contractAddress="0x869613d921bcd1bdd3b868290a731787499dd94f";
const abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Enter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "checkPlayerEntered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPlayers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resetContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const Dashboard=()=>{
    //state for the contract data
    // const [contract1, setcontract1] = useState(null);

    //states for the storage of the user data...
    const [manager, setmanager] = useState(null);
    const [signer,setSigner]=useState(null);

    //state for the contract display data
    const [contract1Data,setContract1Data]=useState(null);
    
    // states and function for the popup-modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const walletStatus=()=>{
        const target=document.getElementById("wallet-status");
        target.classList.remove("connection-status-red");
        target.classList.add("connection-status-green");

        const targetText=document.getElementById("connection-text");
        targetText.innerHTML="wallet connected";        
    }

    const fetchContract=async (signerAddress)=>{
        //try to connect to the infora contract and extract the data
        let provider =  new ethers.providers.Web3Provider(window.ethereum);

        // const provider = ethers.getDefaultProvider('rinkeby', {
        //     etherscan: '0xFF396da37631051DDB140F14AF1Ce54188A0D67f',
        //     infura: {
        //         projectID:'68ff658415d44cdfb93fdefb1f5dd32b',
        //         projectSecret: '86a787d516234a25b0e36dc33c183d34',
        //     }            
        // });
        // const link="https://rinkeby.infura.io/v3/68ff658415d44cdfb93fdefb1f5dd32b"
        // const provider = await new ethers.providers.JsonRpcProvider(link);
        console.log(provider);
        // console.log(contractAddress);
        // const user = await provider.getSigner();
        const contractu =await new ethers.Contract(contractAddress, abi, provider);
        // console.log(contractu);
        // console.log(abi);
        // const tets=await contractu.getInfo();
        setContract1Data(await contractu.getInfo());
        // console.log(tets);
        // console.log(ethers.utils.parseEther(contract1Data[1], {commify: true}));
        // console.log(ethers.utils.formatEther( tets[3] ));
        // console.log(tets[1].toNumber());
        // console.log(tets[2].toNumber());
        // console.log(tets[3].toNumber());
        // console.log("works fine!")
    }

    return(
        <div>
            <nav class="navbar navbar-dark fixed-top py-2" style={{backgroundImage: "linear-gradient(90deg, #8EC5FC 0%,#E0C3FC 70%, #E0C3FC 100%)", borderBottom:"1px groove #fdb7c3"}}>
                <a class="navbar-brand font-weight-bold font-style-01" href="#">Lottery App</a>
                <div className='ml-auto'>
                    <span className="text-dark font-weight-bold">{window.sessionStorage.getItem("userID")}</span>
                    <span className="mx-4 text-dark font-weight-bold">{window.sessionStorage.getItem("userName")}</span>
                    <button className='btn btn-outline-light font-weight-bold badge-pill'>Signout</button>
                </div>
            </nav> 
            <div className='mt-5 pt-4 container-fluid'>
                <div className='row '>
                    <div className='col-9'>
                        <h4 className='font-weight-light text-pink text-center mt-2 font-style-01'>Explore the world of Fortune in Crypto!</h4>
                        <hr className='divider'/>
                        <div className='p-2'>
                            <table className='table table-striped table-hover'>                               
                                <tr className='text-secondary'>
                                    <th scope="col">Name</th>
                                    <th scope="col" className='text-center'>Max Prize Pool</th>
                                    <th scope="col" className='text-center'>Tickets Available</th>
                                    <th scope="col" className='text-center'>Entry fee</th>
                                    <th scope="col" className='text-center'>More Details</th>
                                </tr>
                                <tbody>
                                    {contract1Data ?
                                        <tr className=''>
                                            <th scope="row" className='text-blue font-weight-normal h5'>{contract1Data[0]}</th>
                                            <td className='text-center text-pink'>{contract1Data[1]*0.01 +" "}<img className="mb-1" src="https://img.icons8.com/color/25/000000/ethereum.png"/></td>
                                            <td className='text-center text-pink'>{contract1Data[1].toNumber()-contract1Data[2].toNumber()}</td>
                                            <td className='text-center font-weight-bold text-pink'>0.01 <img className="mb-1 text-dark" src="https://img.icons8.com/color/25/000000/ethereum.png"/></td>
                                            <td className='text-center'>
                                                <button 
                                                    className='btn btn-outline-light btn-sm badge-pill px-3 border-dark'
                                                    onClick={()=>{handleShow()}}>
                                                    <img src="https://img.icons8.com/color/20/000000/more.png"/>
                                                </button>    
                                            </td>                                            
                                        </tr>:null 
                                    }                                                                                                           
                                </tbody>                                
                            </table>
                            {contract1Data?null:
                                <div className=' d-flex justify-content-center pl-3 pr-5 mt-5'>
                                    <strong className='text-pink display-size-6 font-weight-light'>Your wallet address is the key to explore the world of WEB3</strong>
                                    <div class="spinner-border ml-auto text-pink" role="status" ></div>                                    
                                </div>
                                
                            }
                        </div>
                    </div>

                    <div className='col-3'>
                        <div className='text-center p-2'>
                            <h4 className='font-weight-light font-italic text-info'>Connect your wallet</h4>
                            <hr className='divider'/>
                            <button 
                                className='btn btn-lg btn-block btn-outline-primary mt-4'
                                onClick={async()=>{
                                    const provider =new ethers.providers.Web3Provider(window.ethereum)
                                    await provider.send("eth_requestAccounts",[])
                                    // console.log(provider)
                                    const signer =await provider.getSigner()
                                    // console.log(signer)
                                    const address=async()=>{
                                        setmanager(await signer.getAddress());
                                        setSigner(signer);
                                        if(signer !== null){
                                            walletStatus();
                                            // alert("Your wallet has been successfully connected!");
                                            // setWalletAddress(signer.getAddress());
                                        }
                                        fetchContract(signer.getAddress());
                                    }
                                    address();
                            }}
                                >Metamask</button>
                            {manager?
                                <div className='mt-5 text-right'>
                                    <span className='h5 font-weight-light'>Connected to the Wallet :</span>
                                    <p className='overflow-hidden h5 mt-2 text-success'>{manager}</p>
                                </div>
                            :null}
                            <div className='mt-5'>
                                {/* <button onClick={()=>{console.log(manager)}}>get data</button> */}
                                {/* <h4 className='font-weight-light text-info  h5'>Like my work- Buy me a coffee!</h4>                                */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='connection-status-red px-5 py-1' id="wallet-status">
                    <span className='text-light' id="connection-text">wallet not connected</span>
                </div>
            </div>

            {/* popup */}
            <Modal
                show={show}
                size="lg"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                >
                <Modal.Header>
                <Modal.Title className="text-blue">{contract1Data?contract1Data[0]:null}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <div className=''>
                                {contract1Data?
                                    <div>
                                        <table className='table table-borderless table-hover'>
                                            <tbody>
                                                <tr>
                                                    <td className="font-weight-normal h5 text-secondary">Lottery Name :</td>
                                                    <td className='font-italic h5 text-pink'>{contract1Data[0]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-weight-normal h5 text-secondary">Current Prize Pool :</td>
                                                    <td className='font-italic h5 text-success'>{ethers.utils.formatEther(contract1Data[3], {commify: true})}<img className="mb-1" src="https://img.icons8.com/color/25/000000/ethereum.png"/></td>                                                                                                
                                                </tr>
                                                <tr>
                                                    <td className="font-weight-normal h5 text-secondary">Maximum Players :</td>
                                                    <td className='font-italic h5 text-pink'>{contract1Data[1].toNumber()}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-weight-normal h5 text-secondary">Tickets Available :</td>
                                                    <td className='font-italic h5 text-pink'>{contract1Data[1].toNumber()-contract1Data[2].toNumber()}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <hr className=''/>
                                        <div className='mt-4 mx-2'>
                                            <div className='row my-3'>
                                                <div className='col-4 text-center'>
                                                    <button 
                                                        className='btn btn-block btn-outline-info font-weight-bold'
                                                        onClick={async()=>{
                                                            const provider =new ethers.providers.Web3Provider(window.ethereum)                                                            
                                                            const contractu =await new ethers.Contract(contractAddress, abi, provider);
                                                            const returndata=await contractu.checkPlayerEntered(manager)
                                                            alert(returndata);

                                                        }}
                                                        >Check Enrollment</button>
                                                    <button 
                                                        className='btn btn-block btn-outline-success font-weight-bold'
                                                        onClick={async()=>{
                                                            const provider =new ethers.providers.Web3Provider(window.ethereum) 
                                                            // await provider.send("eth_requestAccounts",[])
                                                            const signer =await provider.getSigner()    
                                                            
                                                            // let tx = await contractWithSigner.setValue("I like turtles.");

                                                            const contractu =await new ethers.Contract(contractAddress, abi, signer);
                                                            const options = {value: ethers.utils.parseEther("0.01")}
                                                            await contractu.Enter(options);                                                           
                                                            // alert("ok");                                                 

                                                        }}
                                                        >Buy a Ticket</button>
                                                    <button 
                                                        className='btn btn-block btn-outline-dark font-weight-bold'
                                                        onClick={async()=>{
                                                            const provider =new ethers.providers.Web3Provider(window.ethereum);
                                                            const contractu =await new ethers.Contract(contractAddress, abi, provider);
                                                            const data=await contractu.getWinner();
                                                            if(data=="0x0000000000000000000000000000000000000000"){
                                                                alert("Yet to pick winner");
                                                            }else{
                                                                alert("winner is :"+ data);
                                                            }                                                            
                                                        }}
                                                        >Check Winner</button>
                                                </div>
                                                <div className='col-8'>

                                                </div>
                                            </div>
                                            {manager=="0x5656290721BCf63877a54c9DB578be3d51580fc1"?
                                                <div>
                                                    <hr/>
                                                    <h1 className='font-weight-light'>Contract Admin Features</h1> 
                                                    <div className='row mt-3'>                                                                                               
                                                        <div className='col-4'>
                                                        <button 
                                                            className='btn btn-block btn-warning font-weight-bold text-light'
                                                            onClick={async()=>{
                                                                const provider =new ethers.providers.Web3Provider(window.ethereum) 
                                                                // await provider.send("eth_requestAccounts",[])
                                                                const signer =await provider.getSigner()                                                                    

                                                                const contractu =await new ethers.Contract(contractAddress, abi, signer);
                                                                const options = {}
                                                                await contractu.pickWinner(options); 
                                                            }}
                                                            >Pick Winner</button>
                                                        <button 
                                                            className='btn btn-block btn-danger font-weight-bold'
                                                            onClick={async()=>{
                                                                const provider =new ethers.providers.Web3Provider(window.ethereum) 
                                                                const signer =await provider.getSigner() 
                                                                const contractu =await new ethers.Contract(contractAddress, abi, signer);
                                                                await contractu.resetContract();
                                                                alert("ok");
                                                            }}
                                                            >Reset Contract</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            :null}
                                            
                                            
                                            
                                        </div>

                                    </div>

                                :null}
                                
                            </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        
        </div>
    )
}

export default React.memo(Dashboard);