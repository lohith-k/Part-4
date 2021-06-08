/* eslint-disable */
const app=require('express').Router()
const Blog = require('../models/bloglist')
const jwt = require('jsonwebtoken')
const User = require('../models/user')



app.get('/',async (request, response) => {
    const blogs=await Blog.find({}).populate('user', { username: 1, name: 1 })
      response.json(blogs)

  })

  app.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
      .then(blog => {
        if (blog) {
          response.json(blog)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

  app.post('/',async (request, response,next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user

    const blog=new Blog({
      title: body.title,
      author: body.author,
      url:body.url,
      likes:body.likes===undefined ? 0:body.likes,
      user: user._id

    })
    if(!body.title || !body.url){
      return response.status(400).json({ error: "title or url is missing" })
    }
    const newblog=await blog.save()
       user.blogs = user.blogs.concat(newblog._id)
       await user.save()
     	response.json(newblog.toJSON())

  })


  app.delete('/:id', async (request, response, next) => {
    const token = request.token

	const decodedToken = jwt.verify(token,process.env.SECRET)
	if(!token || !decodedToken){
		return response.status(401).json({
			error: "token missing or invalid"
		})
	}
  const id = request.params.id
	const blog = await Blog.findById(id)
	if(blog.user.toString() === decodedToken.id){
		await Blog.findByIdAndDelete(id)
		response.status(204).end()
	}
	else{
		return response.status(401).json({
			error: "Unauthorized to access the blog"
		})
	}
  })


  app.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
      
      likes:body.likes
    }
  
    const upd=await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(upd)

      
  })
  module.exports = app
