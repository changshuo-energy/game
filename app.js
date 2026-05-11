const STORAGE_KEYS = {
  bestScore: "weirdQuiz.bestScore",
  settings: "weirdQuiz.settings",
};

const DEFAULT_SETTINGS = {
  roundSize: 10,
  secondsPerQuestion: 30,
  showHints: true,
  adHtml: "",
};

/**
 * 題庫格式：
 * - question: 題目
 * - choices: 選項（4 個）
 * - answerIndex: 正確答案索引
 * - revealTitle: 揭曉標題（有梗）
 * - revealBody: 解釋（可以更荒謬）
 * - category: 類別標籤
 * - hint: 小提示（可有可無）
 */
const QUESTION_BANK = [
  {
    category: "動物｜嘴硬系",
    question: "海獺最常做的「隨身小物」是什麼？",
    choices: ["手機支架", "石頭", "牙刷", "小型望遠鏡"],
    answerIndex: 1,
    hint: "它會放在腋下（不是比喻）。",
    revealTitle: "海獺：我只是有收納癖",
    revealBody:
      "海獺會把石頭放在腋下的皮膚皺摺裡，當作開貝殼的工具。人類叫它工具使用；海獺可能叫它「免得又要找」。",
  },
  {
    category: "歷史｜命名焦慮",
    question: "火山岩「黑曜石」的英文 Obsidian，據說跟誰有關？",
    choices: ["一位叫 Obsius 的羅馬人", "一隻叫 Obi 的貓", "希臘女神 Obsida", "某個古代梗圖"],
    answerIndex: 0,
    hint: "是個人名，而且聽起來很像在簽收包裹。",
    revealTitle: "不是魔法，是羅馬人",
    revealBody:
      "古代文獻裡提到一位叫 Obsius（或相近拼法）的人帶回了這種石頭。後來大家：好，叫它 Obsidian。命名界的「先這樣」。",
  },
  {
    category: "人體｜尷尬科學",
    question: "人打噴嚏時，眼睛通常會怎樣？",
    choices: ["自動閉上", "自動變大", "像變色龍那樣分開看", "變成 4K HDR"],
    answerIndex: 0,
    hint: "你可以試試看…但別噴在螢幕上。",
    revealTitle: "眼睛：我先躲一下",
    revealBody:
      "噴嚏是高壓事件，眼瞼反射常會讓眼睛閉上。並不是怕眼球飛出去（雖然聽起來更刺激），而是反射保護機制。",
  },
  {
    category: "食物｜冷笑話級",
    question: "章魚的血液偏什麼顏色？",
    choices: ["藍色", "粉紅色", "透明", "螢光綠"],
    answerIndex: 0,
    hint: "跟它用的血藍蛋白有關。",
    revealTitle: "章魚：我血是海的顏色",
    revealBody:
      "章魚用含銅的血藍蛋白（hemocyanin）運氧，所以血液看起來偏藍。人類用鐵，它用銅：元素週期表的兩種人生。",
  },
  {
    category: "語言｜很會拐彎",
    question: "英文裡的 “e” 是最常見字母，那第二常見通常是？",
    choices: ["t", "z", "q", "x"],
    answerIndex: 0,
    hint: "跟 'the' 關係很密切。",
    revealTitle: "t：我只是很常被用到",
    revealBody:
      "在多數英文語料統計中，'t' 往往名列前茅（常見的還有 a、o、i、n）。語言不是你想的那樣浪漫，它很會重複。",
  },
  {
    category: "太空｜浪漫破功",
    question: "如果你在太空「哭」會發生什麼事？",
    choices: ["眼淚變成一顆顆球黏在臉上", "眼淚立刻蒸發", "眼淚往上飄變成雲", "會自動變成冰刀"],
    answerIndex: 0,
    hint: "微重力：流不下去。",
    revealTitle: "太空眼淚：黏黏的那種",
    revealBody:
      "在微重力下，眼淚不會像地球一樣流下來，會聚成水珠黏在眼睛周圍或臉上。浪漫瞬間變成「請借我紙巾」的科幻版。",
  },
  {
    category: "植物｜其實很會動",
    question: "向日葵會跟著太陽轉，是哪個階段最明顯？",
    choices: ["幼苗時期", "開花後一直都會", "成熟後更瘋狂", "只有在打雷時"],
    answerIndex: 0,
    hint: "長大後反而定住。",
    revealTitle: "長大就不追了",
    revealBody:
      "向日葵在生長期會有較明顯的向光性（幼苗/生長期的花盤會追日）。成熟開花後通常會固定朝向某個方向，不再整天轉圈圈。",
  },
  {
    category: "工程｜很像在偷懶",
    question: "條碼（barcode）一開始的靈感，據說跟什麼有關？",
    choices: ["摩斯電碼", "海豚聲納", "貓的鬍鬚", "算命籤詩"],
    answerIndex: 0,
    hint: "一條一條的…點線訊號。",
    revealTitle: "點線本來就很有戲",
    revealBody:
      "早期條碼概念常被描述為受到摩斯電碼（點線訊號）啟發。把『訊號』變成『線條』：人類最擅長把抽象變成好掃描的東西。",
  },
  {
    category: "地理｜冷到會笑",
    question: "世界上最乾燥的沙漠之一阿塔卡馬（Atacama），有些地方曾經多久沒下過雨？",
    choices: ["幾十年", "幾百年", "幾天", "每天都下只是很小"],
    answerIndex: 1,
    hint: "是『人類會覺得離譜』的時間尺度。",
    revealTitle: "天空：我先請長假",
    revealBody:
      "阿塔卡馬沙漠某些地區記錄上曾出現極長時間幾乎無降雨（可達數百年等級的乾燥記錄）。如果你在那裡晾衣服：不用收。",
  },
  {
    category: "心理｜你也中招了",
    question: "你以為手機有震動但其實沒有，這種現象常被稱為？",
    choices: ["幻覺震動（phantom vibration）", "口袋幽靈", "震動焦慮症", "布丁共鳴"],
    answerIndex: 0,
    hint: "英文名字很直白。",
    revealTitle: "手機沒震，是你在想它",
    revealBody:
      "幻覺震動很常見：大腦把衣物摩擦或其他觸覺誤判為通知。不是你弱，是你訓練有素：被提醒教育過的神經系統。",
  },
  {
    category: "冷知識｜過度認真",
    question: "企鵝求偶時，有些種類會送什麼當『禮物』？",
    choices: ["漂亮的石頭", "花束", "名牌包", "熱敷袋"],
    answerIndex: 0,
    hint: "跟築巢材料有關。",
    revealTitle: "企鵝：我送你一顆石頭（很認真）",
    revealBody:
      "某些企鵝（例如阿德利企鵝）會把石頭當作築巢材料，也可能被用作求偶禮物。人類：太敷衍。企鵝：這叫資產配置。",
  },
  {
    category: "物理｜聽起來很像騙人",
    question: "香蕉在自然界其實帶有微量放射性，主要是因為哪個元素？",
    choices: ["鉀（K）", "鈉（Na）", "鎂（Mg）", "氦（He）"],
    answerIndex: 0,
    hint: "跟營養標示常見的那個字。",
    revealTitle: "香蕉：我只是很『鉀』",
    revealBody:
      "香蕉含有鉀，其中一小部分是放射性同位素鉀-40，因此有微量放射性。放心，你要吃到危險量…你先會被香蕉打敗。",
  },
  {
    category: "動物｜方塊系",
    question: "哪種動物的便便常被說是「方塊」形狀？",
    choices: ["袋熊", "樹懶", "海豚", "豪豬"],
    answerIndex: 0,
    hint: "它不是 Minecraft 玩家，但很像。",
    revealTitle: "袋熊：我排泄也很有稜角",
    revealBody:
      "袋熊的糞便常呈現立方體狀，可能有助於標記地盤時不容易滾走。別人用旗子，它用幾何。",
  },
  {
    category: "食物｜保存術",
    question: "下列哪個食物在適當保存下，可能『很久很久』都不太會壞？",
    choices: ["蜂蜜", "熱狗", "生菜", "豆腐"],
    answerIndex: 0,
    hint: "甜到細菌都不想來上班。",
    revealTitle: "蜂蜜：我本來就很難被打敗",
    revealBody:
      "蜂蜜水分含量低、酸性且含有抑菌成分，在良好保存下能維持非常久。古墓裡的蜂蜜：比某些人的工作熱情更持久。",
  },
  {
    category: "動物｜心很忙",
    question: "章魚其實有幾顆心臟？",
    choices: ["1", "2", "3", "8"],
    answerIndex: 2,
    hint: "跟它的觸手數量不成正比，但也不算少。",
    revealTitle: "章魚：我有三顆心，你呢？",
    revealBody:
      "章魚有三顆心臟：兩顆把血送到鰓，一顆送到全身。難怪它看起來總是很忙：心真的很忙。",
  },
  {
    category: "自然｜年紀焦慮",
    question: "從演化年代來看，下列哪個「可能比樹更古老」？",
    choices: ["鯊魚", "貓", "人類", "鴿子"],
    answerIndex: 0,
    hint: "牠的祖先在恐龍之前就很會游。",
    revealTitle: "鯊魚：我比樹還早出道",
    revealBody:
      "鯊魚的祖先可追溯到非常古老的地質年代，常見說法是比現代意義上的樹類更早出現。樹在長，鯊魚早就在海裡當前輩。",
  },
  {
    category: "動物｜彩妝課",
    question: "火烈鳥為什麼會變粉紅？",
    choices: ["吃了含類胡蘿蔔素的食物", "天生染色基因", "每天曬夕陽", "牠們其實是草莓口味"],
    answerIndex: 0,
    hint: "你吃什麼，你就像什麼（大概）。",
    revealTitle: "火烈鳥：我粉是吃出來的",
    revealBody:
      "火烈鳥的粉紅主要與食物中的色素（類胡蘿蔔素）有關。牠不是天生粉，是飲食造成的「可食用濾鏡」。",
  },
  {
    category: "人體｜太像了吧",
    question: "哪種動物的指紋常被說跟人類很像，甚至會混淆？",
    choices: ["無尾熊", "兔子", "烏龜", "金魚"],
    answerIndex: 0,
    hint: "住在樹上、吃葉子、還有點呆萌。",
    revealTitle: "無尾熊：我只是想被當成人",
    revealBody:
      "無尾熊的指紋紋路與人類相當相似，曾被拿來當有趣的法醫冷知識。牠沒有犯罪啦，但牠有『指』可疑。",
  },
  {
    category: "動物｜冰箱模式",
    question: "有些青蛙在冬天能做出哪種超能力？",
    choices: ["部分身體結冰後再解凍復活", "變成冰雕永遠不動", "靠打嗝取暖", "把雪吃光"],
    answerIndex: 0,
    hint: "不是所有青蛙都行，但有些真的很會。",
    revealTitle: "青蛙：我先凍一下，等等回來",
    revealBody:
      "有些蛙類能在低溫下讓體內部分結冰並在春天恢復活動（有抗凍機制）。人類：感冒一週。青蛙：直接凍存。",
  },
  {
    category: "植物｜算數高手",
    question: "捕蠅草要『連續碰到』幾次感應毛，才比較可能合起來？",
    choices: ["1 次", "2 次", "5 次", "10 次"],
    answerIndex: 1,
    hint: "它不想被雨滴騙。",
    revealTitle: "捕蠅草：我會先確認你是不是食物",
    revealBody:
      "捕蠅草通常需要短時間內多次觸發（常見描述是兩次）才會閉合，避免對非獵物浪費力氣。植物界的『雙重驗證』。",
  },
  {
    category: "地球｜你每天都在搬家",
    question: "你坐著不動，其實也在動。主要是因為？",
    choices: ["地球自轉", "你椅子偷滑", "空氣在推你", "宇宙在開玩笑"],
    answerIndex: 0,
    hint: "一天轉一圈那個。",
    revealTitle: "你沒動，但地球有",
    revealBody:
      "地球自轉讓你即使坐著也在高速移動。你以為你宅在家，其實你每天都在環遊（很小圈）。",
  },
  {
    category: "語言｜其實很嚴謹",
    question: "「O.K.」常被說最早跟哪種東西的縮寫流行有關？（常見說法之一）",
    choices: ["故意拼錯的俚語縮寫（all correct→oll korrect）", "某位叫 Ok 的國王", "章魚的暗號", "出納員的口頭禪"],
    answerIndex: 0,
    hint: "它是早期流行梗的化石。",
    revealTitle: "OK：我原本就是梗",
    revealBody:
      "常見說法是 19 世紀美國流行用故意拼錯的縮寫，像 all correct 寫成 oll korrect→O.K.。原來 OK 一開始就很「網路」。",
  },
  {
    category: "食物｜嗅覺爆擊",
    question: "榴槤為什麼很多人覺得味道很衝？",
    choices: ["含有多種含硫化合物", "因為它會記仇", "因為它在發熱", "因為它其實是洋蔥"],
    answerIndex: 0,
    hint: "跟洋蔥、蒜頭同一家族的氣味類型。",
    revealTitle: "榴槤：硫味上頭",
    revealBody:
      "榴槤氣味常與含硫化合物相關，讓人覺得強烈。有人聞到天堂，有人聞到…電梯事故現場。",
  },
  {
    category: "動物｜懶得有哲學",
    question: "樹懶為什麼常常動得很慢？（比較合理的原因是？)",
    choices: ["低熱量飲食（多吃葉子）讓牠節能", "牠們在等 Wi‑Fi", "牠們怕踩到螞蟻", "牠們其實在慢動作拍片"],
    answerIndex: 0,
    hint: "葉子不是高熱量便當。",
    revealTitle: "樹懶：我在省電模式",
    revealBody:
      "樹懶多吃葉子、能量取得有限，所以用慢速與節能代謝來適應。別催牠，它是自然界的省電小幫手。",
  },
  {
    category: "海洋｜聽起來很像段子",
    question: "海星（海星類）通常怎麼吃東西？",
    choices: ["把胃翻出體外消化", "用牙齒咬碎", "用觸手捲起吞下", "用鼻子吸進去"],
    answerIndex: 0,
    hint: "是那種『太誠實了吧』的吃法。",
    revealTitle: "海星：我的胃比較外向",
    revealBody:
      "不少海星會把胃外翻到獵物上進行消化，再把營養吸回去。你以為牠在翻白眼，其實牠在用胃社交。",
  },
  {
    category: "植物｜你以為是花",
    question: "鳳梨其實比較像什麼組成？",
    choices: ["很多小花/小果實融合成的大果", "一顆超大種子", "一根木頭變的", "一顆地瓜長錯地方"],
    answerIndex: 0,
    hint: "它不是單一一朵花的成果。",
    revealTitle: "鳳梨：我是團體合作",
    revealBody:
      "鳳梨屬於多花（多果）聚合形成的果實結構。簡單說：很多小單位一起變成一顆『很刺的總合體』。",
  },
  {
    category: "科技｜你早就看過",
    question: "手機相機夜景模式常見的做法之一是？",
    choices: ["連拍多張再合成降噪", "把鏡頭擦亮就行", "把 ISO 調到無限大", "請月亮打手電筒"],
    answerIndex: 0,
    hint: "不是一張搞定，是很多張一起努力。",
    revealTitle: "夜景：靠團隊合作變亮",
    revealBody:
      "夜景模式常透過多張曝光合成、對齊、降噪與增亮。你看到的是一張照片，背後其實是照片合唱團。",
  },
  {
    category: "心理｜大腦很會偷懶",
    question: "為什麼你常常覺得『時間過很快』？",
    choices: ["記憶打包：例行性越多，回想起來越少事件", "地球自轉變快", "手錶在偷跑", "宇宙在加速播放"],
    answerIndex: 0,
    hint: "不是時間變快，是你回憶變薄。",
    revealTitle: "時間：我沒變，是你太熟了",
    revealBody:
      "當生活更例行、刺激更少，回憶裡可標記的事件變少，主觀感受就像時間飛逝。大腦：省空間，但你會覺得人生被快轉。",
  },
  {
    category: "聲音｜其實是物理",
    question: "你把貝殼放耳邊聽到的『海聲』，比較像是什麼？",
    choices: ["環境噪音被共鳴放大", "貝殼在播海洋電台", "海水訊號穿越時空", "貝殼在講悄悄話"],
    answerIndex: 0,
    hint: "你在房間也聽得到，代表…",
    revealTitle: "貝殼：我只是個擴音器",
    revealBody:
      "貝殼（或杯子）形狀會讓周遭環境噪音產生共鳴，聽起來像海浪。不是海搬進來，是聲音被你聽得很浪漫。",
  },
  {
    category: "化學｜你早就吃過",
    question: "汽水裡的氣泡主要是哪種氣體？",
    choices: ["二氧化碳", "氧氣", "氮氣", "氫氣"],
    answerIndex: 0,
    hint: "也是你呼吸吐出去的那個。",
    revealTitle: "CO₂：我只是想冒泡",
    revealBody:
      "多數汽水的氣泡是二氧化碳溶於液體後釋放形成。你喝下去的不是泡泡，是「壓力管理失敗的氣體」。",
  },
  {
    category: "動物｜耳朵很忙",
    question: "貓的耳朵為什麼可以轉來轉去？",
    choices: ["耳朵有很多小肌肉能精準控制", "耳朵裡有羅盤", "牠在接收外星訊號", "牠在練舞"],
    answerIndex: 0,
    hint: "是肌肉控制，不是神秘力量。",
    revealTitle: "貓：我的雷達有手動模式",
    revealBody:
      "貓的外耳有多塊肌肉可控制方向，幫助定位聲源。牠不是不理你，牠只是正在掃描整棟樓的動靜。",
  },
  {
    category: "地理｜看起來像都市傳說",
    question: "哪一個地方常被稱為世界上最深的天然湖之一？",
    choices: ["貝加爾湖", "日月潭", "西湖", "愛河"],
    answerIndex: 0,
    hint: "在俄羅斯，很冷，但很深。",
    revealTitle: "貝加爾湖：我深到有點害羞",
    revealBody:
      "貝加爾湖以深度與儲水量聞名，常被列為最深的淡水湖之一。不是你不會游，是它太深。",
  },
  {
    category: "工程｜橋樑友情",
    question: "為什麼很多橋上會留伸縮縫？",
    choices: ["因為熱脹冷縮需要空間", "因為橋想呼吸", "因為工程師忘記量", "因為要放零食"],
    answerIndex: 0,
    hint: "跟溫度變化有關。",
    revealTitle: "橋：我也會熱到膨脹",
    revealBody:
      "材料會隨溫度變化伸縮，伸縮縫能避免結構因應力累積而損壞。橋不是脾氣差，是物理很堅持。",
  },
  {
    category: "人體｜你正在做",
    question: "你現在不自覺眨眼，主要功能之一是？",
    choices: ["保持角膜濕潤、清除微粒", "幫眼睛充電", "讓睫毛長更快", "避免看到尷尬"],
    answerIndex: 0,
    hint: "跟眼睛表面保養有關。",
    revealTitle: "眨眼：我在幫你擦螢幕（角膜版）",
    revealBody:
      "眨眼能分布淚液、保持角膜濕潤、帶走微小異物。你以為你在發呆，其實你在做眼球保養。",
  },
  {
    category: "動物｜偽裝大師",
    question: "變色龍變色主要是為了？",
    choices: ["溝通與調節狀態（包含體溫/情緒）", "完全隱形", "模仿旁邊的牆", "嚇唬 Wi‑Fi"],
    answerIndex: 0,
    hint: "不只是偽裝，還有社交。",
    revealTitle: "變色龍：我是在發訊號",
    revealBody:
      "變色常與溝通、壓力、體溫調節等相關，不一定只是躲起來。牠不是開了隱身，是開了『情緒燈條』。",
  },
  {
    category: "天氣｜你以為是雲",
    question: "你在冬天呼出『白白一團』主要是什麼？",
    choices: ["水蒸氣遇冷凝結成小水滴/冰晶", "你的靈魂", "空氣被你嚇白", "二氧化碳結冰"],
    answerIndex: 0,
    hint: "跟水有關，不是神秘學。",
    revealTitle: "呼氣：我只是變成小水滴",
    revealBody:
      "呼出的水蒸氣在冷空氣中凝結成微小水滴（或冰晶）散射光，看起來像白霧。不是你在冒煙，是物理在上班。",
  },
  {
    category: "動物｜會議專家",
    question: "蜜蜂『搖擺舞』（waggle dance）主要是在幹嘛？",
    choices: ["告訴同伴花蜜方向與距離", "慶祝週五", "驅趕蒼蠅", "求偶表演"],
    answerIndex: 0,
    hint: "它是在報路，不是在開趴。",
    revealTitle: "蜜蜂：我用跳舞發 Google Maps",
    revealBody:
      "蜜蜂會用舞蹈傳遞食物來源方向與距離等資訊。人類用訊息：『在這』；蜜蜂用舞步：『在那』。",
  },
  {
    category: "物理｜聽起來很合理",
    question: "你在海邊覺得風大，常見原因之一是？",
    choices: ["陸地與海面受熱不同造成氣壓差（海陸風）", "海在喘氣", "浪在扇風", "貝殼在吹口哨"],
    answerIndex: 0,
    hint: "白天晚上方向還可能不同。",
    revealTitle: "海陸風：不是浪在扇你",
    revealBody:
      "海面與陸地升溫/降溫速度不同，造成氣壓差與風的環流。你覺得很舒服，是因為熱力學在幫你降溫。",
  },
  {
    category: "科技｜很像魔法其實不是",
    question: "藍牙（Bluetooth）這名字據說跟什麼有關？",
    choices: ["一位北歐國王的綽號", "因為牙齒會發藍光", "因為藍色很省電", "因為海豚喜歡"],
    answerIndex: 0,
    hint: "跟維京時代的歷史人物有關。",
    revealTitle: "藍牙：我其實是歷史迷",
    revealBody:
      "常見說法是 Bluetooth 取自丹麥國王 Harald Bluetooth 的綽號，象徵把不同裝置『連起來』。你的耳機連不上時：國王也救不了。",
  },
  {
    category: "語言｜嘴巴很忙",
    question: "「繞口令」為什麼會讓你打結？",
    choices: ["發音動作太接近，大腦規劃容易互相干擾", "舌頭突然變短", "字在逃跑", "因為它有魔咒"],
    answerIndex: 0,
    hint: "不是你笨，是動作太密集。",
    revealTitle: "繞口令：我是在測你的嘴部排程",
    revealBody:
      "繞口令會讓相似音節快速切換，口腔動作規劃容易互相干擾。嘴巴在做多執行緒，當然會偶爾當機。",
  },
  {
    category: "食物｜你吃的是顏色",
    question: "紅蘿蔔讓你想到的橘色，主要來自哪類色素？",
    choices: ["類胡蘿蔔素（如 β-胡蘿蔔素）", "葉綠素", "花青素", "墨汁"],
    answerIndex: 0,
    hint: "跟火烈鳥變粉的那類很像。",
    revealTitle: "胡蘿蔔：我靠色素出道",
    revealBody:
      "紅蘿蔔的橘色主要來自 β-胡蘿蔔素等類胡蘿蔔素。你看到的是顏色，其實你看到的是分子在發光（好啦，是吸收/反射）。",
  },
  {
    category: "動物｜鼻子很厲害",
    question: "狗鼻子濕濕的，常見好處之一是？",
    choices: ["幫助捕捉氣味分子、提升嗅覺效率", "只是因為牠愛喝水", "避免鼻子長皺紋", "方便貼貼"],
    answerIndex: 0,
    hint: "跟『更容易黏住味道』有關。",
    revealTitle: "狗：我不是流鼻水，我是在採樣",
    revealBody:
      "濕潤表面有助於溶解並捕捉氣味分子，讓嗅覺系統更有效率。狗不是到處聞，是到處讀取世界的 QR code。",
  },
  {
    category: "地理｜名字很像招式",
    question: "「死海」為什麼叫死海？（最接近的原因是）",
    choices: ["鹽度極高，很多生物不易生存", "海水會攻擊人", "海會停止流動", "海裡有大魔王"],
    answerIndex: 0,
    hint: "跟鹽有關，不是詛咒。",
    revealTitle: "死海：我只是太鹹了",
    revealBody:
      "死海鹽度極高，許多生物難以生存，因此得名。它不是死，是鹹到讓生物想離職。",
  },
  {
    category: "人體｜你其實在發電",
    question: "人體的靜電常在哪個季節更容易感受到？",
    choices: ["冬天（乾燥）", "夏天（潮濕）", "颱風天", "沒有季節差"],
    answerIndex: 0,
    hint: "空氣越乾，越容易。",
    revealTitle: "冬天：電費不用我照樣電你",
    revealBody:
      "乾燥環境不易讓電荷散掉，所以冬天更常發生靜電。你摸門把被電，不是門把壞，是你帶電上班。",
  },
  {
    category: "自然｜看起來像巧合",
    question: "彩虹通常有幾種主要顏色被人們常見地列出？",
    choices: ["7", "3", "10", "無限多但只會看到黑白"],
    answerIndex: 0,
    hint: "那句童謠式的顏色順序。",
    revealTitle: "彩虹：我被分成七段而已",
    revealBody:
      "光譜是連續的，但人們常用七色描述。彩虹不是只給你七色，是你大腦很愛分類。",
  },
  {
    category: "科技｜你每天都在用",
    question: "Wi‑Fi 名字的『Wi』原本最像是在暗示什麼？",
    choices: ["像 Hi‑Fi 那樣的品牌命名風格（不是 'Wireless Fidelity' 的正式縮寫）", "會發出微波", "專指無線保真", "是某個人的名字"],
    answerIndex: 0,
    hint: "它比較像行銷命名，而非嚴謹縮寫。",
    revealTitle: "Wi‑Fi：我其實是行銷系",
    revealBody:
      "Wi‑Fi 名稱常被認為是仿照 Hi‑Fi 的命名風格而來，並非嚴格的技術縮寫。你連不上時：別怪名字，怪訊號。",
  },
  {
    category: "動物｜跑步不用氧",
    question: "獵豹為什麼衝刺很快但不能維持很久？",
    choices: ["衝刺消耗大、散熱與供能限制", "牠會突然想睡", "牠怕跑遠迷路", "牠其實在演戲"],
    answerIndex: 0,
    hint: "極限性能通常不耐久。",
    revealTitle: "獵豹：我不是不行，我是太強了",
    revealBody:
      "獵豹衝刺速度非常高，但能量消耗與散熱、肌肉供能方式等限制，讓牠不適合長距離。短跑王者，不是馬拉松選手。",
  },
  {
    category: "食物｜會冒火的那種",
    question: "辣椒的辣感主要來自哪種物質？",
    choices: ["辣椒素（capsaicin）", "葡萄糖", "咖啡因", "維他命 C"],
    answerIndex: 0,
    hint: "它不是『味道』，更像『痛覺』的訊號。",
    revealTitle: "辣：其實是神經在尖叫",
    revealBody:
      "辣椒素會刺激特定受體，讓你感覺灼熱。你以為你在品嚐，其實你在跟神經系統玩心理戰。",
  },
  {
    category: "自然｜其實很吵",
    question: "雷聲為什麼常常『在閃電之後』才聽到？",
    choices: ["光比聲音快很多", "因為雷很害羞", "因為雲在延遲播放", "因為你耳朵慢半拍"],
    answerIndex: 0,
    hint: "速度差距大到誇張。",
    revealTitle: "光：我先到；聲音：我在路上",
    revealBody:
      "光速遠快於聲速，所以你先看到閃電、之後才聽到雷聲。這不是特效，是物理的時間差。",
  },
  {
    category: "人體｜眼睛也會錯覺",
    question: "為什麼你盯著某個顏色久了，看白牆會看到相反色？",
    choices: ["視覺受體適應造成後像", "牆在反抗", "大腦在作畫", "光線會記仇"],
    answerIndex: 0,
    hint: "跟眼睛細胞『疲勞/適應』有關。",
    revealTitle: "後像：眼睛在做反差補償",
    revealBody:
      "長時間刺激會讓部分感光受體適應，移到中性背景時就會出現相對的後像效果。你的眼睛：我自動校色一下。",
  },
];

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      roundSize: clamp(Number(parsed.roundSize ?? DEFAULT_SETTINGS.roundSize), 3, 30),
      secondsPerQuestion: clamp(
        Number(parsed.secondsPerQuestion ?? DEFAULT_SETTINGS.secondsPerQuestion),
        5,
        120
      ),
      showHints: Boolean(parsed.showHints ?? DEFAULT_SETTINGS.showHints),
      adHtml: typeof parsed.adHtml === "string" ? parsed.adHtml : "",
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(next) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(next));
}

