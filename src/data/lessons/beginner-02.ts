import type { Lesson } from "../../engine/types"

export const beginner02: Lesson = {
  id: "beginner-02",
  courseId: "beginner",
  title: "第 2 课 · 自我介绍",
  titleEn: "Lesson 2 · Introduce yourself",
  description: "学会介绍自己的名字和来自哪里。",
  descriptionEn: "Name, origin, and simple self-introduction.",
  sentences: [
    {
      id: "b02-s1",
      chinese: "我叫小明。",
      words: [
        { en: "My", ipa: "/maɪ/", pos: "代", cn: "我的" },
        { en: "name", ipa: "/neɪm/", pos: "名", cn: "名字" },
        { en: "is", ipa: "/ɪz/", pos: "动", cn: "是" },
        { en: "Xiaoming", ipa: "/ˈʃaʊmɪŋ/", pos: "名", cn: "小明" },
      ],
    },
    {
      id: "b02-s2",
      chinese: "我来自中国。",
      words: [
        { en: "I", ipa: "/aɪ/", pos: "代", cn: "我" },
        { en: "am", ipa: "/æm/", pos: "动", cn: "是" },
        { en: "from", ipa: "/frɒm/", pos: "介", cn: "来自" },
        { en: "China", ipa: "/ˈtʃaɪnə/", pos: "名", cn: "中国" },
      ],
    },
    {
      id: "b02-s3",
      chinese: "我是一名学生。",
      words: [
        { en: "I", ipa: "/aɪ/", pos: "代", cn: "我" },
        { en: "am", ipa: "/æm/", pos: "动", cn: "是" },
        { en: "a", ipa: "/ə/", pos: "冠", cn: "一个" },
        { en: "student", ipa: "/ˈstuːdnt/", pos: "名", cn: "学生" },
      ],
    },
    {
      id: "b02-s4",
      chinese: "我学习英语已经三年了。",
      words: [
        { en: "I", ipa: "/aɪ/", pos: "代", cn: "我" },
        { en: "have", ipa: "/hæv/", pos: "动", cn: "已经" },
        { en: "studied", ipa: "/ˈstʌdid/", pos: "动", cn: "学习" },
        { en: "English", ipa: "/ˈɪŋɡlɪʃ/", pos: "名", cn: "英语" },
        { en: "for", ipa: "/fɔːr/", pos: "介", cn: "达" },
        { en: "three", ipa: "/θriː/", pos: "数", cn: "三" },
        { en: "years", ipa: "/jɪrz/", pos: "名", cn: "年" },
      ],
    },
    {
      id: "b02-s5",
      chinese: "每天练习一点点，进步会很大。",
      words: [
        { en: "A", ipa: "/ə/", pos: "冠", cn: "一个" },
        { en: "little", ipa: "/ˈlɪtl/", pos: "形", cn: "小的" },
        { en: "practice", ipa: "/ˈpræktɪs/", pos: "名", cn: "练习" },
        { en: "every", ipa: "/ˈevri/", pos: "形", cn: "每个" },
        { en: "day", ipa: "/deɪ/", pos: "名", cn: "天" },
        { en: "makes", ipa: "/meɪks/", pos: "动", cn: "使得" },
        { en: "big", ipa: "/bɪɡ/", pos: "形", cn: "大的" },
        { en: "progress", ipa: "/ˈprɑːɡres/", pos: "名", cn: "进步" },
      ],
    },
  ],
}
