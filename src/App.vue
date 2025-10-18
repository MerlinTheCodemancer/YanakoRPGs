<template>
  <div id="app">
    <!-- Navigation Header -->
    

  <div class="main-layout">
      <!-- Left Sidebar - Profile -->
      <aside class="profile-sidebar">
        <div class="profile-card">
          <div class="profile-header">
            <img 
              src="../src/public/unnamed.gif" 
              alt="YanakoRPG Profile" 
              class="profile-avatar"
            />
          </div>
          
          <div class="profile-info">
            <h1 class="profile-name">YanakoRPG</h1>
            <p class="profile-handle">@yanakorp</p>
            <p class="profile-bio">
              Indie Game Developer | Pixel Artist | RPG Creator<br/>
              Obsessed with crafting immersive gaming experiences.<br/>
              Creating worlds one pixel at a time. Forever in<br/>
              gamedev hell but loving every moment. 🎮✨
            </p>
            
          </div>

          <!-- Social Links -->
          <div class="social-section">
            <h3>Connect</h3>
            <div class="social-links">
              <a v-for="social in socialLinks"
                 :key="social.name"
                 :href="social.url"
                 class="social-link"
                 :title="social.name"
                 target="_blank" rel="noreferrer noopener">
                <template v-if="typeof social.icon === 'string' && social.icon.startsWith('fa')">
                  <i :class="social.icon" aria-hidden="true"></i>
                </template>
                <template v-else>
                  <span class="social-icon-text">{{ social.icon }}</span>
                </template>
                <span class="social-label">{{ social.name }}</span>
              </a>
            </div>
          </div>

          <!-- Skills Radar -->
          <div class="skills-radar">
            <h3>Skills</h3>
            <div class="radar-container">
              <canvas ref="radarCanvas" width="200" height="200" class="radar-chart"></canvas>
            </div>
            <div class="skill-labels">
              <div v-for="skill in skills" :key="skill.name" class="skill-item">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="skill-bar">
                  <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                </div>
                <span class="skill-value">{{ skill.level }}</span>
              </div>
            </div>
          </div>

          <!-- Current Projects (use same icons grid style as GamesPage) -->
          <div class="current-projects">
            <h3>Current Projects</h3>
            <!-- icons grid re-used from GamesPage: single-button tiles with icon + label -->
            <div class="icons-grid">
              <!-- Only the three active projects are shown (games array already contains them) -->
              <button v-for="(g, idx) in games" :key="g.key || g.title" class="game-tile small" @click="openGameLink(g.url)" :title="g.title">
                <div class="tile-left">
                  <img :src="g.icon" :alt="g.title + ' icon'" :class="['tile-icon', g.icon && g.icon.startsWith('https://cdn.fastly.steamstatic.com/steamcommunity/public') ? 'tile-icon-steam' : '']" />
                </div>
                <div class="tile-body">
                  <span class="tile-label">{{ g.shortLabel || g.title }}</span>
                  <div class="tile-badges">
                    <span v-if="g.url && g.url.includes('store.steampowered.com')" class="badge badge-steam">Steam</span>
                    <span v-if="g.itchUrl && g.itchUrl.includes('itch.io')" class="badge badge-itch">Itch.io</span>
                    <span v-if="g.status && (g.status.toLowerCase().includes('in development') || g.status.toLowerCase().includes('available'))" class="badge badge-updating">Updating</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Navigation Tabs -->
        <div class="content-nav">
          <!-- POSTS removed: Games is primary -->
          <button 
            class="nav-tab" 
            :class="{ active: currentSection === 'games' }"
            @click="currentSection = 'games'"
          >GAMES</button>
          <button 
            class="nav-tab" 
            :class="{ active: currentSection === 'about' }"
            @click="currentSection = 'about'"
          >ABOUT</button>
          <button 
            class="nav-tab" 
            :class="{ active: currentSection === 'documentation' }"
            @click="currentSection = 'documentation'"
          >DOCUMENTATION</button>
          <button 
            class="nav-tab" 
            :class="{ active: currentSection === 'roadmap' }"
            @click="currentSection = 'roadmap'"
          >ROADMAP</button>
          <button class="nav-tab" href="#" @click.prevent="openPokedex">WIKI</button>
        </div>
        <!-- About Section -->
        <section v-if="currentSection === 'about'" class="about-section">
          <AboutmePage :lang="lang" />
        </section>

        <!-- Documentation Section -->
        <section v-if="currentSection === 'documentation'" class="documentation-section">
          <DocumentationPage />
        </section>

        <!-- Roadmap Section -->
        <section v-if="currentSection === 'roadmap'" class="roadmap-section">
          <RoadmapPage />
        </section>

        <!-- Games Page -->
        <section v-if="currentSection === 'games'" class="games-section">
          <GamesPage @navigate="handleNavigation" />
        </section>

        <!-- Posts removed; Games is the primary content area now -->
    </main>
  </div>
  <Popuplanguage :value="lang" @change="handleLangChange" />
  </div>
