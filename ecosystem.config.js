// ecosystem.config.ts
module.exports = {
  apps: [
    {
      name: 'portfolio-app',
      script: 'yarn',
      args: 'start',
      interpreter: 'node', // Force PM2 to use Node instead of Bun
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
