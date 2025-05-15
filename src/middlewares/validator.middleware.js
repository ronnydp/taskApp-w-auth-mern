export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // Valida el cuerpo de la solicitud
        next(); // Si la validación es exitosa, continúa al siguiente middleware o controlador
    } catch (error) {
        const errors = error.errors.map((err) => err.message); // Extrae los mensajes de error
        return res.status(400).json(errors); // Devuelve un error 400 con los mensajes de error
    }
}