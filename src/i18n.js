// Minimal i18n store with optional TAS translation helper
import tasClient from './services/tasClient'
import translateClient from './services/translateClient'

export const locales = {
  en: {
    about_title: ':: About me',
    about_html: `
<p>Nice to meet you! Thank you for watching!</p>

<p>My name is <strong>Hachino</strong>. I'm a developer based in Tokyo, Japan, and I've been working exclusively on game development for the past 10 years.</p>

<p>During my journey, I've been able to accomplish the following:</p>

<ul>
  <li>Gained an audience of approximately 16,000 people following my projects on Twitter.</li>
  <li>Earned over ¥3.55 million in sales of games and assets on itch.io in less than a year.</li>
  <li>Worked on over 80 game projects as a freelancer, with an average of five stars from over 115 reviews over seven years.</li>
  <li>Ran a successful Kickstarter campaign, earning over ¥4.4 million.</li>
  <li>Generated over ¥1.18 million on Steam for my first two self-published games (some of which included marketing).</li>
</ul>

<h4>Skills and Experience Summary</h4>

<h5>Programming and Game Design</h5>
<p>First and foremost, my primary areas of expertise are game design and programming. I've primarily worked on 2D games with a nostalgic atmosphere, but I also have experience creating mobile games, anime-style games, and pseudo-3D games.</p>

<p>Most of the time, I work as the head programmer and also help direct the art and worldbuilding departments. As such, I have experience not only as the head programmer but also as the head art director on indie game projects.</p>

<h5>Art Direction and Graphic Design</h5>
<p>While gaining experience as a game developer, I also leveraged my artistic skills and tried my hand at marketing. While learning programming, I studied graphic design for two years and was able to obtain certifications in Adobe Photoshop and Adobe Illustrator in 2016.</p>

<p>I'm happy to say that my artistic skills have improved significantly over the past decade, contributing greatly to the projects I've worked on!</p>

<h5>Sales and Community Involvement</h5>
<p>In terms of marketing, I opened my first Instagram account dedicated to my game project around 2018 and managed to gain 15,000 followers over the course of two years. I then abandoned that platform to move to Twitter (X), where, as of this writing, I have over 16,000 followers.</p>

<p>Using Twitter as a marketing tool to share artwork and project progress, I achieved a reach of over 10 million in one month during my best month (with a peak of 15 million views in 28 days).</p>

<p>My first game, "Nuumonsters," received a total of 2,206,324 impressions on Steam between January 1, 2021 and January 1, 2022.</p>

<p>(Release date: February 18, 2022)</p>

<h5>Various Skills and Experience</h5>
<p>In addition to the core skills mentioned above, I'd like to list a few other skills I've acquired through hundreds of hours of experience.</p>

<p><strong>Team leadership:</strong> Next to programming, this is a personal skill I'm confident in. I started working as a leader in my first job, was promoted within six months, and held that position for three years before leaving to start my own business. Since launching Yanako RPGs, I've been working as a project leader and director with my own team members and individuals from other companies.</p>

<p><strong>Map and World Creation:</strong> For my personal projects, I contributed heavily to map development, including routes, cities, towns, mountain ranges, and interiors. I often hand-created large maps for the game, sometimes independently.</p>

<p><strong>World Building:</strong> To me, world building is creating a game universe for players to experience. This includes the game's story, setting, characters, their interactions, and everything related to the development of the world within the game's universe.</p>

<p><strong>Story Writing and Translation:</strong> Finally, there's story writing. This is closely related to world building and involves the specific personality traits and dialogue spoken by characters in the game. I also have experience translating from Japanese to English.</p>

<p>Thank you for reading to the end! If you have any questions or concerns, please feel free to contact me at the following email address: <a href="mailto:yanakorpgs@gmail.com">yanakorpgs@gmail.com</a></p>

<p>(c) Yanako RPGs LLC</p>
`,
    images: [
      'https://lh3.googleusercontent.com/sitesv/AICyYdaBTwcaguK_swYp_JzfQqfr-bHEfQLd6kCxdHPdA-n7xcsLzf5Wc8RhcMeDEWcNhXfWSkmUyvS5zhraHI5cQeNc0Ejmh0XufENnpAtmovaWrCUM9uKPf2Cli-OUaaQmuyt8Biwfwelcj0KFE4vtHkG5M4o39ULjnKa-KxnUebec2esWhZA8tz7ny1GtSMQsz__LZqVNmUkBppIq-1s0Ql86vOfkRlCL47jWbPk=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYdYTw0A1Bvwm-LZ-SDMuD0yR97xG1v9glm511bHxGKygebf0xOB2kGoUzSNDKnD6Beh7LIb2kbuG6v7XPqj1yxO6Zi6L7-GzUuj-KYnAP8piODqTwd7BHpPCPhdnr9h7i5265qvIy6GTNJpkUfSfelVOY3FNv-3DDDNY-WRGfBPS0MHEn48FmATwcKQRFpCt6ylJ6o-JcGiUmtqFRRpu7RPNc99yWSInrmgo-ik=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYdblMEu8ctlt92mhqaaYnaseWkVWKmUIXniSEP2LL2GMOVkmWr_XrXftXu3vLDptoC3714cYYNueMs2G2yOUz4sxgs0y77PY1WwYrT7N57QxJTY2pZTwqVtjqgMM77YG0VZ8D6xL6Ob0c4SCueD3rsWnU14fb_AvnIkRXXD36ix8AD5ZCYoPjuJ_=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYdavymgZxMYcIZRsTUjVmZW-aSlKZRiHiwEs7cvKTx_g0SDsMWgHIHHwKCyx9L9LZ4Rej2BqqvDzcfENCmzg7t-E_MUtahgXjxiyQX3FOSQvUECXA2qLq26ZhlixGMARwNGD2UPKUZTZgTHGgG6ifhdsrAnGVCEzi6rVywdoYGRPgTJSDydhpwxi=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYdaYqiBHPdzksu8RYygwB7M2jISYlbO6t__Xix4ziozlC73DbPcj7KB-HJdZYfvLRl--xVmw8LwPvoAEpFB5ZE2GEEa_VLP3Du72CF46-2eMt4reUlGh1GP-alaANX7zSISEgcBPc1yC47gojr30rm3AFy1Wc5RX1GerHyaDRnYc8T7kNe_m1CDho5ZxG3mAymHY7BYjWgYox0Y1abp4XSdT8KbIDm8_1ljKMe8=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYdY9ZZskbJI79l-mK2TaGY5kOjz89f2QX5uVgdr0yeQeJ-HGLM3daTfCuyvCqNC2Jhv5c0BfQkNIead3a5d6zkQz5H0UMdm72Ai1iUYV2d1q4IoipRwlp9z7i46C-_6PMAT7zZoBMkTwoApGxOQWsXuJlhxaTUar5JXyFQqX8O7kG0AXq7Oxcj_i5fRmpJRMIQUZZXK2DkF5Vmt9N9NBeJ36QAYFS7c7x_amQqU=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYda4qvzdwXjMGsXb2wIchCQ1jU-PH2zhuYUENZHTCaVA5XADjwbjc8jzg778L5doo04IA8T65EoD3lVsqs-hKXVPOlikGdH6Wrv3jjLHHgQVua2mB83X8q6K-wX7eDyZSxlCP88ZGFFRKUyP1tyIGTIrKuvWmjcNDJ2rLiC-Kycmavc0s-Y7nLziVxOAcEm369s5AyUGA6HZaJgJ2B43pCZoTefng_FWfpI1-fw=w1280'
    ],
    contact_note: 'If you have questions, email: yanakorpgs@gmail.com'
    ,
    // Roadmap translations (short headings/labels)
    roadmap_title: 'Yanako RPGs - Projects Roadmap',
    roadmap_lead: 'To help the community keep track of important dates on multiple projects, we publish this living roadmap. Dates are estimates unless a specific day is mentioned.',
    lookback_2025: 'A lookback at 2025',
    coming_2026: 'Coming in 2026',
    whats_next_title: "What's next?",
    whats_next_para: 'We expect Dokimon, Luna, and Nuumonsters to be in strong standing by April. As we move forward we will likely start new projects while continuing maintenance on Luna.',
    credit: '(c) Yanako RPGs LLC',
    // Roadmap item keys (titles + short descriptions)
    item_yami_announcement: 'Yami Kids Announcement',
    item_yami_announcement_p: 'Tosh and Yano announced a new game with a Kickstarter campaign planned for late 2025, built on the Luna engine (formerly MonMae).',
    item_nuumonsters_remake: 'Nuumonsters Remake Begins',
    item_nuumonsters_remake_p: 'Nuumonsters is being remade on the Luna platform; this will be a free update to existing Steam users and marks the move out of early access.',
    item_dokimon_update: 'Final Dokimon: Quest Content Update',
    item_dokimon_update_p: 'Dokimon: Quest will receive a final content update including player accessories and an "Alt-Region" expansion.',
    item_yami_kickstarter: 'Yami Kids Kickstarter',
    item_yami_kickstarter_p: 'Yami Kids will launch a Kickstarter to help with marketing and campaign support.',
    item_yami_steam: 'Yami Kids Steam Launch',
    item_yami_steam_p: 'Kickstarter is set to run in June/July; release later in the year. The team estimates the game will be 80–90% complete by campaign end.',
    item_dokimon_sequel: 'Dokimon: Quest Sequel',
    item_dokimon_sequel_p: 'Announcement made—scheduled for 2026. More details to come as work progresses.'
  ,
    // Documentation (cutscenes) keys
    doc_title: 'MonTamer Maker Documentation - Cutscenes',
    doc_creating_title: 'Creating a Cutscene',
    doc_creating_p: 'To create a cutscene in MonTamer Maker, you need to place an obj_cutscene_trigger object in the world. When a player walks over this object, a check is triggered.',
    doc_trigger_title: 'Cutscene Trigger Conditions',
    doc_trigger_intro: 'Each obj_cutscene_trigger has the following instance variables that determine when the cutscene is executed:',
    doc_trigger_quest_num: 'The quest being checked. 0 is the main story quest.',
    doc_trigger_quest_val: 'The quest value required to trigger the cutscene. It starts at 0.',
    doc_trigger_script_name: 'The name of the script to run when the conditions are met, e.g., scene_intro or scene_the_end.',
    doc_trigger_more: 'These are the main parts of the obj_cutscene_trigger and all you need to worry about for now. To view these, drag a obj_cutscene_trigger into a room, double-click it, and then click on "variables".',
    doc_script_title: 'Cutscene Script Structure',
    doc_script_p: 'A cutscene script is essentially a list of pre-made functions that users can call to build their own scenes. These functions take various arguments like text, coordinates, and other values to customize cutscenes.',
    doc_first_title: 'How to Make your First Cutscene',
    doc_first_step1: 'All cutscenes are found in the "cutscenes" script (Scripts > Story & Characters > cutscenes). Double-click to open it.',
    doc_first_step2: 'To make a new one, write (or copy/paste a template) a new function under or above existing cutscene functions. For example: function scene_intro(){ ... }',
    doc_first_step3: 'Wrap your cutscene function calls with the A() macro so they execute in order.',
    doc_commands_title: 'Explanation of Commands Used',
    doc_commands_intro: 'Below are common commands used inside cutscenes. Commands marked with * are required for correct cutscene setup:',
    doc_cmd_start_scene: '* Required for all cutscenes. Sets up and initializes the scene.',
    doc_cmd_play_sfx: 'Plays a sound effect.',
    doc_cmd_fade_out: 'Fades out background music or other sounds.',
    doc_cmd_move_camera: 'Moves the camera to specified coordinates.',
    doc_cmd_set_npc: 'Changes the facing direction of an NPC.',
    doc_cmd_set_emoji: 'Displays an emoji or reaction above an NPC.',
    doc_cmd_add_text: 'Displays text on the screen.',
    doc_cmd_wait_input: 'Pauses until the player presses a button.',
    doc_cmd_clear_text: 'Clears on-screen text.',
    doc_cmd_clear_camera: 'Resets the camera to its default position (following the player).',
    doc_cmd_play_sound: 'Resumes the background music.',
    doc_cmd_end_scene: '* Required for all cutscenes. Marks the end and returns control to the player.'
  },
  ja: {
    about_title: ':: About me',
    about_html: `はじめまして！ご覧いただき、ありがとうございました。<br/><br/>
私は八野と申します。私は東京、日本を拠点とした開発者で、過去10年間、ゲーム制作に専念してきました。<br/><br/>
私の冒険の中で、以下のことを達成することができました：<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;ツイッターでプロジェクトをフォローする約一万六千人の観客を獲得<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;itch.ioでゲームとアセットの販売で、一年未満の間に３５５万円上を売り上げる<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;フリーランスとして８０以上のゲームプロジェクトに参加し７年間で１１５以上のレビューで平均五つ星を獲得<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;成功したキックスターターキャンペーンを実施し、４４０万円以上を獲得<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;最初の二つの自己販売ゲームでSteamで１１８万円以上を生成（そのうちの一部はマーケティングを含む）<br/><br/>
<strong>スキルと経験の概要</strong><br/><br/>
<strong>プログラミングとゲームデザイン</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;まず第一に、私の主な専門分野はゲームデザインとプログラミングです。主に、懐かしさの雰囲気を醸し出す2Dゲームに取り組んできましたが、モバイルゲーム、アニメスタイルのゲーム、疑似3Dゲームの制作経験もあります。<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;ほとんどの場合、私はヘッドプログラマーとして活動しており、アートとワールドビルディングの部門を指導するのにも手を貸しています。そのため、インディーゲームプロジェクトにおいてヘッドプログラマーとしての経験だけでなく、ヘッドアートディレクターとしての経験もあります。<br/><br/>
<strong>美術指導とグラフィックデザイン</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;ゲーム開発者としての経験を積む中で、アートスキルを活かし、マーケティングにも挑戦しました。プログラミングを学びながら、二年間グラフィックデザインを学び、2016年にAdobe PhotoshopとAdobe Illustratorの認定資格を取得することができました。<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;喜んで言えることは、過去十年間で私のアートスキルが大きく向上し、私が取り組んだプロジェクトに多くの貢献をしました！<br/><br/>
<strong>営業活動と地域参加</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;マーケティングに関しては、2018年ごろに初めて自身のゲームプロジェクト専用のインスタグラムアカウントを開設し、二年間で一万五千人のフォロワーを獲得することができました。その後、ツイッターに移行するためにそのプラットフォームを放置しました（X）、執筆時点では一万六千人以上のフォロワーがいます。<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;ツイッターを使用してアートワークやプロジェクトの進捗を共有するマーケティング手法を活用した際、最高の月には1ヶ月間で千万以上のリーチを達成したことがあります（28日間で最高で千五百万ビューを記録しました）。<br/><br/>
<strong>私の最初のゲーム「Nuumonsters」のSteamのインプレッション</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;2021年1月1日から2022年1月1日まで（リリース日：2022年2月18日）の期間で、累計で2,206,324回です。<br/><br/>
<strong>多彩なスキルと経験</strong><br/>
上記で述べた主要なスキル以外にも、数百時間の経験があるいくつかのスキルを挙げてみたいと思います。<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<strong>チームリーダーシップ：</strong>プログラミングに続いて、自信を持っている個人的なスキルです。最初の仕事からリーダーとして活動し始め、六ヶ月で昇進し、三年間そのポジションを保持した後、自分のビジネスを始めるために退職しました。Yanako RPGsを立ち上げて以来、自社のチームメンバーや他社の個人と一緒にプロジェクトのリーダーやディレクターとして活動しています。<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<strong>マップとワールドの作成：</strong>個人のプロジェクトに関しては、ルート、都市、町、山岳地帯、室内など、マップの開発に大いに貢献しました。多くの場合、ゲームに使用される大きなマップを手描きで制作し、時には独力で行うこともありました。<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<strong>ワールドビルディング：</strong>私にとって、ワールドビルディングはプレイヤーが体験するためのゲームの宇宙を作り上げることです。これにはゲームのストーリー、設定、キャラクター、キャラクター同士の相互作用、そしてこのゲームの宇宙での世界の発展に関するすべてが含まれます。<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<strong>ストーリーの執筆と翻訳：</strong>最後に、ストーリーの執筆です。これはワールドビルディングと密接に関連しており、ゲームに登場するキャラクターが言う具体的な性格や対話の詳細に関わります。私は日本語から英語への翻訳経験もあります。<br/><br/>
最後までお読みいただき、ありがとうございます！何かご質問やご不明点がございましたら、以下のメールアドレスまでご連絡いただければ幸いです：<br/><a href="mailto:yanakorpgs@gmail.com">yanakorpgs@gmail.com</a><br/><br/>(c) Yanako RPGs LLC`,
    images: [
      'https://lh3.googleusercontent.com/sitesv/AICyYdaBTwcaguK_swYp_JzfQqfr-bHEfQLd6kCxdHPdA-n7xcsLzf5Wc8RhcMeDEWcNhXfWSkmUyvS5zhraHI5cQeNc0Ejmh0XufENnpAtmovaWrCUM9uKPf2Cli-OUaaQmuyt8Biwfwelcj0KFE4vtHkG5M4o39ULjnKa-KxnUebec2esWhZA8tz7ny1GtSMQsz__LZqVNmUkBppIq-1s0Ql86vOfkRlCL47jWbPk=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYdYTw0A1Bvwm-LZ-SDMuD0yR97xG1v9glm511bHxGKygebf0xOB2kGoUzSNDKnD6Beh7LIb2kbuG6v7XPqj1yxO6Zi6L7-GzUuj-KYnAP8piODqTwd7BHpPCPhdnr9h7i5265qvIy6GTNJpkUfSfelVOY3FNv-3DDDNY-WRGfBPS0MHEn48FmATwcKQRFpCt6ylJ6o-JcGiUmtqFRRpu7RPNc99yWSInrmgo-ik=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYdblMEu8ctlt92mhqaaYnaseWkVWKmUIXniSEP2LL2GMOVkmWr_XrXftXu3vLDptoC3714cYYNueMs2G2yOUz4sxgs0y77PY1WwYrT7N57QxJTY2pZTwqVtjqgMM77YG0VZ8D6xL6Ob0c4SCueD3rsWnU14fb_AvnIkRXXD36ix8AD5ZCYoPjuJ_=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYdavymgZxMYcIZRsTUjVmZW-aSlKZRiHiwEs7cvKTx_g0SDsMWgHIHHwKCyx9L9LZ4Rej2BqqvDzcfENCmzg7t-E_MUtahgXjxiyQX3FOSQvUECXA2qLq26ZhlixGMARwNGD2UPKUZTZgTHGgG6ifhdsrAnGVCEzi6rVywdoYGRPgTJSDydhpwxi=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYdaYqiBHPdzksu8RYygwB7M2jISYlbO6t__Xix4ziozlC73DbPcj7KB-HJdZYfvLRl--xVmw8LwPvoAEpFB5ZE2GEEa_VLP3Du72CF46-2eMt4reUlGh1GP-alaANX7zSISEgcBPc1yC47gojr30rm3AFy1Wc5RX1GerHyaDRnYc8T7kNe_m1CDho5ZxG3mAymHY7BYjWgYox0Y1abp4XSdT8KbIDm8_1ljKMe8=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYdY9ZZskbJI79l-mK2TaGY5kOjz89f2QX5uVgdr0yeQeJ-HGLM3daTfCuyvCqNC2Jhv5c0BfQkNIead3a5d6zkQz5H0UMdm72Ai1iUYV2d1q4IoipRwlp9z7i46C-_6PMAT7zZoBMkTwoApGxOQWsXuJlhxaTUar5JXyFQqX8O7kG0AXq7Oxcj_i5fRmpJRMIQUZZXK2DkF5Vmt9N9NBeJ36QAYFS7c7x_amQqU=w1280',
      'https://lh3.googleusercontent.com/sitesv/AICyYda4qvzdwXjMGsXb2wIchCQ1jU-PH2zhuYUENZHTCaVA5XADjwbjc8jzg778L5doo04IA8T65EoD3lVsqs-hKXVPOlikGdH6Wrv3jjLHHgQVua2mB83X8q6K-wX7eDyZSxlCP88ZGFFRKUyP1tyIGTIrKuvWmjcNDJ2rLiC-Kycmavc0s-Y7nLziVxOAcEm369s5AyUGA6HZaJgJ2B43pCZoTefng_FWfpI1-fw=w1280'
    ],
    contact_note: 'ご質問がある場合は、yanakorpgs@gmail.com にメールしてください'
  }
  ,
  pt: {
    about_title: ':: Sobre mim',
    about_html: `
<p>Prazer em conhecê-lo! Obrigado por visitar.</p>

<p>Meu nome é <strong>Hachino</strong>. Sou um desenvolvedor baseado em Tóquio, Japão, e trabalho com desenvolvimento de jogos há 10 anos.</p>

<p>Durante minha jornada, alcancei os seguintes marcos:</p>

<ul>
  <li>Mais de 16.000 seguidores acompanhando meus projetos no Twitter.</li>
  <li>Vendas de jogos e assets no itch.io que geraram receita significativa em menos de um ano.</li>
  <li>Colaborei em mais de 80 projetos como freelancer.</li>
</ul>

<h4>Resumo de habilidades e experiência</h4>

<h5>Programação e Game Design</h5>
<p>Minhas áreas principais são design de jogos e programação, com foco em jogos 2D.</p>

<h5>Direção de Arte e Design Gráfico</h5>
<p>Também tenho experiência em direção de arte e design gráfico, com certificações em ferramentas de mercado.</p>

<h5>Vendas e Envolvimento da Comunidade</h5>
<p>Conquistei público e alcance consideráveis promovendo projetos nas redes sociais e plataformas de jogos.</p>

<p>Se tiver dúvidas, por favor entre em contato: <a href="mailto:yanakorpgs@gmail.com">yanakorpgs@gmail.com</a></p>

<p>(c) Yanako RPGs LLC</p>
`,
    images: [],
    contact_note: 'Se tiver perguntas, envie um e-mail para yanakorpgs@gmail.com'
  }
}

