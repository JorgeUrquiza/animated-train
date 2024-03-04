import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './products/routes';
import { FileUploadRoutes } from './file-upload/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/categories', CategoryRoutes.routes ); //? /api/categories
    router.use('/api/products', ProductRoutes.routes ); //? /api/products
    router.use('/api/upload', FileUploadRoutes.routes ); //? /api/upload



    return router;
  }


}

