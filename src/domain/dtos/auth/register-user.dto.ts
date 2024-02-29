//? Aseguramos que los datos que se envían están correctamente estructurados y contienen todos los campos necesarios para el registro de un usuario
import { regularExps } from "../../../config";


export class RegisterUserDto {

    private constructor(
        public name: string,
        public email: string,
        public password: string
    ){}

    static create( object: { [key:string]:any } ): [string?, RegisterUserDto?] {
        const { name, email, password } = object;

        if( !name ) return ['Missing name'];
        if( !email ) return ['Missing email'];
        if( !regularExps.email.test( email ) ) return ['Invalid email']; // Se valida el email
        if( !password ) return ['Missing password'];
        if( password.length < 6 ) return ['Password too short'];

        return [undefined, new RegisterUserDto(name, email, password)];
    }

}