/**
 * "Simple server side cache for Express.js with Node.js"
 * Source: https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
 */
import * as mcache from 'memory-cache'

const cache = (duration: number): any => {
  return (req: any, res: any, next: any) => {
    const key = '__express__' + req.originalUrl || req.url
    const cached = mcache.get(key)

    if (cached) {
      res.send(cached)
      return
    } else {
      res.sendResponse = res.send

      res.send = (body: any) => {
        mcache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
    }

    next()
  }
}

export default cache
