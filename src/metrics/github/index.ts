import axios from 'axios';

export default async () => {
  const today = new Date().toLocaleDateString('en-US');
  let githubCommits = 0;

  const request = await axios.get('https://api.github.com/users/Tahul/events', {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  });

  for (const event of request.data) {
    const date = new Date(event.created_at).toLocaleDateString('en-US');

    if (event.type === 'PushEvent' && today === date) {
      githubCommits = githubCommits + event.payload.size;
    }
  }

  return {
    githubCommits,
  };
};
