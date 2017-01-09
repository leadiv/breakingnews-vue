module.exports = {
  NODE_ENV: '"production"',
  API_URL: JSON.stringify(process.env.API_URL || 'http://data.cnn.com/breaking_news/domestic.json') ,
  API_INTERVAL: JSON.stringify(process.env.API_INTERVAL || '120000')
}
