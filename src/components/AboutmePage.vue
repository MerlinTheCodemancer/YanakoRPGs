<template>
  <section class="about-component">
    <div class="about-inner">
      <header class="about-header">
        <h2 v-html="title"></h2>
      </header>

      <div class="about-grid">
        <div class="about-text" v-html="html"></div>

        <aside class="about-gallery" v-if="images && images.length">
          <div class="gallery-list">
            <figure v-for="(src, i) in images" :key="i" class="gallery-fig">
              <img :src="src" :alt="`about image ${i+1}`" />
            </figure>
          </div>
          <div class="contact-note" v-if="contactNote" v-html="contactNote"></div>
        </aside>
      </div>
    </div>
  </section>
</template>

        

<script>
import { locales } from '../i18n'

export default {
  name: 'AboutmePage',
  props: { lang: { type: String, default: 'en' } },
  computed: {
    dict() { return locales[this.lang] || locales.en },
    title() { return this.dict.about_title || '' },
    html() { return this.dict.about_html || '' },
    images() { return this.dict.images || [] },
    contactNote() { return this.dict.contact_note || '' }
  }
}
</script>

<style scoped>
.about-component { padding: 2.25rem 1rem; background: transparent }
.about-inner { max-width: 980px; margin: 0 auto; padding: 0 1.25rem }
.about-header { text-align: center }
.about-header h2 { margin: 0 0 1rem 0; color: #000; font-weight:700; letter-spacing:0.4px; font-size: 1.6rem }
.about-grid { display:grid; grid-template-columns: 1fr 320px; gap:2rem; align-items:start }

/* Typography: emulate Japanese-style spacing with generous line-height and justified blocks */
.about-text { color:#222; line-height:1.85; font-size:1.02rem; text-align:left }
/* v-html injected content isn't compiled with scope attributes; use deep selector so scoped CSS applies */
.about-text ::v-deep p,
.about-text ::v-deep ul,
.about-text ::v-deep ol { margin:0 0 1.45rem 0 }
.about-text ::v-deep h4,
.about-text ::v-deep h5 { margin:1.4rem 0 0.65rem 0; font-weight:600 }
.about-text ::v-deep strong { display:inline; margin-top:0; margin-bottom:0.25rem; font-weight:700 }

/* Lists: slightly increased left padding for clear visual hierarchy */
.about-text ::v-deep ul,
.about-text ::v-deep ol { padding-left: 2.4rem }
.about-text ::v-deep li { text-indent: 0; margin-bottom: 0.65rem }

/* Lead paragraph style and preformatted block support to match example */
.about-text ::v-deep .lead { display:block; margin-bottom:1.2rem; font-weight:500 }
.about-text ::v-deep .pre-block { white-space:pre-wrap; font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace; background:rgba(0,0,0,0.03); padding:0.8rem; border-radius:6px; margin:1rem 0 }

.gallery-list { display:flex; flex-direction:column; gap:0.6rem; align-items:center }
.gallery-fig img { width:220px; border-radius:8px; box-shadow:0 6px 18px rgba(0,0,0,0.08); object-fit:cover }
.contact-note { margin-top:0.9rem; color:#495057; line-height:1.5 }

/* Responsive adjustments */
@media (max-width:1100px) {
  .about-grid { grid-template-columns: 1fr 280px }
  .gallery-fig img { width:200px }
}
@media (max-width:992px){
  .about-grid{grid-template-columns:1fr}
  .gallery-fig img{width:160px}
}
@media (max-width:480px){ .about-inner{padding:0 0.75rem} .gallery-fig img{width:100%; max-width:280px} }
</style>
