/**
 * IMPORTS
 */
import * as express from 'express'
import * as dotenv from 'dotenv'

// - Metrics
import githubMetric from './metrics/github'
import gitlabMetric from './metrics/gitlab'
import wakatimeMetric from './metrics/wakatime'

export const metrics = [githubMetric, gitlabMetric, wakatimeMetric]

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
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3100

app.listen(port, () => {
  console.log(`Commit Metric is running on port ${port}!`)
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
    try {
      result = Object.assign(result, await metric())
    } catch (e) {
      console.log('Cannot retrieve metric...')
    }
  }

  // Handling global count
  for (const entry of Object.entries(result)) {
    const [key, value] = entry

    if (key.includes('Commits')) {
      result.globalCommits = result.globalCommits + value
    }
  }

  return result
}
