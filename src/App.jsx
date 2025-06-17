import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Common/Layout'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Posts from './pages/Posts/Posts'
import ProtectedRoute from './components/Common/ProtectedRoute'
import CreatePost from './pages/Posts/CreatePost'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="posts" element={<Posts />} />
            <Route path="posts/create" element={<CreatePost />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App