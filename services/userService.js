const UserModel = require("../models/user.js");
const UserDTO = require("../dtos/userDTO.js");
// const EmailService = require("./emailService.js");
const EncryptionHandler = require("../utils/encryptionHandler.js");

module.exports = class UserService {
    static async getUserById(id) {
        try {
            const userResult = await UserModel.findById(id);

            if (userResult !== null) {
                userResult["password"] = null;
                userResult["nic"] = null;
                userResult["contact"] = null;
                userResult["email"] = null;

                return new UserDTO(userResult);
            } else {
                return null;
            }
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Get User By Id Error!",
                "error": error.message
            };
        }
    }

    static async createUser(obj) {
        try {
            const userDTO = new UserDTO(obj);
            const userResult = await new UserModel({
                firstName: userDTO.firstName,
                lastName: userDTO.lastName,
                nic: await EncryptionHandler.encrypt(userDTO.nic),
                contact: await EncryptionHandler.encrypt(userDTO.contact),
                email: await EncryptionHandler.encrypt(userDTO.email),
                username: userDTO.username,
                password: (await EncryptionHandler.hashText(userDTO.password, 10))
            }).save();

            // EmailService.sendMail({
            //     recipient: await EncryptionHandler.decrypt(userDTO.email)
            // })

            userResult["password"] = null;
            userResult["nic"] = null;
            userResult["contact"] = null;
            userResult["email"] = null;
            return userResult;
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Get Schedule By Id Error!",
                "error": error.message
            };
        }
    }
}