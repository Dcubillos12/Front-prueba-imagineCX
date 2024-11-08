import SearchFilters from "./SearchFilters";

const Findontacts = () => {
  return (
    <div className="m-4">
      <h1 className="text-warning">Buscar por (Nombre - Ciudad - Telefono - Correo)</h1>
      <SearchFilters />
    </div>
  );
};

export default Findontacts;
