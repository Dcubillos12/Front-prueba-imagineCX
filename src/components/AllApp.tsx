import { useState } from "react";
import Findontacts from "./Findontacts";
import NewContact from "./NewContact";

const AllApp = () => {
  const [create, setCreate] = useState(false);
  return (
    <>
      <img
        style={{ width: "200px" }}
        src="https://imaginecx.co/wp-content/uploads/2023/01/logo-02.png"
        alt=""
      />

      <Findontacts />
      <button onClick={() => setCreate(!create)}>Crear Contacto</button>
      <hr />
      {create && (
        <>
          <h1 className="text-center mb-4">Crear Contacto</h1>
          <NewContact />
        </>
      )}
    </>
  );
};

export default AllApp;
