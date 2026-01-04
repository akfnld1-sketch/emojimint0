// frontend/js/data.js
"use strict";

(function () {
  /* =========================
     I18N
  ========================= */
  const I18N = {
    ko: {
      "app.title": "이모지민트",
      "app.subtitle": "이모지민트 이모티콘 프롬프트 생성기",
      "badge.beta": "BETA",
      "badge.global": "GLOBAL",

      "nav.recraft": "Recraft 바로가기",
      "nav.cafe": "AI BIZ 네이버 카페",

      "section.character.title": "캐릭터 선택",
      "section.character.desc": "대분류 → 소분류 → 세분화 캐릭터를 순서대로 골라주세요.",

      "section.emotion.title": "감정·상황 세트",
      "section.emotion.desc":
        "일상 / 직장 / 연인 / 크리스마스 / 설날 / 연말 세트 중 하나와 생성 개수, 배경 테마를 선택합니다.",

      "section.advanced.title": "고급 옵션 (옷 / 색상)",
      "section.advanced.desc":
        "기본값은 자동입니다. 필요할 때만 세부 연출을 조절하세요.",

      "section.result.title": "프롬프트 결과",
      "section.result.desc":
        "각 프롬프트 오른쪽 복사 버튼 또는 전체 복사를 사용할 수 있습니다.",

      "labels.category": "대분류",
      "labels.subCategory": "소분류",
      "labels.detail": "세분화 캐릭터",
      "labels.emotionSet": "감정·상황 세트",
      "labels.count": "생성 개수",
      "labels.theme": "배경 테마",
      "labels.outfit": "의상 스타일",
      "labels.color": "색상",
      "labels.conceptStyle": "컨셉 스타일",
      "labels.propItem": "소품 / 물건",

      "buttons.generate": "프롬프트 생성하기",
      "buttons.copyAll": "전체 프롬프트 복사",
      "buttons.copy": "복사",
      "buttons.copied": "복사됨!",

      "messages.noCharacter": "캐릭터를 먼저 선택해주세요.",
      "messages.noEmotion": "감정·상황 세트를 선택해주세요."
    },
    en: {},
    ja: {},
    zh: {}
  };

  /* =========================
     COUNT OPTIONS
  ========================= */
  const COUNT_OPTIONS = [1, 9, 24, 50, 100];

  /* =========================
     EMOTION 50
  ========================= */
  const EMOTIONS_50 = [
    "피곤","화이팅","기쁨","신남","감동","뿌듯","만족","평온","멍","졸림",
    "배고픔","귀찮음","짜증","분노","당황","깜짝","불안","걱정","우울","눈물",
    "서운","삐침","민망","부끄","심쿵","설렘","사랑","감사","축하","응원",
    "기원","안도","긴장","집중","현타","멘붕","포기","재도전","아파","감기",
    "힐링","휴식","출근","퇴근","야근","텅장","월급날","성공","실패","굿나잇"
  ].map((ko) => ({ ko }));

  /* =========================
     EMOTION SETS (B안)
  ========================= */
  const EMOTION_SETS_INFO = {
    daily: {
      id: "daily",
      labels: { ko: "일상생활 50종" },
      items: EMOTIONS_50
    },
    work: {
      id: "work",
      labels: { ko: "직장생활 50종" },
      items: EMOTIONS_50
    },
    couple: {
      id: "couple",
      labels: { ko: "연인 데이트 50종" },
      items: EMOTIONS_50
    },
    christmas: {
      id: "christmas",
      labels: { ko: "크리스마스 50종" },
      items: EMOTIONS_50
    },
    seollal: {
      id: "seollal",
      labels: { ko: "설날 50종" },
      items: EMOTIONS_50
    },
    yearend: {
      id: "yearend",
      labels: { ko: "연말 50종" },
      items: EMOTIONS_50
    }
  };

  /* =========================
     THEME
  ========================= */
  const THEMES_INFO = {
    white: { id: "white", labels: { ko: "흰색 배경" } },
    office: { id: "office", labels: { ko: "회사" } },
    home: { id: "home", labels: { ko: "집" } },
    park: { id: "park", labels: { ko: "공원" } },
    cafe: { id: "cafe", labels: { ko: "카페" } }
  };

  /* =========================
     OUTFIT
  ========================= */
  const OUTFIT_INFO = {
    auto: { id: "auto", labels: { ko: "자동 (기본)" } },
    casual: { id: "casual", labels: { ko: "캐주얼" } },
    suit: { id: "suit", labels: { ko: "정장" } },
    hoodie: { id: "hoodie", labels: { ko: "후드티" } },
    pajamas: { id: "pajamas", labels: { ko: "잠옷" } }
  };

  /* =========================
     COLOR
  ========================= */
  const COLOR_INFO = {
    auto: { id: "auto", labels: { ko: "자동" } },
    pastel: { id: "pastel", labels: { ko: "파스텔" } },
    vivid: { id: "vivid", labels: { ko: "비비드" } },
    mono: { id: "mono", labels: { ko: "모노톤" } }
  };

  /* =========================
     CONCEPT
  ========================= */
  const CONCEPT_STYLES = {
    auto: { id: "auto", labels: { ko: "기본 컨셉" } },
    doodle: { id: "doodle", labels: { ko: "손그림 낙서" } },
    cute: { id: "cute", labels: { ko: "큐트 강조" } }
  };

  /* =========================
     PROPS
  ========================= */
  const PROP_ITEMS = {
    auto: { id: "auto", labels: { ko: "없음" } },
    coffee: { id: "coffee", labels: { ko: "커피" } },
    phone: { id: "phone", labels: { ko: "스마트폰" } },
    gift: { id: "gift", labels: { ko: "선물상자" } }
  };

  /* =========================
     CHARACTER TREE (샘플)
  ========================= */
  const CHARACTER_TREE = {
    animal: {
      id: "animal",
      labels: { ko: "동물" },
      subCategories: {
        dog: {
          id: "dog",
          labels: { ko: "강아지" },
          details: ["animal_dog_maltese"]
        }
      }
    }
  };

  const DETAIL_LABELS = {
    animal_dog_maltese: { ko: "말티즈 강아지" }
  };

  /* =========================
     EXPORT
  ========================= */
  window.EMOTIMINT_DATA = {
    I18N,
    COUNT_OPTIONS,
    CHARACTER_TREE,
    DETAIL_LABELS,
    EMOTION_SETS_INFO,
    THEMES_INFO,
    OUTFIT_INFO,
    COLOR_INFO,
    CONCEPT_STYLES,
    PROP_ITEMS
  };
})();
