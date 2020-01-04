module.exports = {
  apps: [
    {
      name: 'dev',
      script: 'ts-node',
      args: 'src/index.ts',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules', 'build'],
      max_memory_restart: '1G',
    },
    {
      name: 'prod',
      script: 'node',
      args: 'build/src/index.js',
      instances: 1,
      autorestart: true,
    },
  ],
};
