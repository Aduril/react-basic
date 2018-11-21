const { tail } = require('lodash')

const s3BasePathFromEnv = () => {
  const S3Bucket = process.env.S3_BUCKET
  const extract = key => `${tail(key.split('/')).join('/')}/`
  return S3Bucket && S3Bucket.includes('/') ? extract(S3Bucket) : ''
}

module.exports = { s3BasePathFromEnv }
