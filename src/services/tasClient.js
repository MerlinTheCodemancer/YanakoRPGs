// Lightweight TAS Translation API client
// WARNING: TAS is a third-party service with privacy and reliability limitations.
// This client is intentionally minimal and uses fetch.

const DEFAULT_ENDPOINT = 'https://655.mtis.workers.dev/translate'

let config = {
  enabled: false, // must be explicitly enabled by the app
  endpoint: DEFAULT_ENDPOINT,
  rateLimitPerSecond: 4
}

let lastCallTimestamps = []

function setConfig(opts = {}) {
  config = { ...config, ...opts }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function rateLimit() {
  if (!config.rateLimitPerSecond) return
  const now = Date.now()
  // remove old timestamps
  lastCallTimestamps = lastCallTimestamps.filter(t => now - t < 1000)
  if (lastCallTimestamps.length >= config.rateLimitPerSecond) {
    // wait a bit (simple strategy)
    await sleep(250)
  }
  lastCallTimestamps.push(Date.now())
}

async function translate({ text, source = 'en', target = 'ja' } = {}) {
  if (!config.enabled) throw new Error('TAS client is disabled; enable it with setConfig({ enabled: true })')
  if (!text || text.length === 0) return ''
  if (text.length > 100) {
    // TAS rate limit mentions 100 chars max — caller must chunk text if needed
    throw new Error('TAS client: text exceeds 100 characters; please chunk input')
  }

  await rateLimit()

  const url = `${config.endpoint}?text=${encodeURIComponent(text)}&source_lang=${encodeURIComponent(source)}&target_lang=${encodeURIComponent(target)}`

  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`TAS translate error: ${res.status} ${res.statusText} ${body}`)
  }

  const data = await res.json().catch(() => null)
  // TAS returns a simple string or JSON depending on implementation; handle both
  if (!data) return ''
  if (typeof data === 'string') return data
  if (data && data.translation) return data.translation
  if (data && data.translated_text) return data.translated_text
  // fallback: try to find any text field
  for (const k of Object.keys(data)) {
    if (typeof data[k] === 'string') return data[k]
  }
  return ''
}

export default {
  setConfig,
  translate
}
