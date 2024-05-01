import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

import { useContext, useEffect } from 'react';
import axios from 'axios';
import { authContext } from './context/authContext';
import Homepage from './pages/Homepage';
import AllFeedback from './pages/AllFeedback';
import UserFeedback from './pages/UserFeedback';
import CreateFeedback from './pages/CreateFeedback';
import SingleFeedback from './pages/SingleFeedback';
import YoutubeSearch from './pages/YoutubeSearch';

function App() {
  const { setUser } = useContext(authContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/current_user');
        console.log(data);
        setUser(data || false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setUser]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="search" element={<YoutubeSearch />} />
        <Route path="feedbacks" element={<AllFeedback />} />
        <Route path="feedbacks/:feedbackId" element={<SingleFeedback />} />
        <Route path="feedbacks/new" element={<CreateFeedback />} />
      </Route>
    </Routes>
  );
}

export default App;
