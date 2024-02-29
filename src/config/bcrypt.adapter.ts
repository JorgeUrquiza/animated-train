//? Encriptamos y comparamos contraseñas con bcryptjs
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';


export const bcryptAdapter = {

    hash: ( password: string ) => {
        const salt = genSaltSync(); // Generamos un salt para encriptar la contraseña de 10 vueltas
        return hashSync(password, salt); // Encriptamos la contraseña con el salt generado
    },

    compare: ( password: string, hashed: string ) => {
        return compareSync(password, hashed); // Comparamos la contraseña con la contraseña encriptada (hashed
    }


}
