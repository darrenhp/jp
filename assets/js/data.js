/* ============================================================
   日本語の世界 — 内容数据
   所有结构化内容集中于此，供 main.js 渲染
   ============================================================ */
window.JP_DATA = {

  /* ---------- 1. 历史时间线 ---------- */
  history: [
    { era:"上古日语", year:"~794", title:"绳文·弥生·古坟时代（口头语言期）",
      desc:"日语尚无文字，仅靠口耳相传。语系归属成谜，可能受南岛语系与阿尔泰语系双重影响。和语（やまとことば）为底层词汇。" },
    { era:"奈良时代", year:"710–794", title:"汉字传入与万叶假名",
      desc:"汉字经百济传入，日本人以汉字表音记录日语，称「万叶假名」。代表作《古事记》《日本书纪》《万叶集》，奠定书面语基础。" },
    { era:"平安时代", year:"794–1185", title:"假名的诞生与国风文化",
      desc:"为书写和歌与女性文学，汉字草书演变为平假名，楷书偏旁演变为片假名。清少纳言《枕草子》、紫式部《源氏物语》以假名书写，日语文学独立。" },
    { era:"镰仓·室町", year:"1185–1603", title:"武家语言与汉语流入",
      desc:"武士阶层兴起，简素刚健的表达流行。禅宗与宋学带来大量汉语词（如「世界」「自由」「因果」），助词体系趋于稳定。" },
    { era:"江户时代", year:"1603–1868", title:"上方语与敬语成熟",
      desc:"京都·大阪「上方语」成为共通语雏形。浮世草子、净琉璃繁荣。敬语体系高度分化，反映严格的身份等级社会。" },
    { era:"明治·大正", year:"1868–1926", title:"言文一致与西学词汇",
      desc:"启蒙思想家推行「言文一致运动」，书面语贴近口语。大量翻译西洋概念，创造汉字新词（「哲学」「科学」「社会」「民主」），不少反输回中文。" },
    { era:"昭和·现代", year:"1945–", title:"标准语、外来语与国际化",
      desc:"以东京语为基础制定「标准语」。战后外来语（英语为主）激增，片假名大量使用。平成、令和时代网络语、缩写语盛行，日语持续演化。" }
  ],

  /* ---------- 2. 假名（清音 46） ---------- */
  // 行: a i u e o
  gojuonRows: [
    { row:"a", cells:["あ","い","う","え","お"] },
    { row:"ka",cells:["か","き","く","け","こ"] },
    { row:"sa",cells:["さ","し","す","せ","そ"] },
    { row:"ta",cells:["た","ち","つ","て","と"] },
    { row:"na",cells:["な","に","ぬ","ね","の"] },
    { row:"ha",cells:["は","ひ","ふ","へ","ほ"] },
    { row:"ma",cells:["ま","み","む","め","も"] },
    { row:"ya",cells:["や","(い)","ゆ","(え)","よ"] },
    { row:"ra",cells:["ら","り","る","れ","ろ"] },
    { row:"wa",cells:["わ","(ゐ)","(う)","(ゑ)","を"] },
    { row:"n", cells:["ん","","","",""] }
  ],
  gojuonRomaji: [
    { row:"a", cells:["a","i","u","e","o"] },
    { row:"ka",cells:["ka","ki","ku","ke","ko"] },
    { row:"sa",cells:["sa","shi","su","se","so"] },
    { row:"ta",cells:["ta","chi","tsu","te","to"] },
    { row:"na",cells:["na","ni","nu","ne","no"] },
    { row:"ha",cells:["ha","hi","fu","he","ho"] },
    { row:"ma",cells:["ma","mi","mu","me","mo"] },
    { row:"ya",cells:["ya","","yu","","yo"] },
    { row:"ra",cells:["ra","ri","ru","re","ro"] },
    { row:"wa",cells:["wa","","","","wo"] },
    { row:"n", cells:["n","","","",""] }
  ],
  katakana: [
    { row:"a", cells:["ア","イ","ウ","エ","オ"] },
    { row:"ka",cells:["カ","キ","ク","ケ","コ"] },
    { row:"sa",cells:["サ","シ","ス","セ","ソ"] },
    { row:"ta",cells:["タ","チ","ツ","テ","ト"] },
    { row:"na",cells:["ナ","ニ","ヌ","ネ","ノ"] },
    { row:"ha",cells:["ハ","ヒ","フ","ヘ","ホ"] },
    { row:"ma",cells:["マ","ミ","ム","メ","モ"] },
    { row:"ya",cells:["ヤ","","ユ","","ヨ"] },
    { row:"ra",cells:["ラ","リ","ル","レ","ロ"] },
    { row:"wa",cells:["ワ","","","","ヲ"] },
    { row:"n", cells:["ン","","","",""] }
  ],
  kanaStroke: { // 部分代表字符笔顺（画数）
    "あ":3,"い":2,"う":2,"え":2,"お":3,"か":3,"き":4,"く":2,"け":3,"こ":2,
    "さ":3,"し":2,"す":3,"せ":3,"そ":2,"た":4,"ち":2,"つ":2,"て":3,"と":2,
    "な":4,"に":4,"ぬ":3,"ね":4,"の":4,"は":4,"ひ":3,"ふ":4,"へ":3,"ほ":4,
    "ま":3,"み":3,"む":3,"め":3,"も":3,"や":3,"ゆ":2,"よ":3,"ら":3,"り":2,"る":3,"れ":3,"ろ":3,
    "わ":3,"を":3,"ん":2,
    "ア":2,"イ":2,"ウ":3,"エ":3,"オ":3,"カ":2,"キ":3,"ク":2,"ケ":3,"コ":2,
    "サ":3,"シ":2,"ス":2,"セ":3,"ソ":2,"タ":3,"チ":2,"ツ":2,"テ":3,"ト":2,
    "ナ":2,"ニ":2,"ヌ":2,"ネ":2,"ノ":2,"ハ":2,"ヒ":2,"フ":2,"ヘ":2,"ホ":2,
    "マ":2,"ミ":3,"ム":3,"メ":2,"モ":2,"ヤ":2,"ユ":2,"ヨ":2,"ラ":2,"リ":2,"ル":2,"レ":2,"ロ":2,
    "ワ":2,"ヲ":3,"ン":2
  },

  /* ---------- 汉字基础 ---------- */
  kanji: [
    { ch:"日", on:"ニチ", kun:"ひ", ex:"日本（にほん）" },
    { ch:"月", on:"ゲツ", kun:"つき", ex:"月（つき）" },
    { ch:"水", on:"スイ", kun:"みず", ex:"水（みず）" },
    { ch:"火", on:"カ", kun:"ひ", ex:"火（ひ）" },
    { ch:"山", on:"サン", kun:"やま", ex:"山（やま）" },
    { ch:"人", on:"ジン", kun:"ひと", ex:"人（ひと）" },
    { ch:"学生", on:"ガクセイ", kun:"—", ex:"学生（がくせい）" },
    { ch:"先生", on:"センセイ", kun:"—", ex:"先生（せんせい）" },
    { ch:"本", on:"ホン", kun:"み", ex:"本（ほん）" },
    { ch:"食", on:"ショク", kun:"た", ex:"食べる（たべる）" },
    { ch:"行", on:"コウ", kun:"い", ex:"行く（いく）" },
    { ch:"言", on:"ゲン", kun:"い", ex:"言う（いう）" }
  ],

  /* ---------- 罗马字对照 ---------- */
  romaji: [
    { col:"a",  hepb:"a", kun:"a",   ex:"あ" },
    { col:"i",  hepb:"i", kun:"i",   ex:"い" },
    { col:"u",  hepb:"u", kun:"u",   ex:"う" },
    { col:"e",  hepb:"e", kun:"e",   ex:"え" },
    { col:"o",  hepb:"o", kun:"o",   ex:"お" },
    { col:"ka", hepb:"ka",kun:"ka",  ex:"か" },
    { col:"shi",hepb:"shi",kun:"si", ex:"し" },
    { col:"chi",hepb:"chi",kun:"ti", ex:"ち" },
    { col:"tsu",hepb:"tsu",kun:"tu", ex:"つ" },
    { col:"fu", hepb:"fu", kun:"hu", ex:"ふ" },
    { col:"sha",hepb:"sha",kun:"sya",ex:"しゃ" },
    { col:"ja", hepb:"ja", kun:"zya",ex:"じゃ" }
  ],

  /* ---------- 3. 语法翻转卡 ---------- */
  grammar: [
    { ico:"🔢", title:"SOV 语序", jp:"主・宾・動", front:"日语把动词放在句尾。",
      back:"基本语序为「主语＋宾语＋动词」。例：私は<ruby>寿司<rt>すし</rt></ruby>を<ruby>食べる<rt>たべる</rt></ruby>。（我吃寿司。）动词居末是理解长句的关键。",
      ex:"雨が 降る。（雨 下）" },
    { ico:"🔗", title:"助词系统", jp:"助詞（じょし）", front:"は・を・に・で 串起句子。",
      back:"助词标记语法功能：は（主题）、を（宾语）、に（对象/时间）、で（场所/手段）、へ（方向）、が（主语）。它们替代了中文的介词与语序。",
      ex:"東京へ 行く。（去东京）" },
    { ico:"🔄", title:"动词活用", jp:"活用（かつよう）", front:"辞书形·ます形·て形…",
      back:"动词按原形（辞书形）变化：ます形表礼貌、て形表接续/请求、た形表过去、ない形表否定、ば形表条件、意向形表意愿。",
      ex:"書く→書きます→書いて" },
    { ico:"🎩", title:"敬语", jp:"敬語（けいご）", front:"尊敬·谦让·丁宁。",
      back:"敬语分三层：尊敬语抬高对方、谦让语压低自己、丁宁语以です/ます礼貌。是日本社会人际的「润滑剂」。",
      ex:"行く→行かれる（尊敬）" },
    { ico:"🔁", title:"被动·使役", jp:"受身・使役", front:"〜られる / 〜させる",
      back:"被动（〜られる）表达「被…」；使役（〜させる）表达「让/使…」。二者可叠加成使役被动（〜させられる）。",
      ex:"猫に 逃げられた。（被猫跑了）" },
    { ico:"📚", title:"词类概览", jp:"品詞（ひんし）", front:"用言·体言·附属词。",
      back:"体言（名词/代词/数词）无活用；用言（动词/形容词/形容动词）有活用；附属词（助词/助动词）黏着表语法。这是日语词类的基本三分。",
      ex:"赤い 花（红的花）" }
  ],

  conjugation: [
    { form:"辞书形（原形）", ex:"書く", use:"词典条目、简体现在" },
    { form:"ます形（礼貌）", ex:"書きます", use:"礼貌体现在/未来" },
    { form:"て形（接续）", ex:"書いて", use:"请求、中顿、状态" },
    { form:"た形（过去）", ex:"書いた", use:"简体过去" },
    { form:"ない形（否定）", ex:"書かない", use:"简体否定" },
    { form:"ば形（条件）", ex:"書けば", use:"如果…" },
    { form:"意向形（意志）", ex:"書こう", use:"一起写吧" },
    { form:"可能形", ex:"書ける", use:"能写" }
  ],

  /* ---------- 4. 发音：浊音/半浊音 ---------- */
  dakuon: [
    { row:"ga", cells:["が","ぎ","ぐ","げ","ご"], romaji:["ga","gi","gu","ge","go"] },
    { row:"za", cells:["ざ","じ","ず","ぜ","ぞ"], romaji:["za","ji","zu","ze","zo"] },
    { row:"da", cells:["だ","ぢ","づ","で","ど"], romaji:["da","ji","zu","de","do"] },
    { row:"ba", cells:["ば","び","ぶ","べ","ぼ"], romaji:["ba","bi","bu","be","bo"] },
    { row:"pa", cells:["ぱ","ぴ","ぷ","ぺ","ぽ"], romaji:["pa","pi","pu","pe","po"] }
  ],
  /* 拗音 */
  yoon: [
    { label:"k 行拗音", cells:["きゃ キャ","きゅ キュ","きょ キョ"], romaji:["kya","kyu","kyo"] },
    { label:"s 行拗音", cells:["しゃ シャ","しゅ シュ","しょ ショ"], romaji:["sha","shu","sho"] },
    { label:"t 行拗音", cells:["ちゃ チャ","ちゅ チュ","ちょ チョ"], romaji:["cha","chu","cho"] },
    { label:"n 行拗音", cells:["にゃ ニャ","にゅ ニュ","にょ ニョ"], romaji:["nya","nyu","nyo"] },
    { label:"h 行拗音", cells:["ひゃ ヒャ","ひゅ ヒュ","ひょ ヒョ"], romaji:["hya","hyu","hyo"] },
    { label:"m 行拗音", cells:["みゃ ミャ","みゅ ミュ","みょ ミョ"], romaji:["mya","myu","myo"] },
    { label:"r 行拗音", cells:["りゃ リャ","りゅ リュ","りょ リョ"], romaji:["rya","ryu","ryo"] },
    { label:"g 行拗音", cells:["ぎゃ ギャ","ぎゅ ギュ","ぎょ ギョ"], romaji:["gya","gyu","gyo"] },
    { label:"b 行拗音", cells:["びゃ ビャ","びゅ ビュ","びょ ビョ"], romaji:["bya","byu","byo"] },
    { label:"p 行拗音", cells:["ぴゃ ピャ","ぴゅ ピュ","ぴょ ピョ"], romaji:["pya","pyu","pyo"] }
  ],
  specialPron: [
    { jp:"促音 っ", romaji:"sokuon", title:"促音（そくおん）", desc:"小写「つ」表示停顿一拍，如 がっこう（学校）、きって（切手）。发音时阻塞气流再释放。" },
    { jp:"長音 ー", romaji:"chōon", title:"长音（ちょうおん）", desc:"元音拉长一拍。あ段→あ、い段→い、う段→う、え段→え/い、お段→う/お，片假名统一用「ー」。" },
    { jp:"撥音 ん", romaji:"hatsuon", title:"拨音（はつおん）", desc:"鼻音「ん」随后续音变体：前鼻音/后鼻音，如 せんせい、ほん。" },
    { jp:"拗音 ゃゅょ", romaji:"yōon", title:"拗音（ようおん）", desc:"辅音+i+ya/yu/yo 拼成，占一拍。可再加浊音/半浊音成「拗浊音」。" }
  ],
  accent: [
    { h:"高低型声调", p:"◎ 型 / 頭高 / 中高 / 尾高", d:"日语靠音高（非强弱）区别词义。如 はし①（桥）与 はし②（筷子）仅靠音高模式区分。" },
    { h:"母音无声化", p:"i / u 在清音间", d:"「です」「きた」中的 i/u 夹在 k/t/s/p 等清辅音间时会清化、近乎消失，是地道发音的秘诀。" },
    { h:"促音停顿", p:"っ = 一拍休止", d:"促音处停顿一拍再出声，如 ちょっと（稍等）中「っ」要明显停顿。" },
    { h:"鼻浊音", p:"が行 在词中", d:"标准语中词中が行常发鼻浊音 [ŋa] 等（如 かぐや），东京方言特征之一。" }
  ],

  /* ---------- 5. 日常用语 ---------- */
  phrases: [
    { scene:"问候", icon:"👋", items:[
      { jp:"こんにちは", kana:"konnichiwa", cn:"你好" },
      { jp:"おはようございます", kana:"ohayou gozaimasu", cn:"早上好" },
      { jp:"こんばんは", kana:"konbanwa", cn:"晚上好" },
      { jp:"おやすみなさい", kana:"oyasuminasai", cn:"晚安" },
      { jp:"さようなら", kana:"sayounara", cn:"再见" },
      { jp:"おげんきですか", kana:"ogenki desuka", cn:"你好吗？" }
    ]},
    { scene:"购物", icon:"🛍️", items:[
      { jp:"いくらですか", kana:"ikura desuka", cn:"多少钱？" },
      { jp:"これをください", kana:"kore o kudasai", cn:"请给我这个" },
      { jp:"試着してもいいですか", kana:"shichaku shitemo ii desuka", cn:"可以试穿吗？" },
      { jp:"クレジットカードは使えますか", kana:"kurejitto kaado wa tsukaemasu ka", cn:"能用信用卡吗？" },
      { jp:"安くなりますか", kana:"yasuku narimasu ka", cn:"能便宜点吗？" }
    ]},
    { scene:"餐饮", icon:"🍜", items:[
      { jp:"メニューをお願いします", kana:"menyuu o onegaishimasu", cn:"请给我菜单" },
      { jp:"おすすめは何ですか", kana:"osusume wa nan desuka", cn:"有什么推荐？" },
      { jp:"お会計をお願いします", kana:"okaikei o onegaishimasu", cn:"买单" },
      { jp:"おいしいです", kana:"oishii desu", cn:"很好吃" },
      { jp:"水をください", kana:"mizu o kudasai", cn:"请给我水" }
    ]},
    { scene:"交通", icon:"🚃", items:[
      { jp:"駅はどこですか", kana:"eki wa doko desuka", cn:"车站在哪？" },
      { jp:"切符を買いたいです", kana:"kippu o kaitai desu", cn:"我想买票" },
      { jp:"次の駅で降ります", kana:"tsugi no eki de orimasu", cn:"下一站下车" },
      { jp:"空港までいくらですか", kana:"kuukou made ikura desuka", cn:"到机场多少钱？" }
    ]},
    { scene:"应急", icon:"🆘", items:[
      { jp:"助けてください", kana:"tasukete kudasai", cn:"请帮帮我" },
      { jp:"病院はどこですか", kana:"byouin wa doko desuka", cn:"医院在哪？" },
      { jp:"警察を呼んでください", kana:"keisatsu o yonde kudasai", cn:"请叫警察" },
      { jp:"痛いです", kana:"itai desu", cn:"好痛" }
    ]},
    { scene:"社交", icon:"💬", items:[
      { jp:"はじめまして", kana:"hajimemashite", cn:"初次见面" },
      { jp:"よろしくお願いします", kana:"yoroshiku onegaishimasu", cn:"请多关照" },
      { jp:"ありがとうございます", kana:"arigatou gozaimasu", cn:"谢谢" },
      { jp:"ごめんなさい", kana:"gomen nasai", cn:"对不起" },
      { jp:"いただきます", kana:"itadakimasu", cn:"我开动了（用餐前）" }
    ]}
  ],

  /* ---------- 6. 输入法 ---------- */
  input: [
    { ico:"⌨️", h:"罗马字输入", p:"最常用的桌面输入方式。键入罗马字，IME 转换为假名/汉字。", ul:["<code>ka</code>→か、<code>kya</code>→きゃ","<code>tt</code>→っ（促音，如 <code>kitte</code>）","<code>n'</code> 或 <code>n</code> 后接辅音→ん","<code>xtu</code>/<code>ltsu</code> 输入小写つ"] },
    { ico:"🇯🇵", h:"假名直输（かな入力）", p:"键盘印有假名，直接按对应键输入，无需罗马字转换，速度快但需记忆键位。", ul:["JIS 配列键盘标准","手机九宫格（トグル入力）亦属此类","适合高频输入者"] },
    { ico:"🔄", h:"IME 转换", p:"输入罗马字后选择汉字/假名候选，是日文输入的核心。", ul:["<code>Space</code> 切换候选","<code>Tab</code> 调整送假名","字典学习提升准确率","云候选（ATOK/Google 日语）"] },
    { ico:"📱", h:"手机端输入", p:"iOS/Android 自带日语键盘，支持假名与罗马字两种布局。", ul:["九宫格（フリック）滑动输入","长按促音/小假名","表情与颜文字快捷面板","手写输入识别汉字"] }
  ],

  /* ---------- 7. JLPT ---------- */
  jlpt: [
    { lv:"N5", color:"#8aa36b", vocab:"约 800 词", title:"入门",
      desc:"能理解少量日常用语，读简单句子、写平假名片假名。", tags:["假名","基础问候","ます/です形"] },
    { lv:"N4", color:"#6f8f4e", vocab:"约 1500 词", title:"基础",
      desc:"能进行基本会话，理解慢速日语，掌握て形、た形等。", tags:["て形","基本助词","简单阅读"] },
    { lv:"N3", color:"#b08d4f", vocab:"约 3700 词", title:"初级进阶",
      desc:"日常场景交流无障碍，能读报章简单报道。", tags:["敬语初阶","被动使役","新闻泛读"] },
    { lv:"N2", color:"#264b6e", vocab:"约 6000 词", title:"中级",
      desc:"商务与学业可用，理解一般日剧、杂志，求职门槛。", tags:["商务日语","长句阅读","听力常态"] },
    { lv:"N1", color:"#c1352b", vocab:"约 10000+ 词", title:"高级",
      desc:"接近母语者，理解抽象论述、文学作品与高速对话。", tags:["抽象表达","文学阅读","同义辨析"] }
  ],

  /* ---------- 8. 音乐 ---------- */
  music: [
    { emoji:"🎤", h:"J-POP", jp:"ジェイポップ", p:"日本流行音乐主流，融合摇滚、舞曲、R&B。城市抒情与偶像团体并行。",
      artists:"代表人物：宇多田光、Mr.Children、YOASOBI、Official髭男dism" },
    { emoji:"🏮", h:"演歌", jp:"えんか", p:"传统抒情曲风，悠扬的「颤音（こぶし）」与哀愁旋律，倾诉离乡与恋情。",
      artists:"代表歌手：美空ひばり、小林旭、石川さゆり" },
    { emoji:"🌸", h:"动画歌曲", jp:"アニソン", p:"动漫主题曲自成产业，节奏明快、燃系抒情兼具，催生海量现场演唱会。",
      artists:"代表：LiSA、Aimer、水樹奈々、Linked Horizon" },
    { emoji:"🤖", h:"Vocaloid", jp:"ボーカロイド", p:"语音合成歌声软件，初音未来等虚拟歌姬由创作者（P主）赋歌。",
      artists:"代表：初音ミク、鏡音リン、KAITO、米津玄師（早期）" },
    { emoji:"🎸", h:"视觉系", jp:"ヴィジュアル系", p:"华丽妆容与舞台美学并重，摇滚为本，唯美与戏剧性强烈。",
      artists:"代表：X JAPAN、LUNA SEA、GLAY、the Gazette" },
    { emoji:"🎐", h:"民谣与童谣", jp:"みんよう", p:"各地乡土民谣与昭和童谣，承载节庆与母语之美，是语言学习的温润入口。",
      artists:"代表：《赤とんぼ》《踊り子》《ふるさと》" }
  ],

  /* ---------- 9. 文化 ---------- */
  culture: [
    { ico:"🎩", h:"敬语文化", jp:"けいご", p:"语言即位阶的镜子。对长辈、客户、陌生人切换敬体，是社会和谐的基石。",
      words:["です/ます","尊敬語","謙譲語","丁寧語"] },
    { ico:"🍂", h:"俳句", jp:"はいく", p:"5-7-5 共十七音，必含季语。以极简封存四季与禅意。",
      words:["季語","五七五","松尾芭蕉","古池"] },
    { ico:"🎏", h:"祭典词汇", jp:"まつり", p:"夏日祭、神社、浴衣、捞金鱼——节庆词汇串起一年的热闹。",
      words:["祭り","花火","浴衣","縁日"] },
    { ico:"📺", h:"动漫语言", jp:"アニメ", p:"「なのだ」「〜だぞ」等角色口吻、拟声词（ドキドキ）深刻影响现代口语。",
      words:["擬音語","ツンデレ","〜だな","ワクワク"] },
    { ico:"🏯", h:"传统艺术", jp:"げいのう", p:"能剧、歌舞伎、茶道以高度程式化语言传递美学，术语体系独特。",
      words:["能","歌舞伎","茶道","形（かた）"] },
    { ico:"✒️", h:"书法与美学", jp:"しょどう", p:"假名书道讲究「余白」与「線の呼吸」，与日语的留白美学同源。",
      words:["書道","墨","余白","和の美"] }
  ],

  /* ---------- 10. 学习资源 ---------- */
  resources: [
    { ico:"📝", h:"JLPT 备考", ul:[
      "<b>官方</b>：JLPT 官网（jlpt.jp）报名与真题",
      "<b>真题</b>：『日本語能力試験 公式問題集』",
      "<b>模考</b>：JTest、Nat-Test 替代测评",
      "<b>词汇</b>：『みんなの日本語』单字表" ] },
    { ico:"📚", h:"经典教材", ul:[
      "<b>《大家的日语》</b>：会话导向，入门首选",
      "<b>《标日》</b>：中日合作，体系完整",
      "<b>《Genki》</b>：英语圈热门教材",
      "<b>《新完全掌握》</b>：专项突破 N2/N1" ] },
    { ico:"📱", h:"学习 APP", ul:[
      "<b>Duolingo / 多邻国</b>：游戏化入门",
      "<b>多读 / 読書</b>：分级阅读",
      "<b>MOJi 辞书</b>：日语词典+例句",
      "<b>HelloTalk</b>：语伴交流" ] },
    { ico:"🎬", h:"影视沉浸", ul:[
      "<b>日剧</b>：TBS/富士台晨间剧练听力",
      "<b>动画</b>：原声+日语字幕双输入",
      "<b>NHK 语学</b>：免费广播课程",
      "<b>YouTube</b>：日本語の森等频道" ] }
  ],

  /* ---------- 思维导图结构 ---------- */
  mindmap: {
    id:"root", label:"日本語", jp:"にほんご", level:"root", target:null, children:[
      { id:"h", label:"历史发展", jp:"歴史", level:"lvl1", target:"history" },
      { id:"w", label:"文字系统", jp:"文字", level:"lvl1", target:"writing" },
      { id:"g", label:"语法体系", jp:"文法", level:"lvl1", target:"grammar", children:[
        { id:"g1", label:"SOV语序", jp:"", level:"leaf", target:"grammar" },
        { id:"g2", label:"助词", jp:"", level:"leaf", target:"grammar" },
        { id:"g3", label:"动词活用", jp:"", level:"leaf", target:"grammar" },
        { id:"g4", label:"敬语", jp:"", level:"leaf", target:"grammar" }
      ]},
      { id:"p", label:"发音", jp:"発音", level:"lvl1", target:"pronunciation", children:[
        { id:"p1", label:"五十音", jp:"", level:"leaf", target:"pronunciation" },
        { id:"p2", label:"浊音半浊", jp:"", level:"leaf", target:"pronunciation" },
        { id:"p3", label:"拗音", jp:"", level:"leaf", target:"pronunciation" },
        { id:"p4", label:"声调", jp:"", level:"leaf", target:"pronunciation" }
      ]},
      { id:"ph", label:"日常用语", jp:"会話", level:"lvl1", target:"phrases" },
      { id:"in", label:"输入法", jp:"入力", level:"lvl1", target:"input" },
      { id:"j", label:"JLPT 等级", jp:"試験", level:"lvl1", target:"jlpt", children:[
        { id:"j5", label:"N5", jp:"", level:"leaf", target:"jlpt" },
        { id:"j4", label:"N4", jp:"", level:"leaf", target:"jlpt" },
        { id:"j3", label:"N3", jp:"", level:"leaf", target:"jlpt" },
        { id:"j2", label:"N2", jp:"", level:"leaf", target:"jlpt" },
        { id:"j1", label:"N1", jp:"", level:"leaf", target:"jlpt" }
      ]},
      { id:"m", label:"音乐文化", jp:"音楽", level:"lvl1", target:"music", children:[
        { id:"m1", label:"J-POP", jp:"", level:"leaf", target:"music" },
        { id:"m2", label:"演歌", jp:"", level:"leaf", target:"music" },
        { id:"m3", label:"动画歌", jp:"", level:"leaf", target:"music" },
        { id:"m4", label:"Vocaloid", jp:"", level:"leaf", target:"music" },
        { id:"m5", label:"视觉系", jp:"", level:"leaf", target:"music" }
      ]},
      { id:"c", label:"文化关联", jp:"文化", level:"lvl1", target:"culture", children:[
        { id:"c1", label:"敬语", jp:"", level:"leaf", target:"culture" },
        { id:"c2", label:"俳句", jp:"", level:"leaf", target:"culture" },
        { id:"c3", label:"祭典", jp:"", level:"leaf", target:"culture" },
        { id:"c4", label:"动漫", jp:"", level:"leaf", target:"culture" }
      ]}
    ]
  }
};
