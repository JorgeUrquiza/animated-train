


export class CreateCategoryDto {
  
    // Sirve para validar los datos que se reciben del cliente
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
    ) {}

    // Sirve para llamar al constructor y validar los datos que se reciben del cliente
    static create( object: { [key: string]: any } ): [string?, CreateCategoryDto?]{
        
        const { name, available = false } = object;

        let availableBoolean = available;

        if ( !name ) return ['name is required']; // Si no hay nombre, retornar un error
        
        if ( typeof available !== 'boolean' ) {
            availableBoolean = ( available === 'true' ) 
        } 

        return [ undefined, new CreateCategoryDto( name, availableBoolean ) ] // Si no hay errores, retornar el objeto

    }



}