import React from 'react'

import './home.css'

function Home() {
  return (
    <>
    <div className='home' style={{fontSize:"50px"}}>Welcome to Cricket Management System</div>

      <h2>This is built using React for Frontend </h2>
      <h2>Node for backend </h2>
      <h2>MySQL as Database</h2>

      <p>Operation that can be performed</p>
      <ul style={{color:"black"}}>
        <li>Add team (Create)</li>
        <li>View Points Table(Read)</li>
        <li>Can update wins for team(Update)</li>
        <li>Can delete a team(Delete)</li>
        <> and other</>
      </ul>
    </>
  )
}

export default Home