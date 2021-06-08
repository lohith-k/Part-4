/* eslint-disable */
const { TestWatcher } = require("@jest/core")
const mongoose = require("mongoose")
const superset = require("supertest")
const app = require("../app")
const api = superset(app)
const User = require("../models/user")

const users=[{
    username: "lohith",
    name: "Superuser",
    password:"password1"
    },
    {
        username: "ajay",
        name: "developer",
        password:"password2"
        }
]
beforeEach(async () => {
	await User.deleteMany({})

	for (let user of users) {
		let obj = new User(user)
		await obj.save()
	}
})
describe('restrictions to create users',()=>
{

test('Minimum 3 characters are required',async()=>
{
    const newuser={
            username:"ld",
            name: "Superuser",
            password: "salainen"
    }
    const response=await api.post('/api/users').send(newuser).expect(400)
    expect(response.body.error).toBe("minimum 3 characters required")
})
test('username and password required',async()=>
{
    const newuser={
            username:"ld",
            name: "Superuser",
    }
    const response=await api.post('/api/users').send(newuser).expect(400)
    expect(response.body.error).toBe("username or password missing")
})
test('username should be unique',async()=>
{
    const newuser={
            username:"lohith",
            name: "Superuser",
            password:"password"
    }
    const response=await api.post('/api/users').send(newuser).expect(400)
    expect(response.body.error).toBe("username already exists")
})

test('valid user',async()=>
{
    const newuser={
            username:"lohith234",
            name: "Superuser",
            password:"password234"
    }
    const response=await api.post('/api/users').send(newuser).expect(200)
})
})

afterAll(() => {
    mongoose.connection.close()
  })


