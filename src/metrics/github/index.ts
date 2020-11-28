import axios from 'axios'

export interface IGitHubStar {
  name: string
  full_name: string
  description: string
  created_at: string
  stargazers_count: number
  watchers_count: number
  url: string
}

export interface IGithubMetric {
  githubCommits: number
  githubStars: IGitHubStar[]
}

/**
 * Retrieve GitHub metrics if parameters are set in `.env.`
 */
export default async (): Promise<IGithubMetric> => {
  let githubCommits = 0
  let githubStars: IGitHubStar[] = []

  // Check if GitHub parameters are present
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_USERNAME) {
    const today: string = new Date().toLocaleDateString('en-US')
    const apiUrl = `https://api.github.com/users/${process.env.GITHUB_USERNAME}`

    // Get commits
    const requestCommits = await axios.get(`${apiUrl}/events`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    })

    // Cast commits
    for (const event of requestCommits.data) {
      const date: string = new Date(event.created_at).toLocaleDateString(
        'en-US'
      )

      if (event.type === 'PushEvent' && today === date) {
        githubCommits = githubCommits + parseInt(event.payload.size)
      }
    }

    // Get stars
    const requestStars = await axios.get(
      `${apiUrl}/starred?sort=created&direction=desc&per_page=5`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    )

    githubStars = requestStars.data
      // Cast stars
      .map((item: any) => {
        const {
          name,
          full_name,
          description,
          created_at,
          stargazers_count,
          watchers_count,
          html_url,
        } = item

        return {
          name,
          full_name,
          description,
          created_at,
          stargazers_count,
          watchers_count,
          url: html_url,
        }
      })
      // Get only the amount of stars requested from `.env`
      .slice(0, process.env.STARS_FETCH_COUNT || 5)
  }

  return {
    githubCommits,
    githubStars,
  }
}
