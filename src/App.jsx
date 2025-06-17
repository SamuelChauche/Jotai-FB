import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage';
import { DevTools } from 'jotai-devtools'
import 'jotai-devtools/styles.css'

function App() {
  return (
    <Provider>
      <Router>
        <div className="app">
          <Navbar />
            <DevTools />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;