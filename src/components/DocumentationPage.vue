<template>
  <div class="documentation-page">
    <header class="doc-header">
      <h1>{{ t('doc_title') }}</h1>
    </header>

    <main class="doc-content">
      <figure class="doc-fig">
        <img src="https://lh3.googleusercontent.com/sitesv/AICyYdZewpqE5a5vro2qc818pEAytxo_YpXwjjzvLP32CwBK7n4E8UzWGJECywlO4KAKRVZ78u-PqYehxsM5B3PqUnjtKS_qFZR_oldJQyxhiOju8B4LjukLRSOTntOakjZ0dtMxxSrjRhsrPLLvNlLf0fbcNofwo5CI7zLWxU02jr4apDpMIRIhEb_c74TmYDU1ko_A3prtlVfDkibtEg4lbmy3Rub6GVSLlUGyofQ=w1280" alt="cutscene example 1" />
      </figure>

      <section>
        <h2>{{ t('doc_creating_title') }}</h2>
        <p>
          {{ t('doc_creating_p') }}
        </p>
      </section>

      <section>
        <h3>{{ t('doc_trigger_title') }}</h3>
        <p>{{ t('doc_trigger_intro') }}</p>
        <ul>
          <li><strong>quest_num</strong>: {{ t('doc_trigger_quest_num') }}</li>
          <li><strong>quest_val</strong>: {{ t('doc_trigger_quest_val') }}</li>
          <li><strong>script_name</strong>: {{ t('doc_trigger_script_name') }}</li>
        </ul>
        <p>{{ t('doc_trigger_more') }}</p>
      </section>

      <figure class="doc-fig">
        <img src="https://lh3.googleusercontent.com/sitesv/AICyYdYefulSrL6Equt_jQF2fSFogMf1ermQTgnS2RGDCSlZxSbT4TiXfkTBDNgF5E6fFkkIzs86hzXwOu0G46kjbYaPPsdybwYIKKDI4Ln5aIM4GWw0iPG0vm3jt89VboxiyjOzAEdAgX8RnBwA8NzRzAy_qZqT1IepTpmR_Y4RChRdxGNt8e3YZDCX9FZ6xqV0IVGCn8QIX_rLcFB99J-GQBHOBA_kCEcMXMvAHxk=w1280" alt="cutscene variables" />
      </figure>

      <section>
        <h3>{{ t('doc_script_title') }}</h3>
        <p>{{ t('doc_script_p') }}</p>
      </section>

      <figure class="doc-fig">
        <img src="https://lh3.googleusercontent.com/sitesv/AICyYdaBGX3UxEmn02TCw-VbHEHZ-8fJDn6xoKaMT2A1D42uePE2QRs7ywDvVEpn2nXg4z68Q2XTykrZb3ZDpsig-_Ppy9iF1PZVbDgwePEh2PFaIz_ncYLaWgsiIGvoCu2HwyCTRXey4gb7hQo2C9oLrf3FplRoK3GyKAJeVLtjLSIpz3Buhp-3SD04Y-nEuWdMh08Ou8mH6rmWmvFMBbsio92VudSgkzECOVH4xJ8=w1280" alt="script example" />
      </figure>

      <section>
        <h3>{{ t('doc_first_title') }}</h3>
        <ol>
          <li>{{ t('doc_first_step1') }}</li>
          <li>{{ t('doc_first_step2') }}</li>
          <li>{{ t('doc_first_step3') }}</li>
        </ol>
      </section>

      <figure class="doc-fig">
        <img src="https://lh3.googleusercontent.com/sitesv/AICyYdanS-T_Bd8C__RC_mDnMxejT_9JusopJRV5yywhK37rfg6K9_JLPykoj_YhvJ_671ja4D7tejDi9ze7DhXh0ct6feiHsrkJNFMa4RBXGt3dCc96plbhwMq428IHrFDPf2RB4eo2ICap7gFtb2tqTeZ8mVbXaKLFXR0zSEejifZC6Nx9L62ZynnPUvYKflnFuhoDZRh_d7hfkw0cHlsk6SNVJdq-9UPeR8I4=w1280" alt="cutscene process" />
      </figure>

      <section>
        <h3>{{ t('doc_commands_title') }}</h3>
        <p>{{ t('doc_commands_intro') }}</p>
        <ul>
          <li><strong>START_SCENE</strong>: {{ t('doc_cmd_start_scene') }}</li>
          <li><strong>PLAY_SFX</strong>: {{ t('doc_cmd_play_sfx') }}</li>
          <li><strong>FADE_OUT_SOUND</strong>: {{ t('doc_cmd_fade_out') }}</li>
          <li><strong>MOVE_CAMERA</strong>: {{ t('doc_cmd_move_camera') }}</li>
          <li><strong>SET_NPC_DIRECTION</strong>: {{ t('doc_cmd_set_npc') }}</li>
          <li><strong>SET_EMOJI</strong>: {{ t('doc_cmd_set_emoji') }}</li>
          <li><strong>ADD_TEXT</strong>: {{ t('doc_cmd_add_text') }}</li>
          <li><strong>WAIT_INPUT</strong>: {{ t('doc_cmd_wait_input') }}</li>
          <li><strong>CLEAR_TEXT</strong>: {{ t('doc_cmd_clear_text') }}</li>
          <li><strong>CLEAR_CAMERA</strong>: {{ t('doc_cmd_clear_camera') }}</li>
          <li><strong>PLAY_SOUND</strong>: {{ t('doc_cmd_play_sound') }}</li>
          <li><strong>END_SCENE</strong>: {{ t('doc_cmd_end_scene') }}</li>
        </ul>
      </section>

      <figure class="doc-fig">
        <img src="https://lh3.googleusercontent.com/sitesv/AICyYdYK7Lj1-KNDIOh1t1wBmPKcDtLgGcgonsyiGHU54v48VqxNgbatGhQkTGDebextQXxfUIQGEmOlZifoyKY67Tj6xqlI-Zpj6J9KqLJUXAN1qkbAI_B_uJlGUsJ98ywF1HG-aBAT3m1I8D-r5qMMzYmi3ZDnS25GXtqzA1imlyOmo5Trix5sGgqbLzTWoVfFGalQwBRpO4wNQzkCt8y6GEklala_uOIPkl4w=w1280" alt="A macro explanation" />
      </figure>

      <section>
        <h3>Important Notes</h3>
        <p>Notice how all of the functions are surrounded by an <code>A()</code> bracket? This macro stores all the data about your cutscene and compiles it into a list which is later executed in chronological order with appropriate waits. Any data not wrapped in <code>A()</code> will execute immediately when the cutscene trigger fires.</p>
      </section>

      <section>
        <h3>Customization</h3>
        <p>MonTamer Maker allows users to modify cutscenes by:</p>
        <ul>
          <li>Changing dialogue text</li>
          <li>Adjusting camera movements</li>
          <li>Adding NPC actions and interactions</li>
          <li>Using custom sound effects and background music</li>
        </ul>
        <p>For the full list of cutscene functions, open the <code>cutscene_functions</code> script located right below <code>cutscenes</code>. Each function documents its arguments and behavior.</p>
      </section>

      <figure class="doc-fig">
        <img src="https://lh3.googleusercontent.com/sitesv/AICyYdbbzyd9ao9o6wKgmyJa1BGPE3AFs1Y4jq6arEDYeWsgHXbU867fkE6abV8p8pSQukhVtF_zLsrurRhoMHIlRH9Xu1szUW381iopDHD7B-r5AtRpncyRCn4x4ETHUfpeMXQN2qtbNeplxldrPHmV1ijBVdWmKqvRWmFZcwgcXcly4el8YL_3Ng=w1280" alt="cutscene functions list" />
      </figure>

      <section class="doc-footer">
        <p>{{ t('credit') }}</p>
      </section>
    </main>
  </div>
