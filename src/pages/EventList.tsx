import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store'; 
import {Link} from 'react-router-dom';


const EventList = () => {
  const event = useSelector((state: RootState) => state.event);


  if (!event.name) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Event Summary</h1>
      <p className="text-gray-500">No event created yet.</p>
        <Link to = "/create-event">
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create New Event
        </button>
        </Link>
    </div>
  );
}


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Event Summary</h1>

      <div className="bg-white p-4 rounded shadow">
        <p><strong>Event Name:</strong> {event.name}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Participants:</strong></p>
        <ul className="list-disc list-inside">
          {event.participants.map((person, index) => (
            <li key={index}>{person}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventList;
