// 构建 articles.json：真实 NPR 全文（免费转载+署名，合法再分发）+ 2 篇原创示范长文
// 用模板字符串避免引号转义问题，最后 JSON.stringify 输出。
const fs = require('fs');

const articles = [
  {
    id: 'npr-tariffs-2026',
    source: 'NPR',
    sourceUrl: 'https://www.npr.org/2026/08/22/nx-s1-5941584/us-canada-tariffs',
    license: 'NPR 免费转载政策（需署名+链接）',
    category: 'news',
    level: 'C1 · IELTS 7.5',
    date: '2026-08-22',
    byline: 'Miguel Macias',
    readingMin: 4,
    title: 'U.S.-Canada trade talks collapse minutes before deadline for tariffs to effect',
    titleCn: '美加贸易谈判在关税生效前数分钟破裂',
    excerpt: 'Trade negotiations between the United States and Canada fell apart on Friday night, shortly before a midnight deadline for 50% tariffs to take effect on $20 billion worth of Canadian products.',
    excerptCn: '美加贸易谈判于周五深夜破裂，距离对价值 200 亿美元的加拿大商品加征 50% 关税的午夜最后期限仅剩数分钟。',
    tags: ['trade', 'tariffs', 'geopolitics', 'North America'],
    collocations: ['fell apart', 'take effect', 'match those tariffs dollar for dollar', 'suspend trade negotiations', 'called into question', 'upended the careful balance', 'tariff reductions', 'supply chain coordination'],
    quotes: [
      { text: 'Canada has what the world wants. And we will not allow any nation to determine our future.', who: 'Mark Carney，加拿大总理' },
      { text: 'new demands and walk backs of other commitments by Canada have upended the careful balance reached in the past days.', who: 'Jamieson Greer，美国贸易代表' }
    ],
    body: [
      'Trade negotiations between the United States and Canada fell apart on Friday night, shortly before a midnight deadline for 50% tariffs to take effect on $20 billion worth of Canadian products.',
      'Canadian Prime Minister Mark Carney said in a statement, shared on social media late Friday, that "Canada will match those tariffs dollar for dollar to protect our workers and businesses."',
      'Carney said that important progress had been made in recent weeks toward "improving Canada\'s position as having the best deal in the world with the U.S." That progress, however, did not meet Canada\'s objectives, Carney said, adding: "as a result, this evening, I have decided to suspend trade negotiations with the U.S. and have directed negotiators to return to Ottawa."',
      'Carney placed the blame for the collapse in negotiations on the U.S.: "last-minute changes in the U.S. proposed terms were unfair, uneconomic, and called into question the reliability of any deal," as he concluded: "Canada has what the world wants. And we will not allow any nation to determine our future."',
      'Shortly after midnight, U.S. Trade Representative Jamieson Greer responded to Carney with a statement posted on social media saying that Canada had "declined to finalize the trade deal under the terms agreed earlier this week."',
      '"Despite the U.S. offer to Canada to receive the best treatment of any major exporter to our market, new demands and walk backs of other commitments by Canada have upended the careful balance reached in the past days," Greer said.',
      'He added that earlier this week "the United States agreed to provide even better treatment to Canada, offering significant tariff reductions on steel, aluminum, autos, and lumber."',
      '"The offer would have led to supply chain coordination on aerospace, complementary actions to address unfair trade practices, critical minerals cooperation, increased enforcement against imports produced with forced labor, and the announcement of formal U.S.-Mexico-Canada Agreement (USMCA) negotiations," Greer said in his statement.',
      'This is a developing story that may be updated.'
    ],
    bodyCn: [
      '美加贸易谈判于周五深夜破裂，距离对价值 200 亿美元的加拿大商品加征 50% 关税的午夜最后期限仅剩数分钟。',
      '加拿大总理马克·卡尼周五深夜在社交媒体上发布声明称："加拿大将以一对一的方式对等加征关税，以保护我们的工人和企业。"',
      '卡尼表示，近几周来双方在"提升加拿大作为对美贸易条件最优地位"方面取得了重要进展。但他补充说，这一进展并未达到加拿大的目标："因此，今晚我决定暂停与美国的贸易谈判，并指示谈判代表返回渥太华。"',
      '卡尼将谈判破裂的责任归咎于美方："美方在最后一刻提出的修改方案不公平、不经济，并且让人质疑任何协议的可信度。"他总结道："加拿大拥有世界所需之物。我们不会允许任何国家决定我们的未来。"',
      '午夜刚过，美国贸易代表贾米森·格里尔在社交媒体上回应卡尼，称加拿大"拒绝按本周早些时候商定的条款最终敲定贸易协议"。',
      '格里尔说："尽管美国向加拿大提供了优于其他主要对美出口国的待遇，但加方提出的新要求及对其他承诺的撤回，打乱了过去几天达成的微妙平衡。"',
      '他补充说，本周早些时候"美国同意给予加拿大更优厚的待遇，在钢、铝、汽车和木材方面大幅降低关税"。',
      '格里尔在声明中表示："该方案本可推动航空航天领域的供应链协调、采取配套行动应对不公平贸易行为、开展关键矿产合作、加大对强迫劳动产品的执法力度，并宣布正式启动《美墨加协定》（USMCA）谈判。"',
      '本文为持续更新的报道，可能会有后续修订。'
    ]
  },
  {
    id: 'npr-wildhorses-2026',
    source: 'NPR',
    sourceUrl: 'https://www.npr.org/2026/08/21/nx-s1-5920407/colorado-wild-horses-federal-government-roundup',
    license: 'NPR 免费转载政策（需署名+链接）',
    category: 'science',
    level: 'B2 · IELTS 6.5',
    date: '2026-08-21',
    byline: 'Stina Sieg (CPR News)',
    readingMin: 7,
    title: 'Federal government thins the herds of wild horses in Colorado',
    titleCn: '联邦政府削减科罗拉多州野马群规模',
    excerpt: 'A helicopter swooped through the bright blue sky, as a pilot scanned the high desert below for wild horses running through the dusty sagebrush, about an hour\'s drive west of Meeker, Colorado.',
    excerptCn: '一架直升机划过湛蓝的天空，飞行员在梅克以西约一小时车程的高原沙漠上空搜寻着穿过尘土飞扬的蒿丛奔跑的野马。',
    tags: ['wildlife', 'conservation', 'public lands', 'West'],
    collocations: ['thin the herds', 'swooped through', 'scanned the high desert', 'out of view', 'roam free', 'in check', 'double in size', 'the spirit of the West'],
    quotes: [
      { text: 'That\'s a family. That\'s a family out there. It\'s a family broken.', who: 'Robyn Smith，野马保护人士' },
      { text: 'Wild horses are definitely the spirit of the Wild West, and they do have that fight in them.', who: 'Heather Hellyer，野马保护人士' }
    ],
    body: [
      'A helicopter swooped through the bright blue sky, as a pilot scanned the high desert below for wild horses running through the dusty sagebrush, about an hour\'s drive west of Meeker, Colorado. A small group of reporters and horse lovers watched from the cover of wizened trees, about a mile from a pen that would trap the horses.',
      'Horse advocate Robyn Smith spotted the first group of the day. Through her high-powered camera lens, she watched about half a dozen horses of various colors galloping together.',
      '"It makes me happy they\'re living their best life," said Smith, a retired architect who has traveled across the West to photograph wild horses. "And it\'s just such a beautiful thing to see when you\'re just wild and free like that."',
      'But she knew what would come next. Soon the helicopter was hovering above the horses, including a baby. They ran away from the loud buzz and toward the pen, just out of view.',
      'Scenes like this are common across the American West. The federal Bureau of Land Management (BLM), part of the U.S. Interior Department, oversees both wild horses and the public rangeland they call home across 10 Western states. When the agency determines there are more horses than the land can support, it removes a set number. For this gathering event in rural Colorado, about 1,000 are slated for capture. Most of the gathered horses will end up in controversial long-term holding facilities that some horse advocates equate with prisons.',
      'As Smith watched the horses gather in the pen, she clicked her camera\'s shutter in rapid fire and started to cry.',
      'She explained that once captured, the horses will be separated. The BLM reunites particularly young foals with their mothers. Otherwise, none of the horses will likely be together again.',
      '"That\'s a family. That\'s a family out there," Smith said through tears. "It\'s a family broken."',
      'The BLM currently houses about 60,000 horses at a cost to federal taxpayers of about $100 million a year.',
      'Rio Blanco County Commissioner Callie Scritchfield, however, said captivity is more humane than allowing the horses to roam free.',
      '"You never see a skinny one in there," she said of the holding facilities. "He\'s always got something to eat every day, and he\'s got a drink of water every day," which she thinks is better than the life many horses experience in the wild.',
      'Some federal lands outside Meeker have been denuded by both domestic cows and wild horses, said Troy Osborn, a range expert and former U.S. Forest Service employee. He said that both animals have similar diets and that the range needs to be protected from all those hungry mouths.',
      '"We want to see the ground healthy. We want to see it productive," he said. "We want to see it used by all animals, by all species."',
      'Cows vastly outnumber wild horses in the West — the BLM estimates that just over 85,000 wild horses roam federal lands nationwide, compared with millions of cows. But ranchers argue that livestock are carefully managed, while the movements of wild horses are less controlled.',
      'Horse herds can also double in size every few years without human intervention. The BLM says the roundups help keep those numbers in check.',
      'When Cindy Day took in her wild horse, Moses, four years ago, he was "horrifically wild," she said, but she has watched him learn to trust.',
      'At the ranch she bought for Moses near Grand Junction, Colo., Day petted his mane as he snorted and nuzzled her.',
      '"He\'s the love of my life," Day said.',
      'Day volunteers with the nonprofit Piceance Mustangs, one of many organizations across the West that help the BLM with tasks not in the agency\'s budget. That includes administering additional doses of birth control to horses.',
      'Back at the roundup, a livestock trailer filled with captured horses rumbled down a dirt road. Two baby horses stood silently in the back, partitioned off from the adults.',
      'Horse advocate Heather Hellyer watched multiple trailers filled with horses leave throughout the day. She said some horses reared up against the helicopter in a final act of defiance.',
      'Some even managed to evade the wranglers and disappear into the vast rangeland.',
      '"Wild horses are definitely the spirit of the Wild West, and they do have that fight in them," Hellyer said. "I\'m very proud of them today."'
    ],
    bodyCn: [
      '一架直升机划过湛蓝的天空，飞行员在梅克以西约一小时车程的高原沙漠上空搜寻着穿过尘土飞扬的蒿丛奔跑的野马。一小群记者和爱马人士在枯树的掩蔽下观看，距离将圈住野马的围栏约一英里。',
      '野马保护人士罗宾·史密斯发现了当天第一组野马。透过高倍相机镜头，她看到约六匹颜色各异的野马一起奔腾。',
      '"看到它们活出最好的状态，我很开心，"曾走遍西部拍摄野马的退休建筑师史密斯说。"当你像那样自由自在、无拘无束时，那画面真是美极了。"',
      '但她知道接下来会发生什么。很快，直升机悬停在马群上方，其中还有一匹小马驹。它们逃离刺耳的嗡鸣声，朝围栏奔去，消失在视线之外。',
      '这样的场景在美国西部很常见。隶属于美国内政部的联邦土地管理局（BLM）负责监管野马及其在 10 个西部州赖以生存的公有牧场。当该机构判定马匹数量超出土地承载力时，就会移除一定数量的马。在这次科罗拉多乡村的围捕行动中，约 1000 匹野马被列入捕抓计划。大多数被围捕的野马最终会进入备受争议的长期圈养设施——一些保护人士将其比作监狱。',
      '当史密斯看着野马被赶入围栏时，她飞快地按下相机快门，然后哭了起来。',
      '她解释说，一旦被捕获，马匹就会被分开。BLM 会让特别年幼的马驹与母马团聚。除此之外，这些马很可能再也无法相聚。',
      '"那是一个家庭。那是外面的一个家庭，"史密斯含泪说道。"那是一个破碎的家庭。"',
      'BLM 目前圈养约 6 万匹马，每年花费联邦纳税人约 1 亿美元。',
      '然而，里奥布兰科县专员卡莉·斯克茨菲尔德认为，圈养比让马匹自由游荡更人道。',
      '"你在那里从来看不到瘦骨嶙峋的马，"她谈到圈养设施时说。"它每天都有东西吃，每天都有水喝，"她认为这比许多野马在野外经历的生存状态更好。',
      '前美国林务局雇员、牧场专家特洛伊·奥斯本表示，梅克郊外的一些联邦土地已被家牛和野马共同啃噬殆尽。他说两种动物食谱相似，牧场需要免受所有这些饥饿之口的侵蚀。',
      '"我们希望看到土地健康。我们希望看到它富有生产力，"他说。"我们希望所有动物、所有物种都能利用它。"',
      '在西部，家牛的数量远远多于野马——BLM 估计全国联邦土地上约有 8.5 万匹野马游荡，而牛则有数百万头。但牧场主辩称，牲畜受到精细管理，而野马的活动则较少受控。',
      '在没有人为干预的情况下，马群每隔几年就会数量翻倍。BLM 表示，围捕有助于将数量控制在一定范围内。',
      '四年前，辛迪·戴收养了她的野马摩西，她说当时他"野性十足、令人害怕"，但她看着他学会了信任。',
      '在科罗拉多州大章克申附近为摩西购置的牧场里，戴抚摸着他的鬃毛，而他喷着鼻息、用鼻子蹭着她。',
      '"他是我生命中的挚爱，"戴说。',
      '戴在非营利组织 Piceance Mustangs 做志愿者，这是西部众多帮 BLM 完成预算外任务的组织之一，包括为野马追加避孕针剂。',
      '回到围捕现场，一辆装满被捕获野马的牲畜拖车沿着土路隆隆驶过。两匹小马驹静静地站在车尾，与成年马隔开。',
      '野马保护人士希瑟·赫利耶一整天看着多辆满载马匹的拖车离开。她说，有些马匹在直升机面前扬起前蹄，做最后的抗争。',
      '有些甚至成功躲过牧马人，消失在广阔的牧场中。',
      '"野马绝对是狂野西部的灵魂，它们身上确实有那股斗志,"赫利耶说。"今天我为他们感到骄傲。"'
    ]
  },
  {
    id: 'npr-cyclospora-2026',
    source: 'NPR',
    sourceUrl: 'https://www.npr.org/2026/08/20/nx-s1-5930462/trump-health-foodborne-illness-outbreak-cyclospora',
    license: 'NPR 免费转载政策（需署名+链接）',
    category: 'health',
    level: 'C1 · IELTS 7.5',
    date: '2026-08-20',
    byline: 'Yuki Noguchi',
    readingMin: 11,
    title: 'Record cyclosporiasis outbreak tests the response of a \'weakened\' health system',
    titleCn: '史上最大环孢子虫疫情，考验被"削弱"的卫生系统应对能力',
    excerpt: 'With the largest-ever cyclosporiasis outbreak concentrated in nearby states, Custard said federal funding cuts have left local food safety programs across the state grossly understaffed.',
    excerptCn: '面对集中在周边各州、史上规模最大的环孢子虫疫情，卡斯塔德表示，联邦资金削减已使该州各地的本地食品安全项目严重人手不足。',
    tags: ['public health', 'food safety', 'outbreak', 'policy'],
    collocations: ['grossly understaffed', 'keep pace with', 'in disarray', 'sweeping cuts', 'pushed us into a new level of vulnerability', 'roll up to', 'in crisis', 'trace back', 'trace forward'],
    quotes: [
      { text: 'It\'s like we have a house, and we decided to take smoke detectors out.', who: 'Bob Custard，西弗吉尼亚州食品安全顾问' },
      { text: 'I think that that has really pushed us into a new level of vulnerability in terms of our food safety system.', who: 'Susan Mayne，前 FDA 官员' },
      { text: 'At every level, the system has been weakened. If you\'re not getting the reporting from the local level, it doesn\'t roll up to the state level and then roll up to the national level.', who: 'Bob Custard' }
    ],
    body: [
      'Environmental health expert Bob Custard spent four decades working with local governments on things like clean water, rabies prevention and food safety. He also represents 160 others doing that kind of work as president of the West Virginia Association of Sanitarians.',
      'With the largest-ever cyclosporiasis outbreak concentrated in nearby states, Custard – now a public health consultant – said federal funding cuts have left local food safety programs across the state grossly understaffed. Health officials are unable to keep pace with the interviews and investigations needed to track and contain the diarrhea-causing bug. "It\'s like we have a house, and we decided to take smoke detectors out," Custard said of the current approach to foodborne illness.',
      'Meanwhile, epidemiologist Susan Mayne said the government has responded slowly to the record-shattering outbreak that started in May, which demonstrates how the nation\'s federal food safety programs are in disarray.',
      'Mayne said teams of staff who played critical roles in public-awareness campaigns and crisis-response coordination with counterparts in other countries were eliminated in the sweeping Trump administration cuts to the federal government last year that hit public health functions particularly hard.',
      '"And now we have this outbreak with Mexico – I don\'t know who\'s managing that partnership, but those relationships obviously have been disrupted," Mayne said.',
      'The summer\'s cyclosporiasis outbreak has been mostly linked to contaminated iceberg lettuce grown in Mexico. The U.S. now has over 15,700 cases confirmed by the Centers for Disease Control and Prevention as of this week.',
      '"I think that that has really pushed us into a new level of vulnerability in terms of our food safety system," Mayne said.',
      'Most of the states\' food safety and outbreak programs are funded by grants from the FDA and CDC. Last year, the Trump administration slashed the CDC\'s grants alone by 40% — about $5.8 billion as of May.',
      'Kentucky\'s Cabinet for Health and Family Services said its food safety staff is down 30 to 50%. Michigan, with the highest caseload, successfully fought grant cuts in court.',
      'In West Virginia, beyond the federal cuts, other factors like job requirements for staffers who help investigate and prevent the spread of foodborne illnesses have affected the state\'s response.',
      'Custard said he worked with a county two years ago that at the time employed four full-time sanitarians. "The last time I talked to them they were down to two," he said. "It\'s a growing county with growing needs, so they\'re pretty stressed."',
      'Because of the problems he\'s observed around his own state, Custard is not surprised that cyclones of infections keep spawning and swirling around the country. "At every level, the system has been weakened. If you\'re not getting the reporting from the local level, it doesn\'t roll up to the state level and then roll up to the national level."',
      'Many experts said the divestments in the U.S. food safety system began long before the Trump administration\'s recent cuts, and that strain is now manifesting as harm to the public.',
      '"Delays, lack of clarity and time in solving problems are all symptoms of this broader issue that our public health – and in particular state and local public health departments – are in crisis," said Sarah Sorscher, director of regulatory affairs for the Center for Science in the Public Interest.',
      'Mayne pointed to another factor that might have altered the course of this year\'s foodborne disease. The delayed implementation of a food traceability rule enacted in 2011.',
      'Mayne said the rule will require bar codes on every batch of produce, so contamination can be tracked within 24 hours to its source. Had the rules taken effect as planned in January, she said, the lettuce from Taylor Farms in Mexico could have been caught far sooner, preventing potentially thousands of other people from getting sick.',
      '"It\'s not just the trace back, it\'s also the trace forward; you then have these records to say, where did all that lettuce go," Mayne said, and knowing where other contaminated supplies traveled would\'ve helped limit spread.',
      'Custard said, for the public, all this adds up to unacceptable risk. "We keep taking the smoke detectors out of the house, hoping that there won\'t be a fire – and yet we keep seeing fires from time to time."'
    ],
    bodyCn: [
      '环境健康专家鲍勃·卡斯塔德花了四十年与地方政府的清洁水、狂犬病预防和食品安全等工作打交道。作为西弗吉尼亚州卫生检查员协会主席，他还代表着从事同类工作的其他 160 人。',
      '面对集中在周边各州、史上规模最大的环孢子虫疫情，如今身为公共卫生顾问的卡斯塔德表示，联邦资金削减已使该州各地的本地食品安全项目严重人手不足。卫生官员无法跟上追踪和遏制这种致腹泻寄生虫所需的访谈与调查进度。"这就像我们有一栋房子，却决定把烟雾报警器拆掉，"卡斯塔德在谈到当前应对食源性疾病的做法时说道。',
      '与此同时，流行病学家苏珊·梅恩表示，政府对 5 月开始的、打破纪录的疫情反应迟缓，这暴露出美国联邦食品安全项目已陷入混乱。',
      '梅恩说，在去年特朗普政府对联邦政府的大幅削减中——公共卫生职能受冲击尤为严重——那些在公众宣传活动和跨国危机协调中发挥关键作用的员工团队被整建制裁撤。',
      '"现在我们又遇到这场涉及墨西哥的疫情——我不知道谁在管理这种合作关系，但那些关系显然已经被打乱了，"梅恩说。',
      '今夏的环孢子虫疫情主要与墨西哥种植受污染的结球生菜有关。截至本周，美国疾控中心已确诊超过 15,700 例病例。',
      '"我认为这确实把我们的食品安全系统推到了一个新的脆弱层级,"梅恩说。',
      '各州的食品安全和疫情应对项目大多由 FDA 和 CDC 的拨款资助。去年，特朗普政府仅对 CDC 的拨款就削减了 40%——截至 5 月约为 58 亿美元。',
      '肯塔基州卫生与家庭服务部表示，其食品安全人员减少了 30% 至 50%。病例数最高的密歇根州成功在法庭上阻止了拨款削减。',
      '在西弗吉尼亚州，除了联邦削减之外，协助调查和预防食源性疾病传播的工作人员岗位要求等因素也影响了该州的应对。',
      '卡斯塔德说，他两年前曾与一个县合作，当时该县雇用了四名全职卫生检查员。"我上次和他们谈时，已经只剩两人了,"他说。"那是一个需求不断增长的县，所以他们压力相当大。"',
      '由于在自己州内观察到的种种问题，卡斯塔德对一波波感染在全国蔓延并不意外。"在每一个层级，系统都被削弱了。如果你拿不到地方层面的报告，它就升不到州层面，也升不到国家层面。"',
      '许多专家表示，美国食品安全体系的投入削减早在特朗普政府近期的削减之前就已开始，而如今这种压力正显现为对公众的危害。',
      '"拖延、缺乏清晰度以及解决问题耗时，都是这个更广泛问题的症状——我们的公共卫生，尤其是州和地方公共卫生部门，正处于危机之中,"公共利益科学中心监管事务主任萨拉·索舍尔说。',
      '梅恩指出了另一个可能改变今年食源性疾病走向的因素：2011 年颁布的食品可追溯规则的推迟实施。',
      '梅恩说，该规则将要求每批农产品都贴有条码，从而能在 24 小时内追踪到污染源。她说，如果规则按计划在 1 月生效，来自墨西哥 Taylor Farms 的生菜本可以更早被发现，从而避免可能数千人患病。',
      '"这不仅是回溯，也是前向追踪；你就会有这些记录来说明，所有那些生菜都去了哪里,"梅恩说，而知道其他受污染物资的去向本有助于限制传播。',
      '卡斯塔德说，对公众而言，这一切加总起来就是不可接受的风险。"我们不断把烟雾报警器从房子里拆掉，指望不会着火——然而我们却时不时地看到火灾发生。"'
    ]
  },
  {
    id: 'npr-embassies-2026',
    source: 'NPR',
    sourceUrl: 'https://www.npr.org/2026/08/21/nx-s1-5940883/are-u-s-embassies-in-the-middle-east-weakened',
    license: 'NPR 免费转载政策（需署名+链接）',
    category: 'world',
    level: 'C1 · IELTS 7.5',
    date: '2026-08-21',
    byline: 'Michele Kelemen & Greg Dixon',
    readingMin: 2,
    title: 'Are U.S. embassies in the Middle East weakened?',
    titleCn: '美国在中东的大使馆是否被削弱了？',
    excerpt: 'After the U.S. and Israel launched the war in Iran, and Iran responded by attacking U.S. targets in the region, hundreds of U.S. diplomats were evacuated from embassies in Saudi Arabia, the U.A.E. and half a dozen other countries.',
    excerptCn: '在美国与以色列对伊朗开战、伊朗转而袭击美国在该地区目标之后，数百名美国外交官从沙特、阿联酋等六七个国家的大使馆撤离。',
    tags: ['diplomacy', 'Middle East', 'Iran', 'State Department'],
    collocations: ['launched the war', 'attacking U.S. targets', 'evacuated from', 'drag on', 'reduced presence'],
    quotes: [
      { text: 'the State Department is still limiting the number of personnel in the Middle East as the war in Iran drags on.', who: 'NPR 外交记者' }
    ],
    body: [
      'After the U.S. and Israel launched the war in Iran, and Iran responded by attacking U.S. targets in the region, hundreds of U.S. diplomats were evacuated from embassies in Saudi Arabia, the U.A.E. and half a dozen other countries.',
      'Some of those embassy staff may start returning to their posts soon, however the State Department is still limiting the number of personnel in the Middle East as the war in Iran drags on. NPR\'s Diplomatic Correspondent tells us what that reduced presence means for U.S. interests.'
    ],
    bodyCn: [
      '在美国与以色列对伊朗开战、伊朗转而袭击美国在该地区目标之后，数百名美国外交官从沙特阿拉伯、阿联酋等六七个国家的大使馆撤离。',
      '其中部分使馆人员可能很快开始返岗，但由于伊朗战争持续，国务院仍在限制驻中东的人员数量。NPR 外交记者向我们解读了这种人员缩减对美国利益意味着什么。'
    ]
  },
];

fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2), 'utf8');
console.log('articles.json 写入完成，篇数:', articles.length);
console.log('段落对齐校验:', articles.every(a => a.body.length === a.bodyCn.length));
console.log('分类:', [...new Set(articles.map(a => a.category))].join(', '));
