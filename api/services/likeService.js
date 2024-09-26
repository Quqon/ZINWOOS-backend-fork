const likeRepository = require('../repositories/likeRepository');

const getLikes = async (userId) => {
  return await likeRepository.getLikes(userId);
}


const addLikes = async (itemId, userId) => {
  return await likeRepository.addLikes(itemId, userId);
}


const deleteLikes = async (itemId, userId) => {
  return await likeRepository.deleteLikes(itemId, userId);
}


module.exports = {
  getLikes,
  addLikes,
  deleteLikes
}