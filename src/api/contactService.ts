import apiClient from "./apiConfig";
import {Contact} from "../../types/typesInterfaces";

export const getContacts = async () => {
  try {
    const response = await apiClient.get("/");
    console.log(response.data.items);
    return response.data.items;
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    throw error;
  }
};
// Obtener un contacto por ID
export const getContactById = async (id: number) => {
  try {
    const response = await apiClient.get(`/${id}`);
    console.log('id',response.data);
    return response.data; // Asumiendo que el cuerpo de la respuesta contiene el contacto
  } catch (error) {
    console.error("Error al obtener contacto:", error);
    throw error;
  }
};
export const createContact = async (contact: Contact) => {
  try {
    const response = await apiClient.post("/", contact);
    return response.data;
  } catch (error) {
    console.error("Error al crear contacto:", error);
    throw error;
  }
};
// Actualizar un contacto existente
export const updateContact = async (id: number, contact: Partial<Contact>) => {
  try {
    const response = await apiClient.patch(`/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar contacto:", error);
    throw error;
  }
};
// Eliminar un contacto existente
export const deleteContact = async (id: number) => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
    throw error;
  }
};

export const searchContact = async (field: string, value: string) => {
  try {
    // Construir la query con el parámetro proporcionado
    const query = `${field}='${value}'`;
    
    // Realizar la solicitud GET con el query dinámico
    const response = await apiClient.get(`?q=${query}`);
    
    // Retornar los resultados obtenidos
    return response.data;
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    throw error;
  }
}