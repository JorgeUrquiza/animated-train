import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';



export class FileUploadRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new FileUploadController(
      new FileUploadService()
    ); // Crear una instancia del controlador
    
    //? Middleware para verificar si se subieron archivos, se aplica a todas las rutas
    router.use( FileUploadMiddleware.containFiles );
    //? Middleware para verificar que el tipo de archivo que se subira sea valido
    router.use( TypeMiddleware.validTypes(['users', 'products', 'categories']) );

    //? Definir las rutas
    // /api/upload/single/<user|category|product>/
    // /api/upload/multiple/<user|category|product>/
    router.post('/single/:type', controller.uploadFile );
    router.post('/multiple/:type', controller.uploadMultipleFile ); 

    return router;
  }

}

