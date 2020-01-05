/**
 * IMPORTS
 */
import * as express from 'express'
import * as dotenv from 'dotenv'

// - Metrics
import githubMetric from './metrics/github'
import gitlabMetric from './metrics/gitlab'
import { global } from './metrics'

export const metrics = [githubMetric, gitlabMetric, global]

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
  let result = {}

  for (const metric of metrics) {
    result = Object.assign(result, await metric())
  }

  return result
}
