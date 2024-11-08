import { useState } from "react";
import { Contacts } from "../../types/typesInterfaces";
import { db } from "../../db";

const NewContact = () => {
  const [contact, setContact] = useState<Contacts>({
    id: 0,
    name: "",
    phones: "",
    emails: "",
    city: "",
  });
  const [contactos, setContactos] = useState<Contacts[]>([]); // Lista de contactos
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Eliminar el 'id' antes de agregar el contacto para asegurarse de que Dexie lo asigne automáticamente
      const { id: existingId, ...contactWithoutId } = contact;

      // Agregar contacto en Dexie
      const newId = await db.contacts.add(contactWithoutId);

      alert("Nuevo contacto agregado con id:", newId);

      // Actualizar el estado con el contacto recién creado
      setContactos([...contactos, { ...contactWithoutId, id: newId }]);

      // Restablecer el formulario
      setContact({
        id: 0,
        name: "",
        phones: "",
        emails: "",
        city: "",
      });

      setCargando(false);
    } catch (error) {
      console.error("Error al agregar contacto:", error);
      setError("Hubo un problema al guardar el contacto.");
    }
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
