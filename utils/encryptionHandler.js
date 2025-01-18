const bcrypt = require("bcryptjs");
const cryptr = require("cryptr")

module.exports = class Hashing {
    static hashText(text, saltRounds = 10) {
        return new Promise(async (resolve, reject) => {
            const result = (await bcrypt.hash(text, await bcrypt.genSalt(saltRounds))).toString();
            resolve(result);
        })
    }

    static compare(text, cipherText) {
        return new Promise(async (resolve, reject) => {
            const result = await bcrypt.compare(text, cipherText);
            resolve(result);
        })
    }

    static encrypt(plainText) {
        return new Promise((resolve, reject) => {
            const encryptor = new cryptr(process.env.ENC_KEY);
            const encryptedText = encryptor.encrypt(plainText);

            resolve(encryptedText);
        })
    }

    static decrypt(cipherText) {
        return new Promise((resolve, reject) => {
            const decryptor = new cryptr(process.env.ENC_KEY);
            const decryptedText = decryptor.decrypt(cipherText);

            resolve(decryptedText);
        })
    }
}