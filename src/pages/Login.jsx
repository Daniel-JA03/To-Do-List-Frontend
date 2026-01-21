import { useForm } from "react-hook-form";
import UsuarioService from "../services/UsuarioService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await UsuarioService.verificarLogin(
        data.correo,
        data.password,
      );

      if (res.data === "approved") {
        const idRes = await UsuarioService.obtenerIdUsuario(data.correo);
        localStorage.setItem("userId", idRes.data);
        navigate("/tareas");
      } else {
        Swal.fire("Error", "Credenciales incorrectas", "error");
      }
    } catch {
      Swal.fire("Error", "Error al iniciar sesión", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo"
          {...register("correo", { required: true })}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
          className="w-full p-2 border rounded mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  );
}
