import axios from 'axios'

export interface IGitlabMetric {
  gitlabCommits: number
}

/**
 * Retrieve GitLab metrics if parameters are set in `.env.`
 */
export default async (): Promise<IGitlabMetric> => {
  let gitlabCommits = 0

  // Check if GitLab parameters are present
  if (process.env.GITLAB_TOKEN) {
    const today = new Date().toLocaleDateString('en-US')

    const request = await axios.get(`${process.env.GITLAB_BASEURL}/api/v4/events`, {
      headers: {
        'PRIVATE-TOKEN': `${process.env.GITLAB_TOKEN}`,
      },
    })

    for (const event of request.data) {
      const date = new Date(event.created_at).toLocaleDateString('en-US')

      if (event.action_name === 'pushed to' && today === date) {
        gitlabCommits = gitlabCommits + event.push_data.commit_count
      }
    }
  }

  return {
    gitlabCommits,
  }
}
