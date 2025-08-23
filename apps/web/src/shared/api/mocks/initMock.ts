import { SharedOptions } from "msw";

export default async () => {
  let result;

  const isRealBrowser = Object.getOwnPropertyDescriptor(globalThis, 'window')?.get?.toString().includes('[native code]') ?? false

  if(isRealBrowser) {    
    const { browser } = await import("./browser")
    result = {
      start: (options?: Partial<SharedOptions>) => browser.start(options),
      resetHandlers: () => browser.resetHandlers(),
      stop: () => browser.stop()
    }
  } else {
    const { server } = await import("./node")
    result = {
      start: (options?: Partial<SharedOptions>) => server.listen(options),
      resetHandlers: () => server.resetHandlers(),
      stop: () => server.close()
    }
  }

  return result
}