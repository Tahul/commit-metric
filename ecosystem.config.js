module.exports = {
  apps: [
    {
      name: 'commit-metric-dev',
      script: 'ts-node',
      args: 'src/index.ts',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules', 'build'],
      max_memory_restart: '1G',
    },
    {
      name: 'commit-metric-prod',
      script: 'node',
      args: 'build/src/index.js',
      instances: 1,
      autorestart: true,
    },
  ],
}
