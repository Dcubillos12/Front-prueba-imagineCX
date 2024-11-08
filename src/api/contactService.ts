import apiClient from "./apiConfig";
import { Contacts } from "../../types/typesInterfaces";

export const searchContact = async (field: string, value: string) => {
  try {
    // Construir la query con el parámetro proporcionado
    const query = `${field}='${value}'`;

    // Realizar la solicitud GET con el query dinámico
    const response = await apiClient.get(`?q=${query}`);

    // Si la respuesa es exitosa guradamos en el localStorage

    if (response.status === 200) {
      localStorage.setItem("contactos", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    //si hay error obtener los contactoss del localstore
    const contactsBackUp = JSON.parse(
      localStorage.getItem("contactos") || "[]"
    );
    // si no hay respaldo , lanzar error
    if (contactsBackUp.length === 0) {
      throw new Error(
        "No se pudo obtener los contactos, ni desde la API ni del respaldo"
      );
    }
    console.log("Usando localStore como respaldo");

    return contactsBackUp;
  }
};
export const updateContact = async (id: number, contact: Contacts) => {
  try {
    const response = await apiClient.put(`/${id}`, contact);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al actualizar el contacto en la API:", error);

    // Respaldar en localStorage en caso de error con la API
    const storedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    const updatedContacts = storedContacts.map((storedContact: Contacts) =>
      storedContact.id === id ? contact : storedContact
    );
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    console.log("Contacto actualizado en localStorage como respaldo.");

    return contact;
  }
};
export const saveContactsToLocalStorage = (contacts: Contacts[]) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};
