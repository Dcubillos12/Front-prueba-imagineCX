import { useEffect, useState } from "react";
import { Contacts } from "../../types/typesInterfaces";
import { saveContactsToLocalStorage } from "../api/contactService";

const NewContact = () => {
  const [contact, setContact] = useState<Contacts>({
    id: Date.now(),
    name: "",
    phones: "",
    emails: "",
    city: "",
  });
  const [contactos, setContactos] = useState<Contacts[]>([]); // Lista de contactos
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar contactos desde localStorage al iniciar el componente
  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContactos(JSON.parse(storedContacts));
    }
  }, []);

  // Guardar la lista de contactos en localStorage

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    setError(null);
    // Agregar nuevo contacto a la lista
    const newContacts = [...contactos, { ...contact, id: Date.now() }];
    setContactos(newContacts);
    saveContactsToLocalStorage(newContacts); // Guardar en localStorage

    // Restablecer el formulario
    setContact({
      id: Date.now(),
      name: "",
      phones: "",
      emails: "",
      city: "",
    });

    alert("Contacto creado con éxito");
  };

  return (
    <>
      <form className="m-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            required
            className="form-control"
            type="text"
            value={contact.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            className="form-control"
            type="email"
            value={contact.emails}
            name="emails"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefono</label>
          <input
            className="form-control"
            type="text"
            value={contact.phones}
            name="phones"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ciudad</label>
          <input
            className="form-control"
            type="phone"
            value={contact.city}
            name="city"
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? "Guardando..." : "Agregar Contacto"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
};

export default NewContact;
