
export default function Guitar({ guitar, addToCart }: GuitarProps) {
    const { id, marca, modelo, descripcion, precio } = guitar;
    // se usa una de las 12 fotos de public/img segun el id
    const imagen = `guitarra_${String(((id - 1) % 12) + 1).padStart(2, '0')}`;

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${imagen}.jpg`} alt={`imagen guitarra ${modelo}`} />
            </div>
            <div className="col-8">
                <p className="guitar-brand text-uppercase">{marca}</p>
                <h3 className="text-black fs-4 fw-bold text-uppercase">{modelo}</h3>
                <p>{descripcion}</p>
                <p className="fw-black text-primary fs-3">${precio}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitar)}
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    )
}