</template>

<script>
import GamesPage from './components/GamesPage.vue'
import RoadmapPage from './components/RoadmapPage.vue'
import DocumentationPage from './components/DocumentationPage.vue'
import AboutmePage from './components/AboutmePage.vue'
import Popuplanguage from './components/Popuplanguage.vue'
import { t, setLocale, locales } from './i18n'

export default {
  name: 'App',
  components: {
    GamesPage,
    RoadmapPage,
    DocumentationPage,
    AboutmePage
    ,Popuplanguage
  },
  data() {
    return {
      lang: 'en',
      activeGame: 0,
  currentSection: 'games',
      totalProjects: 15,
      experienceYears: 6,
      totalPixels: 250,
      socialLinks: [
        {
          name: 'YouTube',
          icon: 'fab fa-youtube',
          url: '#'
        },
        {
          name: 'X/Twitter',
          // use the brands shorthand (fab) and fall back to twitter icon
          icon: 'fab fa-twitter',
          url: '#'
        },
        {
          name: 'Bluesky',
          // fallback to an emoji butterfly so it's always visible
          icon: '🦋',
          url: '#'
        },
        {
          name: 'Steam',
          icon: 'fab fa-steam',
          url: '#'
        },
        {
          name: 'Itch.io',
          icon: 'fab fa-itch-io',
          url: '#'
        }
      ],
      skills: [
        {
          name: 'Art',
          icon: 'fas fa-palette',
          level: 90
        },
        {
          name: 'Design',
          icon: 'fas fa-pencil-ruler',
          level: 85
        },
        {
          name: 'Programming',
          icon: 'fas fa-code',
          level: 92
        },
        {
          name: 'Experience',
          icon: 'fas fa-star',
          level: 88
        },
        {
          name: 'Marketing',
          icon: 'fas fa-chart-line',
          level: 75
        }
      ],
      games: [
        {
          key: 'montamer',
          shortLabel: 'MonMae',
          title: 'MonTamer Maker',
          genre: 'Builder / Tool',
          rating: 5,
          icon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2555470/11b4b79ecac1727ac9f35da779ac231991da1dae.jpg',
          url: 'https://store.steampowered.com/app/2555470/MonTamer_Maker/',
          moreInfoUrl: '#',
          itchUrl: 'https://yanako-rpgs.itch.io/',
          longDescription: `
            Go on a quest to help Yano defeat the big, bad and ugly PPG Maker. Create, download and discover monster tamer RPGs with the newest game creation engine, MonTamer Maker!\n\n
            MonMae (MonTamer Maker) is the ultimate monster-taming game builder — now on Steam! This is a game and tool made specifically for creating your own monster-catching RPGs from scratch, no coding required.\n\n
            MonMae gives you everything you need out of the box to make a full monster-tamer RPG, including 100+ monsters, NPCs, music tracks, playable characters, tilesets, UI sets and visual editors for maps, dialogue, events and battles.\n
          `,
          status: 'Available',
          description: `Create, download and discover monster tamer RPGs with the MonTamer Maker engine. Includes editors for maps, dialogue, events, battles and a large art/music library.`,
          features: ['Game builder', 'Steam Workshop support', 'No coding required', 'Large asset libraries'],
          topArt: [
            'https://lh3.googleusercontent.com/sitesv/AICyYdau_FlQbOeEj51amgKBSOYQhW1TtYZl8rbVLuXlxSIyUWALIngt80HlpKZ3L9IccUxJUYVarpcFBRsRA23DmemDNrB7E0msfUrZdcVpNxOWYlBgATPfeiy7Q1VGxU971tXLKIvkArmSPbx9nAqkCwl01I6vgNvbWxbH9b6nKj9N_4GGsQQxYH1SUwhZfwiqwrxRJvhdaTieu67TDCtmlkS9K4R6Pzb5enBO=w1280',
            'https://lh3.googleusercontent.com/sitesv/AICyYdaJZy-JECoSGrGeZTey3TovcCevEc6nlBYln42gkORw_jE1IRzlP9x0CwbdbSHR5rPz5qGzt8kwt-HaEtL7mnpKFgOqQhl4G0BDUwiaG5Le_Nzs_zBKSREK_s5otzWBH9Vqrhlp1fNBUn7cexl6_FTpPg42mVrzz8EAUIYJkzQJB45dp6jCHjPF1mFYkd0OFgIooDqx_c0UVy1MjxGs41oMl2JVf6vCwCBHL9A=w1280'
          ],
          bottomArt: [
            'https://lh3.googleusercontent.com/sitesv/AICyYdaf_umdS0nrLMFsekERbLcujApR6I2Ph76rHd8_IazJTdBqND0kerlgB1ux7HV2Uf9_WBcpLnjI4lFiqnDGE6koEymNRpV401JqpILBrU7d37RYl3zo4yj9jLfuea5mqMH-4XDKHtUE3pXKJEhu6Dskrwo4NeLCucRk0Y8t-kJatpMdWTCSDnsn3DBCdux4zBgkNzp4yxJjfPM3YV1bLoeC274B3gvVwqwiAVg=w1280',
            'https://lh3.googleusercontent.com/sitesv/AICyYdabjK6YIkhOTWeXGYKtnnKEXC_6zLooz9Xa8U5NGZwO_1pUG7_CyiXl9X1jdbiztB9DGDvnQLgDw8L2Ge1hVCr8XfIm60y5X8tW3uSElf-rJoelMjoIYpxn54uoPnDpdFVnwfqaymFEmsv4EZ15z1pz0xHRdX7mDegzOEAbnq-qEirG1dyBfmgV4iEydHvTV5h21kvG9-ffXAH0QiKXW5A8Xb4djxTkUYhg=w1280'
          ],
          likes: 400,
          comments: 32
        },
        {
          key: 'dokimon',
          shortLabel: 'Dokimon',
          title: 'Dokimon: Quest',
          genre: 'RPG',
          rating: 5,
          icon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2019300/a3c08f83f59d8791eaa7c9a2c441aaa4f7395e49.jpg',
          url: 'https://store.steampowered.com/app/2019300/Dokimon_Quest/',
          moreInfoUrl: '#',
          itchUrl: 'https://yanako-rpgs.itch.io/dokimon-quest',
          longDescription: `Dokimon: Quest is a monster-tamer RPG set in the region of Xelos. Capture, train and battle colorful creatures across towns and routes. Includes hand-made pixel art, multiple palettes and 140+ creatures.`,
          status: 'Released',
          description: `Embark on a monster-taming adventure in a colorful retro world. Capture, train and battle creatures across towns and routes.`,
          features: ['140+ creatures', 'Multiple palettes', 'Handmade pixel art'],
          topArt: [
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2019300/movie_232x130.jpg',
            'https://lh3.googleusercontent.com/sitesv/AICyYdbWoh0r4AdokLht3QzUyhJGyRiXgSvJ1iu7zuHspDRox1l-OMaSQ87SFoVrajNMLhWovVKXpYsr54X2NKuM50EMKHVdhKuzF0nEc8Y_0ZHMzc0d6x6miT-N2CkXnYiFvtAGFy5S8TmpeQVKmCmXMFavD1f6ziQQLdm2Vghn2Lbw6vsLH-_Rr1MfL5O9xi09Cm2b6B02rSPU9LfxRLrEitjvRl24kFEXi6y0xoc=w1280'
          ],
          bottomArt: [
            'https://lh3.googleusercontent.com/sitesv/AICyYdZvQiJJKexVpCTjNtrpNN2ZiJo2yJSKtBIpWTEglMdFUcPN4MaoQsuDMeC7YoIbKwjZ0smJJFUCRNmfdsYqnZKZPM2fL7J7Anth3mnfy_mhW7HkajTzWMZJ0OHfZ8-SqpNppb8X-UhbmhKuO9aC5pre5oF_BcwvPIbTxH7y0wZC7-0nD_xmUtlCQl-m48s3kbgPPy5NQJJQAPedY8NXv_9a943cKXf2CXRo_a8=w1280',
            'https://lh3.googleusercontent.com/sitesv/AICyYdaqyBKILj9KYMzn4G9KNqcNsPiDh-MM1WrukbpJhx6QLhv8vbQmDIWzdazbHp6XIciro9OFC-09R63xpRGUYJYg6evApEV4NQJ_TtWV_WWZSuvGYPiqAtJOX_oe7ddx608MA8pynccoM7VyUXes6dMNADS_aoNGMi9WIAKKEtjhkU8r6WxLXNdxyQNa7ALvMpii_h1LkdRcnhLbYcQoSmqjpUvKhlysAZ0yGys=w1280'
          ],
          likes: 1250,
          comments: 89
        },
        {
          key: 'nuumonster',
          shortLabel: 'Nuumon',
          title: 'Nuumonsters',
          genre: 'Action/Horror',
          rating: 4,
          icon: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/1487940/b51b9ac98f50cc94a19ba9751962254d4eb6b6a8.jpg',
          url: 'https://store.steampowered.com/app/1487940/Nuumonsters/',
          moreInfoUrl: '#',
          itchUrl: 'https://yanako-rpgs.itch.io/nuumonsters',
          longDescription: `Nuumonsters is an open-world action/horror creature-collection game. Explore towns and routes, capture creatures, level up and discover event monsters. Planned features include online battling, trading, and expanded monster rosters.`,
          status: 'In Development',
          description: 'A world of curious creatures and exploration; hunt, capture and battle to be the strongest.',
          features: ['80+ monsters','Open world','Event monsters'],
          topArt: [
            'https://lh3.googleusercontent.com/sitesv/AICyYdaEW6G2vJHybwqoOn3gDJHqHCNHkjVwLZmAco2-ZhxXIFkn0mkwcXN90PZNVIXUSq8zUEPgVFq79byKSVzWTHC5gRvB3mV4BaDeNkc9KdOtqoZpiB8zlYNfXJsxBhHilrr-YasobiO4DNHMXPC17aI7p1HiTFPHcgw-p0HpiEdqNN6Ax4W-cmGthIdJTxUIXAs6w1_xv8nRpTBAHNf3vHA8IpDt9Y0VypRpz3w=w1280',
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1487940/ss_9566408ff29f5adbb2aca1d3e97f58afaa2403a9.116x65.jpg'
          ],
          bottomArt: [
            'https://lh3.googleusercontent.com/sitesv/AICyYdaIagac0AVPm-WLm0jGEcx32KlSV_UcwM8fsP-DOLnyRzlYJygV4sY0_tyjwbRYE_HViOrRzQbexX-Ilo4pqutSQp5jkte26tGYS1DTo3S4C9EBooe0LBU-mVQVnYcnozX7dHe8WKGr_tl-PNg-aSC1wFas3_B_WOEPjSpI4ZNWTwOK-rWJoH1wvGK1laXdGzkyCqMetOyVLiJ0R4jH9vX6psl-d-XsE0QB7Ko=w1280',
            'https://lh3.googleusercontent.com/sitesv/AICyYdaEW6G2vJHybwqoOn3gDJHqHCNHkjVwLZmAco2-ZhxXIFkn0mkwcXN90PZNVIXUSq8zUEPgVFq79byKSVzWTHC5gRvB3mV4BaDeNkc9KdOtqoZpiB8zlYNfXJsxBhHilrr-YasobiO4DNHMXPC17aI7p1HiTFPHcgw-p0HpiEdqNN6Ax4W-cmGthIdJTxUIXAs6w1_xv8nRpTBAHNf3vHA8IpDt9Y0VypRpz3w=w1280'
          ],
          likes: 856,
          comments: 45
        }
      ]
    }
  },
  created() {
    // initialize locale
    setLocale(this.lang)
  },
  mounted() {
    this.drawRadarChart();
  },
  methods: {
    changeLang() {
      setLocale(this.lang)
    },
    handleLangChange(code) {
      this.lang = code
      setLocale(code)
    },
    openGameLink(url) {
      if (url && url !== '#') window.open(url, '_blank')
    },
    openPokedex() {
      window.open('https://dokimon-quest-c2934b.gitlab.io/', '_blank')
    },
    selectGame(index) {
      this.activeGame = index
    },
    openSelectedGame() {
      const selectedGame = this.games[this.activeGame]
      if (selectedGame && selectedGame.url && selectedGame.url !== '#') window.open(selectedGame.url, '_blank')
    },
    handleNavigation(section) {
      this.currentSection = section
    },
    drawRadarChart() {
      const canvas = this.$refs.radarCanvas
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      const centerX = 100
      const centerY = 100
      const radius = 80

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid
      ctx.strokeStyle = 'rgba(52, 152, 219, 0.15)'
      ctx.lineWidth = 1
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI)
        ctx.stroke()
      }

      // Axes
      const angles = []
      for (let i = 0; i < this.skills.length; i++) {
        const angle = (i * 2 * Math.PI) / this.skills.length - Math.PI / 2
        angles.push(angle)
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
        ctx.stroke()
      }

      // Data polygon
      ctx.strokeStyle = '#e74c3c'
      ctx.fillStyle = 'rgba(231,76,60,0.2)'
      ctx.lineWidth = 2
      ctx.beginPath()
      this.skills.forEach((skill, index) => {
        const angle = angles[index]
        const value = (skill.level / 100) * radius
        const x = centerX + Math.cos(angle) * value
        const y = centerY + Math.sin(angle) * value
        if (index === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Dots
      ctx.fillStyle = '#e74c3c'
      this.skills.forEach((skill, index) => {
        const angle = angles[index]
        const value = (skill.level / 100) * radius
        const x = centerX + Math.cos(angle) * value
        const y = centerY + Math.sin(angle) * value
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, 2 * Math.PI)
        ctx.fill()
      })
    }
  },
  computed: {
    aboutTitle() {
      return t('about_title')
    },
    aboutHtml() {
      return t('about_html')
    },
    contactNote() {
      return t('contact_note')
    },
    aboutImages() {
      const dict = locales[this.lang] || locales.en
      return dict.images || []
    }
  }
}
</script>

