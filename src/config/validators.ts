import mongoose from 'mongoose';


export class Validators {

    static IsMongoID(id: string) {
        return mongoose.isValidObjectId(id); // Esto sirve para validar si un id es de mongo
    }

}