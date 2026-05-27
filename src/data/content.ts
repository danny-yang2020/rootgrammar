export const navLinks = [
  { label: "文档", href: "#", external: false },
  { label: "学习资源", href: "/learn", external: false },
  { label: "更新日志", href: "#", external: false },
  { label: "功能", href: "/#features", external: false },
  { label: "问题", href: "/#faq", external: false },
  { label: "联系我们", href: "/#contact", external: false },
]

export const stats = [
  { icon: "users" as const, label: "注册用户", value: 70, suffix: "万+" },
  { icon: "clock" as const, label: "累计学习小时", value: 100, suffix: "万+" },
  { icon: "check" as const, label: "练习完成次数", value: 4500, suffix: "万+" },
  { icon: "flame" as const, label: "平均每次学习", value: 42, suffix: "分钟" },
]

export const features = [
  {
    title: "连对越多，越想继续",
    description:
      '句乐部把练习变成了连击游戏——节奏感、即时反馈、Perfect 评分，你的好胜心会驱动你一遍又一遍地练下去，根本停不下来。每一遍都是有效训练，但你只会觉得"再来一局"。',
    images: ["/images/landing/combo-system.webp", "/images/landing/combo-system-2.webp"],
    reverse: false,
  },
  {
    title: "忘了的词，它比你先想起来",
    description:
      "练完了，什么时候该复习？自己安排总是忘，间隔太久等于白练。句乐部会自动算好每个知识点的最佳复习时间——你不用管，到时候它会来找你。",
    images: ["/images/landing/review-book-1.webp", "/images/landing/review-book-2.webp"],
    reverse: true,
  },
  {
    title: "随时有一个英语老师在旁边",
    description:
      "练习时最怕遇到问题没人问——为什么加 -ed？这里为什么用 in 不用 on？与其硬猜或跳过，不如直接问 AI 英语老师。带着真实问题去学，比被动听课高效得多。",
    images: ["/images/landing/ai-assistant.webp"],
    reverse: false,
  },
  {
    title: "任何内容，都能变成练习",
    description:
      "平台上没有你想学的内容？自己录入就行。教材课文、英文歌词、TED 演讲——任何英文内容都能变成可练习的课程。学自己感兴趣的材料，动力完全不同。",
    images: ["/images/landing/editor-1.webp"],
    reverse: true,
  },
]

export const testimonials = [
  {
    tag: "学习爱好者",
    quote: "「就一句话，它很符合脑科学：及时的正反馈。有正反馈就不存在「坚持」这回事。」",
    name: "袁雷雷",
    role: "句乐部用户",
    avatar: "/commentsImgs/avatar-7.svg",
  },
  {
    tag: "小学生家长",
    quote: "「孩子每天只练 10 分钟，英语成绩稳定在全班第一。练了几个月，现在已经能和外教进行日常对话了。」",
    name: "陈妈妈",
    role: "六年级家长",
    avatar: "/commentsImgs/avatar-10.svg",
  },
  {
    tag: "职场人士",
    quote: "「本来是给孩子买的，结果我现在自己学上瘾了，每天上班的时候摸鱼玩上1个小时超级解压。」",
    name: "老李",
    role: "永久会员",
    avatar: "/commentsImgs/avatar-9.svg",
  },
  {
    tag: "培训机构老师",
    quote: "「用编辑端制作自己的课程，孩子们练起来像玩游戏一样主动。还能直接看到每个孩子的练习数据，跟家长沟通时有据可依。」",
    name: "刘老师",
    role: "培训机构英语老师",
    avatar: "/commentsImgs/avatar-6.svg",
  },
  {
    tag: "考研党",
    quote: "「编辑端超级赞，我把考题全部自定义录入进去，每天坚持2小时，已经圆梦上岸啦！」",
    name: "大学生阿成",
    role: "在校学生",
    avatar: "/commentsImgs/avatar-11.svg",
  },
  {
    tag: "特殊用户",
    quote: "「移民美国后从零开始学英语，坚持用句乐部练习，现在已经能和邻居日常交流了。80岁学英语也不晚！」",
    name: "王奖奇",
    role: "80岁 · 移民美国",
    avatar: "/commentsImgs/avatar-8.svg",
  },
]

export const faqs = [
  {
    question: "和背单词 App 有什么不同？",
    answer:
      '背单词解决的是"认识"，句乐部解决的是"会用"。你可能认识 apple 这个词，但你能脱口而出 "An apple a day keeps the doctor away" 吗？句乐部从句子出发，把单词放回真实语境里练，学的不是孤立的词，而是真正能用出来的表达。',
    open: true,
  },
  {
    question: "适合什么英语水平？",
    answer:
      "小学生在用，考研党在用，备考雅思托福的也在用。句乐部支持初级、中级、高级三种难度——初级从单词练起，高级直接挑战整句。不管你现在什么水平，都能找到适合自己的节奏。",
  },
  {
    question: "内容够不够？",
    answer:
      "1000+ 套练习内容，覆盖 K12 课本（人教版、外研版、北师大版等）、四六级、雅思托福、美剧、动画片等，内容还在持续更新。如果暂时没有你想学的，可以用编辑端自行导入任何英文内容，也可以提需求，我们会尽快补充。",
  },
  {
    question: "句乐部要花钱吗？",
    answer:
      "注册就能免费学——很多课程包都开放了大量免费内容，比如零基础课程包就有 30 多节免费课，一天一课够学一个月。先学着，觉得值了再开通会员。新用户还可以领取免费会员体验，所有功能全部解锁，体验完再决定。",
  },
  {
    question: "孩子用安全吗？家长能看到学习情况吗？",
    answer:
      "放心，句乐部是纯粹的学习环境，没有社交干扰和无关内容。而且有完整的成长分析和课程学习报告——孩子学了什么、学了多久、掌握了多少，你随时打开都能看到。",
  },
  {
    question: "为什么没有 App？",
    answer:
      "句乐部的核心玩法是用键盘打字造句——在电脑前专注练习，手感更爽，效率也更高。这种需要大段时间沉浸的学习方式，PC 端体验远好于手机。目前市面上 PC 端几乎没有好用的英语练习工具，这正是句乐部想填补的空白。",
  },
  {
    question: "我是老师，怎么给学生用？",
    answer:
      "三步搞定：用编辑端导入你的教学内容，AI 自动拆句、翻译、生成讲解，分享给学生就能练。你不需要额外备课，学生用起来像玩游戏主动性很强，你还能通过数据报告追踪每个人的掌握情况。",
  },
]