export let currentLocale = 'en'

export function t(key) {
  const dict = locales[currentLocale] || locales.en
  return dict[key] || ''
}

export function setLocale(lang) {
  if (locales[lang]) currentLocale = lang
}

// translateWithTAS: opt-in helper using src/services/tasClient.js
export async function translateWithTAS(text, targetLang = 'en', sourceLang = 'auto') {
  return await tasClient.translate({ text, source: sourceLang, target: targetLang })
}

// Lightweight runtime translator using a free LibreTranslate endpoint.
// This is opt-in and intended for short strings (labels). Avoid sending
// large HTML blocks. Use with care.
export async function translateWithLibre(text, targetLang = 'en', sourceLang = 'auto') {
  // guard: don't send very large strings
  if (!text) return ''
  if (text.length > 800) throw new Error('Text too long for runtime translateWithLibre')
  return await translateClient.translate({ text, source: sourceLang, target: targetLang })
}

// Ensure a specific key exists in the target locale; if missing, attempt to
// translate from English using LibreTranslate (short labels only).
export async function ensureKeyTranslated(key, targetLang) {
  const dict = locales[targetLang] || locales.en
  if (dict && dict[key]) return dict[key]
  // Only attempt for short, non-HTML keys
  const en = locales.en[key]
  if (!en || en.length > 200) return ''
  try {
    const translated = await translateWithLibre(en, targetLang, 'en')
    // store in-memory for the session
    if (!locales[targetLang]) locales[targetLang] = {}
    locales[targetLang][key] = translated
    return translated
  } catch (err) {
    console.warn('ensureKeyTranslated failed', err.message || err)
    return ''
  }
}

export default {
  locales,
  t,
  setLocale,
  translateWithTAS
}
