// import { io } from 'socket.io-client';
// import { useEffect } from 'react';
import './App.css';
import UserProvider from './context/userSession';
import CvRoutes from './routes';

function App() {
  
  // useEffect(() => {
  //   const socket = io('http://localhost:8080');
  // }, [])

  return (
    <UserProvider>
      <CvRoutes/>
    </UserProvider>
  );
}

export default App;
