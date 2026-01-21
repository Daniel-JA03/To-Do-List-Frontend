import { useForm } from "react-hook-form";
import UsuarioService from "../services/UsuarioService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const existe = await UsuarioService.existeCorreo(data.cor_usr);

      if (existe.data === true || existe.data === 1) {
        Swal.fire("Error", "El correo ya existe", "error");
        return;
      }

      await UsuarioService.registrarUsuario(data);
      Swal.fire("Éxito", "Usuario registrado correctamente", "success");
      navigate("/login");
    } catch {
      Swal.fire("Error", "Error al registrar usuario", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Registrarse</h2>

        <input
          placeholder="Nombre"
          {...register("nom_usr", { required: true })}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          placeholder="Apellido"
          {...register("ape_usr", { required: true })}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="email"
          placeholder="Correo"
          {...register("cor_usr", { required: true })}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          {...register("pwd_usr", { required: true })}
          className="w-full p-2 border rounded mb-4"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Registrarse
        </button>

        {/* 👇 Enlace para ir a login */}
        <p className="text-center mt-4 text-sm">
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Inicia sesión aquí
          </button>
        </p>
      </form>
    </div>
  );
}