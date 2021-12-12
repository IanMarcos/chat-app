import UserProvider from './context/userSession';
import CvRoutes from './routes';
import './App.css';

function App() {
  return (
    <UserProvider>
      <CvRoutes/>
    </UserProvider>
  );
}

export default App;
