import mongoose, { Schema, Document, Model } from 'mongoose'
interface UserDoc extends Document{
    email: string,
    password: string,
    address: string,
    phone: string,
    firstName: string,
    lastName:string
}

const userSchema = new Schema({
    email: { type: String, required: true },  
    password:{type:String,required:true},  
    phone:{type:String,required:true},  
    firstName:{type:String,},  
    lastName: { type: String },  
    address:{type:String},  

}, {
    timestamps:true
})

const User = mongoose.model<UserDoc>('User', userSchema)

export { User }