import { EditContactProps } from "../../types/typesInterfaces";
const EditContact: React.FC<EditContactProps> = ({
  updateContact,
  setUpdateContact,
  saveUpdatedContact,
}) => {
  return (
    <div className="mt-4">
      <h2>Editar Contacto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveUpdatedContact(updateContact); // Guardar los cambios
        }}
      >
        <div>
          <label>Nombre:</label>
          <input
            className="form-control"
            type="text"
            value={updateContact.lookupName}
            onChange={(e) =>
              setUpdateContact({
                ...updateContact,
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
            value={updateContact.emails?.address || ""}
            onChange={(e) =>
              setUpdateContact({
                ...updateContact,
                emails: {
                  ...updateContact.emails,
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
            value={updateContact.phones?.number || ""}
            onChange={(e) =>
              setUpdateContact({
                ...updateContact,
                phones: {
                  ...updateContact.phones,
                  number: e.target.value,
                },
              })
            }
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditContact;
