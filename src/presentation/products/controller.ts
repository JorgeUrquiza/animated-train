import { Response, Request } from 'express';
import { CustomError, PaginationDto, CreateProductDto } from '../../domain';
import { ProductService } from '../services/product.service';



export class ProductController {

    //? Inyectar dependencias
    constructor(
        private readonly productService: ProductService
    ){}



    //? Manejar errores
    private handleError = (error: unknown, res: Response) => { 
        if( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }


    //? Crear un producto
    createProduct = (req: Request, res: Response) => {

        // recibimos los dtos
        const [error, createProductDto] = CreateProductDto.create({
            ...req.body,
            user: req.body.user.id,
        }); 
        if ( error ) return res.status(400).json({error}); 

        this.productService.createProduct( createProductDto!  )
            .then( category => res.status(201).json( category ) ) // si todo sale bien, devolver el producto creado
            .catch( error => this.handleError(error, res) ); // si hay un error, manejarlo


    }

    //? Obtener todas los productos con paginación
    getProducts = async (req: Request, res: Response) => {
        
        const { page = 1, limit = 10 } = req.query; // obtener los query params para la paginación (page y limit)
        const [ error, paginationDto ] = PaginationDto.create( +page, +limit ) // con el mas transformamos el string a number
        if( error ) return res.status(400).json({ error });


        this.productService.getProducts( paginationDto! )
            .then( products => res.json( products ) )
            .catch( error => this.handleError(error, res) );

    }

}