import axios from 'axios';

const TAREA_API_BASE_URL = "https://localhost:7240/api/Tarea"

class TareaService {
    listarTareasPorUsuario(usuarioId) {
        return axios.get(`${TAREA_API_BASE_URL}/ListarTareasPorUsuario/${usuarioId}`);
    }

    obtenerTareaPorId(id) {
        return axios.get(`${TAREA_API_BASE_URL}/ObtenerTareaPorId/${id}`);
    } 

    agregarTarea(tarea) {
        return axios.post(`${TAREA_API_BASE_URL}/AgregarTarea`, tarea);
    }

    actualizarTarea(tarea) {
        return axios.put(`${TAREA_API_BASE_URL}/ActualizarTarea`, tarea);
    }

    eliminarTarea(id) {
        return axios.delete(`${TAREA_API_BASE_URL}/EliminarTarea/${id}`);
    }
}

export default new TareaService();