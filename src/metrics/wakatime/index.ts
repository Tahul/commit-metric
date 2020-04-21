import axios from 'axios'
// Not using import because of TypeScript checking module declaration
const {base64encode} = require('nodejs-base64')

export interface IWakaTimeMetric {
  wakaTimeSpent: number
  wakaTimeSpentHumanlyReadable: {
    full: string
    h: number
    m: number
    s: number
  }
}

const formatHumanlyReadable = (secs: number) => {
  let hours = Math.floor(secs / (60 * 60))

  let minutesDivisor = secs % (60 * 60)
  let minutes = Math.floor(minutesDivisor / 60)

  let secondsDivisor = minutesDivisor % 60
  let seconds = Math.ceil(secondsDivisor)

  return {
    full: `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`,
    h: hours,
    m: minutes,
    s: seconds,
  }
}

/**
 * Retrieve WakaTime metrics if parameters are set in `.env.`
 */
export default async (): Promise<IWakaTimeMetric> => {
  let wakaTimeSpent = 0

  // Check if WakaTime parameters are present
  if (process.env.WAKATIME_API_KEY) {
    const apiKey = base64encode(process.env.WAKATIME_API_KEY)

    const request = await axios.get(
      'https://wakatime.com/api/v1/users/current/durations?date=21-04-2020',
      {
        headers: {
          Authorization: `Basic ${apiKey}`,
        },
      }
    )

    for (const entry of request.data.data) {
      wakaTimeSpent += entry.duration
    }
  }

  wakaTimeSpent = Math.round(wakaTimeSpent)

  return {
    wakaTimeSpent,
    wakaTimeSpentHumanlyReadable: formatHumanlyReadable(wakaTimeSpent),
  }
}