<style scoped>
:root{
  /* Vintage / Retro palette (selected highlights) */
  --paper: #f2f0e5; /* aged paper */
  --paper-2: #ede19e; /* warm highlight */
  --muted-text: #45444f;
  --muted-border: #d3a068;
  --heading: #201127;
  --accent-blue: #2469b3;
  --accent-blue-2: #0b8be6;
  --accent-red: #d9626b;
  --accent-green: #6aaf9d;
  --tag-grad-start: #2469b3;
  --tag-grad-end: #6aaf9d;
}
/* Navigation Header */
.nav-header {
  background: linear-gradient(135deg, var(--paper), var(--paper-2));
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

/* Right aligned extra nav area (wiki link) */
.nav-extra { margin-left: auto; display:flex; align-items:center; gap:1rem }
.nav-extra .wiki-link { color: var(--muted-text); text-decoration:none; font-weight:700; padding:0.5rem 0.75rem; border-radius:8px }
.nav-extra .wiki-link:hover { background: rgba(0,0,0,0.03) }

.nav-link {
  text-decoration: none;
  color: var(--muted-text);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.nav-link.active,
.nav-link:hover {
  background: var(--accent-blue);
  color: var(--paper);
}

.nav-search {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input {
  padding: 0.5rem 1rem;
  border: 1px solid var(--muted-border);
  border-radius: 20px;
  background: var(--paper);
  color: var(--muted-text);
}

.post-btn {
  background: var(--accent-red);
  color: var(--paper);
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

/* Main Layout */
.main-layout {
  display: grid;
  grid-template-columns: 300px 1fr ;
  gap: 2rem;
  max-width: 1800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px);
}

/* Profile Sidebar */
.profile-sidebar {
    background-image:
    /* subtle paper tone overlay */
    linear-gradient(rgba(255, 236, 167, 0.9), rgba(255, 196, 125, 0.9)),
    /* diagonal hatching lines (very light) */
    repeating-linear-gradient(135deg, rgba(0,0,0,0.03) 0 1px, transparent 1px 8px),
    /* recycled paper texture (external) */
    url('https://img.freepik.com/fotos-premium/textura-de-fundo-de-papelao-reciclado-quadro-completo_136875-2583.jpg?semt=ais_hybrid&w=740&q=80');

  border-radius: 16px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 100px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  color: var(--muted-text);
}

.profile-card {
  text-align: center;
}

.profile-header {
  margin-bottom: 1.5rem;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--accent-red);
  object-fit: cover;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--heading);
  margin: 0;
}

.profile-handle {
  color: var(--muted-text);
  margin: 0.5rem 0;
}

.profile-bio {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--muted-text);
  text-align: left;
  margin: 1rem 0;
}

