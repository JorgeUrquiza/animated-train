

import { NextFunction, Request, Response } from "express";


//? Middleware para verificar que el tipo de archivo que se subira sea valido
export class TypeMiddleware {

    static validTypes(validTypes: string[]) {

        // Factory function es una funcion que retorna otra funcion
        return (req: Request, res: Response, next: NextFunction) => {

            // Tomar el tipo de archivo que se subira, type por que lo definimos en routes 
            // hacemos el split y el .at para tomar el tercer elemento de la url que es el tipo de archivo
            // si no existe el tipo de archivo, se toma un string vacio y evitamos el error de undefined
            const type = req.url.split('/').at(2) ?? ''; 

            console.log({type});

            if (!validTypes.includes(type)) {
                return res.status(400)
                    .json({ error: `invalid type: ${type}, valid ones ${validTypes}` });
            }

            next();
        }
    }

}