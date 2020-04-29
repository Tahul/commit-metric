module.exports = {
  apps: [
    {
      name: 'commit-metric-prod',
      script: 'node',
      args: 'build/src/index.js',
      instances: 1,
      autorestart: true,
    },
  ],
}
