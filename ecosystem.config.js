module.exports = {
  apps: [{
    name: "floyx",
    script: "npm",
    args: "start",
    env_production: {
      NODE_ENV: "production",
    }
  }]
};
