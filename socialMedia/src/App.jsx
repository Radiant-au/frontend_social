import Authentication from "./pages/Auth/Authentication";
import Home from "./pages/Home/Home";
import { Route, Routes } from 'react-router-dom';
import Noti from "./pages/Noti/Noti";
import Reels from "./pages/reels/Reels";
import CreateReelsForm from "./pages/reels/CreateReelsForm";
import Profile from "./pages/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileData } from "./redux/actions/profileData";
import Message from "./pages/messages/Message";

function PrivateRoute({ element }) {
  const { auth } = useSelector(store => store);
  return auth.user ? element : <Authentication />;
}

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileData(jwt));
    }
  }, [dispatch, jwt]);

  return (
    <Routes>
      <Route path='/*' element={auth.user ? <Home /> : <Authentication />}></Route>

      <Route path='/noti' element={<PrivateRoute element={<Noti />} />}></Route>

      <Route path='/reels' element={<PrivateRoute element={<Reels />} />}></Route>

      <Route path='/create-reels' element={<PrivateRoute element={<CreateReelsForm />} />}></Route>

      <Route path='/message' element={<PrivateRoute element={<Message />} />}></Route>

      <Route path='/profile/:id' element={<PrivateRoute element={<Profile />} />}></Route>
    </Routes>
  );
}

export default App;
