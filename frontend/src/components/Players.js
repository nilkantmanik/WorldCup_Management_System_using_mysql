import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Players() {
  const { teamname } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(teamname);
        const response = await axios.post(`http://localhost:5000/teamplayers/${teamname}`);
        setPlayers(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [teamname]);

  return (
    <div>
      <h2>Players in Team {teamname} are:</h2>

      {players.length > 0 ? (
        <div style={{ width: "90rem", marginLeft: "2rem" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "10px" }}>Player Name</th>
                <th style={{ border: "1px solid black", padding: "10px" }}>Role</th>
                <th style={{ border: "1px solid black", padding: "10px" }}>Age</th>
                <th style={{ border: "1px solid black", padding: "10px" }}>Matches Played</th>
                <th style={{ border: "1px solid black", padding: "10px" }}>Runs Scored</th>
                <th style={{ border: "1px solid black", padding: "10px" }}>Wickets</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.player_id}>
                  <td style={{ border: "1px solid black", padding: "10px" }}>{player.p_name}</td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>{player.type_of_player}</td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>{player.age}</td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>{player.no_matches}</td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>{player.run_scored}</td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>{player.wickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No players fetched</div>
      )}
    </div>
  );
}

export default Players;
