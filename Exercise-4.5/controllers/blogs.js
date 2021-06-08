/* eslint-disable */
const app=require('express').Router()
const Blog = require('../models/bloglist')


app.get('/', (request, response,next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })

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

  app.post('/', (request, response,next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))

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
