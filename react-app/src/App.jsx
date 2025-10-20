import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import './App.css';
import Dashboard from './components/Dashboard.jsx';
import TodosUsuarios from './components/TodosUsuarios.jsx';
import VerUmUsuario from './components/VerUmUsuario.jsx';


function App() {
  return (
    <Router>
      <div className="App"> 
        <Routes> 
          <Route exact path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/dashboard" element={<Dashboard />} />  
          <Route path="/todosusuarios" element={<TodosUsuarios />} /> 
          <Route path="/ver-usuario/:username" element={<VerUmUsuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
