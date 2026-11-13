// Conexion con la API del backend
const API_URL = "http://localhost:4000/api/guitarras";

// GET: traer todas las guitarras de la base de datos
export async function getGuitars(): Promise<Guitar[]> {
  const response = await fetch(API_URL);
  const result = await response.json();
  // el precio llega como texto ("299.00"), se convierte a numero
  return result.data.map((guitar: Guitar) => ({
    ...guitar,
    precio: Number(guitar.precio),
  }));
}

// POST: guardar una guitarra nueva
export async function createGuitar(guitar: GuitarForm) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(guitar),
  });
  return await response.json();
}
