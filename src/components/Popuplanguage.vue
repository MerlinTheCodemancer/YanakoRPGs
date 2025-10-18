<template>
  <div class="popup-lang" :class="{ open: open }">
    <button class="flag-btn" @click="toggle" aria-label="Open language selector">
      <img :src="flagFor(current)" :alt="current" />
    </button>

    <div class="lang-list" v-if="open">
      <button v-for="(lbl, code) in languages" :key="code" class="lang-item" @click="select(code)">
        <img :src="flagFor(code)" :alt="code" />
        <span>{{ lbl }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popuplanguage',
  props: { value: { type: String, default: 'en' } },
  data() {
    return {
      open: false,
      current: this.value,
      languages: { en: 'English', ja: '日本語', pt: 'Português (BR)' }
    }
  },
  methods: {
    toggle() { this.open = !this.open },
    select(code) {
      this.current = code
      this.open = false
      this.$emit('update:value', code)
      this.$emit('change', code)
    },
    flagFor(code) {
      const map = {
        en: 'https://flagcdn.com/us.svg',
        ja: 'https://flagcdn.com/jp.svg',
        pt: 'https://flagcdn.com/br.svg'
      }
      return map[code] || map.en
    }
  },
  watch: { value(v) { this.current = v } }
}
</script>

<style scoped>
.popup-lang { position: fixed; right: 18px; bottom: 18px; z-index: 2000 }
.flag-btn { width: 46px; height: 46px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.08); background: white; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 18px rgba(0,0,0,0.12); cursor:pointer; padding:4px }
.flag-btn img { width: 28px; height: 20px; object-fit:cover }
.lang-list { margin-top:8px; display:flex; flex-direction:column; gap:6px; background:rgba(255,255,255,0.98); border-radius:12px; padding:8px; box-shadow:0 8px 30px rgba(0,0,0,0.12) }
.lang-item { display:flex; gap:8px; align-items:center; padding:8px; border-radius:8px; background:transparent; border:none; cursor:pointer }
.lang-item img { width:28px; height:18px }
.lang-item:hover { background: rgba(0,0,0,0.04) }
</style>