import {connect} from 'mongoose'; // importo la funcion connect de mongoose

const MONGO_URL = 'mongodb://localhost:27017/backendEccomerceProject'; //Defino la url de la base de datos 



export const  dbConection = async () => {
    try{
        await connect(MONGO_URL); // conecto a la base de datos 
    }catch(error){
        throw new Error(`Error de conexion a la base de datos: $(error)`) // Lanzo un error si no se conecta a la base de datos
    }
};

