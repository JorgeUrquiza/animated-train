import { JwtAdapter, bcryptAdapter, envs } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';
import { EmailService } from './email.service';


export class AuthService {
    
    //? Inyectar dependencias
    constructor(

        private readonly emailService: EmailService,
    ){}


    public async registerUser( registerUserDto: RegisterUserDto ) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email }); // Buscamos si el usuario ya existe en la base de datos
        if( existUser ) throw CustomError.badRequest('Email already exists');

        //? Creamos un nuevo usuario
        try {
            const user = new UserModel(registerUserDto);
            
            //? encriptar contraseña
            user.password = bcryptAdapter.hash( registerUserDto.password ) // Encriptamos la contraseña del usuario
            await user.save();

            //Todo Email de confirmacion
            await this.sendEmailValidationLink( user.email );


            const { password, ...userEntity } = UserEntity.fromObject(user); // Quitamos la contraseña del objeto que vamos a devolver al cliente

            const token = await JwtAdapter.generateToken({ id: user.id, email: user.email }) // Generamos token y mandamos el id del usuario como payload
            if( !token ) throw CustomError.internalServer('Error generating token');

            return { 
                user: {...userEntity}, // Devolvemos el usuario sin la contraseña
                token: token,
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);    
        }


        return 'todo ok :D';

    }

    public async loginUser( loginUserDto: LoginUserDto ) {

        // Buscamos el usuario en la base de datos
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if( !user ) throw CustomError.badRequest('Email and password do not match'); 

        const isMatching = bcryptAdapter.compare( loginUserDto.password, user.password ); // Comparamos la contraseña que nos envía el usuario con la que está en la base de datos
        if( !isMatching ) throw CustomError.badRequest('Email and password do not match');

        const { password, ...userEntity } = UserEntity.fromObject(user);
        
        const token = await JwtAdapter.generateToken({ id: user.id, email: user.email }) // Generamos token y mandamos el id del usuario como payload
        if( !token ) throw CustomError.internalServer('Error generating token');

        return {
            user: userEntity,
            token,
        }

    }

    private sendEmailValidationLink = async ( email: string ) => {

        // Generamos token
        const token = await JwtAdapter.generateToken({ email });
        if( !token ) throw CustomError.internalServer('Error generating token'); // Si no se generó el token, lanzamos un error

        // Generamos el link de validación
        const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;
        const html= `
            <h1>Validate your email</h1>
            <p>Click the following link to validate your email</p>
            <a href="${ link }">Validate email: ${ email }</a>
        `;

        // Options para enviar el email
        const options = { 
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }

        // Enviamos el email
        const isSent = await this.emailService.sendEmail( options );
        if( !isSent ) throw CustomError.internalServer('Error sending email');


        return true; // Si todo salió bien, devolvemos true

    }

    public validateEmail = async ( token: string ) => {
            
            // Verificamos el token
            const payload = await JwtAdapter.validateToken( token );
            if( !payload ) throw CustomError.unauthorized('Invalid token');
    
            // Extraemos el email del payload
            const { email } = payload as { email: string }; 
            if ( !email ) throw CustomError.internalServer('Email not in token');
    
            // Buscamos el usuario en la base de datos
            const user = await UserModel.findOne({ email });
            if( !user ) throw CustomError.internalServer('Email not found');

            // Marcamos el email como validado
            user.emailValidated = true; 
            
            // Guardamos el usuario en la base de datos
            await user.save();             
    
            return true; // Si todo salió bien, devolvemos true
    }

}