import { categoryModel } from "../../data";
import { CreateCategoryDto, CustomError, UserEntity, PaginationDto } from "../../domain";


// Sirve para manejar las categorías de la aplicación
export class CategoryService {

    // Inyectar dependencias
    constructor() { }

    // Crear una categoría en la base de datos
    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {

        const categoryExists = await categoryModel.findOne({ name: createCategoryDto.name }); // buscar si ya existe una categoría con ese nombre
        if (categoryExists) throw CustomError.badRequest('Category already exist'); // si existe, lanzar un error

        try {

            const category = new categoryModel({
                ...createCategoryDto, // todas las propiedades del dto de categoría
                user: user.id // el usuario que la creó
            })

            await category.save(); // guardar la categoría en la base de datos

            return {
                id: category.id,
                name: category.name,
                available: category.available
            }


        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async getCategories(paginationDto: PaginationDto) {

        const { page, limit } = paginationDto; // obtener el page y limit del dto de paginación

        // retornar arreglo en el que esten todas las categorías [ {}, {} ]
        try {

            // const total = await categoryModel.countDocuments(); // contar el número total de categorías
            // const categories = await categoryModel.find()
            //     .skip( (page - 1) * limit ) // page - 1 por que los índices empiezan en 0 
            //     .limit( limit ); // limitar el número de categorías que se devuelven

            const [total, categories] = await Promise.all([ // ejecutar las dos promesas al mismo tiempo
                categoryModel.countDocuments(), // contar el número total de categorías
                categoryModel.find()
                    .skip((page - 1) * limit) // page - 1 por que los índices empiezan en 0 
                    .limit(limit) // limitar el número de categorías que se devuelven
            ])

            return {
                page,   // número de página actual
                limit,  // número de categorías por página
                total,  // número total de categorías
                next: `/api/categories?page=${(page + 1)}&limit=${limit}`,  // url para la siguiente página
                prev: (page - 1 > 0) ? `/api/categories?page=${(page - 1)}&limit=${limit}` : null,  // url para la página anterior si es que existe

                categories: categories.map(category => ({
                    id: category.id,
                    name: category.name,
                    available: category.available
                }))
            }

        } catch (error) {

            throw CustomError.internalServer('Internal server error');
            
        }
    }

}
