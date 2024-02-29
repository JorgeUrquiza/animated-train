import { Validators } from "../../../config";


export class CreateProductDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, // id del usuario
        public readonly category: string, // id 
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateProductDto?] {

        const {
            name,
            available,
            price,
            description,
            user,
            category,
        } = props

        if (!name) return ['name is required'];
        
        if (!user) return ['user is required'];
        if ( !Validators.IsMongoID(user) ) return ['user is invalid :(']; // Si el id no es de mongo, entonces es invalido
        
        if (!category) return ['category is required'];
        if ( !Validators.IsMongoID(category) ) return ['category is invalid :(']; // Si el id no es de mongo, entonces es invalido

        return [ 
            undefined, 
            new CreateProductDto(
                name,
                !!available,
                price,
                description,
                user,
                category
            )
        ];

    }


}