import { useForm } from "react-hook-form"
import TareaService from "../services/TareaService"
import { useNavigate } from "react-router-dom"

export default function NuevaTarea() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  const onSubmit = async (data) => {
    await TareaService.agregarTarea({
      ...data,
      usuario_id: userId
    })
    navigate("/tareas")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Nueva Tarea</h2>

      <input
        placeholder="Título"
        {...register("titulo", { required: true })}
        className="w-full p-2 border mb-3"
      />

      <textarea
        placeholder="Descripción"
        {...register("descripcion")}
        className="w-full p-2 border mb-3"
      />

      <input
        type="datetime-local"
        {...register("fecha_limite")}
        className="w-full p-2 border mb-4"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar
      </button>
    </form>
  )
}