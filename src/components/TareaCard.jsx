import Swal from "sweetalert2"
import TareaService from "../services/TareaService"


export default function TareaCard({ tarea }) {

  const eliminar = async () => {
    const res = await Swal.fire({
      title: "¿Eliminar tarea?",
      showCancelButton: true,
      confirmButtonText: "Sí",
    })

    if (res.isConfirmed) {
      await TareaService.eliminarTarea(tarea.ide_tar)
      window.location.reload()
    }
  }

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold">{tarea.titulo}</h3>
      <p>{tarea.descripcion}</p>
      <span className="text-sm text-gray-600">{tarea.estado}</span>

      <div className="mt-2">
        <button
          onClick={eliminar}
          className="text-red-600 text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}