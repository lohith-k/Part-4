/* eslint-disable */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/bloglist')
const api = supertest(app)
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

	for (let blog of blogs) {
		let obj = new Blog(blog)
		await obj.save()
	}
})

test('blogs are returned as json', async () => {
 const response= await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      expect(response.body).toHaveLength(6)

  })
  test('Unique identity of the blogs',async()=>
  {
    const response=await api.get('/api/blogs')
    let isunique=true
    for (var i=0;i<response.length;i++)
    {
      for (var j=i+1;j<reponse.length;j++)
      {
            if(response[i].id===response[j].id)
            {
                isunique=false
                break
            }
      }
    }
    expect(isunique).toEqual(true)

  })

  test('create a new blog',async()=>
  {
    const newBlog = {
      title: 'Marvel cinematic universe',
      author: 'Stan Lee',
      url: 'http://blog.mcu.com/theory/',
      likes: 20,
    }
    await api.post('/api/blogs').send(newBlog)
    const response=await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length+1)
    expect(response.body[6].title).toEqual(newBlog.title)
    expect(response.body[6].author).toEqual(newBlog.author)
    expect(response.body[6].url).toEqual(newBlog.url)
    expect(response.body[6].likes).toEqual(newBlog.likes)

  })

  test('set likes default to zero',async()=>
  {
    const newBlog = {
      title: 'Marvel cinematic universe',
      author: 'Stan Lee',
      url: 'http://blog.mcu.com/theory/'

    }
     
      const response=  await api.post('/api/blogs').send(newBlog)

      expect(response.body).toHaveProperty('likes', 0);


  })

 
  afterAll(() => {
    mongoose.connection.close()
  })