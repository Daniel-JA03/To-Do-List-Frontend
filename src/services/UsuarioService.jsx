import axios from 'axios';

const USUARIO_BASE_REST_API_URL = "https://localhost:7240/api/Usuario"

class UsuarioService {
    verificarLogin(correo, password) {
        return axios.get(`${USUARIO_BASE_REST_API_URL}/VerificarLogin`, {
        params: { correo, password }
        });
    }

    obtenerIdUsuario(correo) {
        return axios.get(`${USUARIO_BASE_REST_API_URL}/ObtenerIdUsuario`, {
        params: { correo }
        });
    }

    registrarUsuario(usuario) {
        return axios.post(`${USUARIO_BASE_REST_API_URL}/RegistrarUsuario`, usuario);
    }

    existeCorreo(correo) {
        return axios.get(`${USUARIO_BASE_REST_API_URL}/ExisteCorreo`, {
        params: { correo }
        });
    }
}

export default new UsuarioService();