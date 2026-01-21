import Swal from "sweetalert2";
import TareaService from "../services/TareaService";
import { useNavigate } from "react-router-dom";
// Iconos
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TareaCard({ tarea }) {
  const navigate = useNavigate();

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
    navigate(`/editar-tarea/${tarea.ide_tar}`); // ← ¡Ajustado a tu ruta!
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{tarea.titulo}</h3>
          <p className="text-gray-700 mt-1">{tarea.descripcion || "Sin descripción"}</p>
          <span
            className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
              tarea.estado === "COMPLETADO"
                ? "bg-green-100 text-green-800"
                : tarea.estado === "EN_PROGRESO"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {tarea.estado}
          </span>
        </div>
        <div className="flex space-x-2">
          {/* Botón Editar con ícono */}
          <button
            onClick={editar}
            className="text-blue-600 hover:text-blue-800 text-xl"
            title="Editar"
          >
            <FaEdit />
          </button>
          {/* Botón Eliminar con ícono */}
          <button
            onClick={eliminar}
            className="text-red-600 hover:text-red-800 text-xl"
            title="Eliminar"
          >
            <MdDelete />
          </button>
        </div>
      </div>

      {tarea.fecha_limite && (
        <p className="text-sm text-gray-500 mt-2 flex items-center">
          <FaCalendarAlt className="mr-1 text-gray-400" />
          Límite: {new Date(tarea.fecha_limite).toLocaleString()}
        </p>
      )}
    </div>
  );
}