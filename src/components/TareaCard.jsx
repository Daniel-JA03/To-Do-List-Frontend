import Swal from "sweetalert2";
import TareaService from "../services/TareaService";
import { useNavigate } from "react-router-dom";
// Iconos
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TareaCard({ tarea }) {
  const navigate = useNavigate();

  // Dentro de TareaCard.jsx

const ahora = new Date();
const fechaLimite = tarea.fecha_limite ? new Date(tarea.fecha_limite) : null;
const completada = tarea.estado === "COMPLETADO";

let estadoVisual = tarea.estado;
let claseEstado = "";

if (completada && fechaLimite) {
  // Completada: ¿fue a tiempo o con retraso?
  if (ahora > fechaLimite || new Date() > fechaLimite) {
    estadoVisual = "Completado (con retraso)";
    claseEstado = "bg-orange-900/50 text-orange-300";
  } else {
    estadoVisual = "Completado";
    claseEstado = "bg-green-900/50 text-green-300";
  }
  } else if (!completada && fechaLimite && new Date() > fechaLimite) {
    // No completada y vencida
    estadoVisual = "Vencida";
    claseEstado = "bg-red-900/50 text-red-300";
  } else {
    // Pendiente o en progreso (a tiempo)
    if (tarea.estado === "PENDIENTE") {
      claseEstado = "bg-yellow-900/50 text-yellow-300";
    } else if (tarea.estado === "EN_PROGRESO") {
      claseEstado = "bg-blue-900/50 text-blue-300";
    } else {
      claseEstado = "bg-gray-900/50 text-gray-300";
    }
  }

  const eliminar = async () => {
    const res = await Swal.fire({
      title: "¿Eliminar tarea?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (res.isConfirmed) {
      try {
        await TareaService.eliminarTarea(tarea.ide_tar);
        window.location.reload();
      } catch {
        Swal.fire("Error", "No se pudo eliminar la tarea", "error");
      }
    }
  };

  const editar = () => {
    navigate(`/editar-tarea/${tarea.ide_tar}`);
  };

  return (
    <div className="pedido-card">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{tarea.titulo}</h3>
          <p className="text-gray-300 text-sm mt-1 opacity-90">
            {tarea.descripcion || "Sin descripción"}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={editar}
            className="text-blue-400 hover:text-blue-300 text-lg cursor-pointer"
            title="Editar"
          >
            <FaEdit />
          </button>
          <button
            onClick={eliminar}
            className="text-red-400 hover:text-red-300 text-lg cursor-pointer"
            title="Eliminar"
          >
            <MdDelete />
          </button>
        </div>
      </div>

      {tarea.fecha_limite && (
        <p className="text-xs text-gray-400 mt-2 flex items-center">
          <FaCalendarAlt className="mr-1" />
          Límite: {new Date(tarea.fecha_limite).toLocaleString()}
        </p>
      )}

      {/* Mostrar estado o "Vencida" si aplica */}
      { (
        <span className={`inline-block px-2 py-1 text-xs rounded mt-3 ${claseEstado}`}>
    {estadoVisual}
  </span>
      )}
    </div>
  );
}