import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Navbar from './components/navbar';

function App() {
  return (
    <main className='pb-14 lg:pb-0'>
      {/* <Header/> */}
    
      <div>
          <Outlet/>
      </div>
      </main>
  );
}

export default App;
