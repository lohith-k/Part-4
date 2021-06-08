/* eslint-disable*/
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
if(body.username==undefined|| body.password==undefined)
{
  return response.status(400).json({ 
    error: 'username or password missing' 
})}
if (body.username.length<3 ||body.password.length<3) {
    return response.status(400).json({ 
      error: 'minimum 3 characters required' 
    })
  }
  const docs = await User.find().lean();

  function userExists(username) {
    return docs.some(function(el) {
      return el.username === username;
    }); 
  }
  if(userExists(body.username))
  {
    console.log("sdknndvjncij")
    return response.status(400).json({ 
      error: 'username already exists' 
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })
module.exports = usersRouter