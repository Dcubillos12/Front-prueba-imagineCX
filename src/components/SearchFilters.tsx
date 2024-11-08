import { useEffect, useState } from "react";
import { searchContact } from "../api/contactService";

const SearchFilters = () => {
  const [contact, setContact] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [field, setField] = useState("address.city");
  const [contactoEditado, setContactoEditado] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (value) {
        // Ejecuta la búsqueda solo si hay un valor
        try {
          const data = await searchContact(field, value);
          // Comprueba que `data.items` sea un array antes de actualizar el estado
          setContact(data.items);
          // Llama a `result` para enviar los datos al componente padre si está definido
        } catch (error) {
          console.error("Error al obtener contactos:", error);
          setContact([]);
        }
      }
    };
    fetchData();
  }, [field, value]);
  const hadleClean = () => {
    setContact([]);
    setValue("");
  };

  // Función para editar un contacto existente
  const editarContactoExistente = (contacto: any) => {
    // Actualiza el estado con el contacto seleccionado para editar
    setContactoEditado(contacto);
  };

  // Función para guardar los cambios después de editar
  const guardarContactoEditado = async (contactoEditado: any) => {
    try {
      // Aquí podrías hacer una llamada a la API para actualizar el contacto, por ejemplo:
      // await axios.put(`http://example.com/contacts/${contactoEditado.id}`, contactoEditado);

      // Actualiza el estado local de los contactos con el nuevo contacto editado
      const contactosActualizados = contact.map((item) =>
        item.id === contactoEditado.id ? contactoEditado : item
      );
      setContact(contactosActualizados);
      setContactoEditado(null); // Limpiar el estado de edición
      console.log("Contacto editado:", contactoEditado); // Para depuración
    } catch (error) {
      console.error("Error al guardar el contacto editado:", error);
    }
  };

  // Función para eliminar un contacto
  const eliminarContacto = async (id: number) => {
    try {
      // Eliminar el contacto del estado
      const contactosActualizados = contact.filter((item) => item.id !== id);
      setContact(contactosActualizados);

      // Aquí puedes agregar la llamada a la API para eliminar el contacto del servidor
      // await axios.delete(`http://example.com/contacts/${id}`);

      // Guardar los contactos actualizados en localStorage
      localStorage.setItem("contactos", JSON.stringify(contactosActualizados));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
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
      <div>
        <button onClick={hadleClean}>Clean</button>
      </div>

      <table className="table-responsive">
        <thead>
          <tr>
            {" "}
            {/* Fila de encabezado */}
            <th>Nombre</th>
            <th>Fecha de creación</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {contact.length > 0 ? (
            contact
              .filter((item: any) => item.lookupName) // Filtra solo los elementos que tienen lookupName
              .map((item: any) => (
                <tr key={item.id}>
                  {" "}
                  {/* Fila de datos */}
                  <td className="black">
                    <strong>{item.lookupName}</strong>
                  </td>{" "}
                  {/* Columna de nombre */}
                  <td>{item.createdTime || "Fecha no disponible"}</td>{" "}
                  {/* Columna de fecha de creación */}
                  <td>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-outline-secondary bi bi-trash"
                        onClick={() => eliminarContacto(item.id)}
                      ></button>
                      <button
                        onClick={() => editarContactoExistente(item)}
                        type="button"
                        className="btn btn-outline-secondary bi bi-pencil-square"
                      ></button>
                    </div>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              {" "}
              {/* Fila si no se encuentran contactos */}
              <td colSpan={3}>No se encontraron contactos</td>{" "}
              {/* Colspan para que ocupe toda la fila */}
            </tr>
          )}
        </tbody>
      </table>
      <hr />
      {/* Aquí puedes renderizar el formulario para editar el contacto si `contactoEditado` no es null */}
      {contactoEditado && (
        <div className="mt-4">
          <h2>Editar Contacto</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              guardarContactoEditado(contactoEditado); // Guardar los cambios
            }}
          >
            <div>
              <label>Nombre:</label>
              <input
                className="form-control"
                type="text"
                value={contactoEditado.lookupName}
                onChange={(e) =>
                  setContactoEditado({
                    ...contactoEditado,
                    lookupName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Correo:</label>
              <input
                className="form-control"
                type="email"
                value={contactoEditado.emails?.address || ""}
                onChange={(e) =>
                  setContactoEditado({
                    ...contactoEditado,
                    emails: {
                      ...contactoEditado.emails,
                      address: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label>Teléfono:</label>
              <input
                className="form-control"
                type="text"
                value={contactoEditado.phones?.number || ""}
                onChange={(e) =>
                  setContactoEditado({
                    ...contactoEditado,
                    phones: {
                      ...contactoEditado.phones,
                      number: e.target.value,
                    },
                  })
                }
              />
            </div>
            <button type="submit">Guardar Cambios</button>
          </form>
        </div>
      )}
    </>
  );
};

export default SearchFilters;
