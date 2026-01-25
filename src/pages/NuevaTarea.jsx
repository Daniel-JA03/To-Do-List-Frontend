import { useForm } from "react-hook-form";
import TareaService from "../services/TareaService";
import { useNavigate } from "react-router-dom";
import { FaAlignLeft, FaCalendarAlt, FaHeading } from "react-icons/fa";

export default function NuevaTarea() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.getItem("ide_usr");

  const onSubmit = async (data) => {
    try {
      await TareaService.agregarTarea({
        ...data,
        usuario_id: userId,
        estado: "PENDIENTE",
      });
      navigate("/tareas");
    } catch (error) {
      console.error("Error al crear tarea:", error);
      alert("Error al guardar la tarea");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md">
        <div className="pedido-card w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Nueva Tarea</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 text-left">
                Título
              </label>
              <div className="relative">
                <FaHeading className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Ej: Comprar víveres"
                  {...register("titulo", { required: true })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 text-left">
                Descripción
              </label>
              <div className="relative">
                <FaAlignLeft className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  placeholder="Detalles de la tarea..."
                  {...register("descripcion")}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
            </div>

            {/* Fecha límite */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 text-left">
                Fecha límite
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="datetime-local"
                  {...register("fecha_limite")}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Guardar Tarea
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
