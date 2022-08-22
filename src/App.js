import logo from './logo.svg';
import './App.css';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Landing from './layouts/landing/landing';
import Dashboard from './layouts/dashboard/dashboard';
import Login from './layouts/login/login';
import Signup from './layouts/signupG/signup';
import Redirecter from './layouts/redirecter/redirecter';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Landing/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/dashboard/:id" element={<Dashboard/>} />
          {/* <Route exact path="mailauth" element={<Landing/>} > */}
            <Route path="/mailauth/:id" element={<Redirecter/>} />
          {/* </Route> */}
        
      </Routes>
    </HashRouter>
  );
}

export default App;
