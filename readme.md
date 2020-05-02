# Commit Metric

Just a simple API to feed a Momentum commit counter metric.

Can also be used for displaying your commits or WakaTime daily time spent anywhere.

![Commit Metric](https://i.imgur.com/Shz1n3w.png).

Response example [here](https://metrics.ipseity.fr)

## Installation

Git clone and install the repository.

```bash
git clone git@github.com:Tahul/commit-metric.git

npm install
```

Create your .env from the example one.

```bash
cp .env.example .env
```

Edit the .env to add your personal access token and username from GitHub and/or GitLab.

You can get one [here](https://github.com/settings/tokens) for GitHub, or [here](https://gitlab.com/profile/personal_access_tokens) for GitLab.

```bash
GITLAB_TOKEN={YOUR_GITLAB_TOKEN}
GITLAB_BASEURL={YOUR_GITLAB_HOSTNAME} // This can be null, by default it will be: https://gitlab.com
GITHUB_USERNAME={YOUR_USERNAME}
GITHUB_TOKEN={YOUR_GITHUB_TOKEN}
WAKATIME_API_KEY={YOUR_WAKATIME_TOKEN}
CACHE_TIME=3600
```

Run the server for development if you want to edit, or for production if you are hosting it.

```bash
// PM2 start dev (watcher, ts-node)
pm2 start --only dev

// PM2 start production
npm run compile
pm2 start --only prod
```

Just deploy the code on a server (can probably be a Heroku or Now instance) and you're ready to go.

## Caching

By default the app will cache your data for 1 hour, to avoid spamming the API services too frequently.

You can disable this by setting your `CACHE_TIME` .env value to 1.

You can also configure the caching duration with that parameters, in seconds.

## Usage

I use [PM2](https://pm2.keymetrics.io/) to run this as a service.

You can probably use any other process manager, all the commands used to run the app are in `ecosystem.config.js`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
