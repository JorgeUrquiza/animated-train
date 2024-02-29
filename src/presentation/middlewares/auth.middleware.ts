import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";


export class AuthMiddleware {

    static async validateJWT( req: Request, res: Response, next: NextFunction ) {

        const authorization = req.header('Authorization'); // buscar el token en el header de la petición
        if ( !authorization ) return res.status(401).json({ error: 'No token provided' });
        if ( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid Bearer token' });

        const token = authorization.split(' ').at(1) || ''; // separar el token del prefijo 'Bearer' y obtener el token

        try {
            
            const payload = await JwtAdapter.validateToken<{ id: string }>(token); // validar el token y obtener el payload
            if ( !payload ) return res.status(401).json({ error: 'Invalid token' });
            
            const user = await UserModel.findById( payload.id ); // buscar el usuario en la base de datos
            if ( !user ) return res.status(401).json({ error: 'Invalid Token - User' });

            //Todo : validar si el usuario esta activo

            req.body.user = UserEntity.fromObject(user); // guardar el usuario en el body de la petición

            next(); // si todo esta bien, continuar con la petición


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }


    }


}
