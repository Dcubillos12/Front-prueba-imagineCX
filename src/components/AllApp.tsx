import { useState, useEffect } from "react";
import { createContact, searchContact } from "../api/contactService";

const NewContact = () => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  // Función para actualizar el estado con los valores ingresados en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Llamar a la función createContact pasando el estado contact
      const response = await createContact(contact);
      console.log("Contacto creado exitosamente:", response);
      // Aquí podrías agregar lógica adicional, como una redirección o limpiar el formulario
      setContact({ name: "", phone: "", email: "", city: "" });
    } catch (error) {
      console.error("Error al crear el contacto:", error);
    }
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={contact.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          className="form-control"
          type="text"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input
          className="form-control"
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Ciudad</label>
        <input
          className="form-control"
          type="text"
          name="city"
          value={contact.city}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>
  );
};
const SearchFilters = () => {
  const [contact, setContact] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [field, setField] = useState("address.city");

  useEffect(() => {
    const fetchData = async () => {
      if (value) {
        // Ejecuta la búsqueda solo si hay un valor
        try {
          const data = await searchContact(field, value);
          // Comprueba que `data.items` sea un array antes de actualizar el estado
          setContact(Array.isArray(data.items) ? data.items : []);
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
                      ></button>
                      <button
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
    </>
  );
};
const Findontacts = () => {
  return (
    <div className="m-4">
      <h1>Buscar por (Nombre - Ciudad - Telefono - Correo)</h1>
      <SearchFilters />
    </div>
  );
};
const AllApp = () => {
  return (
    <>
      <h1 className="text-center mb-4">
        {" "}
        Agenda de contactos{" "}
        <img
          style={{ width: "200px" }}
          src="https://imaginecx.co/wp-content/uploads/2023/01/logo-01.png"
          alt=""
        />
      </h1>
      <Findontacts />
      <hr />
      <h1 className="text-center mb-4">Crear Contacto</h1>
      <NewContact />
    </>
  );
};

export default AllApp;
