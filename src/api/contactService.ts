import apiClient from "./apiConfig";
import { Contact } from "../../types/typesInterfaces";
import axios from "axios";

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
    console.log("id", response.data);
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
};

export const agregarContacto = async (
  e: React.FormEvent<HTMLFormElement>,
  nuevoContacto: { name: string; email: string; phone: string; city: string },
  contactos: any[],
  setContactos: React.Dispatch<React.SetStateAction<any[]>>,
  setNuevoContacto: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
      email: string;
      phone: string;
      city: string;
    }>
  >,
  setCargando: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  e.preventDefault();
  setCargando(true);
  setError(null);

  try {
    // Validar datos del contacto
    if (
      !nuevoContacto.name ||
      !nuevoContacto.email ||
      !nuevoContacto.phone ||
      !nuevoContacto.city
    ) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Realizar la solicitud POST
    const respuesta = await axios.post(
      "https://cors-anywhere.herokuapp.com/http://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts",
      {
        name: nuevoContacto.name,
        email: nuevoContacto.email,
        phone: nuevoContacto.phone,
        city: nuevoContacto.city,
      },
      {
        auth: {
          username: "ICXCandidate",
          password: "Welcome2024",
        },
      }
    );

    // Agregar el nuevo contacto al estado y a localStorage
    const contactosActualizados = [...contactos, respuesta.data];
    setContactos(contactosActualizados);
    setNuevoContacto({
      id: 0,
      name: "",
      email: "",
      phone: "",
      city: "",
    });
    guardarContactosEnLocalStorage(contactosActualizados);
  } catch (error: any) {
    console.error("Error al agregar contacto:", error);
    setError(error.message || "Error al agregar el contacto.");
  } finally {
    setCargando(false);
  }
};

// Función auxiliar para guardar contactos en localStorage
export const guardarContactosEnLocalStorage = (contactos: any[]) => {
  localStorage.setItem("contactos", JSON.stringify(contactos));
};

export const editarContactoExistente = async (
  e: React.FormEvent<HTMLFormElement>,
  editarContacto: {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
  },
  contactos: any[],
  setContactos: React.Dispatch<React.SetStateAction<any[]>>,
  setEditarContacto: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
      email: string;
      phone: string;
      city: string;
    }>
  >,
  setCargando: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  e.preventDefault();
  setCargando(true); // Indicamos que está cargando
  setError(null); // Limpiamos errores previos

  try {
    // Validar datos del contacto
    if (
      !editarContacto.name ||
      !editarContacto.email ||
      !editarContacto.phone ||
      !editarContacto.city
    ) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Realizar la solicitud PATCH para editar el contacto
    const respuesta = await axios.patch(
      `https://cors-anywhere.herokuapp.com/http://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/${editarContacto.id}`,
      {
        name: editarContacto.name,
        email: editarContacto.email,
        phone: editarContacto.phone,
        city: editarContacto.city,
      },
      {
        auth: {
          username: "ICXCandidate", // Asegúrate de que las credenciales son correctas
          password: "Welcome2024",
        },
      }
    );

    // Actualizar el contacto en el estado
    const contactosActualizados = contactos.map((contacto) =>
      contacto.id === editarContacto.id ? respuesta.data : contacto
    );
    setContactos(contactosActualizados);

    // Limpiar el formulario de edición
    setEditarContacto({
      id: 0,
      name: "",
      email: "",
      phone: "",
      city: "",
    });

    // Guardar los contactos actualizados en localStorage
    localStorage.setItem("contactos", JSON.stringify(contactosActualizados));
  } catch (error: any) {
    console.error("Error al editar contacto:", error);
    setError(error.message || "Error al editar el contacto.");
  } finally {
    setCargando(false); // Detener el estado de carga
  }
};

export const eliminarContacto = async (
  id: number,
  contactos: any[],
  setContactos: React.Dispatch<React.SetStateAction<any[]>>,
  setCargando: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setCargando(true); // Indicamos que está cargando
  setError(null); // Limpiamos errores previos

  try {
    // Filtrar el contacto que se va a eliminar
    const contactosActualizados = contactos.filter(
      (contacto) => contacto.id !== id
    );

    // Realizar la solicitud DELETE para eliminar el contacto
    await axios.delete(
      `http://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/${id}`,
      {
        auth: {
          username: "ICXCandidate", // Asegúrate de que las credenciales son correctas
          password: "Welcome2024",
        },
      }
    );

    // Actualizamos el estado de los contactos
    setContactos(contactosActualizados);

    // Guardar los contactos actualizados en localStorage
    localStorage.setItem("contactos", JSON.stringify(contactosActualizados));
  } catch (error: any) {
    console.error("Error al eliminar contacto:", error);
    setError(error.message || "Error al eliminar el contacto.");
  } finally {
    setCargando(false); // Detener el estado de carga
  }
};
