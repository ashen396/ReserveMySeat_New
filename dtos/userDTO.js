const { isValidObjectId } = require("mongoose");

module.exports = class UserDTO {
    constructor(user, getPassword = false) {
        if (user._id !== undefined)
            if (!isValidObjectId(user._id))
                console.log(`Invalid UserID for user nic ${user.nic}`);

        isValidObjectId(user._id) ? this._id = user._id : null,
        this.firstName = user.firstName,
        this.lastName = user.lastName,
        this.nic = user.nic,
        this.contact = user.contact,
        this.email = user.email,
        this.username = user.username,
        this.password = user.password
    }
}