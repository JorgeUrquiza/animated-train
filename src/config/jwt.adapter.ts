import jwt from 'jsonwebtoken';
import { envs } from './envs';


const JWT_SEED = envs.JWT_SEED;


export class JwtAdapter {


    static async generateToken( payload: any, duration: string = '2h' ) {

        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {

                if (err) resolve(null);

                resolve(token);

            })
        })

    }

    // Verifica si el token es valido
    static validateToken<T>(token: string): Promise<T | null>{ // tipo t es el tipo de dato que va a devolver el payload del token

        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) resolve(null); // Si hay un error, devolvemos null

                resolve(decoded as T); // Si no hay error, devolvemos el payload, que es de tipo T
            })
        })
        
    }


}