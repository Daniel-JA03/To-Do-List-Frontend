import { useEffect, useState } from "react"
import TareaService from "../services/TareaService"
import { useNavigate } from "react-router-dom"
import TareaCard from "../components/TareaCard"
import Navbar from "../components/Navbar"
import { FaPlus } from "react-icons/fa"


export default function Tareas() {
  const [tareas, setTareas] = useState([])
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    if (!userId) navigate("/login")

    TareaService.listarTareasPorUsuario(userId)
      .then(res => setTareas(res.data))
      .catch(() => alert("Error al cargar tareas"));
  }, [userId, navigate]);

  // Agrupar tareas por estado
  const pendientes = tareas.filter(t => t.estado === "PENDIENTE");
  const enProgreso = tareas.filter(t => t.estado === "EN_PROGRESO");
  const completadas = tareas.filter(t => t.estado === "COMPLETADO");

  return (
    <>
    <Navbar />
      <div className="p-6 pt-4 min-h-screen">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/nueva-tarea")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 cursor-pointer"
          >
            <FaPlus /> Nueva Tarea
          </button>
        </div>

        {/* Diseño Kanban: 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Columna Pendiente */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-3 text-yellow-600">⏳ Pendiente</h2>
            <div className="space-y-3">
              {pendientes.length > 0 ? (
                pendientes.map(t => <TareaCard key={t.ide_tar} tarea={t} />)
              ) : (
                <p className="text-gray-500 text-sm">No hay tareas pendientes</p>
              )}
            </div>
          </div>

          {/* Columna En Progreso */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-3 text-blue-600">🔄 En Progreso</h2>
            <div className="space-y-3">
              {enProgreso.length > 0 ? (
                enProgreso.map(t => <TareaCard key={t.ide_tar} tarea={t} />)
              ) : (
                <p className="text-gray-500 text-sm">No hay tareas en progreso</p>
              )}
            </div>
          </div>

          {/* Columna Completada */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-3 text-green-600">✅ Completadas</h2>
            <div className="space-y-3">
              {completadas.length > 0 ? (
                completadas.map(t => <TareaCard key={t.ide_tar} tarea={t} />)
              ) : (
                <p className="text-gray-500 text-sm">No hay tareas completadas</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}