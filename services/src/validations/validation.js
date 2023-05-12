const isValid = (value) => {
    if (typeof value === "undefined" || typeof value === "null") return false;
    if (typeof value === "string" && value.trim().length == 0) return false;
    return true;
}

const isValidreqBody=(request)=>{
    return Object.keys(request).length>0
}

const isValidName = (name) => {
    return /^[a-zA-Z\. ]*$/.test(name)
}
const isValidPhone = (Mobile) => {
    return /^[6-9]\d{9}$/.test(Mobile)
}
const isValidEmail = (Email) => {
    return /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email)
}
const isValidPwd = (Password) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(Password)
};

const isValidGender = (gender) => {
    return ["MALE", "FEMALE", "OTHERS"].indexOf(gender) !== -1
}

module.exports = {isValid,isValidreqBody,isValidName,isValidPhone,isValidEmail,isValidPwd,isValidGender}