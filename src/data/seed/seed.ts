import { envs } from "../../config";
import { MongoDatabase, UserModel, categoryModel, productModel } from "../mongo";
import { seedData } from "./data";



(async() => {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    });

    await main();

    await MongoDatabase.disconnect(); // Para cerrar la conexión con la base de datos al finalizar el script de seed
})();


// Sirve para obtener un número aleatorio entre 0 y x
const randomBetween0AndX = (x: number) => {
    return Math.floor( Math.random() * x );
}


async function main() {

    //? 0. Borrar todo! para evitar información duplicada o basura
    await Promise.all([
        UserModel.deleteMany(), // Elimina todos los usuarios
        categoryModel.deleteMany(), // Elimina todas las categorías
        productModel.deleteMany(), // Elimina todos los productos
    ])

    //? 1. Crear un usuario
    const user = await UserModel.insertMany( seedData.users ); // Inserta todos los usuarios

    //? 2. Crear categorías
    const categories = await categoryModel.insertMany( 
        seedData.categories.map( category => {

            return{
                ...category,
                user: user[0]._id 
            }

        })
    );

    //? 3. Crear productos
    const products = await productModel.insertMany(
        seedData.products.map( product => {

            return {
                ...product,
                user: user[ randomBetween0AndX( seedData.users.length -1 ) ]._id, // Asigna un usuario aleatorio a cada producto y -1 por que el array es base 0
                category: categories[ randomBetween0AndX( seedData.categories.length  -1 ) ]._id, // Asigna una categoría aleatoria a cada producto
            }

        })
    )


    console.log('SEEDED DATA!');
}