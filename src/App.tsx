import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventList from './pages/EventList';



function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to = "/">Home</Link>
        <Link to = "/create-event">Create Event</Link>
        <Link to = "/event-list">Event List</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event-list" element={<EventList />} />
        
      </Routes>
    </Router>
  );
  
};

export default App;
