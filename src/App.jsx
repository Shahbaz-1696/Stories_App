
import { useEffect, useState } from 'react';
import './App.css';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
    })
    .catch((error) => console.log(error.message))
    .finally(() => setLoading(false));
  }, [])

  return loading ? (
    <h1>Something went wrong</h1>
  ) : (
    <div className='flex flex-wrap justify-between min-h-screen'>
      <div className='w-full block'>
        <Header />
        <main className='bg-slate-400 w-full'>
          <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
