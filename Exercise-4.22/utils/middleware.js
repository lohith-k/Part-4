/* eslint-disable */
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
const tokenExtractor = (req,res,next) => {
	const authorization = req.get("authorization")
	if(authorization && authorization.toLowerCase().startsWith("bearer ")){
		req.token =  authorization.slice(7)
		return next()
	}
	req.token =  null
	return next()
}

const userExtractor= async (req,res,next)=>
{
  const authorization = req.get("authorization")
  
	if(authorization && authorization.toLowerCase().startsWith("bearer ")){
    req.token =  authorization.slice(7)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    else
    {
    const user = await User.findById(decodedToken.id)
    req.user=user
  return next()
    }
  }

	
	return next()
}
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}