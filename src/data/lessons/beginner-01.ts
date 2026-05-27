import type { Lesson } from "../../engine/types"

export const beginner01: Lesson = {
  id: "beginner-01",
  courseId: "beginner",
  title: "第 1 课 · 日常问候",
  titleEn: "Lesson 1 · Daily greetings",
  description: "从最基础的打招呼开始，建立造句手感。",
  descriptionEn: "Start with hello and good morning — build muscle memory.",
  sentences: [
    {
      id: "b01-s1",
      chinese: "你好。",
      promptEn: "Say: Hello.",
      words: [{ en: "Hello", ipa: "/həˈloʊ/", pos: "叹", cn: "hello" }],
    },
    {
      id: "b01-s2",
      chinese: "早上好。",
      promptEn: "Say: Good morning.",
      words: [
        { en: "Good", ipa: "/ɡʊd/", pos: "形", cn: "好的" },
        { en: "morning", ipa: "/ˈmɔːrnɪŋ/", pos: "名", cn: "早晨" },
      ],
    },
    {
      id: "b01-s3",
      chinese: "你好吗？",
      promptEn: "Say: How are you?",
      words: [
        { en: "How", ipa: "/haʊ/", pos: "副", cn: "怎样" },
        { en: "are", ipa: "/ɑːr/", pos: "动", cn: "是" },
        { en: "you", ipa: "/juː/", pos: "代", cn: "你" },
      ],
    },
    {
      id: "b01-s4",
      chinese: "我很好，谢谢。",
      promptEn: "Say: I am fine, thank you.",
      words: [
        { en: "I", ipa: "/aɪ/", pos: "代", cn: "我" },
        { en: "am", ipa: "/æm/", pos: "动", cn: "是" },
        { en: "fine", ipa: "/faɪn/", pos: "形", cn: "好的" },
        { en: "thank", ipa: "/θæŋk/", pos: "动", cn: "感谢" },
        { en: "you", ipa: "/juː/", pos: "代", cn: "你" },
      ],
    },
    {
      id: "b01-s5",
      chinese: "很高兴见到你。",
      promptEn: "Say: Nice to meet you.",
      words: [
        { en: "Nice", ipa: "/naɪs/", pos: "形", cn: "美好的" },
        { en: "to", ipa: "/tuː/", pos: "介", cn: "去" },
        { en: "meet", ipa: "/miːt/", pos: "动", cn: "遇见" },
        { en: "you", ipa: "/juː/", pos: "代", cn: "你" },
      ],
    },
    {
      id: "b01-s6",
      chinese: "我喜欢每天早上吃新鲜的苹果。",
      promptEn: "Say: I like to eat fresh apples every morning.",
      words: [
        { en: "I", ipa: "/aɪ/", pos: "代", cn: "我" },
        { en: "like", ipa: "/laɪk/", pos: "动", cn: "喜欢" },
        { en: "to", ipa: "/tuː/", pos: "介", cn: "去" },
        { en: "eat", ipa: "/iːt/", pos: "动", cn: "吃" },
        { en: "fresh", ipa: "/freʃ/", pos: "形", cn: "新鲜的" },
        { en: "apples", ipa: "/ˈæplz/", pos: "名", cn: "苹果" },
        { en: "every", ipa: "/ˈevri/", pos: "形", cn: "每个" },
        { en: "morning", ipa: "/ˈmɔːrnɪŋ/", pos: "名", cn: "早晨" },
      ],
    },
  ],
}
