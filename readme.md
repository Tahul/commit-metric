# Commit Metric

Just a simple API to feed a Momentum commit counter metric.

![Commit Metric](https://i.imgur.com/Shz1n3w.png)

## Installation

Create your .env from the example one.

```bash
cp .env.example .env
```

Edit the .env to add your personal access token and username from GitHub and/or GitLab.

You can get one [here](https://github.com/settings/tokens) for GitHub, or [here](https://gitlab.com/profile/personal_access_tokens) for GitLab.

```bash
GITLAB_TOKEN={YOUR_TOKEN}
GITHUB_USERNAME={YOUR_USERNAME}
GITHUB_TOKEN={YOUR_TOKEN}
```

```bash
// Git clone the repository
git clone git@github.com:Tahul/commit-metric.git

// NPM Install
npm install

// PM2 start dev (watcher, ts-node)
pm2 start --only dev

// PM2 start production
pm2 start --only prod
```

Just deploy the code on a server (can probably be a Heroku or Now instance) and you're ready to go.

## Usage

I use [PM2](https://pm2.keymetrics.io/) to run this as a service.

You can probably use any other process manager, all the commands used to run the app are in `ecosystem.config.js`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
