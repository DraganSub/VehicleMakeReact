import React from 'react';
import firebase from "../common/firebase"

const Vehicle = ({ vehicles ,loading, name, abrv }) => {
  if(loading){
    return <h2>Loading...</h2>
  }

  const ref = firebase.firestore().collection("vehicles");

  function deleteVehicle(vehicle){
    ref
    .doc(vehicle.id)
    .delete()
    .catch((err) => {
        console.error(err);
    })
  }

  function editVehicle(updatedVehicle){
    ref
    .doc(updatedVehicle.id)
    .update(updatedVehicle)
    .catch((err) => {
        console.error(err);
    })
  }

    return (
      <div>
        <table class="table ">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Model</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody> 
            {vehicles.map(vehicle =>(
            <tr>
              <td>{vehicle.name}</td>
              <td>{vehicle.abrv}</td>
              <td>  
                <button className="btn btn-danger" onClick={() => deleteVehicle(vehicle)}>Delete</button> 
                <button className="btn btn-primary" onClick={() => editVehicle({name, abrv, id: vehicle.id})}>Edit</button>
              </td>
        
        
      </tr>
    ))}
    </tbody>
  </table>
      
        </div>
        
    
    
    )
  };

export default Vehicle;