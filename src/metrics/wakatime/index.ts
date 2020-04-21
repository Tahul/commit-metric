import axios from 'axios'
import * as Moment from 'moment'
// Not using import because of TypeScript checking module declaration
const {base64encode} = require('nodejs-base64')

export interface IWakaTimeMetric {
  wakaTime: {
    digital: string
    hours: number
    minutes: number
    text: string
    total_seconds: number
  }
}
/**
 * Retrieve WakaTime metrics if parameters are set in `.env.`
 */
export default async (): Promise<IWakaTimeMetric> => {
  // Check if WakaTime parameters are present
  if (process.env.WAKATIME_API_KEY) {
    const apiKey = base64encode(process.env.WAKATIME_API_KEY)
    const start = Moment().set('h', 0).format('YYYY-MM-DDTHH:mm:ss')
    const end = Moment()
      .set('h', 23)
      .set('m', 59)
      .set('s', 59)
      .format('YYYY-MM-DDTHH:mm:ss')

    /**
     * Get summary from WakaTime
     */
    const request = await axios.get(
      `https://wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`,
      {
        headers: {
          Authorization: `Basic ${apiKey}`,
        },
      }
    )

    return {
      wakaTime: request.data.data[0].grand_total,
    }
  }

  return {
    wakaTime: {
      digital: '',
      hours: 0,
      minutes: 0,
      text: 'error',
      total_seconds: 0,
    },
  }
}
