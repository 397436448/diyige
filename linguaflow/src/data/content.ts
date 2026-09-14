/* ============================================
   LinguaFlow Content Data
   Graded courses, vocabulary, grammar, listening
   ============================================ */

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface VocabWord {
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  exampleZh: string;
}

export interface GrammarQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface ListeningItem {
  transcript: string;
  translation: string;
  question: string;
  options: string[];
  answer: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'spelling' | 'grammar' | 'speaking' | 'listening';
  words?: VocabWord[];
  grammar?: GrammarQuestion[];
  listening?: ListeningItem[];
  speaking?: VocabWord[];
  xp: number;
}

export interface CourseLevel {
  level: Level;
  title: string;
  subtitle: string;
  description: string;
  cefr: string;
  color: string;
  lessons: Lesson[];
}

/* ---------- Course Levels ---------- */

export const COURSES: CourseLevel[] = [
  {
    level: 'A1',
    title: 'Beginner',
    subtitle: '入门级',
    description: '掌握基础日常用语,能进行简单问候与自我介绍。',
    cefr: 'CEFR A1 · 初级',
    color: '#4a6cf7',
    lessons: [
      {
        id: 'a1-l1',
        title: 'Greetings & Introductions',
        description: '常见的问候与自我介绍用语',
        type: 'vocabulary',
        xp: 50,
        words: [
          { word: 'Hello', phonetic: '/həˈloʊ/', meaning: '你好', example: 'Hello, my name is Anna.', exampleZh: '你好,我的名字是安娜。' },
          { word: 'Goodbye', phonetic: '/ˌɡʊdˈbaɪ/', meaning: '再见', example: 'Goodbye, see you tomorrow!', exampleZh: '再见,明天见!' },
          { word: 'Thank you', phonetic: '/ˈθæŋk juː/', meaning: '谢谢你', example: 'Thank you for your help.', exampleZh: '谢谢你的帮助。' },
          { word: 'Please', phonetic: '/pliːz/', meaning: '请', example: 'Please sit down.', exampleZh: '请坐。' },
          { word: 'Sorry', phonetic: '/ˈsɒri/', meaning: '对不起', example: 'Sorry, I am late.', exampleZh: '对不起,我迟到了。' },
          { word: 'Name', phonetic: '/neɪm/', meaning: '名字', example: 'What is your name?', exampleZh: '你叫什么名字?' },
          { word: 'Friend', phonetic: '/frend/', meaning: '朋友', example: 'She is my best friend.', exampleZh: '她是我最好的朋友。' },
          { word: 'Welcome', phonetic: '/ˈwelkəm/', meaning: '欢迎', example: 'Welcome to our home!', exampleZh: '欢迎来到我们家!' },
        ],
      },
      {
        id: 'a1-l2',
        title: 'Daily Conversations',
        description: '日常生活中的常用表达',
        type: 'grammar',
        xp: 60,
        grammar: [
          {
            question: 'Choose the correct article: ___ apple',
            options: ['a', 'an', 'the', '—'],
            answer: 1,
            explanation: '在以元音音素开头的单词前使用 "an"。',
          },
          {
            question: 'Complete: I ___ a student.',
            options: ['am', 'is', 'are', 'be'],
            answer: 0,
            explanation: '第一人称单数使用 "am"。',
          },
          {
            question: 'Choose the correct pronoun: ___ is my sister.',
            options: ['He', 'She', 'It', 'They'],
            answer: 1,
            explanation: '指代女性时使用 "She"。',
          },
          {
            question: 'Complete: We ___ happy today.',
            options: ['am', 'is', 'are', 'be'],
            answer: 2,
            explanation: '复数主语 "We" 使用 "are"。',
          },
          {
            question: 'Choose the plural: book → ___',
            options: ['bookes', 'books', 'bookies', 'book'],
            answer: 1,
            explanation: '规则名词复数加 -s。',
          },
        ],
      },
      {
        id: 'a1-l3',
        title: 'Food & Drinks',
        description: '食物与饮品相关词汇',
        type: 'spelling',
        xp: 55,
        words: [
          { word: 'water', phonetic: '/ˈwɔːtər/', meaning: '水', example: 'I drink water every day.', exampleZh: '我每天喝水。' },
          { word: 'bread', phonetic: '/bred/', meaning: '面包', example: 'She bought fresh bread.', exampleZh: '她买了新鲜的面包。' },
          { word: 'coffee', phonetic: '/ˈkɒfi/', meaning: '咖啡', example: 'He likes black coffee.', exampleZh: '他喜欢黑咖啡。' },
          { word: 'apple', phonetic: '/ˈæpəl/', meaning: '苹果', example: 'An apple a day.', exampleZh: '一天一苹果。' },
          { word: 'milk', phonetic: '/mɪlk/', meaning: '牛奶', example: 'The milk is cold.', exampleZh: '牛奶是凉的。' },
        ],
      },
      {
        id: 'a1-l4',
        title: 'Numbers & Time',
        description: '练习数字与时间的发音',
        type: 'speaking',
        xp: 50,
        speaking: [
          { word: 'one', phonetic: '/wʌn/', meaning: '一', example: 'I have one cat.', exampleZh: '我有一只猫。' },
          { word: 'twelve', phonetic: '/twelv/', meaning: '十二', example: 'It is twelve oclock.', exampleZh: '现在是十二点。' },
          { word: 'morning', phonetic: '/ˈmɔːrnɪŋ/', meaning: '早上', example: 'Good morning, everyone!', exampleZh: '大家早上好!' },
          { word: 'evening', phonetic: '/ˈiːvnɪŋ/', meaning: '晚上', example: 'See you this evening.', exampleZh: '今晚见。' },
        ],
      },
      {
        id: 'a1-l5',
        title: 'At the Cafe',
        description: 'Listening practice at a cafe',
        type: 'listening',
        xp: 65,
        listening: [
          {
            transcript: 'Hello! What would you like to drink today? I would like a cup of coffee, please. Sure, anything else? No, that is all, thank you.',
            translation: '你好!今天想喝点什么?我想要一杯咖啡。好的,还要别的吗?不用了,谢谢。',
            question: 'What does the customer order?',
            options: ['Tea', 'Coffee', 'Water', 'Juice'],
            answer: 1,
          },
          {
            transcript: 'Excuse me, what time does the cafe close? We close at nine in the evening. Thank you, I will come back later.',
            translation: '打扰一下,咖啡馆几点关门?我们晚上九点关门。谢谢,我晚点再来。',
            question: 'When does the cafe close?',
            options: ['8 PM', '9 PM', '10 PM', '7 PM'],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    level: 'A2',
    title: 'Elementary',
    subtitle: '初级',
    description: '能理解常用句子,讨论日常话题如购物、家庭、工作。',
    cefr: 'CEFR A2 · 初中级',
    color: '#22c55e',
    lessons: [
      {
        id: 'a2-l1',
        title: 'Travel & Transport',
        description: 'Travel vocabulary and phrases',
        type: 'vocabulary',
        xp: 60,
        words: [
          { word: 'Airport', phonetic: '/ˈerpɔːrt/', meaning: '机场', example: 'The airport is very busy today.', exampleZh: '今天机场很繁忙。' },
          { word: 'Ticket', phonetic: '/ˈtɪkɪt/', meaning: '票', example: 'I bought a one-way ticket.', exampleZh: '我买了一张单程票。' },
          { word: 'Luggage', phonetic: '/ˈlʌɡɪdʒ/', meaning: '行李', example: 'My luggage is too heavy.', exampleZh: '我的行李太重了。' },
          { word: 'Passenger', phonetic: '/ˈpæsəndʒər/', meaning: '乘客', example: 'The passengers are boarding.', exampleZh: '乘客们正在登机。' },
          { word: 'Destination', phonetic: '/ˌdestɪˈneɪʃn/', meaning: '目的地', example: 'Paris is our destination.', exampleZh: '巴黎是我们的目的地。' },
          { word: 'Departure', phonetic: '/dɪˈpɑːrtʃər/', meaning: '出发', example: 'The departure is at noon.', exampleZh: '中午出发。' },
        ],
      },
      {
        id: 'a2-l2',
        title: 'Past Tense Grammar',
        description: 'Simple past tense exercises',
        type: 'grammar',
        xp: 70,
        grammar: [
          {
            question: 'Past form of "go": Yesterday I ___ to school.',
            options: ['goed', 'went', 'gone', 'going'],
            answer: 1,
            explanation: '"Go" is irregular: go → went → gone.',
          },
          {
            question: 'Past form of "eat": She ___ pizza for lunch.',
            options: ['eated', 'ate', 'eaten', 'eating'],
            answer: 1,
            explanation: '"Eat" is irregular: eat → ate → eaten.',
          },
          {
            question: 'Choose the negative past: He ___ play football.',
            options: ["didn't played", "didn't play", "not played", "don't play"],
            answer: 1,
            explanation: 'Negative past: did + not + base verb.',
          },
          {
            question: 'Question form: ___ you see the film?',
            options: ['Did', 'Do', 'Was', 'Were'],
            answer: 0,
            explanation: 'Past questions use "Did" + base verb.',
          },
        ],
      },
      {
        id: 'a2-l3',
        title: 'Daily Routine Words',
        description: 'Spell words about daily activities',
        type: 'spelling',
        xp: 60,
        words: [
          { word: 'morning', phonetic: '/ˈmɔːrnɪŋ/', meaning: '早晨', example: 'I run every morning.', exampleZh: '我每天早晨跑步。' },
          { word: 'breakfast', phonetic: '/ˈbrekfəst/', meaning: '早餐', example: 'Breakfast is ready.', exampleZh: '早餐准备好了。' },
          { word: 'computer', phonetic: '/kəmˈpjuːtər/', meaning: '电脑', example: 'My computer is new.', exampleZh: '我的电脑是新的。' },
          { word: 'evening', phonetic: '/ˈiːvnɪŋ/', meaning: '傍晚', example: 'We meet every evening.', exampleZh: '我们每天傍晚见面。' },
        ],
      },
      {
        id: 'a2-l4',
        title: 'Directions Speaking',
        description: 'Practice asking for and giving directions',
        type: 'speaking',
        xp: 60,
        speaking: [
          { word: 'left', phonetic: '/left/', meaning: '左', example: 'Turn left at the corner.', exampleZh: '在拐角处左转。' },
          { word: 'right', phonetic: '/raɪt/', meaning: '右', example: 'The bank is on your right.', exampleZh: '银行在你的右边。' },
          { word: 'straight', phonetic: '/streɪt/', meaning: '直行', example: 'Go straight ahead.', exampleZh: '直走。' },
          { word: 'corner', phonetic: '/ˈkɔːrnər/', meaning: '拐角', example: 'Meet me at the corner.', exampleZh: '在拐角处见我。' },
        ],
      },
      {
        id: 'a2-l5',
        title: 'Phone Conversation',
        description: 'Listen to a phone call',
        type: 'listening',
        xp: 70,
        listening: [
          {
            transcript: 'Hello, this is Lisa. Is John there? Sorry, he is not home right now. Can I take a message? Yes, please tell him to call me back. Sure, I will let him know.',
            translation: '你好,我是丽莎。约翰在吗?抱歉,他现在不在家。需要留言吗?是的,请告诉他回我电话。好的,我会转告他。',
            question: 'Why does Lisa call?',
            options: ['To invite John', 'To leave a message', 'To sell something', 'To complain'],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    level: 'B1',
    title: 'Intermediate',
    subtitle: '中级',
    description: '能处理旅行中大多数情境,描述经历、计划与观点。',
    cefr: 'CEFR B1 · 中级',
    color: '#f5a623',
    lessons: [
      {
        id: 'b1-l1',
        title: 'Work & Career',
        description: 'Professional vocabulary',
        type: 'vocabulary',
        xp: 75,
        words: [
          { word: 'Deadline', phonetic: '/ˈdedlaɪn/', meaning: '截止日期', example: 'The deadline is next Friday.', exampleZh: '截止日期是下周五。' },
          { word: 'Colleague', phonetic: '/ˈkɒliːɡ/', meaning: '同事', example: 'My colleague helped me a lot.', exampleZh: '我的同事帮了我很多。' },
          { word: 'Schedule', phonetic: '/ˈʃedjuːl/', meaning: '日程', example: 'Check the schedule, please.', exampleZh: '请查看日程。' },
          { word: 'Negotiate', phonetic: '/nɪˈɡoʊʃieɪt/', meaning: '谈判', example: 'We need to negotiate the price.', exampleZh: '我们需要谈判价格。' },
          { word: 'Promotion', phonetic: '/prəˈmoʊʃn/', meaning: '晋升', example: 'She got a promotion last month.', exampleZh: '她上个月升职了。' },
          { word: 'Efficient', phonetic: '/ɪˈfɪʃnt/', meaning: '高效的', example: 'This method is very efficient.', exampleZh: '这个方法很高效。' },
        ],
      },
      {
        id: 'b1-l2',
        title: 'Present Perfect',
        description: 'Present perfect tense grammar',
        type: 'grammar',
        xp: 80,
        grammar: [
          {
            question: 'Complete: I ___ never seen this film.',
            options: ['have', 'has', 'had', 'am'],
            answer: 0,
            explanation: 'Present perfect: have/has + past participle.',
          },
          {
            question: 'Choose: She ___ finished her homework.',
            options: ['have', 'has', 'had', 'is'],
            answer: 1,
            explanation: 'Third person singular uses "has".',
          },
          {
            question: 'Negative: We ___ not visited Paris.',
            options: ['have', 'has', 'had', 'did'],
            answer: 0,
            explanation: 'Negative: have/has + not + past participle.',
          },
          {
            question: 'Question: ___ you ever been to Japan?',
            options: ['Did', 'Have', 'Has', 'Were'],
            answer: 1,
            explanation: 'Present perfect questions start with Have/Has.',
          },
        ],
      },
      {
        id: 'b1-l3',
        title: 'Technology Spelling',
        description: 'Spell modern technology words',
        type: 'spelling',
        xp: 75,
        words: [
          { word: 'internet', phonetic: '/ˈɪntərnet/', meaning: '互联网', example: 'The internet changed everything.', exampleZh: '互联网改变了一切。' },
          { word: 'software', phonetic: '/ˈsɒftwer/', meaning: '软件', example: 'This software is free.', exampleZh: '这个软件是免费的。' },
          { word: 'wireless', phonetic: '/ˈwaɪərləs/', meaning: '无线的', example: 'Wireless networks are everywhere.', exampleZh: '无线网络无处不在。' },
          { word: 'keyboard', phonetic: '/ˈkiːbɔːrd/', meaning: '键盘', example: 'My keyboard is broken.', exampleZh: '我的键盘坏了。' },
        ],
      },
      {
        id: 'b1-l4',
        title: 'Opinion Speaking',
        description: 'Express opinions fluently',
        type: 'speaking',
        xp: 75,
        speaking: [
          { word: 'agree', phonetic: '/əˈɡriː/', meaning: '同意', example: 'I agree with you completely.', exampleZh: '我完全同意你。' },
          { word: 'disagree', phonetic: '/ˌdɪsəˈɡriː/', meaning: '不同意', example: 'I must disagree here.', exampleZh: '在这点上我不同意。' },
          { word: 'believe', phonetic: '/bɪˈliːv/', meaning: '相信', example: 'I believe in honesty.', exampleZh: '我相信诚实。' },
          { word: 'suggest', phonetic: '/səˈdʒest/', meaning: '建议', example: 'I suggest we leave early.', exampleZh: '我建议早点出发。' },
        ],
      },
      {
        id: 'b1-l5',
        title: 'News Report',
        description: 'Listen to a news broadcast',
        type: 'listening',
        xp: 85,
        listening: [
          {
            transcript: 'Good evening. In todays news, scientists have discovered a new species of butterfly in the Amazon rainforest. The discovery was made by a team of researchers from three different countries. They say this finding helps us understand biodiversity better.',
            translation: '晚上好。今天的新闻中,科学家在亚马逊雨林发现了一种新的蝴蝶物种。这一发现由来自三个不同国家的研究团队完成。他们说这一发现有助于我们更好地理解生物多样性。',
            question: 'Where was the new species found?',
            options: ['Africa', 'Amazon rainforest', 'Asia', 'Europe'],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    level: 'B2',
    title: 'Upper-Intermediate',
    subtitle: '中高级',
    description: '能与母语者流畅交流,讨论广泛话题并阐述观点。',
    cefr: 'CEFR B2 · 中高级',
    color: '#a855f7',
    lessons: [
      {
        id: 'b2-l1',
        title: 'Academic Vocabulary',
        description: 'Advanced words for study and research',
        type: 'vocabulary',
        xp: 90,
        words: [
          { word: 'Hypothesis', phonetic: '/haɪˈpɒθəsɪs/', meaning: '假设', example: 'The hypothesis needs testing.', exampleZh: '这个假设需要验证。' },
          { word: 'Significant', phonetic: '/sɪɡˈnɪfɪkənt/', meaning: '显著的', example: 'The results are significant.', exampleZh: '结果是显著的。' },
          { word: 'Phenomenon', phonetic: '/fəˈnɒmɪnən/', meaning: '现象', example: 'It is a natural phenomenon.', exampleZh: '这是一个自然现象。' },
          { word: 'Empirical', phonetic: '/ɪmˈpɪrɪkl/', meaning: '经验的', example: 'We need empirical evidence.', exampleZh: '我们需要经验证据。' },
          { word: 'Synthesize', phonetic: '/ˈsɪnθəsaɪz/', meaning: '综合', example: 'Synthesize the findings here.', exampleZh: '在此综合这些发现。' },
        ],
      },
      {
        id: 'b2-l2',
        title: 'Conditionals',
        description: 'Zero, first, second, third conditionals',
        type: 'grammar',
        xp: 95,
        grammar: [
          {
            question: 'Second conditional: If I ___ rich, I would travel.',
            options: ['am', 'was', 'were', 'be'],
            answer: 2,
            explanation: 'Second conditional uses "were" for all subjects.',
          },
          {
            question: 'Third conditional: If she had studied, she ___ passed.',
            options: ['will have', 'would have', 'would', 'had'],
            answer: 1,
            explanation: 'Third conditional: would have + past participle.',
          },
          {
            question: 'First conditional: If it rains, we ___ stay home.',
            options: ['will', 'would', 'had', 'have'],
            answer: 0,
            explanation: 'First conditional: will + base verb.',
          },
        ],
      },
      {
        id: 'b2-l3',
        title: 'Advanced Spelling',
        description: 'Spell challenging words',
        type: 'spelling',
        xp: 90,
        words: [
          { word: 'necessary', phonetic: '/ˈnesəseri/', meaning: '必要的', example: 'Water is necessary for life.', exampleZh: '水是生命必需的。' },
          { word: 'restaurant', phonetic: '/ˈrestrɒnt/', meaning: '餐厅', example: 'The restaurant is full.', exampleZh: '餐厅满了。' },
          { word: 'conscience', phonetic: '/ˈkɒnʃəns/', meaning: '良心', example: 'A clear conscience matters.', exampleZh: '问心无愧很重要。' },
          { word: 'privilege', phonetic: '/ˈprɪvəlɪdʒ/', meaning: '特权', example: 'Education is a privilege.', exampleZh: '教育是一种特权。' },
        ],
      },
      {
        id: 'b2-l4',
        title: 'Debate Speaking',
        description: 'Practice debate and argumentation',
        type: 'speaking',
        xp: 90,
        speaking: [
          { word: 'argument', phonetic: '/ˈɑːrɡjumənt/', meaning: '论点', example: 'Your argument is weak.', exampleZh: '你的论点站不住脚。' },
          { word: 'evidence', phonetic: '/ˈevɪdəns/', meaning: '证据', example: 'Show me the evidence.', exampleZh: '给我看证据。' },
          { word: 'perspective', phonetic: '/pərˈspektɪv/', meaning: '视角', example: 'Consider my perspective.', exampleZh: '考虑我的视角。' },
          { word: 'conclusion', phonetic: '/kənˈkluːʒn/', meaning: '结论', example: 'In conclusion, we agree.', exampleZh: '总之,我们同意。' },
        ],
      },
      {
        id: 'b2-l5',
        title: 'Lecture Listening',
        description: 'Listen to an academic lecture',
        type: 'listening',
        xp: 100,
        listening: [
          {
            transcript: 'Today we will explore how climate change affects migration patterns of birds. Research over the past decade shows that rising temperatures have shifted breeding grounds northward by an average of forty kilometers. This has serious consequences for ecosystem balance.',
            translation: '今天我们将探讨气候变化如何影响鸟类的迁徙模式。过去十年的研究表明,气温上升使繁殖地平均向北移动了40公里。这对生态系统的平衡产生了严重影响。',
            question: 'How far have breeding grounds shifted?',
            options: ['20 km', '40 km', '60 km', '100 km'],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    level: 'C1',
    title: 'Advanced',
    subtitle: '高级',
    description: '灵活有效地运用语言于社交、学术和专业场景。',
    cefr: 'CEFR C1 · 高级',
    color: '#ef4444',
    lessons: [
      {
        id: 'c1-l1',
        title: 'Nuanced Vocabulary',
        description: 'Subtle and sophisticated words',
        type: 'vocabulary',
        xp: 110,
        words: [
          { word: 'Serendipity', phonetic: '/ˌserənˈdɪpəti/', meaning: '机缘巧合', example: 'Finding that letter was pure serendipity.', exampleZh: '找到那封信纯属机缘巧合。' },
          { word: 'Ephemeral', phonetic: '/ɪˈfemərəl/', meaning: '短暂的', example: 'Beauty can be ephemeral.', exampleZh: '美可能是短暂的。' },
          { word: 'Ubiquitous', phonetic: '/juːˈbɪkwɪtəs/', meaning: '无处不在的', example: 'Smartphones are ubiquitous now.', exampleZh: '智能手机现在无处不在。' },
          { word: 'Pragmatic', phonetic: '/præɡˈmætɪk/', meaning: '务实的', example: 'Take a pragmatic approach.', exampleZh: '采取务实的方法。' },
          { word: 'Resilient', phonetic: '/rɪˈzɪliənt/', meaning: '有韧性的', example: 'Children are remarkably resilient.', exampleZh: '孩子们非常有韧性。' },
        ],
      },
      {
        id: 'c1-l2',
        title: 'Subjunctive & Inversion',
        description: 'Advanced grammatical structures',
        type: 'grammar',
        xp: 115,
        grammar: [
          {
            question: 'Subjunctive: I suggest that he ___ on time.',
            options: ['is', 'be', 'was', 'were'],
            answer: 1,
            explanation: 'Subjunctive uses base form after suggest/demand.',
          },
          {
            question: 'Inversion: Never ___ such a thing.',
            options: ['I saw', 'have I seen', 'I have seen', 'did I saw'],
            answer: 1,
            explanation: 'Negative adverb inversion: aux + subject + verb.',
          },
          {
            question: 'Choose: Had I known, I ___ stayed.',
            options: ['will have', 'would have', 'would', 'had'],
            answer: 1,
            explanation: 'Inverted third conditional.',
          },
        ],
      },
      {
        id: 'c1-l3',
        title: 'Sophisticated Spelling',
        description: 'Master tricky spellings',
        type: 'spelling',
        xp: 110,
        words: [
          { word: 'maintenance', phonetic: '/ˈmeɪntənəns/', meaning: '维护', example: 'Car maintenance is costly.', exampleZh: '汽车维护很贵。' },
          { word: 'occurrence', phonetic: '/əˈkʌrəns/', meaning: '发生', example: 'It is a rare occurrence.', exampleZh: '这是罕见的事件。' },
          { word: 'millennium', phonetic: '/mɪˈleniəm/', meaning: '千年', example: 'The new millennium began.', exampleZh: '新千年开始了。' },
          { word: 'liaison', phonetic: '/ˈlieɪzɒn/', meaning: '联络', example: 'She is our liaison.', exampleZh: '她是我们的联络人。' },
        ],
      },
      {
        id: 'c1-l4',
        title: 'Rhetorical Speaking',
        description: 'Masterful speech patterns',
        type: 'speaking',
        xp: 110,
        speaking: [
          { word: 'compelling', phonetic: '/kəmˈpelɪŋ/', meaning: '令人信服的', example: 'A compelling argument indeed.', exampleZh: '确实是个令人信服的论点。' },
          { word: 'inevitable', phonetic: '/ɪnˈevɪtəbl/', meaning: '不可避免的', example: 'Change is inevitable.', exampleZh: '变化是不可避免的。' },
          { word: 'profound', phonetic: '/prəˈfaʊnd/', meaning: '深刻的', example: 'A profound impact followed.', exampleZh: '随之而来的是深刻影响。' },
          { word: 'transform', phonetic: '/trænsˈfɔːrm/', meaning: '转变', example: 'We must transform the system.', exampleZh: '我们必须转变这个系统。' },
        ],
      },
      {
        id: 'c1-l5',
        title: 'Documentary Listening',
        description: 'Listen to documentary narration',
        type: 'listening',
        xp: 120,
        listening: [
          {
            transcript: 'In the depths of the ocean, where sunlight cannot reach, extraordinary creatures have evolved to survive in complete darkness. These organisms, known as bioluminescent species, produce their own light through chemical reactions within their bodies, creating one of natures most mesmerizing spectacles.',
            translation: '在阳光无法到达的海洋深处,非凡的生物进化出了在完全黑暗中生存的能力。这些被称为生物发光物种的生物,通过体内的化学反应产生自己的光,创造了大自然最迷人的奇观之一。',
            question: 'How do deep-sea creatures produce light?',
            options: ['From the sun', 'Chemical reactions', 'From plants', 'From rocks'],
            answer: 1,
          },
        ],
      },
    ],
  },
];

/* ---------- Achievements ---------- */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'lesson' | 'streak' | 'words' | 'grammar' | 'speaking' | 'level';
  threshold: number;
  xpReward: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-lesson', name: '初次启程', description: '完成你的第一节课', icon: 'sparkles', type: 'lesson', threshold: 1, xpReward: 50 },
  { id: 'lessons-5', name: '勤奋学者', description: '完成 5 节课程', icon: 'book', type: 'lesson', threshold: 5, xpReward: 100 },
  { id: 'lessons-20', name: '博学之士', description: '完成 20 节课程', icon: 'graduation', type: 'lesson', threshold: 20, xpReward: 300 },
  { id: 'streak-3', name: '起步打卡', description: '连续学习 3 天', icon: 'flame', type: 'streak', threshold: 3, xpReward: 60 },
  { id: 'streak-7', name: '一周坚持', description: '连续学习 7 天', icon: 'flame', type: 'streak', threshold: 7, xpReward: 150 },
  { id: 'streak-30', name: '势不可挡', description: '连续学习 30 天', icon: 'flame', type: 'streak', threshold: 30, xpReward: 500 },
  { id: 'words-50', name: '词汇收集者', description: '学习 50 个单词', icon: 'layers', type: 'words', threshold: 50, xpReward: 100 },
  { id: 'words-100', name: '词汇达人', description: '学习 100 个单词', icon: 'layers', type: 'words', threshold: 100, xpReward: 200 },
  { id: 'words-500', name: '词汇大师', description: '学习 500 个单词', icon: 'crown', type: 'words', threshold: 500, xpReward: 600 },
  { id: 'grammar-20', name: '语法专家', description: '答对 20 道语法题', icon: 'puzzle', type: 'grammar', threshold: 20, xpReward: 150 },
  { id: 'speaking-20', name: '发音高手', description: '完成 20 个口语练习', icon: 'mic', type: 'speaking', threshold: 20, xpReward: 150 },
  { id: 'level-a2', name: '新星崛起', description: '解锁初级课程', icon: 'star', type: 'level', threshold: 1, xpReward: 200 },
  { id: 'level-b1', name: '中级达人', description: '解锁中级课程', icon: 'medal', type: 'level', threshold: 1, xpReward: 300 },
];

/* ---------- Level thresholds for XP ---------- */
export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500];

export function getLevelFromXp(xp: number): { level: number; current: number; needed: number; progress: number } {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  const baseXp = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextXp = LEVEL_THRESHOLDS[level] ?? baseXp + 1000;
  const current = xp - baseXp;
  const needed = nextXp - baseXp;
  const progress = needed > 0 ? current / needed : 1;
  return { level, current, needed, progress };
}

/* ---------- Helper: get all lessons flat ---------- */
export function getAllLessons() {
  return COURSES.flatMap(c => c.lessons.map(l => ({ ...l, level: c.level, courseTitle: c.title })));
}

export function getLessonById(id: string) {
  for (const course of COURSES) {
    const lesson = course.lessons.find(l => l.id === id);
    if (lesson) return { lesson, course };
  }
  return null;
}
