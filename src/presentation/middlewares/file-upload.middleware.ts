import { NextFunction, Request, Response } from "express";



export class FileUploadMiddleware {

    static containFiles(req: Request, res: Response, next: NextFunction) {

        //? Verificar si se subieron archivos
        if ( !req.files || Object.keys(req.files).length === 0 ) { 
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        //? Si se subio un solo archivo lo convierte en un array
        if ( !Array.isArray( req.files.file ) ){
            req.body.files = [req.files.file]; // Si se subio un solo archivo lo convierte en un array
        } else {
            req.body.files = req.files.file; // Si se subieron varios archivos los guarda en el body
        }

        next(); // Continuar con el siguiente middleware

    }


}