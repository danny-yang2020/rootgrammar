import type { Lesson } from "../../engine/types"

export const intermediate01: Lesson = {
  id: "intermediate-01",
  courseId: "intermediate",
  title: "第 1 课 · 旅行场景",
  titleEn: "Lesson 1 · Travel",
  description: "机场、酒店、问路常用句型。",
  descriptionEn: "Airport, hotel, and asking for directions.",
  sentences: [
    {
      id: "i01-s1",
      chinese: "请问，去机场怎么走？",
      words: [
        { en: "Excuse", ipa: "/ɪkˈskjuːz/", pos: "动", cn: "原谅" },
        { en: "me", ipa: "/miː/", pos: "代", cn: "我" },
        { en: "how", ipa: "/haʊ/", pos: "副", cn: "怎样" },
        { en: "do", ipa: "/duː/", pos: "助", cn: "做" },
        { en: "I", ipa: "/aɪ/", pos: "代", cn: "我" },
        { en: "get", ipa: "/ɡet/", pos: "动", cn: "到达" },
        { en: "to", ipa: "/tuː/", pos: "介", cn: "到" },
        { en: "the", ipa: "/ðə/", pos: "冠", cn: "这" },
        { en: "airport", ipa: "/ˈerpɔːrt/", pos: "名", cn: "机场" },
      ],
    },
    {
      id: "i01-s2",
      chinese: "我想预订一个双人房间。",
      words: [
        { en: "I", ipa: "/aɪ/", pos: "代", cn: "我" },
        { en: "would", ipa: "/wʊd/", pos: "助", cn: "想" },
        { en: "like", ipa: "/laɪk/", pos: "动", cn: "想要" },
        { en: "to", ipa: "/tuː/", pos: "介", cn: "去" },
        { en: "book", ipa: "/bʊk/", pos: "动", cn: "预订" },
        { en: "a", ipa: "/ə/", pos: "冠", cn: "一个" },
        { en: "double", ipa: "/ˈdʌbl/", pos: "形", cn: "双人的" },
        { en: "room", ipa: "/ruːm/", pos: "名", cn: "房间" },
      ],
    },
    {
      id: "i01-s3",
      chinese: "这趟航班延误了两个小时。",
      words: [
        { en: "The", ipa: "/ðə/", pos: "冠", cn: "这" },
        { en: "flight", ipa: "/flaɪt/", pos: "名", cn: "航班" },
        { en: "was", ipa: "/wʌz/", pos: "动", cn: "被" },
        { en: "delayed", ipa: "/dɪˈleɪd/", pos: "形", cn: "延误" },
        { en: "for", ipa: "/fɔːr/", pos: "介", cn: "达" },
        { en: "two", ipa: "/tuː/", pos: "数", cn: "二" },
        { en: "hours", ipa: "/ˈaʊərz/", pos: "名", cn: "小时" },
      ],
    },
  ],
}
