/* eslint-disable */
const app=require('express').Router()
const Blog = require('../models/bloglist')


app.get('/',async (request, response) => {
    const blogs=await Blog.find({})
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
    const blog=new Blog({
      title: body.title,
      author: body.author,
      url:body.url,
      likes:body.likes===undefined ? 0:body.likes
    })
    if(!body.title || !body.url){
      return response.status(400).json({ error: "title or url is missing" })
    }
    const newblog=await blog.save()
     	response.json(newblog.toJSON())


  })


  app.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })


  app.put('/:id', (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url:body.url,
      likes:body.likes
    }
  
    Blog.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
      .catch(error => next(error))
  })
  module.exports = app
