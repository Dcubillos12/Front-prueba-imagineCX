import { useEffect, useState } from "react";
import { searchContact } from "../api/contactService";
import EditContact from "./EditContact";
import { ContactSearch } from "../../types/typesInterfaces";
import apiClient from "../api/apiConfig";

const SearchFilters = () => {
  const [contact, setContact] = useState<ContactSearch[]>([]);
  const [value, setValue] = useState("");
  const [field, setField] = useState("address.city");
  const [updateContact, setUpdateContact] = useState<ContactSearch | null>(
    null
  );
  useEffect(() => {
    // Cargar contactos desde el localStorage al inicio, como respaldo inicial
    const storedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    setContact(storedContacts);
  }, []);

  // * uso esclusivo de la barra de busqueda y de los filtros y el respaldo
  useEffect(() => {
    const fetchData = async () => {
      if (value) {
        // Ejecuta la búsqueda solo si hay un valor
        try {
          const data = await searchContact(field, value);
          setContact(data.items);
        } catch (error) {
          console.error("Error al obtener contactos:", error);
          setContact([]); // !Reinicia la lista de contactos si ocurre un error
        }
      }
    };
    fetchData(); //Utilizando la recursion
  }, [field, value]);

  // * uso esclusivo del boton de limpieza
  const clearFilters = () => {
    setContact([]);
    setValue("");
  };

  // * Función para editar un contacto existente
  const editExistingContact = (contactToEdit: ContactSearch) => {
    setUpdateContact(contactToEdit);
  };
  const saveUpdatedContact = async (updatedContact: ContactSearch) => {
    try {
      // Llamada a la API para actualizar el contacto
      const response = await apiClient.put(
        `/contacts/${updatedContact.id}`,
        updatedContact
      );

      if (response.status === 200) {
        // Actualiza el contacto en el estado local si la respuesta es exitosa
        const updatedContacts = contact.map((item) =>
          item.id === updatedContact.id ? updatedContact : item
        );
        setContact(updatedContacts);
      }
    } catch (error) {
      console.error("Error al guardar el contacto editado:", error);

      // En caso de error, guardar la última modificación en el localStorage
      const updatedContacts = contact.map((item) =>
        item.id === updatedContact.id ? updatedContact : item
      );
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      setContact(updatedContacts);
    }
    setUpdateContact(null); // Limpiar el estado de edición
  };

  // * Función para eliminar un contacto y del localStorage
  const deleteContact = async (id: number) => {
    try {
      const response = await apiClient.delete(`/contacts/${id}`);

      if (response.status === 200) {
        // Actualiza el estado local eliminando el contacto
        const updatedContacts = contact.filter((item) => item.id !== id);
        setContact(updatedContacts);
      }
    } catch (error) {
      console.error("Error al eliminar contacto:", error);

      // Respaldar en localStorage si falla la eliminación en la API
      const updatedContacts = contact.filter((item) => item.id !== id);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      setContact(updatedContacts);
    }
  };

  return (
    <>
      <div className="input-group">
        <select
          className="form-select mb-3 mt-3"
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
          value={field}
          onChange={(e) => setField(e.target.value)}
        >
          <option value="address.city">Ciudad</option>
          <option value="name.first">Nombre</option>
          <option value="emails.address">Correo</option>
          <option value="phones.number">Telefono</option>
        </select>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="form-control"
          placeholder="Escriba el texto o numero a buscar"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
      </div>
      <button
        onClick={clearFilters}
        aria-label="Limpiar filtros"
        className="btn btn-warning"
      >
        Limpiar
      </button>
      <div className="mt-3 border border-light border-4 rounded-4">
        <table className="table-responsive table table-dark mt-2">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Actualizacion</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {contact.length > 0 ? (
              // * Sia hay contactos se ejecuta el renderizado de la tabla
              contact
                .filter((item: any) => item.lookupName) // Filtra solo los elementos que tienen lookupName garantizando limpiar los vacios en la tabla
                .map((item: any) => (
                  <tr key={item.id}>
                    {" "}
                    {/* Fila de datos */}
                    <td className="black">
                      <strong>{item.lookupName}</strong>
                    </td>{" "}
                    {/* Columna de nombre */}
                    <td>{item.updatedTime || "Fecha no disponible"}</td>{" "}
                    {/* Columna de fecha de actualización */}
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-secondary bi bi-trash"
                          onClick={() => deleteContact(item.id)}
                        ></button>
                        <button
                          onClick={() => editExistingContact(item)}
                          type="button"
                          className="btn btn-outline-secondary bi bi-pencil-square"
                        ></button>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={3}>No se encontraron contactos</td>{" "}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <hr />
      {/* Aquí puedes renderizar el formulario para editar el contacto si `updateContact` no es null */}
      {updateContact && (
        <EditContact
          updateContact={updateContact}
          setUpdateContact={setUpdateContact}
          saveUpdatedContact={saveUpdatedContact}
        />
      )}
    </>
  );
};

export default SearchFilters;
