import React ,{useState, useEffect, Fragment} from "react";
import firebase from "../common/firebase"
import {v4 as uuidv4} from "uuid"
import Vehicle from "./Vehicle"


function VehicleMake (){
    //state hooks initializations
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [abrv, setAbrv] = useState("");
    const [currentPage, setCurrentPage] = useState(1);  
    const [vehiclesPerPage] = useState(6);  

    const totalVehicles = vehicles.length; // Total Vehicles

    //paginating getting first and last index of items
    const lastVehicleIndex = currentPage * vehiclesPerPage;
    const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage;
    const currentPost = vehicles.slice(firstVehicleIndex,lastVehicleIndex);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const ref = firebase.firestore().collection("vehicles");        //database collection connection

  
    function getVehicles(){
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) =>{
            items.push(doc.data());
          });
          setVehicles(items);
          setLoading(false);
          })        
    }
    useEffect(()=>{
        getVehicles(); 
    },[])
    
    //add vehicle function
    function addVehicle (newVehicle){
       ref
        .doc(newVehicle.id)
        .set(newVehicle)
        .catch((err)=>{
            console.error(err);
        })
    }   

    //submit form function
    const handleSubmit = e => {
       e.preventDefault();
       addVehicle({name,abrv,id: uuidv4()});
       e.target.reset();
    };
        
    
    //paging 
    const pageNumbers = [];
    const ceil = totalVehicles / vehiclesPerPage;
    for (let i = 1; i <= Math.ceil(ceil); i++) {
      pageNumbers.push(i);
    }

    return(
        <Fragment>
            <div>
            <div classNameName="inputBox" >
                    <h3  className="d-flex justify-content-center">ADD NEW VEHICLE AND MODEL</h3>
                    <form  onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Add name</span>
                                </div>
                            <input type="text" className="form-control" placeholder="Vehicle name" aria-label="Username" aria-describedby="basic-addon1" required onChange={(e) => setName(e.target.value)}/>
                        </div> 
                    </div>   

                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Add Model</span>
                        </div>
                        <textarea className="form-control" placeholder="Vehicle Model" aria-label="With textarea"required onChange={(e) => setAbrv(e.target.value)} />
                    </div>
                    <div class="col text-end">
                         <button className="btn btn-success"  >
                        Submit
                    </button>
                    </div>
                   </form>


                <h1 className="d-flex justify-content-center">Total Vehicles: {totalVehicles}</h1>
                <Vehicle vehicles={currentPost} loading ={loading} name={name} abrv={abrv}/>


                <div className="d-flex justify-content-center">
                    <ul className='pagination'>
                        {pageNumbers.map(number => (
                            <li key={number} className='page-item'>
                                <a onClick={() => paginate(number)} href='!#' className='page-link'>
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            
           
                
            </div>
        </div>
        </Fragment>       
    )
}               
export default VehicleMake;             
               
  
    
  
  

                   
               
 
    
 
  

               
                
                
            
            
        
          
              
            
       

