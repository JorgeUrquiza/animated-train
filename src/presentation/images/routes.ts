import { Router } from 'express';
import { ImageController } from './controller';


export class ImageRoutes {

    static get routes():Router {

        const router = Router(); // Crear una instancia de Router
        const controller = new ImageController(); // Crear una instancia de ImageController para poder acceder a sus metodos (getImage)
        
        router.get('/:type/:img', controller.getImage );
        
        return router;

    }

}