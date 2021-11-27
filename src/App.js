// import { io } from 'socket.io-client';
// import { useEffect } from 'react';
import './App.css';
import CvRoutes from './routes';

function App() {
  
  // useEffect(() => {
  //   const socket = io('http://localhost:8080');
  // }, [])

  return (
    <CvRoutes/>
  );
}

export default App;
