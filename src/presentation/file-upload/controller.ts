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
        const file = req.body.files.at(0) as UploadedFile; // Tomar el primer archivo que se subio 

        this.fileUploadService.uploadSingle( file, `uploads/${ type }` )  // Subir el archivo al servidor resolviendo la ruta donde se guardara
            .then( uploaded => res.json(uploaded) )
            .catch( error => this.handleError(error, res) ) // Manejar errores
    }


    //? Cargar varios archivos
    uploadMultipleFile = (req: Request, res: Response) => {
        
        const type = req.params.type; // Tomar el tipo de archivo que se subira, type por que lo definimos en routes
        const files = req.body.files as UploadedFile[]; // Tomar los archivos que se subieron

        this.fileUploadService.uploadMultiple( files, `uploads/${ type }` )  // Subir el archivo al servidor resolviendo la ruta donde se guardara
            .then( uploaded => res.json(uploaded) )
            .catch( error => this.handleError(error, res) ) // Manejar errores
    }

    
}