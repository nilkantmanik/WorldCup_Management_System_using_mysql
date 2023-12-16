// Updatewins.jsx

import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './updatewins.css'; // Import the CSS file
import axios from 'axios';

function Updatewins() {
  const { teamname } = useParams();

  const [win,setwins] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async ()=>{

    const response = await axios.put('http://localhost:5000/updatewins',{teamname,win});

    console.log(response);
    navigate('/teams');

  }

  return (
    <div className="container">
      <div className="title">Update win for {teamname}</div>

      <label htmlFor="win">Enter win here</label>
      <input id="win" type="text"  value={win} onChange={(e) => setwins(e.target.value)} />

      <input type="button" value="Submit" onClick={handleSubmit}/>
    </div>
  );
}

export default Updatewins;
