module.exports = {
  apps: [
    {
      name: 'CommitMetric',
      script: 'ts-node',
      args: 'src/index.ts',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules', 'build'],
      max_memory_restart: '1G',
    },
  ],
};
