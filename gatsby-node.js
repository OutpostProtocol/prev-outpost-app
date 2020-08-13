require('dotenv').config()

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/post/)) {
    page.matchPath = '/post/*'
    createPage(page)
  } else if (page.path.match(/^\/community/)) {
    page.matchPath = '/community/*'
    createPage(page)
  } else if (page.path.match(/^\/governance/)) {
    page.matchPath = '/governance/*'
    createPage(page)
  }
}
