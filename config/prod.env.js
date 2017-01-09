module.exports = {
  NODE_ENV: '"production"',
  API_URL: JSON.stringify(process.env.API_URL || '') ,
  API_INTERVAL: JSON.stringify(process.env.API_INTERVAL || '120000')
}
