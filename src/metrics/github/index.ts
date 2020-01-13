import axios from 'axios'

export interface IGithubMetric {
  githubCommits: number
}

/**
 * Retrieve GitHub metrics if parameters are set in `.env.`
 */
export default async (): Promise<IGithubMetric> => {
  let githubCommits = 0

  // Check if GitHub parameters are present
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_USERNAME) {
    const today = new Date().toLocaleDateString('en-US')
    console.log('Today: ', today)

    const request = await axios.get(
      `https://api.github.com/users/${process.env.GITHUB_USERNAME}/events`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    )

    for (const event of request.data) {
      const date = new Date(event.created_at).toLocaleDateString('en-US')

      if (event.type === 'PushEvent' && today === date) {
        githubCommits = githubCommits + parseInt(event.payload.size)
      }
    }
  }

  return {
    githubCommits,
  }
}
