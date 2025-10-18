<template>
  <div class="games-page">
    <header class="games-header">
      <h1>Yanako RPGs - All Projects</h1>
      <p class="lead">A showcase of everything the studio has shipped and worked on</p>
    </header>

    <div class="games-main">
      <aside class="games-sidebar">
        <div class="icons-grid">
          <button v-for="(g, idx) in games" :key="g.key" class="game-tile" @click="selectGame(idx)" :title="g.title">
            <img :src="g.icon" :alt="g.title" class="tile-icon" />
            <span class="tile-label">{{ g.title }}</span>
          </button>
        </div>
      </aside>

      <div class="content-area">
        <div class="ds-container">
          <div class="nintendo-ds" role="img" aria-label="Nintendo DS">
            <img src="../public/nintendoDSlarge.png" alt="Nintendo DS frame" class="nintendo-ds-img" />
            <div class="ds-overlay left" @click="prevGame" title="Previous game"></div>
            <div class="ds-overlay right" @click="nextGame" title="Next game"></div>

            <div class="ds-screen-top">
              <div class="screen-content">
                <img :src="currentTopArt" :alt="currentGame.title" v-if="currentTopArt" />
              </div>
            </div>

            <div class="ds-screen-bottom">
              <div class="screen-content">
                <img :src="currentBottomArt" :alt="currentGame.title" v-if="currentBottomArt" />
              </div>
            </div>
          </div>
        </div>

        <div class="game-info-panel">
          <div class="game-info-left">
            <h2 class="game-title">{{ currentGame.title }}</h2>
            <p class="game-genre">{{ currentGame.genre }} • {{ currentGame.status }}</p>
            <p class="game-short">{{ currentGame.description }}</p>
            <div class="game-long" v-if="currentGame.longDescription" v-html="currentGame.longDescription"></div>
          </div>

          <div class="game-info-right">
            <div class="game-actions-inline">
              <template v-if="currentGame.key === 'notice'">
                <button class="play-btn primary" @click="playGame(currentGame.playUrl)">🎮 Play</button>
              </template>
              <template v-else>
                <button class="steam-btn" title="Open Steam page" @click="playGame(currentGame.url)">
                  <svg class="icon-small" viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44C9.16 16.37 9 16.7 9 17.07C9 18.19 9.81 19 10.93 19H19v-2h-8.07c-.14 0-.25-.11-.25-.25l.03-.12L12.1 15h5.45c.75 0 1.41-.41 1.75-1.03L21.5 6H6.21L5.27 4H7z"/>
                  </svg>
                  <span>Steam</span>
                </button>
                <button class="itch-btn" title="Open Itch.io page" @click="viewMore(currentGame.itchUrl)">Itch.io</button>
              </template>
            </div>

            <div class="game-meta">
              <div>❤️ {{ currentGame.likes || 0 }}</div>
              <div>💬 {{ currentGame.comments || 0 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedGame" class="game-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">×</button>
        <div class="game-details">
          <div class="game-header">
            <img :src="selectedGame.icon" :alt="selectedGame.title" class="game-icon-large" />
            <div class="game-info">
              <h2>{{ selectedGame.title }}</h2>
              <p class="game-genre">{{ selectedGame.genre }}</p>
              <div class="game-rating">
                <span v-for="star in 5" :key="star" class="star">{{ star <= selectedGame.rating ? '⭐' : '☆' }}</span>
              </div>
            </div>
          </div>

          <div class="game-screenshots">
            <img v-for="(screenshot, index) in selectedGame.screenshots" :key="index" :src="screenshot" :alt="selectedGame.title + ' Screenshot ' + (index + 1)" class="screenshot" />
          </div>

          <div class="game-description">
            <h3>Sobre o Jogo</h3>
            <p>{{ selectedGame.description }}</p>
          </div>

          <div class="game-features">
            <h3>Características</h3>
            <ul>
              <li v-for="feature in selectedGame.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>

          <div class="game-actions">
            <button class="play-btn primary" @click="playGame(selectedGame.url)">🎮 Jogar Agora</button>
            <button class="info-btn secondary" @click="viewMore(selectedGame.moreInfoUrl)">📖 Mais Informações</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GamesPage',
  data() {
    return {
      selectedGame: null,
      currentIndex: 0,
      rotateTimer: null,
      topIndex: 0,
      bottomIndex: 0,
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
          key: 'notice',
          shortLabel: 'Leena',
          title: 'Notice Me Leena-senpai!',
          genre: 'Tower Defense',
          rating: 4,
          icon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1988530/1708f49dabdb156a4c6aae08f99551e66e56fc60.jpg',
          url: 'https://store.steampowered.com/app/1988530/Notice_Me_Leenasenpai/',
          moreInfoUrl: '#',
          itchUrl: 'https://yanako-rpgs.itch.io/',
          playUrl: 'https://gx.games/pt-br/games/543d2w/notice-me-leena-senpai-',
          longDescription: `Notice Me Leena-senpai! is a grid-based tower defense with visual novel elements — defend the school from demon minions, build and upgrade towers, and follow a story campaign.`,
          status: 'Available',
          description: `Defend the school from demon minions in a grid-based tower defense with visual novel elements.`,
          features: ['28 tower types','Story campaign','Multiple difficulty modes'],
          topArt: [
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2806650/capsule_616x353.jpg?t=1749383208',
            'https://youtu.be/S-y8KoaxKoU?si=fSqIegFLKrVUZ7Ql'
          ],
          bottomArt: [
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1988530/ss_795f15c02ca79d4208f6798a9de52954293cccdf.1920x1080.jpg?t=1759031694',
            'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1988530/ss_78103b82c5acd911a1cafabda455966db7605b06.1920x1080.jpg?t=1759031694'
          ],
          likes: 300,
          comments: 12
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
  computed: {
    currentGame() {
      return this.games[this.currentIndex] || this.games[0];
    }
    ,
    currentTopArt() {
      const g = this.currentGame;
      if (!g || !g.topArt || g.topArt.length === 0) return null;
      return g.topArt[this.topIndex % g.topArt.length];
    },
    currentBottomArt() {
      const g = this.currentGame;
      if (!g || !g.bottomArt || g.bottomArt.length === 0) return null;
      return g.bottomArt[this.bottomIndex % g.bottomArt.length];
    }
  },
  methods: {
    navigateToSection(section) {
      // Emit event to parent component to change section
      this.$emit('navigate', section);
    },
    openGame(gameKey) {
      // find index by key
      const idx = this.games.findIndex(g => g.key === gameKey);
      if (idx !== -1) this.currentIndex = idx;
    },
    selectGame(index) {
      if (index >= 0 && index < this.games.length) {
        this.currentIndex = index;
        this.topIndex = 0;
        this.bottomIndex = 0;
      }
    },
    prevGame() {
      if (this.currentIndex <= 0) this.currentIndex = this.games.length - 1;
      else this.currentIndex--;
    },
    nextGame() {
      if (this.currentIndex >= this.games.length - 1) this.currentIndex = 0;
      else this.currentIndex++;
    },
    closeModal() {
      this.selectedGame = null;
    },
    playGame(url) {
      if (url !== '#') {
        window.open(url, '_blank');
      }
      this.closeModal();
    },
    viewMore(url) {
      if (url !== '#') {
        window.open(url, '_blank');
      }
    }
  },
  mounted() {
        // start automatic rotation of top and bottom art
        this.rotateTimer = setInterval(() => {
          const g = this.currentGame;
          if (g && g.topArt && g.topArt.length) {
            this.topIndex = (this.topIndex + 1) % g.topArt.length;
          }
          if (g && g.bottomArt && g.bottomArt.length) {
            this.bottomIndex = (this.bottomIndex + 1) % g.bottomArt.length;
          }
        }, 4000); // rotate every 4s
      },
      beforeUnmount() {
        if (this.rotateTimer) {
          clearInterval(this.rotateTimer);
          this.rotateTimer = null;
        }
      }
    }
  </script>

<style scoped>
.games-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  position: relative;
}
.icons-grid{
  margin-right: 5vh;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.75rem;
  align-items: start;
}

/* layout: sidebar left, content right */
.games-main { display: flex; gap: 2rem; width: 100%; max-width: 1280px; }
.games-sidebar { width: 180px; flex: 0 0 160px; }
.content-area { flex: 1; display:flex; flex-direction:column; align-items:center }

@media (max-width: 992px) {
  .games-main { flex-direction: column; }
  .games-sidebar { width: auto; flex: none; order: 2 }
  .content-area { order: 1 }
  .icons-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem }
}

@media (max-width: 480px) {
  .icons-grid { grid-template-columns: repeat(2, 1fr); }
}

.games-header { text-align: center; margin-bottom: 1rem }
.games-header h1 { margin: 0 0 0.25rem 0; color: #000 }
.games-header .lead { margin: 0 0 1rem 0; color: #000 }

/* Abstract background elements */
.games-page::before { display: none; }

/* Nintendo DS Frame */
.ds-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.nintendo-ds {
  width: 720px;
  height: 520px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nintendo-ds-img {
  position: absolute;
  left: 50%;
  /* Keep image centered, but visually stretch only horizontally using scaleX so it doesn't grow taller */
  transform: translateX(-50%) scaleX(1.15); /* 15% wider without increasing height */
  transform-origin: center center;
  /* Use max-height to prevent vertical overflow while allowing horizontal stretching */
  max-height: 520px;
  width: auto; /* let scaleX handle horizontal widening */
  height: auto;
  object-fit: contain;
  pointer-events: none;
  z-index: 5; /* bring DS frame above the screen art */
}

/* DS screens - top and bottom framed areas */
.ds-screen-top,
.ds-screen-bottom {
  position: absolute;
  width: 46%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  box-shadow: inset 0 4px 12px rgba(0,0,0,0.6), 0 6px 18px rgba(0,0,0,0.25);
  z-index: 2; /* place screens behind the DS frame (which is z-index:5) */
}
.ds-screen-top { top: 9.3%; left: 27.5%; height: 34%; z-index: 3; }
.ds-screen-bottom { bottom: 9%; left: 27.5%; height: 34%; z-index: 3; }

.screen-content { width: 92%; height: 88%; overflow: hidden; display:flex; align-items:center; justify-content:center; }
.screen-content img { width:100%; height:100%; object-fit:cover; border-radius:4px; }

/* clickable overlay zones on DS to change game */
.ds-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 30%;
  cursor: pointer;
}
.ds-overlay.left { left: 0; }
.ds-overlay.right { right: 0; }

.ds-overlay { z-index: 4; }

.ds-top-label {
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
  color: #222;
  background: rgba(255,255,255,0.85);
  padding: 4px 10px;
  border-radius: 12px;
}

.ds-screen-preview {
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translateX(-50%);
  width: 55%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ds-screen-preview img { max-width: 100%; max-height: 100%; border-radius: 8px; z-index: 3; }

/* Status Bar */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.time {
  font-size: 1.1rem;
}

.indicators {
  display: flex;
  gap: 0.5rem;
}

/* Character Section */
.character-section {
  height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2rem;
}

.character-duo {
  display: flex;
  gap: 1rem;
  z-index: 2;
}

.character {
  width: 80px;
  height: 120px;
  position: relative;
  animation: float 3s ease-in-out infinite;
}

.character.blue-char {
  animation-delay: 0s;
}

.character.pink-char {
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.char-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
}

.char-face {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #FFB6C1, #FF69B4);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid rgba(255, 255, 255, 0.8);
  position: relative;
}

.char-face::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 20%;
  right: 20%;
  height: 40%;
  background: linear-gradient(135deg, #FF1493, #8A2BE2);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}

.char-eyes {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  z-index: 1;
}

.char-mouth {
  font-size: 0.8rem;
  z-index: 1;
}

.ground-pattern {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    transparent 8px,
    rgba(0, 0, 0, 0.1) 8px,
    rgba(0, 0, 0, 0.1) 16px
  );
}

/* App Grid */
/* game info panel shown under DS */
.game-info-panel {
  width: 960px;
  max-width: calc(100vw - 40px);
  display: flex;
  gap: 1.5rem;
  background: rgba(255,255,255,0.98);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  align-items: flex-start;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.game-info-left { flex: 1; }
.game-title { margin: 0; font-size: 1.4rem; color: #222; }
.game-genre { color: #666; margin: 6px 0; }
.game-short { color: #444; }
.game-long { color: #333; margin-top: 0.5rem; max-height: 260px; overflow: auto; padding-right: 0.5rem; }
.game-info-right { display:flex; flex-direction: column; align-items: flex-end; gap: 0.75rem; }
.game-actions-inline { display:flex; gap:0.5rem; }
.game-meta { color:#666; font-size:0.95rem; display:flex; gap:0.75rem; }

.icons-grid{
  margin-right: 5vh;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.75rem;
  align-items: start;
}

/* single tile button with icon + name */
.game-tile {
  display:flex;
  align-items:center;
  gap:0.75rem;
  padding:0.5rem 0.75rem;
  background: rgba(255,255,255,0.95);
  border-radius:10px;
  border:1px solid rgba(0,0,0,0.06);
  box-shadow: 0 6px 12px rgba(0,0,0,0.06);
  cursor:pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.game-tile:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
.tile-icon { width:56px; height:56px; object-fit:cover; border-radius:8px }
.tile-label { font-weight:700; color:#222; font-size:0.95rem }

.steam-btn, .itch-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: 700;
}
.steam-btn { background: #1b2838; color: #fff; }
.itch-btn { background: #ff6f61; color: #fff; }
.icon-small { width: 18px; height: 18px; display: inline-block; }

.app-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.app-icon:hover {
  transform: scale(1.1);
}

.app-icon:active {
  transform: scale(0.95);
}

.app-bg {
  width: 65px;
  height: 65px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.2),
    inset 0 1px 3px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.app-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.app-icon:hover .app-bg::before {
  left: 100%;
}

/* App Colors */
.yellow { background: linear-gradient(135deg, #FFD700, #FFA500); }
.cyan { background: linear-gradient(135deg, #00CED1, #00BFFF); }
.orange { background: linear-gradient(135deg, #FF6347, #FF4500); }
.green { background: linear-gradient(135deg, #32CD32, #228B22); }
.dark-green { background: linear-gradient(135deg, #006400, #2E8B57); }
.purple { background: linear-gradient(135deg, #9370DB, #8A2BE2); }
.pink { background: linear-gradient(135deg, #FFB6C1, #FF69B4); }
.indigo { background: linear-gradient(135deg, #4B0082, #6A5ACD); }
.coral { background: linear-gradient(135deg, #FF7F50, #FF6347); }

.app-label {
  font-size: 0.7rem;
  font-weight: bold;
  color: #2c2c2c;
  text-align: center;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 0.5px;
}

/* Brand Section */
.brand-section {
  text-align: center;
  padding: 1rem;
  position: relative;
}

.brand-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2c2c2c;
  margin: 0;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.3),
    0 0 10px rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
}

.brand-subtitle {
  font-size: 1.2rem;
  color: #2c2c2c;
  margin: 0.5rem 0;
  font-weight: 600;
  letter-spacing: 1px;
}

.wave-pattern {
  height: 20px;
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    transparent 10px,
    rgba(0, 0, 0, 0.1) 10px,
    rgba(0, 0, 0, 0.1) 12px
  );
  margin-top: 1rem;
  border-radius: 10px;
}

/* Bottom Navigation */
.bottom-nav {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.nav-dot.active {
  background: #2c2c2c;
  transform: scale(1.3);
}

/* Game Modal */
.game-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff4757;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
}

.game-details {
  padding: 2rem;
}

.game-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.game-icon-large {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  object-fit: cover;
}

.game-info h2 {
  color: #2c2c2c;
  margin: 0 0 0.5rem 0;
}

.game-genre {
  color: #666;
  margin: 0 0 0.5rem 0;
}

.game-rating {
  font-size: 1.2rem;
}

.game-screenshots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.screenshot {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #eee;
}

.game-description,
.game-features {
  margin-bottom: 2rem;
}

.game-description h3,
.game-features h3 {
  color: #2c2c2c;
  margin-bottom: 1rem;
}

.game-features ul {
  list-style: none;
  padding: 0;
}

.game-features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.game-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.play-btn,
.info-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.primary {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
}

.secondary {
  background: linear-gradient(135deg, #87CEEB, #4682B4);
  color: white;
}

.play-btn:hover,
.info-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .games-page {
    padding: 1rem;
  }
  
  .mobile-frame {
    width: 300px;
    height: 600px;
  }
  
  .app-grid {
    gap: 1rem;
    padding: 1.5rem 1rem;
  }
  
  .app-bg {
    width: 55px;
    height: 55px;
    font-size: 1.5rem;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: 85vh;
  }
  
  .game-actions {
    flex-direction: column;
  }
}

</style>