</template>

<script>
import { t, ensureKeyTranslated } from '../i18n'

export default {
  name: 'DocumentationPage',
  methods: { t },
  async mounted() {
    const keys = [
      'doc_title','doc_creating_title','doc_creating_p','doc_trigger_title','doc_trigger_intro','doc_trigger_quest_num','doc_trigger_quest_val','doc_trigger_script_name','doc_trigger_more',
      'doc_script_title','doc_script_p','doc_first_title','doc_first_step1','doc_first_step2','doc_first_step3',
      'doc_commands_title','doc_commands_intro','doc_cmd_start_scene','doc_cmd_play_sfx','doc_cmd_fade_out','doc_cmd_move_camera','doc_cmd_set_npc','doc_cmd_set_emoji','doc_cmd_add_text','doc_cmd_wait_input','doc_cmd_clear_text','doc_cmd_clear_camera','doc_cmd_play_sound','doc_cmd_end_scene','credit'
    ]
    try { await Promise.all(keys.map(k => ensureKeyTranslated(k, (window.__YANAKO_LOCALE__ || 'en')))) } catch(e){}
  }
}
</script>

<style scoped>
.documentation-page { padding: 1.5rem; color: var(--muted-text); }
.doc-header { margin-bottom: 1rem; text-align: center }
.doc-header h1 { margin: 0 0 0.25rem 0; font-size: 1.6rem; color: #000; font-weight:700 }
.doc-header .lead { color: var(--muted-text); margin: 0 0 1rem 0; }
.doc-content section { margin-bottom: 1.25rem; background: rgba(242,240,229,0.95); padding: 1rem; border-radius: 8px; border: 1px solid var(--muted-border); }
.doc-content h2, .doc-content h3 { margin-top: 0; color: var(--heading); }
.doc-content p { color: var(--muted-text); line-height: 1.6; }
.doc-content .doc-fig { display: flex; align-items: center; justify-content: center; margin: 1rem 0; }
.doc-content .doc-fig img { max-width: 640px; width: 100%; height: auto; border-radius: 6px; box-shadow: 0 6px 16px rgba(0,0,0,0.06); display: block; }
.doc-content ul, .doc-content ol { padding-left: 1.1rem; margin: 0.6rem 0; }
.doc-content li { margin-bottom: 0.45rem }
.code { background: var(--paper); padding: 0.75rem; border-radius: 6px; overflow:auto; }
.doc-footer { margin-top: 1rem; font-size: 0.95rem; color: var(--muted-text); }
@media (max-width: 768px) { .documentation-page { padding: 1rem; } }
</style>
