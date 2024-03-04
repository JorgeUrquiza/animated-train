import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export class ImageController {

    constructor() {}

    //? Metodo para obtener una imagen por su nombre
    getImage = ( req: Request, res: Response ) => {

        // Obtener los parametros de la URL
        const { type = '', img = '' } = req.params;

        // Crear el path de la imagen a partir de los parametros de la URL
        const imagePath = path.resolve( __dirname, `../../../uploads/${type}/${img}` );
        console.log(imagePath);

        // Verificar si la imagen existe
        if ( !fs.existsSync( imagePath ) ) {
            return res.status(404).send('Image not found');
        }

        // Enviar la imagen
        res.sendFile( imagePath );

    }

}