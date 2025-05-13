let BASE_URL = process.env.VUE_APP_BASE_URL

const TIME_OUT = 30000

if (process.env.MODE === 'development') {
  BASE_URL = '/v1'
} else if (process.env.MODE === 'production') {
  BASE_URL = '/v1'
} else {
  BASE_URL = '/v1'
}

export { BASE_URL, TIME_OUT }
