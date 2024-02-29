import { productModel } from "../../data";
import {  CreateProductDto, CustomError, PaginationDto } from "../../domain";


// Sirve para manejar las categorías de la aplicación
export class ProductService {

    // Inyectar dependencias
    constructor() { }

    // Creamos un producto en la base de datos
    async createProduct( createProductDto: CreateProductDto ) {

        const productExists = await productModel.findOne({ name: createProductDto.name }); // buscar si ya existe un producto con ese nombre
        if (productExists) throw CustomError.badRequest('Product already exist');  // si existe, devolver un error

        try {

            const product = new productModel({ ...createProductDto })

            await product.save(); // guardamos el producto en la base de datos

            return product; // retornar el producto creado

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async getProducts( paginationDto: PaginationDto ) {

        const { page, limit } = paginationDto; // obtener el page y limit del dto de paginación

        try {

            const [total, products] = await Promise.all([ // ejecutar las dos promesas al mismo tiempo
                productModel.countDocuments(), // contamos el numero total de productos
                productModel.find()
                    .skip((page - 1) * limit) // page - 1 por que los índices empiezan en 0 
                    .limit(limit) // limitar el número de productos que se devuelven
                    .populate('user') // traer el nombre del usuario que creó el producto
                    .populate('category')
                    
            ])

            return {
                page,   // número de página actual
                limit,  // número de productos por página
                total,  // número total de productos
                next: `/api/products?page=${(page + 1)}&limit=${limit}`,  // url para la siguiente página
                prev: (page - 1 > 0) ? `/api/products?page=${(page - 1)}&limit=${limit}` : null,  // url para la página anterior si es que existe

                products: products, // productos de la página actual
            }

        } catch (error) {

            throw CustomError.internalServer('Internal server error');
            
        }
    }

}
