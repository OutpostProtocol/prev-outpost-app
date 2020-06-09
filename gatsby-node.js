require('dotenv').config()

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/post/)) {
    page.matchPath = '/post/*'
    createPage(page)
  }
}
