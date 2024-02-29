import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.service';




export class CategoryRoutes {

  static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService(); // instanciar el servicio de categoría
    const controller = new CategoryController(categoryService); // instanciar el controlador de categoría
    
    // Definir las rutas
    router.get('/', controller.getCategories );
    router.post('/', [ AuthMiddleware.validateJWT ], controller.createCategory ); // proteger la ruta con el middleware de autenticación

    return router;
  }

}

