document.addEventListener('DOMContentLoaded', () => {
  // --- Get References to HTML Elements ---
  const backgroundLayer = document.getElementById('background-layer');
  const characterSprite = document.getElementById('character-sprite');
  const characterLayer = document.getElementById('character-layer');
  const characterNameBox = document.getElementById('character-name-box');
  const characterNameEl = document.getElementById('character-name');
  const dialogueEl = document.getElementById('dialogue');
  const choicesBox = document.getElementById('choices-box');
  const gameContainer = document.getElementById('game-container');

  // --- Define Your Story (Same as before) ---
  const storyData = {
    "start": {
      text: "请选择章节",
      background: "images/story_start.jpg",
      sprite: null,
      choices: [
        {
          text: "第一章",
          nextId: "ch1_start"
        },
        {
          text: "第二章",
          nextId: "ch2_start"
        },
        {
          text: "第三章",
          nextId: "ch3_start"
        },
        {
          text: "第四章",
          nextId: "ch4_start"
        },
        {
          text: "第五章",
          nextId: "ch5_start"
        },
        {
          text: "第六章",
          nextId: "ch6_start"
        },
        {
          text: "第七章",
          nextId: "ch7_start"
        }
      ]
    },
    // --- CHAPTER 1 START ---
    'ch1_start': {
        character: "玲玲",
        text: "“艾米莉，这次你还是不去么？” 玲玲蛮有点失落的问。",
        background: 'images/video_call_screen.jpg', // Placeholder: Screen showing Emily
        sprite: 'images/lingling_asking.png', // Placeholder: Lingling's expression (if shown) or null
        nextId: 'ch1_emily_reply1'
    },
    'ch1_emily_reply1': {
        character: "艾米莉",
        text: "“对呀，如果我离开了卡恩怎么办呢？”屏幕上艾米莉笑嘻嘻的回答。",
        background: 'images/video_call_screen.jpg', // Placeholder
        sprite: 'images/emily_smiling_on_screen.png', // Placeholder
        nextId: 'ch1_emily_shows_kahn'
    },
    'ch1_emily_shows_kahn': {
        character: "艾米莉", // Action associated with Emily
        text: "她抱起身边的卡恩，拿给玲玲看。卡恩粉红的鼻子凑到屏幕前。",
        background: 'images/video_call_screen.jpg', // Placeholder
        sprite: 'images/emily_showing_kahn.png', // Placeholder: Emily holding Kahn closer
        nextId: 'ch1_lingling_context1'
    },
    'ch1_lingling_context1': {
        text: "玲玲喜欢艾米莉一起去考古实地工作。艾米莉是难得的阳光金发美女。和美女一起工作总是好的，年轻的R族男生总会凑上来，为她们展示意想不到的好东西。",
        background: 'images/video_call_screen.jpg', // Placeholder or flashback image?
        sprite: null, // Focus on narration
        nextId: 'ch1_lingling_context2'
    },
     'ch1_lingling_context2': {
        text: "可是自从艾米莉领养了卡恩之后，她总是选择远程工作。",
        background: 'images/video_call_screen.jpg', // Placeholder
        sprite: 'images/emily_on_screen_neutral.png', // Placeholder
        nextId: 'ch1_lingling_persuade1'
    },
    'ch1_lingling_persuade1': {
        character: "玲玲",
        text: "“卡恩可以交给看护人嘛。这次B134区的考古离新三藩市非常近哦，想想那里的美食。”",
        nextId: 'ch1_lingling_persuade2'
    },
     'ch1_lingling_persuade2': {
        character: "玲玲",
        text: "“B134区也许没什么新鲜的东西，很快结束的话我们可以去新三藩市好好玩一下呢。”",
         background: 'images/video_call_screen.jpg', // Placeholder
         sprite: 'images/lingling_persuading.png', // Placeholder
        nextId: 'ch1_emily_refuse1'
    },
    'ch1_emily_refuse1': {
        character: "艾米莉",
        text: "“卡恩正是性格成长的阶段哦，我可不想他被看护人冷淡的对待，变成一只令人讨厌的小狗。”",
        background: 'images/video_call_screen.jpg', // Placeholder
        sprite: 'images/emily_hugging_kahn.png', // Placeholder: Emily looking concerned/protective
        nextId: 'ch1_emily_reassure1'
    },
    'ch1_emily_reassure1': {
        character: "艾米莉",
        text: "艾米莉亲密的抱着卡恩，“玲玲，不用担心啦。即使我没去，我还是无时不刻不在你身边哦。”",
         sprite: 'images/emily_reassuring.png', // Placeholder
        nextId: 'ch1_emily_suggest_robot'
    },
     'ch1_emily_suggest_robot': {
        character: "艾米莉",
        text: "“如果你怕寂寞的话，租一个EOD30型的人型机喽。可以更换皮肤哦。看起来就跟我在身边一模一样哦。哈哈。”",
         sprite: 'images/emily_suggesting_laugh.png', // Placeholder
        nextId: 'ch1_lingling_react_robot'
    },
    'ch1_lingling_react_robot': {
        text: "玲玲一脸黑线。", // Narration of reaction
        background: 'images/video_call_lingling_view.jpg', // Placeholder: Focus on Lingling's side
        sprite: 'images/lingling_facepalm.png', // Placeholder
        nextId: 'ch1_lingling_robot_rant1'
    },
    'ch1_lingling_robot_rant1': {
        character: "玲玲",
        text: "”拜托不要推荐那种K族宅男才会用的东西好么。法律早就禁止人型机外形模拟人了，只有使用者可以通过vr眼镜看成自己想要的外形。“",
         sprite: 'images/lingling_annoyed.png', // Placeholder
        nextId: 'ch1_lingling_robot_rant2'
    },
     'ch1_lingling_robot_rant2': {
        character: "玲玲",
        text: "”你想想我手挽着钢铁手臂，是要被街上的人当成K族宅女么？“",
        nextId: 'ch1_emily_tease1'
    },
    'ch1_emily_tease1': {
        character: "艾米莉",
        text: "”玲玲你本来就很K族了吧。只有工作才出门吧。呵呵“",
        background: 'images/video_call_screen.jpg', // Placeholder
        sprite: 'images/emily_teasing.png', // Placeholder
        nextId: 'ch1_lingling_retort'
    },
    'ch1_lingling_retort': {
        character: "玲玲",
        text: "”艾米莉你还不是一样。现在你连工作也不出门了。“",
        background: 'images/video_call_lingling_view.jpg', // Placeholder
        sprite: 'images/lingling_pouting.png', // Placeholder
        nextId: 'ch1_emily_invite'
    },
    'ch1_emily_invite': {
        character: "艾米莉",
        text: "”好啦好啦，这次我真是去不了了。不如你工作后来我家看我吧，保证做美食给你吃啦。“",
        background: 'images/video_call_screen.jpg', // Placeholder
        sprite: 'images/emily_smiling_warmly.png', // Placeholder
        nextId: 'ch1_lingling_arrival' // End of call scene
    },
    'ch1_lingling_arrival': {
        text: "从飞机上下来，玲玲还有些闷闷不乐。",
        background: 'images/airport_arrival_gate.jpg', // Placeholder
        sprite: 'images/lingling_sad_travel.png', // Placeholder
        nextId: 'ch1_context_work'
    },
    'ch1_context_work': {
        text: "不过工作毕竟是工作。艾米莉负责软件，玲玲负责硬件。软件考古师不去实地，并不是什么奇怪的事情。",
        background: 'images/airport_corridor.jpg', // Placeholder
        sprite: 'images/lingling_walking_thinking.png', // Placeholder
        nextId: 'ch1_context_b134'
    },
    'ch1_context_b134': {
        text: "资料显示B134区是很小的一个区域，恐怕是新三藩扩展时清理古三藩的一个角落。工作人员在红外扫描时发现了地下室，似乎有疑似第三次技术革命以前的物品，像是电子产品。",
        nextId: 'ch1_context_revolution'
    },
    'ch1_context_revolution': {
        text: "第三次技术革命距今已有一百多年。教科书说这次革命非常彻底，人类社会用上了全新的技术。短短十年，几乎所有软件被重写，硬件被重新设计制造。",
        nextId: 'ch1_context_revolution2'
    },
     'ch1_context_revolution2': {
        text: "技术革命之前的物品几乎全部被抛弃。",
        nextId: 'ch1_context_artifacts'
    },
    'ch1_context_artifacts': {
        text: "虽然这些文物对现在并非那么稀缺，但总有一群有钱有势的人想要得到。或像R族一样当艺术品摆在家里，或像V族一样把远古代码像教义一样传播。",
        nextId: 'ch1_context_artifacts2'
    },
     'ch1_context_artifacts2': {
        text: "由于这些物品的考古学术价值，政府不得不介入，规定发现的技术革命前物品一定要由专门考古人士鉴定，再由政府决定是否拍卖给私人。",
        nextId: 'ch1_context_gov_work'
    },
    'ch1_context_gov_work': {
        text: "严格来讲，玲玲和艾米丽不算政府职员，但为政府工作总有特殊权限。玲玲选择了军用的vs300型人型机。",
         sprite: 'images/lingling_determined.png', // Placeholder
        nextId: 'ch1_context_gov_work2'
    },
     'ch1_context_gov_work2': {
        text: "它可以使用军用网络通道，即使由艾米丽远程驾驶也是零延迟。在自主模式下，协助搬运和武力防御性能也相当优越。",
        nextId: 'ch1_context_gov_work3'
    },
      'ch1_context_gov_work3': {
        text: "虽然玲玲不觉得需要武力防御，但比起民用轻型施工型W系列，只是协助搬运，vs300也要好多了。",
        nextId: 'ch1_collecting_robot'
    },
    'ch1_collecting_robot': {
        text: "在机场前台领取vs300的时候，玲玲心情终于好了一些。",
        background: 'images/airport_service_desk.jpg', // Placeholder
        sprite: 'images/lingling_at_desk.png', // Placeholder
        nextId: 'ch1_robot_appears'
    },
     'ch1_robot_appears': {
        text: "vs300从仓库走出来的时候，玲玲还是感觉赏心悦目。",
        background: 'images/airport_service_area_robot.jpg', // Placeholder
        sprite: 'images/vs300_walking_out.png', // Placeholder
        nextId: 'ch1_robot_description'
    },
    'ch1_robot_description': {
        text: "vs300是小巧的女性身材设计，与玲玲身高相仿。",
        sprite: 'images/vs300_standing.png', // Placeholder: Close up or focused view
        nextId: 'ch1_robot_greeting'
    },
    'ch1_robot_greeting': {
        character: "vs300-e00908",
        // Combining description and dialogue for flow
        text: "它的初始化模拟声音是温文尔雅的男声：“你好，请在接口处插入您的生物密钥”",
        nextId: 'ch1_insert_key1'
    },
    'ch1_insert_key1': {
        text: "玲玲在vs300的手臂上插入生物密钥芯片。", // Narration
        background: 'images/airport_service_area_robot.jpg', // Placeholder
        sprite: 'images/lingling_inserting_key.png', // Placeholder
        nextId: 'ch1_robot_confirm1'
    },
    'ch1_robot_confirm1': {
        character: "vs300-e00908",
        text: "“确认成功。你好，武玲玲小姐，我是vs300-e00908。非常高兴为您服务。”",
        nextId: 'ch1_robot_confirm1b'
    },
     'ch1_robot_confirm1b': {
        character: "vs300-e00908",
        text: "“如果需要我的功能简介，请随时告诉我。”",
        nextId: 'ch1_lingling_no_intro'
    },
    'ch1_lingling_no_intro': {
        character: "玲玲",
        text: "“不需要简介，谢谢。”",
        sprite: 'images/lingling_interacting.png', // Placeholder
        nextId: 'ch1_robot_ask_mode'
    },
    'ch1_robot_ask_mode': {
        character: "vs300-e00908",
        text: "“请问玲玲小姐这次主要是驾驶模式还是协助模式？”",
        nextId: 'ch1_lingling_reply_mode'
    },
    'ch1_lingling_reply_mode': {
        character: "玲玲",
        text: "“我预计一半时间是协助模式，另一半是远程驾驶模式。我需要加入另外一个驾驶员。”",
        nextId: 'ch1_robot_ask_key2'
    },
    'ch1_robot_ask_key2': {
        character: "vs300-e00908",
        text: "“请插入二号驾驶员的生物密钥。”",
        nextId: 'ch1_insert_key2'
    },
    'ch1_insert_key2': {
        text: "玲玲插入艾米丽的芯片。", // Narration
         sprite: 'images/lingling_inserting_key2.png', // Placeholder
        nextId: 'ch1_robot_confirm2'
    },
    'ch1_robot_confirm2': {
        character: "vs300-e00908",
        text: "“确认成功，请问是否现在联系艾米丽马库斯小姐？”",
        nextId: 'ch1_lingling_confirm_contact'
    },
    'ch1_lingling_confirm_contact': {
        character: "玲玲",
        text: "“请联系。”",
        nextId: 'ch1_lingling_inner_thought'
    },
     'ch1_lingling_inner_thought': {
        text: "(玲玲暗自想：艾米丽可千万不要不在。提前告诉了她提取vs300的时间，测试通信总归是在离开服务带之前进行最好。)", // Inner thought/narration
         sprite: 'images/lingling_hoping.png', // Placeholder
        nextId: 'ch1_emily_contact_greet'
    },
    'ch1_emily_contact_greet': {
        character: "艾米莉 (via vs300)",
        text: "“你好啊，亲爱的玲玲！” 艾米丽甜美的声音立刻传了出来。vs300胸前的显示器也显示出艾米丽美丽的面孔。",
        sprite: 'images/vs300_emily_on_screen.png', // Placeholder showing Emily on robot's screen
        nextId: 'ch1_emily_contact_ask'
    },
    'ch1_emily_contact_ask': {
        character: "艾米莉 (via vs300)",
        text: "“飞机上有好好休息吗？”",
        nextId: 'ch1_lingling_contact_reply'
    },
    'ch1_lingling_contact_reply': {
        character: "玲玲",
        text: "“还好吧，只是三小时飞机而已。” 她多少有些疲倦，但在艾米丽面前却不由自主地掩饰起来。",
        sprite: 'images/lingling_hiding_fatigue.png', // Placeholder
        nextId: 'ch1_emily_suggest_tour'
    },
    'ch1_emily_suggest_tour': {
        character: "艾米莉 (via vs300)",
        text: "“打算先去新三番城中心玩一圈么？要不要我来当导游呢？顺便测试一下远程操作？”",
        sprite: 'images/vs300_emily_suggesting.png', // Placeholder
        nextId: 'ch1_lingling_agree_food'
    },
    'ch1_lingling_agree_food': {
        character: "玲玲",
        text: "“随便你了，我现在是要去城中心找点儿吃的。你能陪我去最好了。”",
         sprite: 'images/lingling_agreeable.png', // Placeholder
        nextId: 'ch1_emily_confirm_guide'
    },
    'ch1_emily_confirm_guide': {
        character: "艾米莉 (via vs300)",
        text: "“没问题！别忘了我可在新三番生活过三年哦。vs300，请切换到远程驾驶。”",
        sprite: 'images/vs300_emily_enthusiastic.png', // Placeholder
        nextId: 'ch1_lingling_tease_emily'
    },
    'ch1_lingling_tease_emily': {
        character: "玲玲",
        text: "“五岁以前在新三番的生活，现在能记住多少呢？” 她有点嘲笑艾米丽，但对艾米丽的盛情也很开心。",
         sprite: 'images/lingling_teasing_happy.png', // Placeholder
        nextId: 'ch1_robot_ask_confirm_switch'
    },
    'ch1_robot_ask_confirm_switch': {
        character: "vs300-e00908",
        text: "“玲玲小姐，请确认切换到二号驾驶员远程驾驶模式。”",
        sprite: 'images/vs300_waiting.png', // Placeholder
        nextId: 'ch1_lingling_final_confirm'
    },
    'ch1_lingling_final_confirm': {
        character: "玲玲",
        text: "“确认。”",
        sprite: 'images/lingling_confirming.png', // Placeholder
        nextId: "ch2_start" // End of Chapter 1
    },
    // --- Add Chapter 2 starting from 'ch2_start' ---
      "ch2_start": {    
          
        text: "清理b134区的负责人热情的接待了玲玲和艾米丽。四十多岁的中年男性。从事清理和建筑工作的大都是崇尚r族的人，健壮的身材，喜欢和人面对面聊天和交往。即使大部分工作都是通过驾驶人型机完成，他们也更愿意近距离操作。科技的进步保证了人类的最低生活水准，但是也使得社会从各个层面上更加两极分化。",
        background: "images/b134_cleanup_site.jpg",
        sprite: null,
        nextId: "ch2_gongjin_greet"
      },
      "ch2_gongjin_greet": {
        character: "宫神骏",
        text: "“玲玲小姐，你好，我是宫神骏。b134区工程的负责人。欢迎你来到这里。在去看那个物品之前，要不要参观一下我们的施工现场呢？”",
        background: "images/b134_cleanup_site.jpg",
        sprite: "images/gongjin_speaking.png",
        nextId: "ch2_emily_excited"
      },
      "ch2_emily_excited": {
        character: "艾米丽",
        text: "“好啊！太棒了！”还没等玲玲回答，艾米丽就开心的大叫起来。",
        background: "images/b134_cleanup_site.jpg",
        sprite: "images/emily_excited_vs300.png",
        nextId: "ch2_gongjin_ask_emily"
      },
      "ch2_gongjin_ask_emily": {
        character: "宫神骏",
        text: "“不好意思，请问这位是？”宫神先生显然没有预计到人型机会抢先插话。",
        background: "images/b134_cleanup_site.jpg",
        sprite: "images/gongjin_surprised.png",
        nextId: "ch2_emily_introduce"
      },
      "ch2_emily_introduce": {
        character: "艾米丽",
        text: "“哈哈，我是艾米丽。是玲玲的搭档。”艾米丽操作着VS300做出一个点脚行礼的姿势。",
        background: "images/b134_cleanup_site.jpg",
        sprite: "images/emily_bowing_vs300.png",
        nextId: "ch2_lingling_amused"
      },
      "ch2_lingling_amused": {
        character: "玲玲",
        text: "玲玲心里暗笑，对参观工地这么感兴趣居然不来。就像昨天在新三番街头时不时兴奋尖叫的也是艾米丽。在路人看来像是玲玲带了快要故障的人型机。",
        background: "images/b134_cleanup_site.jpg",
        sprite: "images/lingling_smiling_subtle.png",
        nextId: "ch2_start_tour_car"
      },
      "ch2_start_tour_car": {
        
        text: "宫神先生带领玲玲和艾米丽坐上车，向不远处驶去。",
        background: "images/driving_through_b134.jpg",
        sprite: null,
        nextId: "ch2_gongjin_b134_history1"
      },
      "ch2_gongjin_b134_history1": {
        character: "宫神骏",
        text: "“B134是古城的西北郊区，被荒废至今已经有三四十年了。虽然说是郊区，在第三次技术革命以前据说是居民集中的地方。这里的遗留建筑大多是一户型。三次技术革命后新城的便利条件和舒适程度远远超过了这里。政府组织主要人口免费迁移到新城，这里也就逐渐被废弃。",
        background: "images/driving_through_b134.jpg",
        sprite: "images/gongjin_speaking.png",
        nextId: "ch2_gongjin_b134_history2"
      },
      "ch2_gongjin_b134_history2": {
        character: "宫神骏",
        text: "“虽然说是废弃，但是有一些守旧的人还坚持居住在这里，直到政府最终决定停止提供水和能源。直到三四十年前的时候，还有组织宣扬对抗政府技术，举旗驻扎在这里。结果不过三天，据说当时的领导者就受不了生活的艰苦，灰溜溜的回道了新城。”",
        background: "images/driving_through_b134.jpg",
        sprite: "images/gongjin_speaking.png",
        nextId: "ch2_lingling_시대对抗"
      },
      "ch2_lingling_시대对抗": {
        character: "玲玲",
        text: "“任何时代总有想与时代对抗的人。”玲玲点头说，“结果被时代碾得粉碎。”",
        background: "images/driving_through_b134.jpg",
        sprite: "images/lingling_nodding.png",
        nextId: "ch2_emily_romantic"
      },
      "ch2_emily_romantic": {
        character: "艾米丽",
        text: "“想想要是真的可以在这里自给自足生活下去，却也真的是很浪漫呢。”艾米丽却是一脸憧憬。",
        background: "images/driving_through_b134.jpg",
        sprite: "images/emily_dreamy_vs300.png",
        nextId: "ch2_b134_scenery"
      },
      "ch2_b134_scenery": {
        
        text: "放眼望去，这里成为世外桃源也并不为过。空旷的旧街道依然外形完好，两旁的住房早已破败，却被郁郁葱葱的植物遮掩的似有似无。每幢房子也不经相同。有的能看出曾经是豪华的欧式双层建筑，屋顶早已塌陷，墙上爬满青藤。有的只是一层普通的砖瓦结构，似乎站立在哪里完好无损。",
        background: "images/b134_scenery.jpg",
        sprite: null,
        nextId: "ch2_lingling_why_clear"
      },
      "ch2_lingling_why_clear": {
        character: "玲玲",
        text: "“政府为什么想起来清理b134区呢？想想这种地方，怕是很多R族年轻人的探险圣地呢。”玲玲问道。",
        background: "images/b134_scenery.jpg",
        sprite: "images/lingling_asking.png",
        nextId: "ch2_gongjin_laugh"
      },
      "ch2_gongjin_laugh": {
        character: "宫神骏",
        text: "“呵呵，玲玲小姐，你说的真没错。”宫神先生笑了起来，“我年轻的时候也会经常来这里探险。实在是很美好的回忆呢。不过政府总有自己的理由，毕竟这是很好的一块地段，新三番人口太多，需要建立新城，b134区是最方便的了。而且毕竟v族的人越来越多，喜欢这种风格探险的人也越来越少了。政府提出来的时候，反对者寥寥无几。只有像我们这几个对这里有一些感情的人。最后和政府达成协议，我们参与清理工作，作为酬谢，政府允许我们带走部分拆迁下的材料，转移到私人的地方。”",
        background: "images/b134_scenery.jpg",
        sprite: "images/gongjin_laughing.png",
        nextId: "ch2_emily_adventure_park"
      },
      "ch2_emily_adventure_park": {
        character: "艾米丽",
        text: "“重建探险圆喽？”艾米丽插进来一句。",
        background: "images/b134_scenery.jpg",
        sprite: "images/emily_curious_vs300.png",
        nextId: "ch2_gongjin_dream_aik"
      },
      "ch2_gongjin_dream_aik": {
        character: "宫神骏",
        text: "“没错，这是我们几个的梦想。看那边是艾克！”宫神先生像街角的中型搬运机挥挥手。中型机放下手中石砖，也向宫神招收。驾驶员坐在中型机中央，是年轻的短发男人。",
        background: "images/b134_cleanup_workers.jpg",
        sprite: "images/gongjin_waving.png",
        nextId: "ch2_gongjin_team"
      },
      "ch2_gongjin_team": {
        character: "宫神骏",
        text: "“B134区并不是很大，大约有一百多座旧建筑需要清理。像艾克这样驾驶中型机的还有十来个。大都是我们以前的伙伴，或者是朋友的朋友。”",
        background: "images/b134_cleanup_workers.jpg",
        sprite: "images/gongjin_speaking.png",
        nextId: "ch2_lingling_admire"
      },
      "ch2_lingling_admire": {
        character: "玲玲",
        text: "“宫神先生这样为了保存历史而工作实在是令人敬佩。”玲玲诚恳地说。",
        background: "images/b134_cleanup_workers.jpg",
        sprite: "images/lingling_admiring.png",
        nextId: "ch2_gongjin_modest"
      },
      "ch2_gongjin_modest": {
        character: "宫神骏",
        text: "“过奖了，我们只是想保存以前的一份记忆而已。想你们这样的考古专家，才是保存历史的人。”宫神先生说，“而且这本身也是很有趣的工作啊，在户外和朋友一起，不像那些v族的整天沉浸在在虚拟世界之中……”",
        background: "images/b134_cleanup_workers.jpg",
        sprite: "images/gongjin_speaking.png",
        nextId: "ch2_gongjin_item_location"
      },
      "ch2_gongjin_item_location": {
        character: "宫神骏",
        text: "“对了，我们扫描到的疑似电子物品就在前面的房子地下室。根据清理工程规定，我们全面扫描发现电子物品之后就立刻停止施工。所以地下室也并没有打开，只等你们出现了。”",
        background: "images/house_with_item.jpg",
        sprite: "images/gongjin_pointing.png",
        nextId: "ch2_emily_lets_go"
      },
      "ch2_emily_lets_go": {
        character: "艾米丽",
        text: "“玲玲，我们上吧。”艾米丽看着眼前一层的平房，眼睛亮了起来。",
        background: "images/house_with_item.jpg",
        sprite: "images/emily_excited_vs300.png",
        nextId: "ch2_lingling_agree"
      },
      "ch2_lingling_agree": {
        character: "玲玲",
        text: "“嗯！”玲玲应声道。",
        background: "images/house_with_item.jpg",
        sprite: "images/lingling_agreeing.png",
        nextId: "ch2_enter_house"
      },
      "ch2_enter_house": {
        
        text: "平房的内部还算完整，通往地下室的入口被石砖挡住。艾米丽将vs 300切换为自动模式，这种不需要精细操作的工作，自动模式更加有效。很快石砖被清理干净，一条楼梯通往地下。",
        background: "images/inside_old_house.jpg",
        sprite: null,
        nextId: "ch2_descend_basement"
      },
      "ch2_descend_basement": {
        
        text: "VS300打开前后灯照明，在艾米丽的操作下向楼梯下走去。玲玲跟随在后面。根据施工规则，宫神先生不能进入考古现场，于是在建筑外等候。",
        background: "images/stairs_to_basement.jpg",
        sprite: null,
        nextId: "ch2_basement_desc"
      },
      "ch2_basement_desc": {
        
        text: "地下室并不大，大约十平米左右。零落着一些破旧不堪的物品，很难看出原来是什么。",
        background: "images/basement_interior.jpg",
        sprite: null,
        nextId: "ch2_lingling_scan"
      },
      "ch2_lingling_scan": {
        character: "玲玲",
        text: "“VS300，请扫描确认电子产品。”玲玲命令道。",
        background: "images/basement_interior.jpg",
        sprite: "images/lingling_commanding.png",
        nextId: "ch2_vs300_scan"
      },
      "ch2_vs300_scan": {
        
        text: "VS300头部的探测器做了三百六十度旋转，最后灯光停在角落的金属状长方体上。大约四十厘米长宽，十五厘米高。",
        background: "images/basement_scanning.jpg",
        sprite: "images/vs300_scanning.png",
        nextId: "ch2_lingling_clean"
      },
      "ch2_lingling_clean": {
        
        text: "玲玲拿出背包的考古专用清扫工具盒。用毛刷和小风扇轻轻除去外部的灰尘。",
        background: "images/cleaning_object.jpg",
        sprite: "images/lingling_cleaning.png",
        nextId: "ch2_emily_miracle"
      },
      "ch2_emily_miracle": {
        character: "艾米丽",
        text: "“这个东西至少在这里带了几十年了吧。”艾米丽说，“居然也没有被砸坏，真是奇迹。”",
        background: "images/cleaning_object.jpg",
        sprite: "images/emily_speaking_vs300.png",
        nextId: "ch2_lingling_quietly_working"
      },
      "ch2_lingling_quietly_working": {
        character: "玲玲",
        text: "“嗯。”玲玲工作的时候总是很安静，像是处理一件艺术品一样。",
        background: "images/cleaning_object.jpg",
        sprite: "images/lingling_focused.png",
        nextId: "ch2_object_revealed"
      },
      "ch2_object_revealed": {
        
        text: "清扫过后，长方体很明显的展现出自己的年份，细长的一面上有一个圆形的按钮。物理按钮在第三科技革命之前就已经不常见。玲玲企图把长方体抱出来，但长方体稍有点重量。艾米丽操纵VS300帮助了玲玲。长方体宽平的面上什么也没有。反面的细长面上看到了期望中的接口。物理接口始终没有被取代，即使第三次革命之后技术已经相当成熟。大部分制造商为了安全考虑，借口仍然采用物理接口。",
        background: "images/cleaned_object.jpg",
        sprite: null,
        nextId: "ch2_lingling_confused_interfaces"
      },
      "ch2_lingling_confused_interfaces": {
        
        text: "长方体大约有八个物理接口。玲玲疑惑了。这是第一次看到这样的接口。",
        background: "images/object_interfaces.jpg",
        sprite: "images/lingling_confused.png",
        nextId: "ch2_lingling_ask_emily_interfaces"
      },
      "ch2_lingling_ask_emily_interfaces": {
        character: "玲玲",
        text: "“艾米丽，你的数据库中有见到过这样的接口么？”",
        background: "images/object_interfaces.jpg",
        sprite: "images/lingling_asking.png",
        nextId: "ch2_emily_no_data"
      },
      "ch2_emily_no_data": {
        character: "艾米丽",
        text: "“没有看到过。”",
        background: "images/object_interfaces.jpg",
        sprite: "images/emily_thinking_vs300.png",
        nextId: "ch2_lingling_onsite_test"
      },
      "ch2_lingling_onsite_test": {
        character: "玲玲",
        text: "“带回实验室的话，测试容易很多。但是现在的流程都是实地检验后才可以搬运。只好现场发挥了。”",
        background: "images/object_interfaces.jpg",
        sprite: "images/lingling_determined.png",
        nextId: "ch2_emily_confidence"
      },
      "ch2_emily_confidence": {
        character: "艾米丽",
        text: "“我对你有信心！”艾米丽在屏幕上向玲玲伸出一只大拇指。",
        background: "images/object_interfaces.jpg",
        sprite: "images/emily_thumbs_up_vs300.png",
        nextId: "ch2_lingling_testing"
      },
      "ch2_lingling_testing": {
        
        text: "玲玲用随身的接口扫描仪器探测了每个接口的形状，然后打印出一接口匹配的接头，保证每个触点都能接到。真正难的是判断哪些触电是输入哪些触电是输出，稍不留意弄错的话，这个古代的价值连城的电子设备就会被烧成废铁，特别是古代的东西通常都不是那么结实。接下来就是反复小心的实验，在每个触电小心输入小量电流信号。同时探测其它所有触电和接口的反应。",
        background: "images/testing_object.jpg",
        sprite: "images/lingling_testing.png",
        nextId: "ch2_testing_time_lapse"
      },
      "ch2_testing_time_lapse": {
        
        text: "前前后后测试了两个多小时，玲玲摸了头上的汗珠，",
        background: "images/testing_object.jpg",
        sprite: "images/lingling_sweating.png",
        nextId: "ch2_lingling_power_interface"
      },
      "ch2_lingling_power_interface": {
        character: "玲玲",
        text: "“艾米丽，我找到能源输入的接口了，下面我要逐渐提高能源输入，直到内部系统苏醒。”",
        background: "images/testing_object.jpg",
        sprite: "images/lingling_speaking.png",
        nextId: "ch2_emily_ok"
      },
      "ch2_emily_ok": {
        character: "艾米丽",
        text: "“好的。”艾米丽安静而认真的看了玲玲两个小时。她对玲玲的专业和耐心十分倾佩和信赖。",
        background: "images/testing_object.jpg",
        sprite: "images/emily_watching_vs300.png",
        nextId: "ch2_lingling_increase_power"
      },
      "ch2_lingling_increase_power": {
        character: "玲玲",
        text: "“能源提高到三十欧，四十欧，五十欧。好了！”",
        background: "images/powering_on_object.jpg",
        sprite: "images/lingling_concentrating.png",
        nextId: "ch2_light_on"
      },
      "ch2_light_on": {
        
        text: "玲玲和艾米丽兴奋地看着长方型盒子上有个小灯亮了起来。",
        background: "images/object_light_on.jpg",
        sprite: null,
        nextId: "ch2_lingling_press_button"
      },
      "ch2_lingling_press_button": {
        character: "玲玲",
        text: "“我来试试前面的按钮，从设计理论上应该是接通能源后的开关。即使古人也不会太离谱。”玲玲按下开关，听到长方体内部传来轻微的嗡嗡声。",
        background: "images/object_light_on.jpg",
        sprite: "images/lingling_pressing_button.png",
        nextId: "ch2_emily_success"
      },
      "ch2_emily_success": {
        character: "艾米丽",
        text: "“成功了么？”",
        background: "images/object_light_on.jpg",
        sprite: "images/emily_hopeful_vs300.png",
        nextId: "ch2_lingling_should_be"
      },
      "ch2_lingling_should_be": {
        character: "玲玲",
        text: "“应该是了。”",
        background: "images/object_light_on.jpg",
        sprite: "images/lingling_confident.png",
        nextId: "ch2_lingling_connect_vs300"
      },
      "ch2_lingling_connect_vs300": {
        character: "玲玲",
        text: "“把其他所有接口接到vs300上来吧，我试着解析传出的数据。”",
        background: "images/object_connected_vs300.jpg",
        sprite: "images/lingling_instructing.png",
        nextId: "ch2_emily_working"
      },
      "ch2_emily_working": {
        
        text: "艾米丽开始忙碌了。VS300静静地站在原地成为了艾米丽专属的信号传送器。",
        background: "images/object_connected_vs300.jpg",
        sprite: "images/vs300_transferring_data.png",
        nextId: "ch2_waiting10min"
      },
      "ch2_waiting10min": {
        
        text: "十分钟过去了。",
        background: "images/object_connected_vs300.jpg",
        sprite: null,
        nextId: "ch2_waiting20min"
      },
      "ch2_waiting20min": {
        
        text: "二十分钟过去了。",
        background: "images/object_connected_vs300.jpg",
        sprite: null,
        nextId: "ch2_lingling_tidy"
      },
      "ch2_lingling_tidy": {
        
        text: "玲玲收拾好自己的工具，伸伸懒腰。工作五年头一次遇到这么奇怪的东西。最新的考古学年鉴上也没有见过这种形状这种接口的古董。不过玲玲对自己还是很满意。在学校里考古硬件学理论和实践都是满分据说是学校近十年来少有的成绩。",
        background: "images/basement_interior.jpg",
        sprite: "images/lingling_stretching.png",
        nextId: "ch2_waiting30min"
      },
      "ch2_waiting30min": {
        
        text: "三十分钟过去了。",
        background: "images/object_connected_vs300.jpg",
        sprite: null,
        nextId: "ch2_emily_trembling"
      },
      "ch2_emily_trembling": {
        character: "艾米丽",
        text: "“玲玲，”艾米丽终于上线了，声音居然有些颤抖，“咱们挖着金子了。”",
        background: "images/object_connected_vs300.jpg",
        sprite: "images/emily_shaking_vs300.png",
        nextId: "ch2_lingling_question"
      },
      "ch2_lingling_question": {
        character: "玲玲",
        text: "“嗯？”",
        background: "images/object_connected_vs300.jpg",
        sprite: "images/lingling_curious.png",
        nextId: "ch2_emily_big_discovery"
      },
      "ch2_emily_big_discovery": {
        character: "艾米丽",
        text: "“这个东西，是第一次科技革命以前的家伙！”",
        background: "images/object_connected_vs300.jpg",
        sprite: "images/emily_excited_vs300.png",
        nextId: "ch2_end"
      },
      "ch2_end": {
        
        text: "（本章完）",
        background: "images/basement_interior.jpg",
        sprite: null,
        nextId: "ch3_start"
      },

      // --- CHAPTER 3 START ---
      "ch3_start": {
        
        text: "第一次科技革命，多么远古的事件！没有人知道他是怎么发生的，甚至没有人知道它是什么时候发生的。",
        background: "images/ancient_history_concept.jpg", // Placeholder: Concept image of ancient history/mystery
        sprite: null,
        nextId: "ch3_no_records"
      },
      "ch3_no_records": {
        
        text: "虚拟世界和现实世界完全没有记载第一次科技革命之前的世界，考古学的证据几乎完全没有。虚拟世界流传着各种各样的谣言。",
        background: "images/ancient_history_concept.jpg",
        sprite: null,
        nextId: "ch3_rumor_cavemen"
        },
        'ch3_rumor_cavemen': {
            
            text: "有人说，第一次科技革命之前人类还过着洞穴和采集的生活。突然的科技像是彗星撞击地球一样，彻底的改变了人类，人类开始有电，有机器人辅助。",
            background: "images/rumor_cavemen_tech.jpg", // Placeholder: Image depicting primitive life contrasted with sudden tech
            sprite: null,
            nextId: "ch3_rumor_tech_regress"
        },
        'ch3_rumor_tech_regress': {
            
            text: "有人说，第一次科技革命之前人类的技术水平远超当前。由于某种突发的事件，所谓的第一次科技革命其实是巨大的科技倒退，真正的信息和技术被政府封锁。",
            background: "images/rumor_advanced_past.jpg", // Placeholder: Image suggesting advanced past tech
            sprite: null,
            nextId: "ch3_rumor_world_created"
        },
        'ch3_rumor_world_created': {
            
            text: "还有人说第一次科技革命之前的世界是完全不存在的，人类和现在的世界是在第一次科技革命时候造出来的，完全没有意义探讨之前发生过什么。",
            background: "images/rumor_simulated_reality.jpg", // Placeholder: Image suggesting a simulated or created world
            sprite: null,
            nextId: "ch3_archaeology_past"
        },
        'ch3_archaeology_past': {
            
            text: "考古学历史上曾经发生过追寻第一次科技革命史前的潮流，但是也仅仅停留在编纂各种流言蜚语的工作。考古学之后转入了实证学派，坚持从实物说话，个别对一科史前有兴趣的学者，通常是工作多年后，毫无收获，也无法向政府提出有力证据申请资金，最终转向别的历史阶段的研究。",
            background: "images/archaeology_lab.jpg", // Placeholder: Image of an archaeology lab or study
            sprite: null,
            nextId: "ch3_excitement_discovery"
        },
        'ch3_excitement_discovery': {
            
            text: "能在这样不起眼的角落发现第一次科技革命之前的物品。真是令人十分激动。",
            background: "images/basement_interior.jpg", // Return to basement
            sprite: null,
            nextId: "ch3_lingling_skeptical"
        },
        'ch3_lingling_skeptical': {
            character: "玲玲",
            text: "玲玲明显不太相信：“艾米丽，你确认么？没有人确切的知道第一次科技革命之前的物品应该是怎样啊。”",
            background: "images/basement_interior.jpg",
            sprite: "images/lingling_skeptical.png", // Placeholder
            nextId: "ch3_emily_not100percent"
        },
        'ch3_emily_not100percent': {
            character: "艾米丽",
            text: "“百分之百确认当然是不可能了。但是种种迹象表明...... 玲玲你听说过复古团这个组织么？”",
            background: "images/basement_interior.jpg",
            sprite: "images/emily_speaking_vs300.png",
            nextId: "ch3_lingling_cult"
        },
        'ch3_lingling_cult': {
            character: "玲玲",
            text: "“听名字像是邪教啊”",
            background: "images/basement_interior.jpg",
            sprite: "images/lingling_thinking.png", // Placeholder
            nextId: "ch3_emily_shady"
        },
        'ch3_emily_shady': {
            character: "艾米丽",
            text: "“呵呵，是有点邪邪的。他们大部分在广网上活动，主要的教义是要恢复原始的生活。",
            background: "images/basement_interior.jpg",
            sprite: "images/emily_speaking_vs300.png",
            nextId: "ch3_lingling_contradiction"
        },
        'ch3_lingling_contradiction': {
            character: "玲玲",
            text: "“那他们就应该拒绝广网而在线下活动啊。”",
            background: "images/basement_interior.jpg",
            sprite: "images/lingling_questioning.png", // Placeholder
            nextId: "ch3_emily_idiots"
        },
        'ch3_emily_idiots': {
            character: "艾米丽",
            text: "“那是没错，里面的大部分人其实都白痴到看不出自己与教义的矛盾。但是传闻他们的几个创始成员有财有力而且是有点货真价实的东西的。",
            background: "images/basement_interior.jpg",
            sprite: "images/emily_speaking_vs300.png",
            nextId: "ch3_emily_adam"
        },
        'ch3_emily_adam': {
            character: "艾米丽",
            text: "“复古团每年会组织现场活动。你还记得亚当么？和我同级毕业的电子美术系的男生。”",
            background: "images/basement_interior.jpg",
            sprite: "images/emily_speaking_vs300.png",
            nextId: "ch3_lingling_adam_chaser"
        },
        'ch3_lingling_adam_chaser': {
            character: "玲玲",
            text: "“是那个追求你追求的要死要活的那位么？”",
            background: "images/basement_interior.jpg",
            sprite: "images/lingling_amused.png", // Reuse or new placeholder
            nextId: "ch3_emily_adam_connection"
        },
        'ch3_emily_adam_connection': {
            character: "艾米丽",
            text: "“没错啦。他似乎和里面的高层有点关系，邀请我去看看他们收集的古董。在活动中参与者可以通过观看团里收集的虚拟物件。当然是完全不能复制。期中有几样引起了我的注意。”",
            background: "images/retro_group_meeting.jpg", // Placeholder: Image of a virtual or physical meeting space
            sprite: "images/emily_speaking_vs300.png",
            nextId: "ch3_lingling_what_attracted"
        },
        'ch3_lingling_what_attracted': {
            character: "玲玲",
            text: "“是什么？”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/lingling_curious.png", // Placeholder
            nextId: "ch3_emily_software_hardware"
        },
        'ch3_emily_software_hardware': {
            character: "艾米丽",
            text: "“玲玲你做硬件对软件也应该有一定的了解吧。软件其实就是人与硬件的链接。现代的软件非常直观。基本上人想到的东西，通过说写活着动作示范给硬件就可以了。比如我想让vs300举起手臂，只需要说，举起手臂，或者移动我手头的movepad就可以。如果我想让vs300实现更复杂的动作，只需要口头告诉他操作顺序等等就可以。似乎和人交流也没有什么不同。但是玲玲，你有没有想过，为什么很多时候机器理解和完成我们的意图比人类更好？”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/emily_explaining_vs300.png", // Placeholder
            nextId: "ch3_lingling_human_thoughts"
        },
        'ch3_lingling_human_thoughts': {
            character: "玲玲",
            text: "“人类会有自己的想法？”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/lingling_thinking.png",
            nextId: "ch3_emily_image_context"
        },
        'ch3_emily_image_context': {
            character: "艾米丽",
            text: "“不仅仅是这样。即使一个完全顺从的人也不可能像机器那样丝毫不差的完成我们的要求。这里有更神奇的东西。人和人交流会有偏差是因为每个人脑海中的image是不同的。我说的美丽和你想的美丽并不相同。无偏差的交流需要的是将脑海中的image或者context瞬间复制交流给对方，在这之后向人类语言这种bit率很低的交流方式才可能实现无差别交流。”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/emily_explaining_vs300.png",
            nextId: "ch3_lingling_bottom_problem"
        },
        'ch3_lingling_bottom_problem': {
            character: "玲玲",
            text: "“没错这的确是被现代科技工作者忽视的最底层的问题。”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/lingling_agreeing.png", // Placeholder
            nextId: "ch3_emily_pre_contextual_mapping"
        },
        'ch3_emily_pre_contextual_mapping': {
            character: "艾米丽",
            text: "“你可以想象没有这样的科技的情况下人类怎样和机器交流么？”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/emily_speaking_vs300.png",
            nextId: "ch3_lingling_painstaking_steps"
        },
        'ch3_lingling_painstaking_steps': {
            character: "玲玲",
            text: "“嗯…… 岂不是要非常仔细地讲清楚每一个步骤？”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/lingling_thinking.png",
            nextId: "ch3_emily_clever"
        },
        'ch3_emily_clever': {
            character: "艾米丽",
            text: "“真聪明！”艾米丽伸出大拇指，“不但需要讲清楚每一个步骤，在讲清楚每一个步骤之前每一个名词什么意思，也需要定义清楚。你知道contextual mapping这样的技术是什么时候实现的么？”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/emily_thumbs_up_vs300.png", // Placeholder
            nextId: "ch3_lingling_third_revolution"
        },
        'ch3_lingling_third_revolution': {
            character: "玲玲",
            text: "“不是第三次科技革命么？”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/lingling_questioning.png",
            nextId: "ch3_emily_contextual_mapping_history"
        },
        'ch3_emily_contextual_mapping_history': {
            character: "艾米丽",
            text: "“不，远远早于第三次科技革命。有人说也许在第二次科技革命之前，也有人说其实contextual mapping就是第一次科技革命。",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/emily_speaking_vs300.png",
            nextId: "ch3_emily_retro_group_code"
        },
        'ch3_emily_retro_group_code': {
            character: "艾米丽",
            text: "“回到复古团的活动，在那里看到了实现了contextual mapping的但肯定是在第三次技术革命之前的物品。另外看到了一段代码，看起来非常古老，代码的开始居然有类似于定义变量的字符！”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/emily_excited_vs300.png", // Placeholder
            nextId: "ch3_lingling_really_exist"
        },
        'ch3_lingling_really_exist': {
            character: "玲玲",
            text: "“居然真的有这样的存在……”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/lingling_surprised.png", // Placeholder
            nextId: "ch3_emily_ask_source"
        },
        'ch3_emily_ask_source': {
            character: "艾米丽",
            text: "“我也非常惊讶。于是开始打听这段代码的来源。复古团的人大都含糊其辞，讲不清楚。直到遇到一个叫付凯的人。”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/emily_speaking_vs300.png",
            nextId: "ch3_lingling_fukai"
        },
        'ch3_lingling_fukai': {
            character: "玲玲",
            text: "“是那个天才软件师付凯？！”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/lingling_shocked.png", // Placeholder
            nextId: "ch3_emily_fukai_yes"
        },
        'ch3_emily_fukai_yes': {
            character: "艾米丽",
            text: "“没错，就是他。”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/emily_speaking_vs300.png",
            nextId: "ch3_lingling_fukai_member"
        },
        'ch3_lingling_fukai_member': {
            character: "玲玲",
            text: "“他居然也是复古团的成员？”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/lingling_surprised.png", // Reuse or new placeholder
            nextId: "ch3_emily_fukai_purpose"
        },
        'ch3_emily_fukai_purpose': {
            character: "艾米丽",
            text: "“他说他其实是为了看这段代码专程而来的。根据他的理论那段代码应该是第一次科技革命之前的产物。”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/emily_speaking_vs300.png",
            nextId: "ch3_lingling_why_certain"
        },
        'ch3_lingling_why_certain': {
            character: "玲玲",
            text: "“啊，为什么这么确定？”",
            background: "images/retro_group_meeting.jpg",
            sprite: "images/lingling_questioning.png",
            nextId: "ch3_emily_fukai_wont_say"
        },
        'ch3_emily_fukai_wont_say': {
            character: "艾米丽",
            text: "“他没说.... 他不肯说。回到咱们这台远古的机器。内部有很多部件还不太了解，但是我成功的破解了存储设备，转化成字符串读出后，查找人类可阅读的片段，最开始的几十行和我在复古团看到的一摸一样。复古团的代码大概有几千行，我反复看了很多遍，记住了前面一些。我非常确定，这里一定有复古团的代码！”",
            background: "images/basement_interior.jpg", // Return to basement
            sprite: "images/emily_excited_vs300.png", // Placeholder
            nextId: "ch3_lingling_doubt_evidence"
        },
        'ch3_lingling_doubt_evidence': {
            character: "玲玲",
            text: "“从而你断定这是第一次科技革命之前的物品？根据是不可靠的复古团，来源不明的代码，和神神秘秘的天才付凯？恐怕你连付凯的身份是否真实都没法确认吧。”",
            background: "images/basement_interior.jpg",
            sprite: "images/lingling_skeptical.png", // Placeholder
            nextId: "ch3_emily_passive"
        },
        'ch3_emily_passive': {
            character: "艾米丽",
            text: "“玲玲真实消极啊。”艾米丽办了个鬼脸“可以你的承认，考古者五六年，你也见过一些第一次科技革命之后第三次科技革命之前的古董，你也从来没见过这样的代码吧。”",
            background: "images/basement_interior.jpg",
            sprite: "images/emily_making_face_vs300.png", // Placeholder
            nextId: "ch3_lingling_admit_never_seen"
        },
        'ch3_lingling_admit_never_seen': {
            character: "玲玲",
            text: "“的确没见过，你的解释也算合理。”玲玲皱着眉头，陷入沉思，“现在怎么半。”",
            background: "images/basement_interior.jpg",
            sprite: "images/lingling_contemplating.png", // Placeholder
            nextId: "ch3_emily_study_before_report"
        },
        'ch3_emily_study_before_report': {
            character: "艾米丽",
            text: "“我想研究清楚再上交上报这个古董。”艾米丽突然严肃起来。",
            background: "images/basement_interior.jpg",
            sprite: "images/emily_serious_vs300.png", // Placeholder
            nextId: "ch3_end"
        },
        'ch3_end': {
            
            text: "（本章完）",
            background: "images/basement_interior.jpg",
            sprite: null,
            nextId: "ch4_start" // Link to the next chapter
        },

          // --- CHAPTER 4 START ---
          'ch4_start': {
              
              text: "隐瞒不报？玲玲想起来就头疼。想想被政府发现的后果，首先和政府的合同肯定会被取消，搞不好考古执照也会被考古协会没收，辛苦四年的学习和五年的执业... 即使不被政府发现，这老古董怎么搬运呢？没有政府物资的协助，搬运古董损坏风险也会很大。真不知道艾米丽在想什么。",
              background: "images/basement_interior.jpg", // Setting is still the basement initially
              sprite: "images/lingling_headache.png", // Placeholder
              nextId: "ch4_lingling_convinced"
          },
          'ch4_lingling_convinced': {
              
              text: "可是真不知道怎么回事偏偏自己就被说服了。如果，如果这真是第一次科技革命之前的古董，玲玲也想在政府回收之前一探究竟。恐怕这是所有考古人的梦想吧。",
              background: "images/basement_interior.jpg",
              sprite: "images/lingling_determined.png", // Placeholder
              nextId: "ch4_vs300_store_item"
          },
          'ch4_vs300_store_item': {
              
              text: "Vs300将长方体的古董回收在储备厢里。",
              background: "images/basement_interior.jpg",
              sprite: "images/vs300_storing_item.png", // Placeholder
              nextId: "ch4_exit_basement"
          },
           'ch4_exit_basement': {
              
              text: "从地下室里出来的时候，玲玲联系了宫神先生。",
              background: "images/house_with_item.jpg", // Outside the house
              sprite: "images/lingling_contacting.png", // Placeholder
              nextId: "ch4_gongjin_videocall"
          },
          'ch4_gongjin_videocall': {
              character: "宫神骏",
              text: "宫神先生通过vs300的视频对讲设备问好，“玲玲小姐，考察结束了，收获怎样啊？”",
              background: "images/house_with_item.jpg",
              sprite: "images/gongjin_on_screen.png", // Placeholder: Gongjin on VS300 screen
              nextId: "ch4_lingling_lie"
          },
          'ch4_lingling_lie': {
              character: "玲玲",
              text: "“嗯，现在看来似乎不是很老的东西，但是无法连接到内部设备。恐怕要带回到实验室在做定论。”即使是远程视频，玲玲都觉得脸上烧烧的，似乎是太不擅长撒谎了。",
              background: "images/house_with_item.jpg",
              sprite: "images/lingling_blushing.png", // Placeholder
              nextId: "ch4_gongjin_offer_escort"
          },
          'ch4_gongjin_offer_escort': {
              character: "宫神骏",
              text: "“OK。稍微等我一下，我来护送你去车站。这边施工稍微有点乱。”",
              background: "images/house_with_item.jpg",
              sprite: "images/gongjin_on_screen.png",
              nextId: "ch4_gongjin_arrive"
          },
          'ch4_gongjin_arrive': {
              
              text: "不一会儿，宫神先生的车到了。玲玲和vs300坐上车后，多少有点心不在焉。",
              background: "images/gongjin_car_exterior.jpg", // Placeholder: Car outside
              sprite: "images/lingling_distracted.png", // Placeholder
              nextId: "ch4_emily_offline"
          },
          'ch4_emily_offline': {
              
              text: "艾米丽完全下线，恐怕是在疯狂的研究已经下载好的数据。",
              background: "images/gongjin_car_interior.jpg", // Placeholder: Inside the car
              sprite: "images/emily_offline_vs300.png", // Placeholder: VS300 looking idle
              nextId: "ch4_gongjin_smalltalk"
          },
          'ch4_gongjin_smalltalk': {
              character: "宫神骏",
              text: "“玲玲小姐还会在新三番市多待几天么？工作结束了也可以好好休息下。”",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/gongjin_speaking_car.png", // Placeholder
              nextId: "ch4_lingling_report_deadline"
          },
          'ch4_lingling_report_deadline': {
              character: "玲玲",
              text: "“不会了，要赶去写报告。”",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/lingling_speaking_car.png", // Placeholder
              nextId: "ch4_gongjin_invitation"
          },
          'ch4_gongjin_invitation': {
              character: "宫神骏",
              text: "“真是辛苦啊。本来还打算邀请玲玲小姐去我家里玩的。”",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/gongjin_speaking_car.png",
              nextId: "ch4_lingling_gongjin_impression"
          },
          'ch4_lingling_gongjin_impression': {
              text: "对于年长自己十几岁的男人突然和自己套近乎，玲玲通常都会有点厌恶感。可是宫神先生却没有那种令人讨厌的感觉，更像是好客的邀请。",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/lingling_thinking_car.png", // Placeholder
              nextId: "ch4_lingling_ask_gongjin_home"
          },
           'ch4_lingling_ask_gongjin_home': {
              character: "玲玲",
              text: "“宫神先生住在新三番市里么？”",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/lingling_speaking_car.png",
              nextId: "ch4_gongjin_home_location"
          },
          'ch4_gongjin_home_location': {
              character: "宫神骏",
              text: "“嗯，在新三番的东北角。和最繁华的中心大约四十分钟车程吧。”",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/gongjin_speaking_car.png",
              nextId: "ch4_lingling_city_center"
          },
          'ch4_lingling_city_center': {
              character: "玲玲",
              text: "“那其实很市中心了吧。大多数v族只要还在这片大陆上就认为自己在世界中心了。”",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/lingling_speaking_car.png",
              nextId: "ch4_gongjin_world_change"
          },
          'ch4_gongjin_world_change': {
              character: "宫神骏",
              text: "“哈哈，那是没错。世界变化真快。想想我年轻的时候，整个人生都在广网上度过还是非常极端的生活态度。广网上下还有很多哲学讨论，怎样才是人生，人生应该追求什么，虚拟是否可以是全部的人生。短短二十年过去，r族人生居然成了少数。再也没有人在乎所谓的人生意义的哲学讨论。”",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/gongjin_speaking_car.png",
              nextId: "ch4_lingling_vtribe_philosophy"
          },
          'ch4_lingling_vtribe_philosophy': {
              character: "玲玲",
              text: "“其实v族也有自己的文化思考和哲学讨论吧。”",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/lingling_speaking_car.png",
              nextId: "ch4_gongjin_vtribe_disdain"
          },
          'ch4_gongjin_vtribe_disdain': {
              character: "宫神骏",
              text: "“只是些虚拟的东西吧，”宫神先生露出不屑的表情，“玲玲小姐做考古工作，应该不是v族崇尚者吧。”",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/gongjin_disdain_car.png", // Placeholder
              nextId: "ch4_lingling_not_v"
          },
          'ch4_lingling_not_v': {
              character: "玲玲",
              text: "“嗯，我不是。不过考古工作者里也有专门研究原始广网和原始虚拟世界的....”",
              background: "images/gongjin_car_interior.jpg",
              sprite: "images/lingling_speaking_car.png",
              nextId: "ch4_arrive_station"
          },
           'ch4_arrive_station': {
              character: "旁白",
              text: "车子到了车站。宫神先生护送玲玲和vs300到车站。",
              background: "images/station_exterior.jpg", // Placeholder
              sprite: null,
              nextId: "ch4_gongjin_farewell"
          },
          'ch4_gongjin_farewell': {
              character: "宫神骏",
              text: "又恢复到阳光热情的心情。“玲玲小姐祝你研究顺利。有空来找我们玩，看看我们能利用这里的废品建造出什么样有趣的东西吧！”",
              background: "images/station_exterior.jpg",
              sprite: "images/gongjin_waving_station.png", // Placeholder
              nextId: "ch4_lingling_planning"
          },
          'ch4_lingling_planning': {
              character: "旁白",
              text: "玲玲小姐别过宫神先生，开始算计怎样才能把东西带到艾米丽那里。",
              background: "images/station_exterior.jpg",
              sprite: "images/lingling_thinking_station.png", // Placeholder
              nextId: "ch4_end"
          },
          'ch4_end': {
              
              text: "（本章完）",
              background: "images/station_exterior.jpg",
              sprite: null,
              nextId: "ch5_start" // Link to the next chapter
          },

            // --- CHAPTER 5 START ---
            'ch5_start': {
                character: "旁白",
                text: "挂断了和玲玲的联系，艾米丽真是兴奋不已。安排玲玲带着五公斤重的东西来自己这里多少有点麻烦，不过是玲玲的话肯定没问题了。别看玲玲有点书呆子气，不过做起事情来心思细腻的很。",
                background: "images/emily_lab_apartment.jpg", // Placeholder: Emily's lab/apartment
                sprite: "images/emily_excited_vs300.png", // Placeholder
                nextId: "ch5_emily_fu_kai_shock"
            },
            'ch5_emily_fu_kai_shock': {
                character: "旁白",
                text: "想想有可能真是第一次科技革命之前的东西，真是非常激动。网上总有各种各样的传说，但是上次遇到付凯着实让自己吓了一跳。艾米丽当然不至于像玲玲说的那样连付凯身份都不查明。况且付凯是天才公众人物，和那些隐藏的高手作风完全不同。验证公开密钥是轻而易举的事，另外作为天才连自己的密钥如果也保护不好一定会被人笑掉大牙。可惜复古团活动结束之后，再次联系付凯就再也没有回复了。连公认天才都认为是有价值的东西肯定值得再仔细看看。",
                background: "images/emily_lab_apartment.jpg",
                sprite: "images/emily_thinking_vs300.png", // Placeholder
                nextId: "ch5_emily_start_work"
            },
            'ch5_emily_start_work': {
                character: "艾米丽",
                text: "“OK！现在开始工作！”艾米丽摸一摸卡恩的脑袋，伸个懒腰，开始聚精会神地分析下载的文件。",
                background: "images/emily_lab_apartment.jpg",
                sprite: "images/emily_stretching_vs300.png", // Placeholder
                nextId: "ch5_emily_data_analysis"
            },
            'ch5_emily_data_analysis': {
                character: "旁白",
                text: "艾米丽怀疑这个古董的另外一个原因是从机器里读出的数据无法从考古系统的数据库查找出来。从第三次科技革命之后，考古协会就逐渐建立数据股，将考察认证以及破解过的远古程序全部储存。数据库中以第二次科技革命之后的数据为主，有一些破解的但是无法确定你年份的程序便被归为第二次科技革命之前的程序。第二次科技革命和第三次科技革命之后的软件都有自己特别的表征。将没有这些表征的程序划分为第二次科技革命之前也不尽正确，因为总有先锋的隐藏软件手会编辑一些风格独特的程序。而且有传说，政府总在不停更新重写系统，有时会小规模的流放一部份测试性的程序到民间。",
                background: "images/emily_coding_screen.jpg", // Placeholder: Screen with code/data
                sprite: "images/emily_focused_vs300.png", // Placeholder
                nextId: "ch5_emily_undecodable"
            },
            'ch5_emily_undecodable': {
                character: "旁白",
                text: "眼前的无法和数据库匹配的字符串着实让艾米丽摸不出头脑，除了发现艾米丽记得的人类可阅读的片段程序以外，其他的不可阅读数据完全无法解码。可以想象很多这样的数据是和那个盒子的各个部件交流，没有盒子在手恐怕也做不了什么。只是等着玲玲，也只会越来越着急。",
                background: "images/emily_coding_screen.jpg",
                sprite: "images/emily_confused_vs300.png", // Placeholder
                nextId: "ch5_emily_analyze_code"
            },
            'ch5_emily_analyze_code': {
                character: "旁白",
                text: "艾米丽决定耐下性子看看那段代码以及其他的片段代码，看看能不能猜出这段代码的目的。",
                background: "images/emily_coding_screen.jpg",
                sprite: "images/emily_determined_vs300.png", // Placeholder
                nextId: "ch5_half_hour_later"
            },
            'ch5_half_hour_later': {
                character: "旁白",
                text: "半个小时之后，艾米丽还是一头雾水。虽然原理上知道远古的代码需要不厌其烦的定义和解释最基本的操作， 但是所有的文献上都是指出了contextual mapping对现代软件的重要性，并没有列举远古代码的例子。艾米莉看到大约几百行的类似于定义的代码，但是这些定义背后的目的和意义完全猜不出来。有个别小段的程序似乎可以看出是实现基本的数学运算，这些在现代软件中也可以找到对应的写法，不过上次看到也是在学校课堂上做教学用而已。另外有很大一段程序讲paging之类的东西，似乎是在用笨的不可想象的方法做索引和查找。",
                background: "images/emily_coding_screen.jpg",
                sprite: "images/emily_frustrated_vs300.png", // Placeholder
                nextId: "ch5_emily_stretch_again"
            },
            'ch5_emily_stretch_again': {
                character: "艾米丽",
                text: "“啊～真是搞不懂！”艾米莉再次伸了懒腰，开始思考下一步。",
                background: "images/emily_lab_apartment.jpg",
                sprite: "images/emily_stretching_vs300.png", // Placeholder
                nextId: "ch5_emily_contact_fukai_idea"
            },
            'ch5_emily_contact_fukai_idea': {
                character: "旁白",
                text: "也许可以联系付凯，告诉他自己有和复古团类似的代码，他肯定会感兴趣。但是天才为什么会对这种古董感兴趣也是令人不解的问题。公众人物的天才的大部分工作都是解决更先进超前的软件问题。付凯的公众工作主要是集中在城市建设。据说他的工作使得城市内部改善速度提高了五倍，建筑机器人的细节操作能力在复杂的城市内部变得极其精准。恩，也许天才都有一些业余爱好吧。",
                background: "images/emily_lab_apartment.jpg",
                sprite: "images/emily_thinking_vs300.png", // Placeholder
                nextId: "ch5_emily_try_contact_fukai"
            },
            'ch5_emily_try_contact_fukai': {
                character: "旁白",
                text: "艾米莉决定试一试。连上广网之后，试图联络天才付凯。",
                background: "images/emily_computer_online.jpg", // Placeholder: Computer screen online
                sprite: "images/emily_working_vs300.png", // Placeholder
                nextId: "ch5_emily_message_fukai1"
            },
            'ch5_emily_message_fukai1': {
                character: "艾米丽 (消息)",
                text: "“付凯，我这里有远古的代码，和复古团的代码类似。”",
                background: "images/emily_computer_online.jpg",
                sprite: null, // Message on screen, no sprite needed
                nextId: "ch5_no_response1"
            },
            'ch5_no_response1': {
                character: "旁白",
                text: "然而还是毫无动静。",
                background: "images/emily_computer_online.jpg",
                sprite: null,
                nextId: "ch5_emily_send_code_encrypted"
            },
            'ch5_emily_send_code_encrypted': {
                character: "旁白",
                text: "艾米莉决定把代码的前五百行加密发给付凯。",
                background: "images/emily_computer_online.jpg",
                sprite: "images/emily_working_vs300.png", // Placeholder
                nextId: "ch5_no_response2"
            },
            'ch5_no_response2': {
                character: "旁白",
                text: "还是毫无动静。",
                background: "images/emily_computer_online.jpg",
                sprite: null,
                nextId: "ch5_emily_ice_cream"
            },
            'ch5_emily_ice_cream': {
                character: "旁白",
                text: "恩。艾米莉决定休息一下，邀请卡恩一起吃香草味的冰激凌。A城中心的冰激凌小店在广网服务非常好，通常购买之后三分钟之后就能送到。结果正在付款的时候，整个屋子的电源突然被切断。",
                background: "images/emily_lab_apartment_dark.jpg", // Placeholder: Apartment suddenly dark
                sprite: "images/emily_surprised_vs300.png", // Placeholder
                nextId: "ch5_emily_fear"
            },
            'ch5_emily_fear': {
                character: "旁白",
                text: "艾米莉吓了一跳，第一反应是难道遇到了大灾难，第二反应是是否自己被黑客袭击。电源被切断这样的事情记忆中从来没有发生过，只是听说一些极端R族的人会选择极端环境生活才会发生。",
                background: "images/emily_lab_apartment_dark.jpg",
                sprite: "images/emily_scared_vs300.png", // Placeholder
                nextId: "ch5_backup_power"
            },
            'ch5_backup_power': {
                character: "旁白",
                text: "十秒钟之后备用电源启动，屋子的智能系统开始重启。主屏幕上出现一行字：",
                background: "images/emily_computer_reboot.jpg", // Placeholder: Computer screen rebooting
                sprite: null,
                nextId: "ch5_message_secret_channel"
            },
            'ch5_message_secret_channel': {
                character: "未知 (屏幕信息)",
                text: "“艾米丽小姐，抱歉我们暂时切断了你的电源，系统断电重启时插入秘密通道是我们唯一放心的交流方法。”",
                background: "images/emily_computer_message.jpg", // Placeholder: Message on screen
                sprite: null,
                nextId: "ch5_emily_who_are_you"
            },
            'ch5_emily_who_are_you': {
                character: "艾米丽",
                text: "“你们是谁？”",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_questioning_vs300.png", // Placeholder
                nextId: "ch5_message_work_with_fukai"
            },
            'ch5_message_work_with_fukai': {
                character: "未知 (屏幕信息)",
                text: "“我们和付凯一起工作。在这种秘密方式下连接你的主要原因是有关于你发送给我们的代码。”",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_confirm_fukai"
            },
            'ch5_emily_confirm_fukai': {
                character: "艾米丽",
                text: "“我怎么能确定你们是付凯呢？\"",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_skeptical_vs300.png", // Placeholder
                nextId: "ch5_message_no_verification_code"
            },
            'ch5_message_no_verification_code': {
                character: "未知 (屏幕信息)",
                text: "\"很抱歉，你不能。我们也不想留下任何痕迹，因此不可能发送给你你可以验证身份的密钥。但是为了表示诚意，我们会发送给你一段代码，这是你那段代码的之后的五百行。如果你拥有整段代码的话，你应该可以匹配的上。“",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_code_file_received"
            },
            'ch5_code_file_received': {
                character: "旁白",
                text: "一个很小的文件发送过来。艾米莉迅速对比自己手中的代码，的确是匹配的。",
                background: "images/emily_coding_screen_match.jpg", // Placeholder: Screen showing code comparison
                sprite: "images/emily_working_vs300.png",
                nextId: "ch5_emily_nervous"
            },
            'ch5_emily_nervous': {
                character: "旁白",
                text: "艾米莉还在紧张和害怕中，手心微微的出着汗。毕竟自己的整个系统刚刚被人袭击，对方意图不明。",
                background: "images/emily_lab_apartment_緊張.jpg", // Placeholder: Emily looking nervous
                sprite: "images/emily_nervous_vs300.png", // Placeholder
                nextId: "ch5_emily_calm_down"
            },
            'ch5_emily_calm_down': {
                character: "旁白",
                text: "整理好思绪，艾米莉稳定住自己的思路。",
                background: "images/emily_lab_apartment.jpg",
                sprite: "images/emily_focused_vs300.png",
                nextId: "ch5_emily_still_doubt"
            },
            'ch5_emily_still_doubt': {
                character: "艾米丽",
                text: "”代码的确是匹配的。但是仍然不能表示你们就是付凯。况且即使你是付凯，你也不需要用这种方法。“",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_skeptical_vs300.png", // Placeholder
                nextId: "ch5_message_apology_reason"
            },
            'ch5_message_apology_reason': {
                character: "未知 (屏幕信息)",
                text: "”不好意思，方法和手段让你受惊了。但是我们有我们的理由。回到你发过来的代码，艾米丽小姐，我们想知道你是从什么途径得到的？“",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_ask_first"
            },
            'ch5_emily_ask_first': {
                character: "艾米丽",
                text: "“在我回答之前，你们可以先回答我的问题么？“",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_questioning_vs300.png",
                nextId: "ch5_message_some_questions_ok"
            },
            'ch5_message_some_questions_ok': {
                character: "未知 (屏幕信息)",
                text: "”有的问题可以，有的问题不可以。不过艾米丽小姐请讲吧。”",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_what_code_does"
            },
            'ch5_emily_what_code_does': {
                character: "艾米丽",
                text: "“这段代码到底是干什么的？”",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_questioning_vs300.png",
                nextId: "ch5_message_code_purpose"
            },
            'ch5_message_code_purpose': {
                character: "未知 (屏幕信息)",
                text: "“这是很大的一个代码库中的很小一段。整个代码库是为了操作远古时代的机器。艾米莉小姐发送过来的这一段是操作和管理机器的存储记忆设备的代码中的一段。”",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_like_cmm"
            },
            'ch5_emily_like_cmm': {
                character: "艾米丽",
                text: "“存贮记忆设备类似于现在的CMM系统么？”",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_questioning_vs300.png",
                nextId: "ch5_message_yes_primary"
            },
            'ch5_message_yes_primary': {
                character: "未知 (屏幕信息)",
                text: "“是的，当然远古的设备要初级得多。”",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_code_era"
            },
            'ch5_emily_code_era': {
                character: "艾米丽",
                text: "“这到底是什么时代的代码？”",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_eager_vs300.png", // Placeholder
                nextId: "ch5_message_pre_first_revolution"
            },
            'ch5_message_pre_first_revolution': {
                character: "未知 (屏幕信息)",
                text: "“我们认为是第一次科技革命以前的代码。”",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_yes"
            },
            'ch5_emily_yes': {
                character: "艾米丽",
                text: "YES！艾米莉得意的握紧了拳头，我就知道肯定不一般。费力劝服玲玲，然后让玲玲费力搬过来，完全值了。",
                background: "images/emily_lab_apartment.jpg",
                sprite: "images/emily_triumphant_vs300.png", // Placeholder
                nextId: "ch5_emily_how_get_code"
            },
             'ch5_emily_how_get_code': {
                character: "艾米丽",
                text: "“你们是怎么得到这些代码的呢？”",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_questioning_vs300.png",
                nextId: "ch5_message_cannot_answer_source"
            },
            'ch5_message_cannot_answer_source': {
                character: "未知 (屏幕信息)",
                text: "“这个问题不能回答。”",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_how_determine_era"
            },
            'ch5_emily_how_determine_era': {
                character: "艾米丽",
                text: "“那你们是怎样确定这是第一次科技革命以前的代码的呢？”",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_questioning_vs300.png",
                nextId: "ch5_message_code_expert"
            },
            'ch5_message_code_expert': {
                character: "未知 (屏幕信息)",
                text: "“我们中有专门研究程序演变史的专家。艾米莉小姐从事考古专业，肯定会用考古代码搜索库吧。我们建立了自己的代码搜索库，应该比公开的系统有更多的数据。每个时代代码有自己的特征，如果采样不同时代实现统一操作的代码，可以很明显看到代码的进化过程。代码的复杂度，效率，嵌套度，等等，随着年度会逐渐变化。根据这样的模型，你可以看到第二次科技革命和第三次科技革命为什么被称之为‘革命‘，而不是简单的系统更新。但是从我们破解的这段远古代码来看，如果把它带入模型，看到的变化远远超过可以用’革命`描述。完全就是‘断层’！这段代码存在的年代和第一次科技革命之后的代码完全就是微生物和人类的区别。我们只能认为这是第一次科技革命之前的产物，因为已经排除了它在第一次科技革命之后存在的任何可能性。当然我们还有其他辅佐我们判断的理由，这些理由暂时不能透露“",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_why_fukai_interested"
            },
            'ch5_emily_why_fukai_interested': {
                character: "艾米丽",
                text: "”付凯为什么会对这种微生物进化级别的代码感兴趣呢？“",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_questioning_vs300.png",
                nextId: "ch5_message_why_interested_history"
            },
            'ch5_message_why_interested_history': {
                character: "未知 (屏幕信息)",
                text: "”艾米莉小姐为什么会对这样的代码感兴趣呢？到底是什麽促发了这样断层式的进步呢？理解历史不是可以更好的帮助未来么？或者更重要的问题是为什么这样重要断层式的技术进步没有被记载呢？根据我们对这些远古代码的理解，远古人已经掌握了基本的操作机器，电子记录信息的能力。然而为什么现代信息中能找到关于第一次科技革命和第一次科技革命之前的信息几乎没有呢？或者艾米丽有没有觉得在现代技术水平下记录信息是多么自然的事情，为什么连第二次技术革命之前的信息都非常有限？再或者，艾米丽小姐有没有想过，为什么会出现考古者这样的职业？“",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_history_erased"
            },
            'ch5_emily_history_erased': {
                character: "艾米丽",
                text: "”难道，你说，有人在逐渐的删除历史？？？“",
                background: "images/emily_lab_apartment_shock.jpg", // Placeholder: Emily looking shocked
                sprite: "images/emily_shocked_vs300.png", // Placeholder
                nextId: "ch5_message_want_to_understand"
            },
            'ch5_message_want_to_understand': {
                character: "未知 (屏幕信息)",
                text: "”我们也想弄明白。这个解释也许可以让艾米丽小姐理解我们为什么要采取这种特殊的交流方式。“",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_contemplating"
            },
            'ch5_emily_contemplating': {
                character: "旁白",
                text: "艾米莉沉思起来，突然的信息量让自己不知从何想起。本来只是觉得获得了超级大古董一定会一鸣惊人，然而事件的进展完全超出了自己的想象。",
                background: "images/emily_lab_apartment.jpg",
                sprite: "images/emily_contemplating_vs300.png", // Placeholder
                nextId: "ch5_emily_how_cut_power"
            },
            'ch5_emily_how_cut_power': {
                character: "艾米丽",
                text: "“最后一个问题，你们是怎样实线切断电网的？”毕竟艾米莉软件技术出身，根据她对电网和广网安全性的了解，人为攻陷电网几乎是完全不可能。付凯这群人究竟掌握了什么样的技术，自己究竟拖着玲玲卷入了什么样的事件。",
                background: "images/emily_lab_apartment.jpg",
                sprite: "images/emily_questioning_vs300.png",
                nextId: "ch5_message_physical_method"
            },
            'ch5_message_physical_method': {
                character: "未知 (屏幕信息)",
                text: "“当然是通过物理方法了，攻击电网并且隐藏身份难度非常大。我们在建设A市的时候留有维护城市硬件系统的维护机器人，在机器人身上做了操作，由机器人实现了物理断电。”",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_fukai_expertise"
            },
             'ch5_emily_fukai_expertise': {
                character: "旁白",
                text: "艾米莉想起来付凯的天才专属方向是城市建设。",
                background: "images/emily_lab_apartment.jpg",
                sprite: "images/emily_thinking_vs300.png",
                nextId: "ch5_message_our_turn"
            },
            'ch5_message_our_turn': {
                character: "未知 (屏幕信息)",
                text: "“现在轮到我们问问题了：艾米莉小姐，你是怎么遇到这段代码的？”",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_friend_discovery"
            },
            'ch5_emily_friend_discovery': {
                character: "艾米丽",
                text: "“嗯。。。一个朋友发给我的，“艾米莉还在犹豫是不是应该隐藏玲玲的存在，以及玲玲正要来到这里的事实，”一个朋友在考古的时候发现的。”",
                background: "images/emily_lab_apartment.jpg",
                sprite: "images/emily_hesitant_vs300.png", // Placeholder
                nextId: "ch5_message_friend_found_it"
            },
            'ch5_message_friend_found_it': {
                character: "未知 (屏幕信息)",
                text: "“你是说你的朋友在考古的时候发现后发给你的？”",
                background: "images/emily_computer_message.jpg",
                sprite: null,
                nextId: "ch5_emily_hesitant_again"
            },
             'ch5_emily_hesitant_again': {
                character: "艾米丽",
                text: "“嗯。。。”",
                background: "images/emily_computer_message.jpg",
                sprite: "images/emily_hesitant_vs300.png",
                nextId: "ch5_message_friend_in_danger"
            },
            'ch5_message_friend_in_danger': {
                character: "未知 (屏幕信息)",
                text: "“艾米丽小姐，你的朋友可能会有危险。”",
                background: "images/emily_lab_apartment_shock.jpg",
                sprite: null,
                nextId: "ch5_end"
            },
            'ch5_end': {
                character: "旁白",
                text: "（本章完）",
                background: "images/emily_lab_apartment.jpg",
                sprite: null,
                nextId: "ch6_start" // Link to the next chapter
            },

              // --- CHAPTER 6 START ---
              'ch6_start': {
                  character: "旁白",
                  text: "玲玲放倒车厢内的座椅，躺下来，带上眼罩，终于轻轻的喘了口气。",
                  background: "images/car_interior_night.jpg", // Placeholder: Inside the car at night
                  sprite: "images/lingling_resting.png", // Placeholder
                  nextId: "ch6_lingling_annoyed_emily"
              },
              'ch6_lingling_annoyed_emily': {
                  character: "旁白",
                  text: "然而一想到艾米丽给自己制造的麻烦，就不由暗暗的咬咬牙：这次租远途私人车的车费，得让艾米丽出一半！",
                  background: "images/car_interior_night.jpg",
                  sprite: "images/lingling_annoyed.png", // Placeholder
                  nextId: "ch6_emily_offline"
              },
              'ch6_emily_offline': {
                  character: "旁白",
                  text: "自从离开B143区，艾米丽就完全下线，连远程支持提供建议的可能性都没有。实在是太不靠谱了，把任务丢给自己。",
                  background: "images/car_interior_night.jpg",
                  sprite: "images/lingling_frustrated.png", // Placeholder
                  nextId: "ch6_lingling_imagine_emily"
              },
              'ch6_lingling_imagine_emily': {
                  character: "旁白",
                  text: "玲玲幻想着见到艾米丽怎么批评她的情形，结果脑海中却出现的是艾米丽美丽的笑容，她肯定会扑上来给自己一个大大的拥抱吧。哎别说年轻男士了，玲玲自己面对艾米丽都完全生不起来气。",
                  background: "images/car_interior_night.jpg",
                  sprite: "images/emily_smiling_imagination.png", // Placeholder: Emily smiling
                  nextId: "ch6_travel_time"
              },
              'ch6_travel_time': {
                  character: "旁白",
                  text: "车子飞驰在州间高速上，到达目的地大约是12个小时。玲玲算计着在车上休息一夜，然后在路过的小镇们觅食休息。",
                  background: "images/highway_night.jpg", // Placeholder: Car driving on highway at night
                  sprite: null,
                  nextId: "ch6_ghost_towns"
              },
              'ch6_ghost_towns': {
                  character: "旁白",
                  text: "其实所谓的小镇，大部分是仅仅是无人居住的补给站。如同B143区一样，五十年前还有人群居住。但是随着人口的下降，政府的宣传，人们发现便利性远不如住在政府支持更好的城区。老一辈人被安排在统一供给和服务的养老中心。年轻的V族只在乎生活便利。R族的年轻人也只是偶然出城探险玩乐而已。",
                  background: "images/abandoned_town_concept.jpg", // Placeholder: Concept of abandoned towns
                  sprite: null,
                  nextId: "ch6_lingling_感慨"
              },
              'ch6_lingling_感慨': {
                  character: "旁白",
                  text: "想到这里，玲玲不禁感叹，这些无人小镇虽然荒凉，却有一种特别的宁静。",
                  background: "images/abandoned_town_concept.jpg",
                  sprite: "images/lingling_pensive.png", // Placeholder
                  nextId: "ch6_look_outside_night"
              },
              'ch6_look_outside_night': {
                  character: "旁白",
                  text: "她望向车窗外，夜幕渐渐降临，星星点点的灯光在远处闪烁。她闭上眼睛，感受着车子的平稳行驶，心情也随着夜色逐渐平静下来。",
                  background: "images/starlit_highway_view.jpg", // Placeholder: View from car window at night
                  sprite: "images/lingling_calm.png", // Placeholder
                  nextId: "ch6_wake_up_town"
              },
              'ch6_wake_up_town': {
                  character: "旁白",
                  text: "玲玲醒来的时候，车子已经停在之前预定的第一个小镇了。推开车门就是补给商铺。",
                  background: "images/supply_station_morning.jpg", // Placeholder: Small town supply station morning
                  sprite: "images/lingling_waking_up.png", // Placeholder
                  nextId: "ch6_lingling_rub_eyes"
              },
              'ch6_lingling_rub_eyes': {
                  character: "旁白",
                  text: "玲玲揉揉眼睛，伸了伸懒腰，心想好想回到家里美美的洗个澡再喝杯咖啡啊。遇到这样特殊的工作，只好将就了。",
                  background: "images/supply_station_morning.jpg",
                  sprite: "images/lingling_stretching.png", // Placeholder
                  nextId: "ch6_get_breakfast"
              },
              'ch6_get_breakfast': {
                  character: "旁白",
                  text: "玲玲迈步走向自动售货机，选好早餐套餐。等待咖啡的时候，回头看了看承载自己一夜长途跋涉的RD231。银色的流线型外形，不失美观，更重要的是增加了动力学效率。",
                  background: "images/supply_station_with_rd231.jpg", // Placeholder: Supply station with vehicle
                  sprite: "images/lingling_at_vending.png", // Placeholder
                  nextId: "ch6_lingling_remember_senior"
              },
              'ch6_lingling_remember_senior': {
                  character: "旁白",
                  text: "玲玲记得在学校的时候喜欢的学长就是机动专业。学长总是会说机器不仅要动还要美观，如果失去了美观的设计，人类就不再是人类，仅仅是机器的奴隶。学长说的时候玲玲根本没听进去多少，因为那时候可能学长的蓝色深邃的双眼盒飘逸的长发更让玲玲着迷吧。",
                  background: "images/school_memory_concept.jpg", // Placeholder: Concept of a school memory
                  sprite: "images/lingling_blushing_memory.png", // Placeholder
                  nextId: "ch6_rd231_storage"
              },
              'ch6_rd231_storage': {
                  character: "旁白",
                  text: "RD231的存储空间在车子的头部，那里放置着从B143区带回来的，所谓第一次技术革命之前的，电子设备。就是为了这个，玲玲放弃了政府出钱的头等舱飞机，花了一个月的工资租了专人使用的RD231，冒着被政府解雇的风险，千里迢迢要把东西搬到艾米丽那里。",
                  background: "images/rd231_storage_area.jpg", // Placeholder: Area where item is stored
                  sprite: "images/lingling_determined.png", // Reuse or new placeholder
                  nextId: "ch6_lingling_contact_emily_again"
              },
              'ch6_lingling_contact_emily_again': {
                  character: "旁白",
                  text: "想到这里，玲玲想起来应该再和艾米丽联系一下，于是拨通了艾米丽的视频电话。",
                  background: "images/supply_station_morning.jpg",
                  sprite: "images/lingling_calling.png", // Placeholder
                  nextId: "ch6_waiting_call"
              },
              'ch6_waiting_call': {
                  character: "旁白",
                  text: "等待接通的时候，玲玲环视了一下周围的环境。商铺以外的街景异常的干净和简单。",
                  background: "images/supply_station_street.jpg", // Placeholder: Street view of the town
                  sprite: "images/lingling_looking_around.png", // Placeholder
                  nextId: "ch6_unusual_town"
              },
              'ch6_unusual_town': {
                  character: "旁白",
                  text: "玲玲原以为小镇改造后的补给中心通常会保留一些小镇的原有建筑，比如教堂或者废弃的医院，废弃的政府办公大楼。这个小镇却格外整洁，四五个新式的建筑分布在街道的两边。街道尽头或者远处并没有任何其他建筑。",
                  background: "images/supply_station_street_clean.jpg", // Placeholder: Emphasize cleanliness/newness
                  sprite: null,
                  nextId: "ch6_check_location"
              },
              'ch6_check_location': {
                  character: "旁白",
                  text: "玲玲下意识的看了下通信手表的定位，突然大惊失色。",
                  background: "images/lingling_checking_watch.jpg", // Placeholder: Focus on watch/map
                  sprite: "images/lingling_shocked.png", // Placeholder
                  nextId: "ch6_wrong_town"
              },
              'ch6_wrong_town': {
                  character: "玲玲",
                  text: "要去艾米丽的城市，不是应该停在NE113小镇么？现在所在地居然是SE452！",
                  background: "images/lingling_checking_watch.jpg",
                  sprite: "images/lingling_shocked.png",
                  nextId: "ch6_what_happened"
              },
              'ch6_what_happened': {
                  character: "玲玲",
                  text: "到底发生了什么？",
                  background: "images/supply_station_street_clean.jpg",
                  sprite: "images/lingling_confused.png", // Placeholder
                  nextId: "ch6_emily_still_no_answer"
              },
              'ch6_emily_still_no_answer': {
                  character: "旁白",
                  text: "艾米丽电话还是无法接通！",
                  background: "images/supply_station_street_clean.jpg",
                  sprite: "images/lingling_frustrated.png", // Reuse
                  nextId: "ch6_men_in_black_appear"
              },
              'ch6_men_in_black_appear': {
                  character: "旁白",
                  text: "街道对面，一扇门打开，两个中年黑衣男性从里面出来走向玲玲。",
                  background: "images/supply_station_men_in_black.jpg", // Placeholder: Men in black emerging
                  sprite: null,
                  nextId: "ch6_end"
              },
              'ch6_end': {
                  character: "旁白",
                  text: "（本章完）",
                  background: "images/supply_station_men_in_black.jpg",
                  sprite: null,
                  nextId: "ch7_start" // Link to the next chapter
              },
                // --- CHAPTER 7 START ---
                'ch7_start': {
                    character: "旁白",
                    text: "眼看着两个黑衣人走向自己，玲玲心跳加速，肾上腺素迅速飙升。玲玲头脑里开始飞速的计算。",
                    background: "images/supply_station_men_approaching.jpg", // Placeholder: Men in black approaching Lingling
                    sprite: "images/lingling_nervous.png", // Placeholder
                    nextId: "ch7_lingling_assess_resistance"
                },
                'ch7_lingling_assess_resistance': {
                    character: "旁白",
                    text: "面对两位健硕的男性，动手反抗似乎几乎没有胜算。作为文职人员，虽然也有持续健身和练习搏击，力量和体力的差距恐怕还是无法跨越。",
                    background: "images/supply_station_men_approaching.jpg",
                    sprite: "images/lingling_calculating.png", // Placeholder
                    nextId: "ch7_lingling_assess_escape"
                },
                'ch7_lingling_assess_escape': {
                    character: "旁白",
                    text: "那么立刻跳上RD231逃跑呢？为什么RD231会走错地方？根据基本设计原理和基本计算原理，自动驾驶车辆会走错路的可能性应该接近于零。所以是有人控制和修改了车子的行程么？那么进入车子很有可能根本无法启动。",
                    background: "images/rd231_parked.jpg", // Placeholder: Focus on the parked car
                    sprite: "images/lingling_thinking.png", // Placeholder
                    nextId: "ch7_lingling_assess_motive"
                },
                'ch7_lingling_assess_motive': {
                    character: "旁白",
                    text: "对方是为什么而来？车子中的电子设备古董？这样的话留给他们好了。虽然丧失了探索远古秘密的机会，但是似乎比丧命还是划算很多。",
                    background: "images/rd231_storage_area.jpg", // Placeholder: Show the area where the item is
                    sprite: "images/lingling_decision.png", // Placeholder
                    nextId: "ch7_lingling_calm_down"
                },
                'ch7_lingling_calm_down': {
                    character: "旁白",
                    text: "下定了决心，玲玲镇定下来作出微笑的表情，面对着靠近自己的两位黑衣人。",
                    background: "images/supply_station_men_approaching.jpg",
                    sprite: "images/lingling_composed.png", // Placeholder: Lingling putting on a brave face
                    nextId: "ch7_james_greet"
                },
                'ch7_james_greet': {
                    character: "詹姆斯",
                    text: "“玲玲小姐，欢迎你来到SE452区。“黑衣人中个子较高的一个人伸出手。",
                    background: "images/supply_station_men_close.jpg", // Placeholder: Men are now close
                    sprite: "images/james_speaking.png", // Placeholder: James sprite
                    nextId: "ch7_lingling_no_handshake"
                },
                'ch7_lingling_no_handshake': {
                    character: "玲玲",
                    text: "玲玲并没有握手回应，“非常奇特的欢迎方式，特别是在我并不想来这里的情况下。请问你们需要什么？”",
                    background: "images/supply_station_men_close.jpg",
                    sprite: "images/lingling_speaking_calm.png", // Placeholder
                    nextId: "ch7_james_introduce_car_leave"
                },
                'ch7_james_introduce_car_leave': {
                    character: "詹姆斯",
                    text: "高个子收回自己的手，并不直接回答，“我是詹姆斯，这位是菲奇。” 这时候RD231缓缓启动了，慢速向前驶去，到了街道的尽头，左转，很快就消失在视线之外。",
                    background: "images/rd231_driving_away.jpg", // Placeholder: Car driving away
                    sprite: "images/james_speaking.png",
                    nextId: "ch7_lingling_realize_belongings"
                },
                'ch7_lingling_realize_belongings': {
                    character: "旁白",
                    text: "玲玲突然想起来自己所有的随身物品都在车上，立刻意识到这些人可能并不是只想拿走古董那么简单。",
                    background: "images/supply_station_street.jpg", // Back to street view
                    sprite: "images/lingling_shocked_subtle.png", // Placeholder
                    nextId: "ch7_lingling_accuse_crime"
                },
                'ch7_lingling_accuse_crime': {
                    character: "玲玲",
                    text: "“在自动驾驶车辆已有专属乘客的情况下，切入网络改变行程是一级犯罪。现在当面抢走专属乘客的行李，恐怕可以升级到特级犯罪了。”",
                    background: "images/supply_station_street.jpg",
                    sprite: "images/lingling_accusing.png", // Placeholder
                    nextId: "ch7_james_smile"
                },
                'ch7_james_smile': {
                    character: "詹姆斯",
                    text: "詹姆斯微微一笑，仍然没有正面回答。“玲玲小姐，很不幸我们以这样的方式见面。但是你企图带走你不应该带走的东西。这让我们很头疼。“",
                    background: "images/supply_station_street.jpg",
                    sprite: "images/james_smiling.png", // Placeholder
                    nextId: "ch7_lingling_who_are_you"
                },
                'ch7_lingling_who_are_you': {
                    character: "玲玲",
                    text: "“你们是什么人？作为考古师，我有权利对目标进行彻底调查，然后归还城府。像你们这样犯罪的行事方式，肯定不是政府职员，抢夺政府资源才是不应该的吧。”",
                    background: "images/supply_station_street.jpg",
                    sprite: "images/lingling_questioning.png", // Reuse or new placeholder
                    nextId: "ch7_james_know_emily"
                },
                'ch7_james_know_emily': {
                    character: "詹姆斯",
                    text: "“玲玲小姐并不是仅仅为了考古调查吧，至少玲玲小姐的工作伙伴在想做更多的事情。“",
                    background: "images/supply_station_street.jpg",
                    sprite: "images/james_speaking.png",
                    nextId: "ch7_lingling_panic"
                },
                'ch7_lingling_panic': {
                    character: "旁白",
                    text: "艾米丽！不好，难道他们已经挟持了艾米丽？玲玲突然慌了起来。等等，对方是怎么知道艾米丽的？这就是为什么和艾米丽联系不上的原因么？一连串问题从头脑中飞速流过。",
                    background: "images/supply_station_street.jpg",
                    sprite: "images/lingling_panicked.png", // Placeholder
                    nextId: "ch7_lingling_regain_composure"
                },
                'ch7_lingling_regain_composure': {
                    character: "旁白",
                    text: "冷静冷静。玲玲整理一下思绪。",
                    background: "images/supply_station_street.jpg",
                    sprite: "images/lingling_composing.png", // Placeholder
                    nextId: "ch7_lingling_negotiate_exit"
                },
                'ch7_lingling_negotiate_exit': {
                    character: "玲玲",
                    text: "“不管怎样，现在你们已经拿到了古董。不管我想干什么，也完全没办法了。和政府的工作算是彻底失败了。请把我私人物品还给我吧，我回家就好了。”玲玲希望能全身而退，如果要拯救艾米丽也得自己先脱离困境再说。",
                    background: "images/supply_station_street.jpg",
                    sprite: "images/lingling_pleading.png", // Placeholder
                    nextId: "ch7_james_need_you"
                },
                'ch7_james_need_you': {
                    character: "詹姆斯",
                    text: "“很不幸，玲玲小姐，我们需要你跟我们暂时待在一起。我们需要你联络你的工作伙伴。”詹姆斯说到。",
                    background: "images/supply_station_street.jpg",
                    sprite: "images/james_speaking.png",
                    nextId: "ch7_lingling_relief_captured"
                },
                'ch7_lingling_relief_captured': {
                    character: "旁白",
                    text: "所以艾米丽并没有被挟持。玲玲长舒了一口气。所以其实是自己被绑架了？想到这里，玲玲不由自主的在心里捂了一下脸。",
                    background: "images/supply_station_street.jpg",
                    sprite: "images/lingling_facepalm.png", // Placeholder
                    nextId: "ch7_walk_to_building"
                },
                'ch7_walk_to_building': {
                    character: "旁白",
                    text: "在两个黑衣人左右监护下走向街道的其中一个建筑的时候。",
                    background: "images/supply_station_walking_to_building.jpg", // Placeholder: Walking towards a building with escorts
                    sprite: null,
                    nextId: "ch7_lingling_reorganize_thoughts"
                },
                'ch7_lingling_reorganize_thoughts': {
                    character: "旁白",
                    text: "玲玲重新整理起了自己的思绪。第一，艾米丽并不在他们手中，而且他们暂时无法联系到艾米丽，也暂时无法找到艾米丽。所以他们需要自己作为诱饵。他们为什么无法联系到艾米丽呢？所以艾米丽已经离开了住所么？从离开古董所在的地下室，到自己企图联系艾米丽大约只有一小时。所以在一小时之内，艾米丽那边发生了什么事情？",
                    background: "images/supply_station_building_exterior.jpg", // Placeholder: Exterior of the building they are going to
                    sprite: "images/lingling_thinking_walk.png", // Placeholder
                    nextId: "ch7_lingling_who_are_men"
                },
                'ch7_lingling_who_are_men': {
                    character: "旁白",
                    text: "第二，这些黑衣人到底是谁？从行事方式来看并不像是政府职员。如果是自己违规惊动政府，政府完全可以在租用自动驾驶车的时候或者归还VS300的时候就拦下自己。",
                    background: "images/supply_station_building_exterior.jpg",
                    sprite: "images/lingling_thinking_walk.png",
                    nextId: "ch7_lingling_how_they_know"
                },
                'ch7_lingling_how_they_know': {
                    character: "旁白",
                    text: "第三，这些黑衣人是怎么知道关于这件古董特殊性的事呢？是艾米丽在做调查的时候暴露了不必要的信息么？也许，可是艾米丽应该不会暴露玲玲是一切的源头，没有理由。通过VS300交流的时候被监听了么？VS300走的是军用通信通道，按理说应该是最高级加密。一群可以破译和监控军用通信通道的人。。。厉害。",
                    background: "images/supply_station_building_exterior.jpg",
                    sprite: "images/lingling_thinking_walk.png",
                    nextId: "ch7_james_open_door"
                },
                'ch7_james_open_door': {
                    character: "旁白",
                    text: "平淡无奇的大平房的门被打开，詹姆斯做出请进的手势。",
                    background: "images/supply_station_building_doorway.jpg", // Placeholder: Open door of the building
                    sprite: "images/james_gesturing_in.png", // Placeholder
                    nextId: "ch7_end"
                },
                'ch7_end': {
                    character: "旁白",
                    text: "（本章完）",
                    background: "images/supply_station_building_doorway.jpg",
                    sprite: null,
                    nextId: "chapter8_start" // Link to the next chapter
                }                          
      };        

// You would then integrate this 'storyData' object into your script.js file,
// replacing the example storyData provided earlier.
// Remember to create/find the images and replace the placeholder paths.
// Add 'choices' arrays where you want player interaction.

  // const storyData = {
  //     'start': {
  //         text: "The old library felt heavy with silence. Dust motes danced in the lone shaft of light piercing the gloom.",
  //         background: 'images/library_gloomy.jpg', // *** REPLACE ***
  //         sprite: null,
  //         choices: [
  //             { text: "Examine the central table", nextId: 'examine_table' },
  //             { text: "Check the tall bookshelves", nextId: 'check_shelves' },
  //             { text: "Try the large oak door", nextId: 'try_door' }
  //         ]
  //     },
  //     'examine_table': {
  //         text: "A heavy leather-bound book lies open on the table. The script is ancient and hard to decipher.",
  //         character: "Narrator",
  //         background: 'images/library_table_focus.jpg', // *** REPLACE ***
  //         choices: [
  //             { text: "Attempt to read the book", nextId: 'read_book' },
  //             { text: "Leave it and look elsewhere", nextId: 'start' }
  //         ]
  //     },
  //     'check_shelves': {
  //         text: "Rows upon rows of books stare back, their spines faded. One book seems slightly out of place.",
  //         sprite: 'images/player_curious.png', // *** REPLACE ***
  //         choices: [
  //             { text: "Pull out the unusual book", nextId: 'pull_book' },
  //             { text: "Ignore it and keep searching", nextId: 'check_shelves_continue' }
  //         ]
  //     },
  //     'try_door': {
  //         text: "You push against the heavy oak door. It's firmly locked.",
  //         nextId: 'start' // This now requires Enter/Space to proceed
  //     },
  //     'read_book': {
  //         text: "As you focus on the text, the symbols seem to shimmer. You feel a strange energy... but nothing happens.",
  //         character: "Narrator",
  //         nextId: 'start' // Requires Enter/Space
  //     },
  //     'pull_book': {
  //         text: "With a click, pulling the book reveals a hidden switch!",
  //         sprite: 'images/player_surprised.png', // *** REPLACE ***
  //         background: 'images/library_shelf_switch.jpg', // *** REPLACE ***
  //         choices: [
  //             { text: "Press the switch", nextId: 'press_switch' },
  //             { text: "Leave it alone", nextId: 'check_shelves' }
  //         ]
  //     },
  //     'check_shelves_continue': {
  //         text: "You scan the shelves further but find nothing else of immediate interest.",
  //         sprite: 'images/player_neutral.png', // *** REPLACE ***
  //         nextId: 'start' // Requires Enter/Space
  //     },
  //     'press_switch': {
  //         text: "A low rumbling sound echoes through the library. A section of the bookshelf slides aside, revealing a hidden passage!",
  //         background: 'images/library_secret_passage.jpg', // *** REPLACE ***
  //         sprite: null,
  //         choices: [
  //             { text: "Enter the passage", nextId: 'enter_passage' },
  //             { text: "Stay in the library", nextId: 'start' }
  //         ]
  //     },
  //     'enter_passage': {
  //         text: "You step into the darkness. The path ahead is unknown... (To be continued)",
  //         // End of branch - no nextId, no choices
  //     }
  // };

  // --- Game State ---
  let currentSceneId = 'start';

  // --- Input & Interaction State ---
  let isTyping = false;
  let typewriterTimer = null;
  let currentTextToType = '';
  let currentTextElement = null;
  let currentCompletionCallback = null;

  let expectingAdvanceKey = false; // True if waiting for Enter/Space to advance (no choices)
  let currentChoiceButtons = [];   // Array to hold current choice button elements
  let selectedChoiceIndex = -1;    // Index of the currently selected choice (-1 if none)


  // --- Function to Stop the Typewriter Effect ---
  function stopTypewriter() {
      if (typewriterTimer) {
          clearInterval(typewriterTimer);
          typewriterTimer = null;
      }
      isTyping = false;
  }

  // --- Function to Skip the Typewriter Effect ---
  function skipTypewriter() {
      if (isTyping) {
          stopTypewriter();
          if (currentTextElement && currentTextToType) {
              currentTextElement.innerHTML = currentTextToType;
          }
          if (currentCompletionCallback) {
              currentCompletionCallback();
              currentCompletionCallback = null;
          }
      }
  }

  // --- Function for Typewriter Effect ---
  function typewriterEffect(text, element, speed = 40, onComplete) {
      stopTypewriter();
      currentTextToType = text;
      currentTextElement = element;
      currentCompletionCallback = onComplete;
      element.innerHTML = '';
      let charIndex = 0;
      isTyping = true;

      typewriterTimer = setInterval(() => {
          if (charIndex < text.length) {
              element.innerHTML += text.charAt(charIndex);
              charIndex++;
          } else {
              stopTypewriter();
              if (onComplete) {
                  onComplete();
                  currentCompletionCallback = null;
              }
          }
      }, speed);
  }

  // --- Function to Update Choice Selection Visual ---
  function updateChoiceSelection() {
      currentChoiceButtons.forEach((button, index) => {
          if (index === selectedChoiceIndex) {
              button.classList.add('selected-choice');
              // Optionally manage focus for screen readers, but class might be enough
              // button.focus();
          } else {
              button.classList.remove('selected-choice');
          }
      });
  }

  // --- Function to Show UI After Typing/Skipping ---
  // (Replaces old showChoicesOrNext)
  function showPostTypewriterUI(scene) {
      choicesBox.innerHTML = ''; // Clear placeholders/previous
      currentChoiceButtons = [];
      selectedChoiceIndex = -1;
      expectingAdvanceKey = false; // Reset flag

      if (scene.choices && scene.choices.length > 0) {
          // Create Choice Buttons
          scene.choices.forEach((choice, index) => {
              const button = document.createElement('button');
              button.textContent = choice.text;

              // Store button reference
              currentChoiceButtons.push(button);

              // Add click listener for mouse interaction
              button.addEventListener('click', () => {
                  if (isTyping) skipTypewriter(); // Ensure text finishes if clicked early
                  handleChoice(choice.nextId);
              });

               // Add listener to update selection visual on mouse hover
              button.addEventListener('mouseenter', () => {
                  selectedChoiceIndex = index;
                  updateChoiceSelection();
              });


              choicesBox.appendChild(button);
          });

          // Select the first choice by default for keyboard nav
          if (currentChoiceButtons.length > 0) {
              selectedChoiceIndex = 0;
              updateChoiceSelection();
          }

      } else if (scene.nextId) {
          // No choices, but there's a next scene - wait for key press
          expectingAdvanceKey = true;
          // No "Next" button needed here
      } else {
          // End of a branch
          const endMessage = document.createElement('p');
          endMessage.textContent = "-- The End --";
          endMessage.style.color = "#aaa";
          endMessage.style.textAlign = "center";
          choicesBox.appendChild(endMessage);
      }
  }

   // --- Function to handle advancing after a choice is made ---
   function handleChoice(nextId) {
       // Reset interaction state before loading next scene
      expectingAdvanceKey = false;
      currentChoiceButtons = [];
      selectedChoiceIndex = -1;
      currentSceneId = nextId;
      displayScene(currentSceneId);
  }


  // --- Core Function to Display a Scene ---
  function displayScene(sceneId) {
      const scene = storyData[sceneId];
      if (!scene) {
          console.error(`Fatal Error: Scene "${sceneId}" does not exist!`);
          dialogueEl.textContent = "Oops! Story error.";
          choicesBox.innerHTML = '';
          stopTypewriter();
          // Reset state even on error
          expectingAdvanceKey = false;
          currentChoiceButtons = [];
          selectedChoiceIndex = -1;
          return;
      }

      // Reset interaction states at the beginning of displaying a scene
      stopTypewriter(); // Stop any previous typing
      choicesBox.innerHTML = ''; // Clear UI elements reliant on previous state
      expectingAdvanceKey = false;
      currentChoiceButtons = [];
      selectedChoiceIndex = -1;

      // Update Character Name, Background, Sprite (as before)
      if (scene.character) {
          characterNameEl.textContent = scene.character;
          characterNameBox.style.display = 'block';
      } else {
          characterNameBox.style.display = 'none';
      }
      if (scene.background) {
           backgroundLayer.style.backgroundImage = `url('${scene.background}')`;
           // Preloading logic removed for brevity, add back if needed
      }
       if (scene.sprite) {
          characterSprite.src = scene.sprite;
          characterLayer.classList.remove('hidden');
          characterSprite.style.display = 'block';
      } else {
          characterLayer.classList.add('hidden');
           // Using timeout matching CSS not strictly necessary if just hiding
           setTimeout(() => { if (characterLayer.classList.contains('hidden')) { characterSprite.style.display = 'none'; } }, 400);
      }


      // Start Typewriter for Dialogue
      // The callback will handle showing choices or setting advance key flag
      typewriterEffect(scene.text, dialogueEl, 40, () => {
           showPostTypewriterUI(scene);
      });
  }

  // --- Global Keyboard Event Listener ---
  document.addEventListener('keydown', (event) => {
      // 1. Handle Skipping Typewriter (Enter or Space)
      if (isTyping && !expectingAdvanceKey && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault(); // Prevent spacebar scrolling or Enter submitting forms (if any)
          skipTypewriter();
          return; // Don't process other actions if skipping
      }

      // 2. Handle Advancing Story (Enter or Space, only when no choices)
      if (!isTyping && expectingAdvanceKey && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault(); // Prevent spacebar scroll
          const scene = storyData[currentSceneId];
          if (scene && scene.nextId) {
               // Reset state before moving on
               expectingAdvanceKey = false;
               currentSceneId = scene.nextId;
               displayScene(currentSceneId);
          }
          return; // Action handled
      }

      // 3. Handle Choice Navigation (Arrows, Enter, Space, only when choices exist)
      if (!isTyping && currentChoiceButtons.length > 0) {
          let handled = false;
          if (event.key === 'ArrowDown') {
              if (selectedChoiceIndex < currentChoiceButtons.length - 1) {
                  selectedChoiceIndex++;
              } else {
                  selectedChoiceIndex = 0; // Wrap around to top
              }
              updateChoiceSelection();
              handled = true;
          } else if (event.key === 'ArrowUp') {
              if (selectedChoiceIndex > 0) {
                  selectedChoiceIndex--;
              } else {
                  selectedChoiceIndex = currentChoiceButtons.length - 1; // Wrap around to bottom
              }
              updateChoiceSelection();
              handled = true;
          } else if ((event.key === 'Enter' || event.key === ' ') && selectedChoiceIndex !== -1) {
              // Simulate click on the selected button
              currentChoiceButtons[selectedChoiceIndex].click();
              handled = true;
          }

          if (handled) {
              event.preventDefault(); // Prevent default arrow key scrolling or space scroll
          }
      }
  });

  // --- Double Click Listener for Skipping --- (Remains the same)
  gameContainer.addEventListener('dblclick', () => {
       if (isTyping) {
           skipTypewriter();
       }
  });


  // --- Start the Game ---
  currentSceneId = 'start'; // Ensure we start at the defined beginning
  displayScene(currentSceneId);

}); // End of DOMContentLoaded listener