const db = require('../models')

const getUserByEmail = async (email) => {
    try {
        const result = await db.Users.findAll({
            where: { email }
        })

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error(error)
    }

}

const getUserById = async (id) => {
    const result = await db.Users.findAll({
        where: { id }
    })
    return result;
}

const createUser = async (name, email, hashedPassword, address, phone_number) => {
    try {
        console.log('Starting to create user');

        const result = await db.Users.create({
            name,
            email,
            password: hashedPassword,
            address,
            phone_number,
            role: 'user'
        });

        console.log('User creation result:', result);
        return result;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
const setUserRole = async (id, role) => {
    try {
        const result = await db.Users.update({ role }, {
            where: { id }
        })
        return result;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    setUserRole
}