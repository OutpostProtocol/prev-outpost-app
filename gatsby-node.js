require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const path = require('path')
const axios = require('axios')

const OUTPOST_API = process.env.OUTPOST_API

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/post/)) {
    page.matchPath = '/post/*'
    createPage(page)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const query = `
  query {
    posts {
      id
      title
      subtitle
      timestamp
      txId
      featuredImg
    }
  }
  `

  const result = await axios.post(OUTPOST_API, { query })

  result.data.data.posts.forEach(post => {
    createPage({
      path: `/post/${post.txId}`,
      component: path.resolve('./src/pages/post.js'),
      context: {
        title: post.title,
        subtitle: post.subtitle,
        image: post.featuredImg
      }
    })
  })
}
