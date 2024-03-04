import { Response, Request } from 'express';
import { CustomError } from '../../domain';
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from 'express-fileupload';



export class FileUploadController {

    //? Inyectar dependencias
    constructor(
        private readonly fileUploadService: FileUploadService,
    ){}



    //? Manejar errores
    private handleError = (error: unknown, res: Response) => { 
        if( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }


    //? Cargar un archivo
    uploadFile = (req: Request, res: Response) => {

        const type = req.params.type; // Tomar el tipo de archivo que se subira, type por que lo definimos en routes
        const validTypes = ['users', 'products', 'categories']; // Tipos validos
        if ( !validTypes.includes(type) ) {
            return res.status(400)
                .json({ error: `invalid type: ${ type}, valid ones ${ validTypes }` });
        }
        
        if ( !req.files || Object.keys(req.files).length === 0 ) { // Si no se subio ningun archivo 
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        const file = req.files.file as UploadedFile; // Tomar el archivo de la peticion 

        this.fileUploadService.uploadSingle( file, `uploads/${ type }` )  // Subir el archivo al servidor resolviendo la ruta donde se guardara
            .then( uploaded => res.json(uploaded) )
            .catch( error => this.handleError(error, res) ) // Manejar errores

    }

    //? Cargar varios archivos
    uploadMultipleFile = (req: Request, res: Response) => {

        res.json('upload Multiple File ');

    }

}