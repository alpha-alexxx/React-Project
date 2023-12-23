import { baseApi } from './baseApi'

async function getPosts(options) {
  const res = await baseApi.get('/posts', options)
  return res.data
}
async function getUsers(options) {
  const res = await baseApi.get('/users', options)
  return res.data
}

async function getTodos(options) {
  const res = await baseApi.get('/todos', options)
  return res.data
}

async function getOnePost(postId, options) {
  const res = await baseApi.get(`/posts/${postId}`, options)
  return res.data
}
async function getOneUser(userId, options) {

  const res = await baseApi.get(`/users/${userId}`, options)
  return res.data
}

async function getComments(postId, options) {
  const res = await baseApi.get(`/posts/${postId}/comments`, options)
  return res.data
}

export {
  getPosts,
  getUsers,
  getTodos,
  getOnePost,
  getOneUser,
  getComments,
}