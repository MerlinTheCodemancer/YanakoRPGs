// Lightweight wrapper for a free translation API (LibreTranslate public instances)
// This wrapper does not call the API until `translate` is invoked at runtime.
// You can configure the endpoint by setting TRANSLATE_API_URL env or passing config.

const DEFAULT_ENDPOINT = 'https://libretranslate.de/translate'

export default {
  endpoint: DEFAULT_ENDPOINT,

  setEndpoint(url) {
    this.endpoint = url
  },

  async translate({ text, source = 'auto', target = 'en' } = {}) {
    if (!text) return ''

    // Note: This will send the text to the configured LibreTranslate instance.
    // Public instances may have rate limits. This wrapper is opt-in and should
    // only be used when the user explicitly requests runtime translation.
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, source, target, format: 'text' })
      })

      if (!res.ok) {
        const txt = await res.text().catch(() => '')
        throw new Error(`Translate API error: ${res.status} ${txt}`)
      }

      const body = await res.json()
      // LibreTranslate returns { translatedText: '...' }
      return body.translatedText || ''
    } catch (err) {
      console.warn('translateClient error:', err.message || err)
      throw err
    }
  }
}
