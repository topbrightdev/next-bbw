import { init, logEvent as amplitudeLogEvent } from "@amplitude/analytics-browser";

class Amplitude {
  constructor() {
    init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY);
  }

  logEvent = (event: string, eventProperties: any) => {
    amplitudeLogEvent(event, eventProperties);
  };
}
const amplitude = new Amplitude();
export default amplitude;
