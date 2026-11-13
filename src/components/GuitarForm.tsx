import { useState } from "react";

export default function GuitarForm({ addGuitar }: GuitarFormProps) {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje("");

    // Validaciones antes de enviar
    if (!marca || !modelo || !precio || !descripcion) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (Number(precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }

    const errorServidor = await addGuitar({
      marca,
      modelo,
      precio: Number(precio),
      descripcion,
    });

    if (errorServidor) {
      setError(errorServidor);
      return;
    }

    setError("");
    setMensaje("Guitarra guardada correctamente");
    setMarca("");
    setModelo("");
    setPrecio("");
    setDescripcion("");
  };

  return (
    <section className="mt-5">
      <h2 className="text-center">Registrar Guitarra</h2>

      <form className="guitar-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {mensaje && <p className="success-message">{mensaje}</p>}

        <label htmlFor="marca">Marca</label>
        <input
          id="marca"
          type="text"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <label htmlFor="modelo">Modelo</label>
        <input
          id="modelo"
          type="text"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />

        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <button type="submit" className="btn btn-dark w-100 mt-3 p-2">
          Guardar Guitarra
        </button>
      </form>
    </section>
  );
}
