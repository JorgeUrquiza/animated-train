//? Aseguramos que los datos que se envían están correctamente estructurados y contienen todos los campos necesarios para el registro de un usuario
import { regularExps } from "../../../config";


export class LoginUserDto {

    private constructor(
        public email: string,
        public password: string
    ){}

    static create( object: { [key:string]:any } ): [string?, LoginUserDto?] {
        const { email, password } = object;


        if( !email ) return ['Missing email'];
        if( !regularExps.email.test( email ) ) return ['Invalid email']; // Se valida el email
        if( !password ) return ['Missing password'];
        if( password.length < 6 ) return ['Password too short'];

        return [undefined, new LoginUserDto( email, password)];
    }

}