import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TareaService from "../services/TareaService";
import Swal from "sweetalert2";
import { FaAlignLeft, FaHeading, FaTasks } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function EditarTarea() {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    TareaService.obtenerTareaPorId(id).then((res) => {
      const t = res.data;
      setValue("titulo", t.titulo);
      setValue("descripcion", t.descripcion);
      setValue("estado", t.estado);
    });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await TareaService.actualizarTarea({
        ide_tar: id,
        ...data,
      });

      Swal.fire("Éxito", "Tarea actualizada", "success");
      navigate("/tareas");
    } catch {
      Swal.fire("Error", "Error al actualizar tarea", "error");
    }
  };

  return (

    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-md">
          <div className="pedido-card w-full">
            <h2 className="text-2xl font-bold text-center mb-6">Editar Tarea</h2>
      
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
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
      
              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-left">
                  Estado
                </label>
                <div className="relative">
                  <FaTasks className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    {...register("estado")}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="EN_PROGRESO">En progreso</option>
                    <option value="COMPLETADO">Completado</option>
                  </select>
                </div>
              </div>
      
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Actualizar Tarea
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
