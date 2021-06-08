/* eslint-disable */
const dummy = (blogs) => {
    return 1
  }

const totalLikes=(blogs) =>
{
  let likes=0
  for(var i=0;i<blogs.length;i++)
  {
    likes=likes+blogs[i].likes
  }

  return likes
}

const favouriteBlog=(blogs)=>
{
  var max_likes = 0
	var favorite_blog

	for (var i = 0; i < blogs.length; i++) {
		if (blogs[i].likes > max_likes) {
			max_likes = blogs[i].likes
			favorite_blog = blogs[i]
		}
	}

	return favorite_blog
}
const mostBlogs=(blogs1=>
  {
    var countPropertyValues = {};
blogs1.forEach(function(obj) {
  if (countPropertyValues.hasOwnProperty(obj.author)) {
    countPropertyValues[obj.author]++;
  } else {
    countPropertyValues[obj.author] = 1;
  }
});

let blogs = 0;
let author = "";

for(let char in countPropertyValues){
  if(countPropertyValues[char]> blogs){
    blogs = countPropertyValues[char];
    author= char
  }
}

return {author,blogs}
  })

  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
  }