const autocannon = require('autocannon')

const options = {
  url: 'http://localhost:4000/', // The URL you want to test
  connections: 1000,                   // Number of concurrent connections
  duration: 60,                        // Test duration in seconds
  requests: 1000000,                   // Total requests to make (if you're using total requests rather than duration)
  pipelining: 10,                      // Number of requests to send in parallel per connection
  headers: {
    'Authorization': 'Bearer your_token_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    key: 'value' // Adjust this for your specific API payload
  }),
  setupClient: (client) => {
    // You can setup any pre-request logic here if needed
  }
}

autocannon(options, (err, result) => {
  if (err) {
    console.error('Error during the test:', err)
    return
  }

  console.log('Test complete!')
  console.log(`Total requests: ${result.requests.total}`)
  console.log(`Total duration: ${result.duration}ms`)
  console.log(`Requests per second: ${result.requests.average}`)
  console.log(`Latency average: ${result.latency.average}ms`)
  console.log(`Errors: ${result.errors}`)
})
