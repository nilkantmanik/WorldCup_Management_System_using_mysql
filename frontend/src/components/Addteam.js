import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

import './addteam.css'

function AddTeam() {
    const [teamid, setTeamId] = useState('');
    const [teamname, setTeamName] = useState('');
    const [teamowner, setTeamOwner] = useState('');
    const [noofplayers, setNoOfPlayers] = useState(0);

  const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ... [name]: value });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post("http://localhost:5000/addteam", {
            teamid,
            teamname,
            teamowner,
            noofplayers,
        });
        
        alert("Team Added Successfully");
        console.log(response.data);
        navigate("/");
      } catch (err) {
        alert("Could not Add new team ")
        console.log(err);
      }
  };

  return (
    <div className='teamform'>
      <h2>Add Team</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Team ID:
          <input
            type="text"
            name="teamid"
            value={teamid}
            onChange={(e)=>setTeamId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Team Name:
          <input
            type="text"
            name="teamname"
            value={teamname}
            onChange={(e)=>setTeamName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Team Owner:
          <input
            type="text"
            name="teamowner"
            value={teamowner}
            onChange={(e)=>setTeamOwner(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Number of Players:
          <input
            type="number"
            name="noofplayers"
            value={noofplayers}
            onChange={(e)=>setNoOfPlayers(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTeam;
