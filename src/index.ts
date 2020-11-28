/**
 * IMPORTS
 */
import * as express from 'express'
import * as dotenv from 'dotenv'
import cache from './cache'

// - Metrics
import githubMetric, {IGithubMetric} from './metrics/github'
import gitlabMetric, {IGitlabMetric} from './metrics/gitlab'
import wakatimeMetric, {IWakaTimeMetric} from './metrics/wakatime'

export const metrics = [githubMetric, gitlabMetric, wakatimeMetric]

type MetricResult = IGitlabMetric | IGithubMetric | IWakaTimeMetric

/**
 * INIT
 */
dotenv.config()

/**
 * CONSTANTS
 */
const app: express.Application = express()
// Cache duration from .env; by default 3600 seconds (= 1 hour)
const cacheDuration = process.env.CACHE_TIME
  ? parseInt(process.env.CACHE_TIME)
  : 3600

/**
 * ROUTES
 */
app.get(
  '/',
  cache(cacheDuration),
  async (req: express.Request, res: express.Response) => {
    res.json(await getMetrics())
  }
)

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
  // Init result object
  const result = {
    globalCommits: 0,
  }

  // Init Promise chain for all metrics
  const metricPromises: Promise<MetricResult>[] = metrics.map(metric =>
    metric()
  )

  // Exec Promise chain for all metrics
  const responses = await Promise.all(metricPromises)

  // Concatenate the result object
  for (const response of responses) {
    Object.assign(result, response)
  }

  // Handling global count
  for (const entry of Object.entries(result)) {
    const [key, value] = entry

    if (key.includes('Commits')) {
      result.globalCommits = result.globalCommits + value
    }
  }

  // Return the result
  return result
}
