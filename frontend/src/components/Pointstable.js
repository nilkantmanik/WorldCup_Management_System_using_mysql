import React, { useEffect, useState } from "react";
import axios from "axios";

import './pointstable.css';

function Pointstable() {
  const [teams, setTeams] = useState([]);
  const [matches,setmatches] =useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pointstable");
        setTeams(response.data.data);
        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          const highestWins = response.data.data[0].no_of_wins;
          setmatches(highestWins);
        }
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>Standings as of the Season 2023</div>

      {teams ? (
        // set matches highest wins of first teams matches here
        
        <div style={{width:"90rem",marginLeft:"2rem"}}>
          <table>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px" }}>Team Name</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Matches</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Wins</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Loses</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teams) && teams.map((team) => (
              <tr key={team.team_id}>
                <td style={{ border: "1px solid black", padding: "10px" }}>{team.team_name}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{matches}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{team.no_of_wins}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{matches-team.no_of_wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <div>Not fetched</div>
      )}
    </>
  );
}

export default Pointstable;
