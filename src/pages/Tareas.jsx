import { useEffect, useState } from "react"
import TareaService from "../services/TareaService"
import { useNavigate } from "react-router-dom"
import TareaCard from "../components/TareaCard"


export default function Tareas() {
  const [tareas, setTareas] = useState([])
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    if (!userId) navigate("/login")

    TareaService.listarTareasPorUsuario(userId)
      .then(res => setTareas(res.data))
      .catch(() => alert("Error al cargar tareas"))
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Mis Tareas</h1>
        <button
          onClick={() => navigate("/nueva-tarea")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Nueva Tarea
        </button>
      </div>

      <div className="grid gap-4">
        {tareas.map(t => (
          <TareaCard key={t.ide_tar} tarea={t} />
        ))}
      </div>
    </div>
  )
}