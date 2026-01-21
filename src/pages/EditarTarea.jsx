import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TareaService from "../services/TareaService";
import Swal from "sweetalert2";

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
  }, [id]);

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
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Editar Tarea</h2>

      <input
        {...register("titulo", { required: true })}
        className="w-full p-2 border mb-3"
      />

      <textarea
        {...register("descripcion")}
        className="w-full p-2 border mb-3"
      />

      <select
        {...register("estado")}
        className="w-full p-2 border mb-4"
      >
        <option value="PENDIENTE">Pendiente</option>
        <option value="EN_PROGRESO">En progreso</option>
        <option value="COMPLETADO">Completado</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Actualizar
      </button>
    </form>
  );
}
