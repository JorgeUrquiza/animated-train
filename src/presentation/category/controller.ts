import { Response, Request } from 'express';
import { CustomError, PaginationDto } from '../../domain';
import { CreateCategoryDto } from '../../domain';
import { CategoryService } from '../services/category.service';



export class CategoryController {

    //? Inyectar dependencias
    constructor(
        private readonly categoryService: CategoryService, // inyectar el servicio de categoría para usar sus métodos
    ){}



    //? Manejar errores
    private handleError = (error: unknown, res: Response) => { 
        if( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }


    //? Crear una categoría
    createCategory = (req: Request, res: Response) => {

        // recibimos los dtos
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body); 
        if ( error ) return res.status(400).json({error}); 

        this.categoryService.createCategory( createCategoryDto!, req.body.user )
            .then( category => res.status(201).json( category ) ) // si todo sale bien, devolver la categoría creada
            .catch( error => this.handleError(error, res) ); // si hay un error, manejarlo


    }

    //? Obtener todas las categorías y aplicar paginación
    getCategories = async (req: Request, res: Response) => {
        
        const { page = 1, limit = 10 } = req.query; // obtener los query params para la paginación (page y limit)
        const [ error, paginationDto ] = PaginationDto.create( +page, +limit ) // con el mas transformamos el string a number
        if( error ) return res.status(400).json({ error });

        this.categoryService.getCategories( paginationDto! )
            .then( categories => res.json( categories ) )
            .catch( error => this.handleError(error, res) );

    }

}