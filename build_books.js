// 生成 books.json：3 本经典公版小说的开篇章节，人工高质量中英双语。
// 结构为扁平「章节」条目（kind:'book'），与 articles.json 阅读器渲染兼容（body/bodyCn 段落对齐）。
const fs = require('fs');

const books = [
  {
    id: 'book-pp-ch1',
    kind: 'book',
    bookId: 'pride-and-prejudice',
    bookTitle: 'Pride and Prejudice',
    bookTitleCn: '傲慢与偏见',
    author: 'Jane Austen',
    chapter: 1,
    chapterTitle: 'Chapter 1',
    chapterTitleCn: '第一章',
    source: 'Project Gutenberg',
    category: 'book',
    level: 'IELTS 7.5+',
    license: 'Public Domain（公版）',
    sourceUrl: 'https://www.gutenberg.org/ebooks/1342',
    excerpt: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    excerptCn: '凡是有钱的单身汉，总想娶位太太，这已经成了一条举世公认的真理。',
    readingMin: 5,
    tags: ['经典文学', '英国小说', '爱情'],
    collocations: ['in possession of', 'in want of', 'well fixed', 'at last', 'made no answer', 'in the house'],
    quotes: [
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.'
    ],
    body: [
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
      'However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.',
      '"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"',
      'Mr. Bennet replied that he had not.',
      '"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."',
      'Mr. Bennet made no answer.',
      '"Do you not want to know who has taken it?" cried his wife impatiently.',
      '"You want to tell me, and I have no objection to hearing it."',
      'This was invitation enough.',
      '"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."'
    ],
    bodyCn: [
      '凡是有钱的单身汉，总想娶位太太，这已经成了一条举世公认的真理。',
      '这样的单身汉，每逢新搬到一个地方，四邻八舍虽然完全不了解他的性情如何、见解如何，可是，既然这样一条真理早已在人们心目中根深蒂固，因此人们总是把他看作自己某一个女儿理所应得的一笔财产。',
      '"我的好老爷，"有一天班纳特太太对丈夫说，"尼日斐花园终于租出去了，你听说过没有？"',
      '班纳特先生回答说，他没有听说过。',
      '"的确租出去了，"她说，"朗格太太刚刚上这儿来过，她把这件事的底细，一五一十都告诉我了。"',
      '班纳特先生没有理睬她。',
      '"你难道不想知道是谁租去的吗？"太太不耐烦地嚷了起来。',
      '"既然你非要讲给我听，我听听也无妨。"',
      '这句话足够鼓励她讲下去了。',
      '"嘿，我的好老爷，你得知道，朗格太太说，租下尼日斐花园的是个阔少爷，从英格兰北部来的；他星期一坐着驷马大轿车来看房子，一看就十分中意，马上跟莫里斯先生谈妥了；他要在米迦勒节以前搬进来，下个周末以前他家的几个佣人就要先住进去了。"'
    ]
  },
  {
    id: 'book-t2c-ch1',
    kind: 'book',
    bookId: 'a-tale-of-two-cities',
    bookTitle: 'A Tale of Two Cities',
    bookTitleCn: '双城记',
    author: 'Charles Dickens',
    chapter: 1,
    chapterTitle: 'Chapter 1 — The Period',
    chapterTitleCn: '第一章 · 时代',
    source: 'Project Gutenberg',
    category: 'book',
    level: 'IELTS 7.5+',
    license: 'Public Domain（公版）',
    sourceUrl: 'https://www.gutenberg.org/ebooks/98',
    excerpt: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness…',
    excerptCn: '那是最美好的时代，那是最糟糕的时代；那是智慧的年头，那是愚昧的年头……',
    readingMin: 6,
    tags: ['经典文学', '英国小说', '历史'],
    collocations: ['the age of', 'the epoch of', 'direct to', 'in short', 'in the superlative degree', 'for good or for evil'],
    quotes: [
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.'
    ],
    body: [
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way—in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.',
      'There were a king with a large jaw and a queen with a plain face, on the throne of England; there were a king with a large jaw and a queen with a fair face, on the throne of France.',
      'In both countries it was clearer than crystal to the lords of the State preserves of loaves and fishes, that things in general were settled for ever.',
      'It was the year of Our Lord one thousand seven hundred and seventy-five.',
      'Spiritual revelations were conceded to England at that favoured period, as at this.',
      'Mrs. Southcott had recently attained her five-and-twentieth blessed birthday, of whom a prophetic private in the Life Guards had heralded the sublime appearance by announcing that arrangements were made for the swallowing up of London and Westminster.'
    ],
    bodyCn: [
      '那是最美好的时代，那是最糟糕的时代；那是智慧的年头，那是愚昧的年头；那是信仰的时期，那是怀疑的时期；那是光明的季节，那是黑暗的季节；那是希望的春天，那是失望的冬天；我们拥有一切，我们一无所有；我们全都在直奔天堂，我们全都在直奔相反的方向——简而言之，那时跟现在非常相像，某些最喧嚣的权威坚持要用形容词的最高级来形容它。说它好，是最高级的；说它不好，也是最高级的。',
      '那时的英格兰宝座上，坐着一位大下巴的国王，配着一位相貌平庸的王后；那时的法兰西宝座上，也坐着一位大下巴的国王，配着一位容貌姣好的王后。',
      '在这两个国家里，对于那些把持着面包和鱼的达官显贵们来说，天下大势比水晶还要明白，一切都已永远安定。',
      '那一年是主历一千七百七十五年。',
      '在那个得天独厚的时期，正如现在一样，英格兰经常得到种种神启。',
      '索斯科特太太刚刚过完她那蒙福的二十五岁生日，一位在近卫军中当差的预言家便已宣告了她的庄严现身——他宣称，吞没伦敦和威斯敏斯特的安排已经就绪。'
    ]
  },
  {
    id: 'book-je-ch1',
    kind: 'book',
    bookId: 'jane-eyre',
    bookTitle: 'Jane Eyre',
    bookTitleCn: '简·爱',
    author: 'Charlotte Brontë',
    chapter: 1,
    chapterTitle: 'Chapter 1',
    chapterTitleCn: '第一章',
    source: 'Project Gutenberg',
    category: 'book',
    level: 'IELTS 7.5+',
    license: 'Public Domain（公版）',
    sourceUrl: 'https://www.gutenberg.org/ebooks/1260',
    excerpt: 'There was no possibility of taking a walk that day.',
    excerptCn: '那天，出去散步是不可能了。',
    readingMin: 6,
    tags: ['经典文学', '英国小说', '成长'],
    collocations: ['no possibility of', 'in the morning', 'out of the question', 'glad of it', 'dreadful to me', 'the coming home'],
    quotes: [
      'There was no possibility of taking a walk that day.'
    ],
    body: [
      'There was no possibility of taking a walk that day. We had been wandering, indeed, in the leafless shrubbery an hour in the morning; but since dinner (Mrs. Reed, when there was no company, dined early) the cold winter wind had brought with it clouds so sombre, and a rain so penetrating, that further out-door exercise was now out of the question.',
      'I was glad of it: I never liked long walks, especially on chilly afternoons: dreadful to me was the coming home in the raw twilight, with nipped fingers and toes, and a heart saddened by the chidings of Bessie, the nurse, and humbled by the consciousness of my physical inferiority to Eliza, John, and Georgiana Reed.',
      'The said Eliza, John, and Georgiana were now clustered round their mama in the drawing-room: she lay reclined on a sofa by the fireside, and with her darlings about her (for the time neither quarrelling nor crying) looked perfectly happy.',
      'Me, she had dispensed from joining the group; saying, "She regretted to be under the necessity of keeping me at a distance; but that until she heard from Bessie, and could discover by her own observation, that I was endeavouring in good earnest to acquire a more sociable and childlike disposition, a more attractive and sprightly manner—something lighter, franker, more natural, as it were—she really must exclude me from privileges intended only for contented, happy, little children."',
      '"What does Bessie say I have done?" I asked.',
      '"Jane, I don\'t like cavillers or questioners; besides, there is something truly forbidding in a child taking up her elders in that manner. Be seated somewhere; and until you can speak pleasantly, remain silent."'
    ],
    bodyCn: [
      '那天，出去散步是不可能了。其实，早上我们还在光秃秃的灌木林中溜达了一个小时；但从午饭时起（无客造访时，里德太太很早就用午饭），便刮起了冬日凛冽的寒风，随后阴云密布，大雨滂沱，室外的活动也就只能作罢了。',
      '我倒是求之不得。我向来不喜欢远距离散步，尤其在冷飕飕的下午。试想，阴冷的薄暮时分回到家里，手脚都冻僵了，还要受到保姆贝茜的数落，又自觉体格不如伊丽莎、约翰和乔治亚娜，心里既难过又惭愧，那情形委实可怕。',
      '此刻，伊丽莎、约翰和乔治亚娜正在客厅里簇拥着他们的妈妈。她斜倚在炉边的沙发上，身旁坐着自己的小宝贝们（眼下既不争吵，也不哭闹），看上去十分快活。',
      '至于我，她免去我加入这个圈子的资格，她说："她不得不把我隔开，感到十分遗憾；但是，除非她从贝茜那里听说，并且亲眼看见，我在认真努力地养成一种更加随和、更加孩子气的性情，一种更加活泼可爱、更加亲切自然的举止——总之，更轻快、更坦率、更自然一些——否则，她只好把我排除在那些专为心满意足、快快乐乐的小孩子们准备的特权之外。"',
      '"贝茜说我做了什么？"我问道。',
      '"简，我不喜欢吹毛求疵或者刨根问底的人；再说，一个孩子这样顶撞长辈，确实让人厌恶。找个地方坐下，在你学会好好说话之前，就保持安静吧。"'
    ]
  }
];

fs.writeFileSync('books.json', JSON.stringify(books, null, 2), 'utf8');
console.log('books.json 生成完成：', books.length, '本书 / 章节');
books.forEach(b => console.log(' -', b.bookTitleCn, '《' + b.bookTitle + '》', b.body.length + '段'));