.profile-stats {
  margin: 1.5rem 0;
  text-align: left;
}

.stat {
  color: #6c757d;
  font-size: 0.9rem;
}

/* Social Links */
.social-section {
  margin: 2rem 0;
  text-align: left;
}

.social-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  text-decoration: none;
  color: #222; /* darker for legibility */
  background: rgba(255,255,255,0.85);
  border-radius: 10px;
  transition: all 0.15s ease;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.social-link:hover {
  transform: translateY(-2px);
  color: var(--accent-blue);
  background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(250,250,250,0.95));
}

.social-label { font-weight: 600; color: #222 }

.social-icon-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-weight: 800;
  font-size: 0.95rem;
  line-height: 1;
}

/* Skills Radar */
.skills-radar {
  margin: 2rem 0;
  text-align: left;
}

.skills-radar h3 {
  color: var(--heading);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.radar-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.radar-chart {
  max-width: 100%;
}

.skill-labels {
  margin-top: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  color: #222;
}

.skill-name {
  font-size: 0.8rem;
  color: #1f2933; /* darker label */
  min-width: 70px;
}

.skill-bar {
  flex: 1;
  height: 4px;
  background: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #2469b3, #ff5100);
  transition: width 0.8s ease;
}

/* Project icons grid */
.project-icons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}
.project-icon {
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(0,0,0,0.06);
  width: 96px;
  height: 96px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}
