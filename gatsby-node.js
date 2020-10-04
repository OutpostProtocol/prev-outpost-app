require('dotenv').config()
const path = require('path')

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/post/)) {
    page.matchPath = '/post/*'
    createPage(page)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      outpost {
        posts {
          id
          title
          subtitle
          timestamp
          txId
          featuredImg
        }
      }
    }
  `)

  console.log(result, 'THE RESULT FROM GRAPHQL')

  result.data.outpost.posts.forEach(post => {
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
