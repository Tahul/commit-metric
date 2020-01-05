import githubMetric from './github'
import gitlabMetric from './gitlab'

export interface IGlobalMetric {
  globalCommits: number
}

export const global = async (): Promise<IGlobalMetric> => {
  // Get GitHub commits
  const { githubCommits } = await githubMetric()
  // Get GitLab commits
  const { gitlabCommits } = await gitlabMetric()

  return {
    globalCommits: gitlabCommits + githubCommits,
  }
}
