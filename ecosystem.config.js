module.exports = {
  apps: [
    {
      name: "portfolio-app",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "./",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Automatic restart configuration
      watch: false,
      max_memory_restart: "1G",
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,

      // Auto-restart on crash
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
    },
  ],
};
