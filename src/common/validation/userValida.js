const {checkSchema} = require('express-validator')
const userModel = require('../../models/userModel')


const addUserSchema = checkSchema({
    username: {
        isAlphanumeric:{
            locale: 'en-US'
        },
        isLength:{
            options: {max: 20, min: 6}
        }
    },
    email:{
        isEmail: true,
        custom:{
            options: async(email)=>{
                const user = await userModel.findOne({email: email})
                if(user){
                    throw new Error(`User wiht ${email} already existing`)
                }
            }
        }
    },
    age: {
        isInt: {
            options: {min: 15, max: 150},
            errorMessage: "Age must be between 15 to 150 age"
        }
    },
    gender: {
        isString: true,
        optional: {
            options:{
                nullable: true
            }
        }
    },
    password: {
        isAlphanumeric:{
            locale: "en-US"
        },
        isLength: {
            options: {min: 8}
        }
    },
    confirmedPassword: {
        custom: {
            options: async(password, {req})=>{
                if(password != req.body.password){
                    throw new Error("Password mismatched!")
                }
            }
        }
    }
})

const updateUserschema = checkSchema({
    username: {
        isAlphanumerics:{
            locale: "en-US"
        },
        isLength:{
            options:{min: 6, max: 20}
        }
    },
    age: {
        isInt: {
            options:{min: 15, max: 150},
            errorMessage: "Age must be between 15 to 150 age"
        }
    },
    gender:{
        isString: true
    },
})
module.exports = {
    addUserSchema,
    updateUserschema
}