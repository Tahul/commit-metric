/**
 * IMPORTS
 */
import * as express from 'express'
import * as dotenv from 'dotenv'

// - Metrics
import githubMetric from './metrics/github'
import gitlabMetric from './metrics/gitlab'

export const metrics = [githubMetric, gitlabMetric]

/**
 * INIT
 */
dotenv.config()

/**
 * CONSTANTS
 */
const app: express.Application = express()

/**
 * ROUTES
 */
app.get('/', async (req: express.Request, res: express.Response) => {
  res.json(await getMetrics())
})

/**
 * SERVER CREATION
 */
app.listen(process.env.SERVER_PORT ? process.env.SERVER_PORT : 3005, () => {
  console.log('Commit Metric is running!')
})

/**
 * Get metrics data object from metrics array
 */
const getMetrics = async () => {
  let result = {
    globalCommits: 0,
  }

  // Looping through each registered metrics
  for (const metric of metrics) {
    result = Object.assign(result, await metric())
  }

  // Handling global count
  for (const value of Object.values(result)) {
    result.globalCommits = result.globalCommits + value
  }

  return result
}