.project-icon img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
}
.project-icon .icon-label {
  font-size: 0.65rem;
  margin-top: 6px;
  color: #333;
  text-align: center;
}
.project-icon:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
}

.skill-value {
  font-size: 0.8rem;
  color: #6c757d;
  min-width: 30px;
}

/* Current Projects */
.current-projects {
  margin: 2rem 0;
  text-align: left;
}

.current-projects h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.project-tags {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tag {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  text-align: center;
}

/* Main Content */
.main-content {
  /* Recycled paper texture as the main background with subtle hatch overlay */
  background-image:
    /* subtle paper tone overlay */
    linear-gradient(rgba(255, 236, 167, 0.9), rgba(255, 196, 125, 0.9)),
    /* diagonal hatching lines (very light) */
    repeating-linear-gradient(135deg, rgba(0,0,0,0.03) 0 1px, transparent 1px 8px),
    /* recycled paper texture (external) */
    url('https://img.freepik.com/fotos-premium/textura-de-fundo-de-papelao-reciclado-quadro-completo_136875-2583.jpg?semt=ais_hybrid&w=740&q=80');
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  background-blend-mode: normal, multiply, normal;
  border-radius: 16px;
  padding: 0;
  backdrop-filter: blur(6px);
  overflow: hidden;
}

/* Content Navigation */
.content-nav {
  display: flex;
  border-bottom: 1px solid #dee2e6;
  background-image:
    /* subtle paper tone overlay */
    linear-gradient(rgba(255, 236, 167, 0.9), rgba(255, 196, 125, 0.9)),
    /* diagonal hatching lines (very light) */
    repeating-linear-gradient(135deg, rgba(0,0,0,0.03) 0 1px, transparent 1px 8px),
    /* recycled paper texture (external) */
    url('https://img.freepik.com/fotos-premium/textura-de-fundo-de-papelao-reciclado-quadro-completo_136875-2583.jpg?semt=ais_hybrid&w=740&q=80');

}

.nav-tab {
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  color: #6c757d;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.nav-tab.active,
.nav-tab:hover {
  background-image:
    /* subtle paper tone overlay */
    linear-gradient(rgba(255, 236, 167, 0.9), rgba(255, 196, 125, 0.9)),
    /* diagonal hatching lines (very light) */
    repeating-linear-gradient(135deg, rgba(0,0,0,0.03) 0 1px, transparent 1px 8px),
    /* recycled paper texture (external) */
    url('https://img.freepik.com/fotos-premium/textura-de-fundo-de-papelao-reciclado-quadro-completo_136875-2583.jpg?semt=ais_hybrid&w=740&q=80');

  color: #ff5100;
  border-bottom: 2px solid #ff5100;
}

/* About Section */
.about-section {
  padding: 2rem;
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 0;
  border-left: 4px solid #e74c3c;
  padding-left: 1rem;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: center;
}

.about-gallery {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

.about-fig img {
  width: 220px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  object-fit: cover;
}

.contact-note {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #495057;
}

.about-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #495057;
}

.about-text strong {
  color: #2c3e50;
}

.about-text em {
  color: #e74c3c;
  font-style: normal;
  font-weight: bold;
}

.character-image {
  text-align: center;
}

.character-avatar {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  border: 3px solid #e74c3c;
  object-fit: cover;
}

/* Games Portfolio */
.games-portfolio {
  padding: 2rem;
  border-top: 1px solid #dee2e6;
}

.games-portfolio .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-date {
  color: #6c757d;
  font-size: 0.9rem;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.game-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #dee2e6;
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.game-card.special-card {
  border: 2px solid #e74c3c;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
  color: white;
}

.game-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.game-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.game-card:hover .game-image img {
  transform: scale(1.05);
}

.game-info {
  padding: 1.5rem;
}

.game-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.special-card .game-title {
  color: white;
}

.game-details {
  margin-bottom: 1.5rem;
}

.game-details p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
  color: #6c757d;
}

.special-card .game-details p {
  color: rgba(255, 255, 255, 0.9);
}

.play-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.play-button:hover {
  background: #0056b3;
  transform: translateY(-1px);
}

.play-button.special {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
}

.play-button.special:hover {
  background: white;
  color: #e74c3c;
}

.game-stats {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.special-card .game-stats {
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.game-stats .stat {
  font-size: 0.9rem;
  color: #6c757d;
}

.special-card .game-stats .stat {
  color: white;
}

/* Games Section */
.games-section {
  padding: 0;
  background: none;
  border-radius: 0;
  box-shadow: none;
  overflow: visible;
}

/* Portfolio and Claims Sections */
.portfolio-section,
.claims-section {
  padding: 2rem;
  text-align: center;
}

.portfolio-content,
.claims-content {
  padding: 4rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 2rem;
}

.portfolio-content p,
.claims-content p {
  font-size: 1.2rem;
  color: #6c757d;
  font-style: italic;
}

/* Right Sidebar */
.right-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-card,
.activity-card,
.tools-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  color: #333;
  position: sticky;
  top: 100px;
}

.stats-card h3,
.activity-card h3,
.tools-card h3 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  color: white;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.9;
}

/* Activity List */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #007bff;
}

.activity-icon {
  font-size: 1.2rem;
  min-width: 20px;
}

.activity-text {
  flex: 1;
  font-size: 0.85rem;
  color: #495057;
}

.activity-time {
  font-size: 0.75rem;
  color: #6c757d;
}

/* Tech Tags */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .main-layout {
    grid-template-columns: 280px 1fr 220px;
    gap: 1.5rem;
  }
}

