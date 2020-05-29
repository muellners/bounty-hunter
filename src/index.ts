import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    context.github.issues.createComment(issueComment)
  })

  app.on('pull_request.opened', async (context) => {
    const pr =context.payload.pull_request
    const user = pr.user.login //Collecting Details of the person who created the PR

    const issueComment = context.issue({ body: 'Hey @'+ user +'. Thanks for opening this PR!' })
    await context.github.issues.createComment(issueComment)
  })

  app.on('pull_request.reopened', async (context) => {
    const pr =context.payload.pull_request
    const user = pr.user.login //Collecting Details of the person who created the PR

    const issueComment = context.issue({ body: 'Hey @'+ user +'. Thanks for reopening this PR!' })
    await context.github.issues.createComment(issueComment)
  })

  app.on('pull_request.closed', async (context) => {
    const issueComment = context.issue({ body: 'Too bad tou had to close this!' })
    await context.github.issues.createComment(issueComment)
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