function loadBestScore() {
  const n = Number(localStorage.getItem(STORAGE_KEYS.bestScore) ?? 0);
  return Number.isFinite(n) ? n : 0;
}

function saveBestScore(n) {
  localStorage.setItem(STORAGE_KEYS.bestScore, String(n));
}

function $(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element: #${id}`);
  return el;
}

const ui = {
  heroStart: $("btn-start"),
  heroHow: $("btn-how"),
  btnReset: $("btn-reset"),
  btnSettings: $("btn-settings"),

  bestScore: $("best-score"),
  bankCount: $("bank-count"),
  modeLabel: $("mode-label"),

  game: $("game"),
  qProgress: $("q-progress"),
  score: $("score"),
  timer: $("timer"),
  qCategory: $("q-category"),
  qText: $("q-text"),
  choices: $("choices"),
  reveal: $("reveal"),
  revealBadge: $("reveal-badge"),
  revealTitle: $("reveal-title"),
  revealBody: $("reveal-body"),
  btnNext: $("btn-next"),
  btnShare: $("btn-share"),

  adTop: $("ad-top"),
  adBottom: $("ad-bottom"),

  modal: $("modal"),
  modalBackdrop: $("modal-backdrop"),
  btnCloseModal: $("btn-close-modal"),
  roundSize: $("round-size"),
  timerSeconds: $("timer-seconds"),
  adHtml: $("ad-html"),
  toggleHints: $("toggle-hints"),
  btnSaveSettings: $("btn-save-settings"),
  btnClearAd: $("btn-clear-ad"),

  toast: $("toast"),
};

