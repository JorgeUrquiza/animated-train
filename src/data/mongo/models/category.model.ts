import mongoose from 'mongoose';


//? Crear el modelo de la categoría
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true, // no puede haber dos categorías con el mismo nombre
    },

    available: { // si está disponible o no
        type: Boolean,
        default: false,
    },

    user: { // quien fue el usuario que lo creó
        type: mongoose.Schema.Types.ObjectId, //esto es para que se guarde el id del usuario que lo creó
        ref: 'User',
        required: true,
    }
   

});

categorySchema.set('toJSON', { // .set sirve para modificar el comportamiento de un schema
    virtuals: true, // Para que se muestre el id 
    versionKey: false, // Para que no se muestre el __v
    transform: function (_doc, ret, options) { 
        delete ret._id;  // Para que no se muestre el _id
    },
})


export const categoryModel = mongoose.model('Category', categorySchema);
