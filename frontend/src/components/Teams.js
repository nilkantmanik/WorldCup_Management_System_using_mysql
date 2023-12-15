import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import './teams.css'

import BlurredWindow from './Model';

function Teams() {
  const [teams,setTeams] = useState();
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/teams");
        setTeams(response.data.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [refresh]);

  const handleViewPlayers = (teamname) =>{

    // navigate("/players");
    navigate(`/players/${encodeURIComponent(teamname)}`);
  }

  const handleDeleteTeam = async (teamname) =>{

    const response = await axios.delete('http://localhost:5000/deleteteam',{data:{teamname}});
    console.log(response);
    setRefresh((prevRefresh) => !prevRefresh);

  }

  const handlePopup = async () =>{
        console.log("pop up clicked");
        <BlurredWindow />
  }

  return (
    <>
        {teams ? (
          <div style={{width:"90rem",marginLeft:"2rem"}}>
        <table>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px" }}>Team Name</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Wins</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Owner</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Number of Players</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>View Players</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Delete</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Update Wins</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teams) && teams.map((team) => (
              <tr key={team.team_id}>
                <td style={{ border: "1px solid black", padding: "10px" }}>{team.team_name}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{team.no_of_wins}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{team.owner}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{team.no_of_players}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  <button onClick={() => handleViewPlayers(team.team_name)}>
                        View all players
                      </button>
                  </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  <button onClick={() => handleDeleteTeam(team.team_name)}>
                  <FaTrash /> Delete
                      </button>
                  </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  <button onClick={() => handlePopup(team.team_name)}>
                  Update wins
                      </button>
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
     ) : (
      <div>Not fetched</div>
    )}
    </>
  )
}

export default Teams