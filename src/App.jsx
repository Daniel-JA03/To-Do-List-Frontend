import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Tareas from './pages/Tareas'
import NuevaTarea from './pages/NuevaTarea'
import Register from './pages/Register'
import EditarTarea from './pages/EditarTarea'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/nueva-tarea" element={<NuevaTarea />} />
          <Route path="/editar-tarea/:id" element={<EditarTarea />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
