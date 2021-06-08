/* eslint-disable no-empty */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
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

  module.exports = {
    dummy,
    totalLikes
  }