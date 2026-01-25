import { useForm } from "react-hook-form";
import UsuarioService from "../services/UsuarioService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await UsuarioService.verificarLogin(data.correo, data.password);

      if (res.data === "approved") {
        const idRes = await UsuarioService.obtenerIdUsuario(data.correo);
        localStorage.setItem("ide_usr", idRes.data);
        localStorage.setItem("nom_usr", data.correo); // o mejor: nombre real si lo tienes
        navigate("/tareas");
      } else {
        Swal.fire("Error", "Credenciales incorrectas", "error");
      }
    } catch {
      Swal.fire("Error", "Error al iniciar sesión", "error");
    }
  };

  return (
    // 👇 Contenedor con overflow-x-hidden para evitar scroll horizontal
    <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md">
        <div className="pedido-card">
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Campo Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 text-left">
                Correo electrónico
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="tu@ejemplo.com"
                  {...register("correo", { required: true })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 text-left">
                Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Ingresar
            </button>

            <p className="text-center mt-4 text-sm text-gray-400">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Regístrate aquí
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}