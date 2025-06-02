import mongoose from 'mongoose'

export const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/merndb');
        console.log('>>>> Conectado a MongoDB');
    } catch (error) {
        console.error('Error en la conexion con MongoDB:', error);
    }
}