@media (max-width: 992px) {
  .main-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .profile-sidebar,
  .right-sidebar {
    position: relative;
    top: auto;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .games-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .nav-header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .main-layout {
    padding: 1rem;
  }
  
  .profile-sidebar {
    padding: 1.5rem;
  }
  
  .content-nav {
    flex-wrap: wrap;
  }
  
  .nav-tab {
    font-size: 0.8rem;
    padding: 0.8rem;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  
  .nav-link {
    text-align: center;
    font-size: 0.9rem;
  }
  
  .profile-avatar {
    width: 80px;
    height: 80px;
  }
  
  .profile-name {
    font-size: 1.4rem;
  }
  
  .about-section,
  .games-portfolio {
    padding: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .section-header h2 {
    font-size: 1.2rem;
  }
  
  .game-card {
    margin-bottom: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-tags {
    gap: 0.3rem;
  }
  
  .tech-tag {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }
}
</style>

<!-- Global typography overrides: all text black, specific profile name/handle orange -->
<style>
/* make body text black by default */
html, body, #app {
  color: #000 !important;
}

/* ensure most content areas inherit black text */
.main-content, .profile-sidebar, .games-portfolio, .documentation-page, .roadmap-root, .game-info-panel, .modal-content {
  color: #000;
}

/* highlight the profile name and handle in orange */
.profile-name, .profile-handle {
  color: #ff5100 !important;
}
</style>

<!-- Small global helpers so sidebar icons match GamesPage scoped styles -->
<style>
/* Icons grid for sidebar (non-scoped so it applies in App.vue) */
.icons-grid{
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.75rem;
  align-items: start;
  margin-top: 0.5rem;
}

.game-tile{
  display:flex;
  align-items:center;
  gap:0.75rem;
  padding:0.45rem 0.6rem;
  background: rgba(255,255,255,0.95);
  border-radius:10px;
  border:1px solid rgba(0,0,0,0.06);
  box-shadow: 0 6px 12px rgba(0,0,0,0.06);
  cursor:pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.game-tile:hover{ transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }

.tile-icon{ width:48px; height:48px; object-fit:cover; border-radius:8px }
.tile-label{ font-weight:700; color:#222; font-size:0.85rem }
</style>

<style>
/* smaller variant for sidebar */
.game-tile.small { padding: 0.3rem 0.45rem; gap: 0.5rem }
.game-tile.small .tile-icon { width:40px; height:40px }
.tile-icon-steam { width:56px; height:56px }
.game-tile.small .tile-label { font-size:0.78rem }

.tile-left { display:flex; align-items:center }
.tile-body { display:flex; flex-direction:column; align-items:flex-start }
.tile-badges { display:flex; gap:0.35rem; margin-top:0.25rem }
.badge { font-size:0.68rem; padding: 0.12rem 0.45rem; border-radius: 999px; color: white; font-weight:700 }
.badge-steam { background: #1b2838 }
.badge-itch { background: #ff6f61 }
.badge-updating { background: #28a745 }
</style>

<style>
/* Steam CDN icons: make icon-only tiles slightly larger and hide label */
.tile-icon-steam { width:64px; height:64px; }
.game-tile .tile-label { display: inline-block; }
.game-tile .tile-icon-steam + .tile-label { display: none; }
</style>