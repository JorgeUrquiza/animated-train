import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Para que no se repita el correo en la base de datos
    },

    emailValidated: {
        type: Boolean,
        default: false, // Cada vez que se cree un usuario por defecto el correo no está validado 
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    img: {
        type: String,
    },

    role: {
        type: [String], //un arreglo de strings
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    }

});

userSchema.set('toJSON', { // .set sirve para modificar el comportamiento de un schema
    virtuals: true, // Para que se muestre el id 
    versionKey: false, // Para que no se muestre el __v
    transform: function (_doc, ret, options) { 
        delete ret._id;  // Para que no se muestre el _id
        delete ret.password; // Para que no se muestre el password
    },
})

export const UserModel = mongoose.model('User', userSchema);
