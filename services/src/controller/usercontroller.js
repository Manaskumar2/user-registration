const userModel = require('../model/userModel')
const validation = require("../validations/validation")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const { trusted } = require('mongoose')

const signUp = async (req, res) => {
    try {
        let data = req.body;

        let { name, email, phone, password, gender } = data

        if (!validation.isValidreqBody(data)) return res.status(400).send({ status: false, message: "provide all required fields" })

        if (!validation.isValid(name)) return res.status(400).send({ status: false, message: `Username is Required` });
        if (!validation.isValidName(name)) return res.status(400).send({ status: false, message: "please enter a valid name" })
        data.name = name

        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: `E-mail is Required` })
        let uniqueEmail = await userModel.findOne({ email: email })
        if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: `This E-mail is Invalid` })
        if (uniqueEmail) return res.status(400).send({ status: false, message: `This E-mail has already registered Please Sign In`, })
        data.email = email.toLowerCase()

        if (!validation.isValidPwd(password)) return res.status(400).send({ status: false, message: "Password should be 8-15 characters long and must contain one of 0-9,A-Z,a-z and special characters", })
    
        if (!validation.isValidPhone(phone)) return res.status(400).send({ status: false, message: "This phone number is invalid" })
            let uniquePhone = await userModel.findOne({ phone: phone })
        if (uniquePhone) return res.status(400).send({ status: false, message: "This phoneNumber has already registered provide new phoneNo " })
        if (!validation.isValidGender(gender)) return res.status(400).send({ status: false, message: "please enter a valid gender like 'MALE', 'FEMALE', 'OTHERS' "})

    

        const hashedPassword = await bcrypt.hash(password, 10)
        data.password = hashedPassword
        const createUser = await userModel.create(data)
        return res.status(200).send({ status: true, message: "succesfull registration", result: createUser })
        
    }
    catch (error) {
        return response.status(500).send({ status: false, message: error.message })
    }
}
const logIn = async (req, res) => { 
    try {

        let data = req.body
            let { email, password } = data
    
            if (!validation.isValidreqBody(data)) return res.status(400).send({ status: false, msg: "provide all  details to login" })
    
            if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email is required" })
            email = email.toLowerCase()
    
            if (!validation.isValid(password)) return res.status(400).send({ status: false, message: "Pasworrd is required" })
    
            let findUser = await userModel.findOne({ email: email })
        if (!findUser) return res.status(400).send({ status: false, message: "The email-id is wrong" })
        if(!findUser.password) return res.status(403).send({status:false,message:"please set your password"})
    
            let bcryptPass =  await bcrypt.compare(password, findUser.password)
            if (!bcryptPass) return res.status(400).send({ status: false, message: "Password incorrect" })
            if (findUser.isDeleted == true) {
                return res.status(400).send({ status: false, message: "User does not exist" })
            }
    
            let token = jwt.sign({ email: findUser.email, userId: findUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    
            const response = {
                name: findUser.name,
                email: findUser.email,
                _id:findUser._id
            }
            res.status(200).send({ status: true, token: token, message: "User login successfully", user:response })
        
    } catch (error) {
        return response.status(500).send({ status: false, message: error.message })
    }
}
module.exports ={signUp,logIn}
