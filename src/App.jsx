import React from 'react'
import Home from '../Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewMeetingPage from '../Pages/NewMeetingPage';
import JoinRoom from '../Pages/JoinRoom';
import MeetingPage from '../Pages/MeetingPage';
const App = () => {
  return (
   <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/newMeetingPage" element={<NewMeetingPage />} /> */}
        <Route path="/MeetingPage" element={<MeetingPage />} />
        {/* <Route path="/joinRoomPage" element={<JoinRoom />} /> */}
      </Routes>
    </Router>    
   </>
  )
}

export default App