let settings = loadSettings();
let bestScore = loadBestScore();

let round = {
  active: false,
  total: settings.roundSize,
  index: 0,
  score: 0,
  questions: [],
  locked: false,
  timerId: null,
  secondsLeft: settings.secondsPerQuestion,
};

function toast(msg) {
  ui.toast.textContent = msg;
  ui.toast.classList.remove("hidden");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => ui.toast.classList.add("hidden"), 1600);
}

function safeSetAdHtml(container, html) {
  if (!html || !html.trim()) {
    container.innerHTML = `
      <div class="ad-placeholder">
        <div class="ad-placeholder-title">廣告版位</div>
        <div class="ad-placeholder-text">
          尚未設定廣告。點右上角「設定」貼上你的廣告 HTML 片段。
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = html;

  // 若是 AdSense，常見需要觸發一次 push
  try {
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      window.adsbygoogle.push({});
    }
  } catch {
    // ignore
  }
}

function renderMeta() {
  ui.bestScore.textContent = String(bestScore);
  ui.bankCount.textContent = String(QUESTION_BANK.length);
  ui.modeLabel.textContent = "隨機";
  safeSetAdHtml(ui.adTop, settings.adHtml);
  safeSetAdHtml(ui.adBottom, settings.adHtml);
}

function openModal() {
  ui.roundSize.value = String(settings.roundSize);
  ui.timerSeconds.value = String(settings.secondsPerQuestion);
  ui.toggleHints.checked = settings.showHints;
  ui.adHtml.value = settings.adHtml;
  ui.modal.classList.remove("hidden");
}

function closeModal() {
  ui.modal.classList.add("hidden");
}

function resetRoundState() {
  if (round.timerId) window.clearInterval(round.timerId);
  round = {
    active: false,
    total: settings.roundSize,
    index: 0,
    score: 0,
    questions: [],
    locked: false,
    timerId: null,
    secondsLeft: settings.secondsPerQuestion,
  };
}

function startRound() {
  resetRoundState();
  ui.reveal.classList.add("hidden");
  ui.game.classList.remove("hidden");

  const pool = shuffle(QUESTION_BANK);
  round.questions = pool.slice(0, Math.min(settings.roundSize, pool.length));
  round.total = round.questions.length;
  round.active = true;
  round.index = 0;
  round.score = 0;

  renderQuestion();
  toast("開始！答錯也沒關係，梗會救你。");
}

function endRound() {
  round.active = false;
  if (round.timerId) window.clearInterval(round.timerId);
  round.timerId = null;

  if (round.score > bestScore) {
    bestScore = round.score;
    saveBestScore(bestScore);
    renderMeta();
    toast("新紀錄！你的冷笑話能量上升了。");
  } else {
    toast("回合結束！再來一回合把分數笑上去。");
  }

  ui.reveal.classList.remove("hidden");
  ui.revealBadge.className = "badge";
  ui.revealBadge.textContent = "回合結束";
  ui.revealTitle.textContent = `你這回合拿了 ${round.score} 分`;
  ui.revealBody.textContent = "點「下一題」會開始新回合，或按右上角重來。";
  ui.btnNext.textContent = "再玩一回合";
}

function startTimer() {
  if (round.timerId) window.clearInterval(round.timerId);
  round.secondsLeft = settings.secondsPerQuestion;
  ui.timer.textContent = String(round.secondsLeft);
  round.timerId = window.setInterval(() => {
    if (!round.active) return;
    if (round.locked) return;
    round.secondsLeft -= 1;
    ui.timer.textContent = String(round.secondsLeft);
    if (round.secondsLeft <= 0) {
      onTimeout();
    }
  }, 1000);
}

function renderQuestion() {
  const q = round.questions[round.index];
  if (!q) {
    endRound();
    return;
  }

  round.locked = false;
  ui.btnNext.textContent = "下一題";
  ui.qProgress.textContent = `第 ${round.index + 1} 題 / ${round.total}`;
  ui.score.textContent = String(round.score);
  ui.qCategory.textContent = q.category ?? "—";

  const hint = settings.showHints && q.hint ? `（提示：${q.hint}）` : "";
  ui.qText.textContent = `${q.question}${hint ? " " + hint : ""}`;

  ui.choices.innerHTML = "";
  ui.reveal.classList.add("hidden");

  const letters = ["A", "B", "C", "D"];
  q.choices.forEach((c, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    btn.setAttribute("role", "option");
    btn.innerHTML = `<div class="key">${letters[idx] ?? "?"}</div><div class="text">${escapeHtml(
      c
    )}</div>`;
    btn.addEventListener("click", () => choose(idx));
    ui.choices.appendChild(btn);
  });

  startTimer();
}

function lockChoices() {
  round.locked = true;
  const children = Array.from(ui.choices.children);
  children.forEach((el) => el.classList.add("disabled"));
}

function choose(idx) {
  if (!round.active) return;
  if (round.locked) return;
  const q = round.questions[round.index];
  if (!q) return;

  lockChoices();

  const isCorrect = idx === q.answerIndex;
  const children = Array.from(ui.choices.children);
  children.forEach((el, i) => {
    if (i === q.answerIndex) el.classList.add("good");
    else if (i === idx) el.classList.add("bad");
  });

  const timeBonus = Math.max(0, round.secondsLeft);
  const gained = isCorrect ? 10 + Math.floor(timeBonus / 3) : 0;
  if (isCorrect) round.score += gained;
  ui.score.textContent = String(round.score);

  ui.reveal.classList.remove("hidden");
  ui.revealBadge.className = `badge ${isCorrect ? "good" : "bad"}`;
  ui.revealBadge.textContent = isCorrect ? `答對 +${gained}` : "答錯（但你有努力）";
  ui.revealTitle.textContent = q.revealTitle ?? (isCorrect ? "答對了！" : "答錯了！");
  ui.revealBody.textContent = q.revealBody ?? "";
}

function onTimeout() {
  if (!round.active) return;
  if (round.locked) return;
  lockChoices();
  ui.reveal.classList.remove("hidden");
  ui.revealBadge.className = "badge bad";
  ui.revealBadge.textContent = "時間到";
  ui.revealTitle.textContent = "倒數歸零：你的腦袋先笑死了";
  ui.revealBody.textContent = "下一題快點，別讓冷知識等太久。";
}

function next() {
  if (!round.active) {
    startRound();
    return;
  }

  round.index += 1;
  if (round.index >= round.total) {
    endRound();
    return;
  }
  renderQuestion();
}

function resetAll() {
  resetRoundState();
  ui.game.classList.add("hidden");
  ui.reveal.classList.add("hidden");
  renderMeta();
  toast("已重來。冷知識清空，笑點重開。");
}

function shareScore() {
  const text = `我在《稀奇知識笑一個》拿了 ${round.score} 分。答錯也很好笑，你也來！`;
  if (navigator.share) {
    navigator.share({ text }).catch(() => {});
    return;
  }
  navigator.clipboard?.writeText(text).then(
    () => toast("已複製分享文字"),
    () => toast("複製失敗（但你可以手動抄）")
  );
}

function showHow() {
  toast("玩法：選答案→看梗→下一題。答對有分數 + 時間加成。");
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

ui.heroStart.addEventListener("click", startRound);
ui.heroHow.addEventListener("click", showHow);
ui.btnNext.addEventListener("click", next);
ui.btnReset.addEventListener("click", resetAll);
ui.btnShare.addEventListener("click", shareScore);
ui.btnSettings.addEventListener("click", openModal);
ui.btnCloseModal.addEventListener("click", closeModal);
ui.modalBackdrop.addEventListener("click", closeModal);

ui.btnSaveSettings.addEventListener("click", () => {
  const nextSettings = {
    ...settings,
    roundSize: clamp(Number(ui.roundSize.value), 3, 30),
    secondsPerQuestion: clamp(Number(ui.timerSeconds.value), 5, 120),
    showHints: Boolean(ui.toggleHints.checked),
    adHtml: ui.adHtml.value ?? "",
  };
  settings = nextSettings;
  saveSettings(settings);
  renderMeta();
  resetAll();
  closeModal();
  toast("設定已儲存");
});

ui.btnClearAd.addEventListener("click", () => {
  ui.adHtml.value = "";
  toast("已清空（記得按儲存）");
});

renderMeta();
