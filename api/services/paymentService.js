const userRepository = require('../repositories/userRepository');

const getUserById = async (userId) => {
    const result = await userRepository.getUserById(userId);

    return result;
}

module.exports = { getUserById };