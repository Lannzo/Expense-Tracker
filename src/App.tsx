import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateEventPage from './pages/CreateEvent';
import EventPage from './pages/EventSummary';
import { useAppSelector } from './app/hooks';

function App() {
  const eventName = useAppSelector((state) => state.event.name);

  return (
    <>
      <Router>
        <div className="container mx-auto p-4">
          <header className="text-center my-6">
            <h1 className="text-4xl font-bold text-primary">Magkano Utang Ko?</h1>
            <p className="text-lg text-gray-600">Shared Expense Tracker</p>
          </header>
          <Routes>
            <Route path="/" element={!eventName ? <CreateEventPage /> : <Navigate to="/event" />} />
            <Route path="/event" element={eventName ? <EventPage /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;