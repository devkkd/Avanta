module.exports = {
  apps: [
    {
      name: 'avanta-web',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: './',
      instances: 1,           // Single instance — VPS has limited RAM
      exec_mode: 'fork',
      max_memory_restart: '400M',  // Restart if RAM exceeds 400MB
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NODE_OPTIONS: '--max-old-space-size=512',
      },
      // Auto restart on crash
      autorestart: true,
      watch: false,
      // Restart delay to avoid rapid restart loops
      restart_delay: 5000,
      max_restarts: 10,
      min_uptime: '10s',
      // Logs
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
    },
  ],
};
