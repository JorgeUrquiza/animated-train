import path from 'path';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import { Uuid } from '../../config';
import { CustomError } from '../../domain';


//? Sirve para subir archivos al servidor
export class FileUploadService {

    // Inyectar dependencias
    constructor(
        private readonly uuid = Uuid.v4 // Generar un id unico
    ){}

    //? verificar si existe la carpeta donde se guardaran los archivos
    private checkFolder( folderPath: string ) {
        if ( !fs.existsSync(folderPath) ) { // Si no existe la carpeta la crea
            fs.mkdirSync(folderPath)
        }
    }

    //? Cargar un archivo
    public async uploadSingle(
        file: UploadedFile, // Tomado de express-fileupload sirve para subir archivos al servidor
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'] // Extensiones permitidas 
    ) {
        
        try {
            const fileExtension = file.mimetype.split('/').at(1) ?? ''; // Extraer la extension del archivo( image/png => png ), si no existe la extension se asigna un string vacio para evitar error de abajo

            if ( !validExtensions.includes(fileExtension) ) {
                throw CustomError.badRequest(`Invalid extension: ${ fileExtension }, valid ones ${ validExtensions }`)
            }

            const destination = path.resolve( __dirname, '../../../', folder ); // Ruta donde se guardara el archivo 
            this.checkFolder( destination ); // Verificar si existe la carpeta donde se guardaran los archivos
            
            const fileName = `${ this.uuid() }.${ fileExtension }`; 

            file.mv( `${destination}/${fileName}` ); // Mover el archivo a la carpeta de destino 

            return { fileName }; // Retornar el nombre del archivo


        } catch (error) {
            console.log({error});
            throw error;
        }

    }


    //? Cargar varios archivos a la vez
    async uploadMultiple(
        files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'] // Extensiones permitidas
    ) {
        const fileNames = await Promise.all( // Subir varios archivos a la vez
            files.map( file => this.uploadSingle(file, folder, validExtensions) ) // Subir cada archivo
        );

        return fileNames; 

    }



}