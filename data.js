// frontend/js/data.js
"use strict";

(function () {
  // =========================
  // ✅ 정책 선택: "A" or "B"
  // =========================
  // A: 중복 제거 + daily만 50종 + 나머지 24종 유지
  // B: 모든 세트 50종 (지금 코드처럼)
  const SET_POLICY = "A"; // ← 여기만 "A" 또는 "B"

  // 다국어 라벨
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
        "기본값은 '선택 안 함' 입니다. 필요할 때만 의상 스타일과 색상을 직접 선택해 세부 연출을 조절하세요.",

      "section.result.title": "프롬프트 결과",
      "section.result.desc":
        "각 프롬프트 오른쪽 복사 버튼을 누르면 색이 바뀌며, 한 번에 전체 복사도 가능합니다.",

      "labels.category": "대분류",
      "labels.subCategory": "소분류",
      "labels.detail": "세분화 캐릭터",
      "labels.emotionSet": "감정·상황 세트",
      "labels.count": "생성 개수",
      "labels.theme": "배경 테마",
      "labels.outfit": "의상 스타일",
      "labels.color": "색상",
      "labels.auto": "선택 안 함 (세트 기본)",

      "labels.conceptStyle": "컨셉 스타일",
      "labels.propItem": "소품 / 물건",

      "buttons.generate": "프롬프트 생성하기",
      "buttons.copyAll": "전체 프롬프트 복사",
      "buttons.copy": "복사",
      "buttons.copied": "복사됨!",

      "messages.noCharacter": "캐릭터를 먼저 선택해주세요.",
      "messages.noEmotion": "감정·상황 세트를 선택해주세요."
    },
    en: {
      "app.title": "EmojiMint",
      "app.subtitle": "EmojiMint Emoticon Prompt Generator",
      "badge.beta": "BETA",
      "badge.global": "GLOBAL",

      "nav.recraft": "Open Recraft",
      "nav.cafe": "AI BIZ Naver Cafe",

      "section.character.title": "Character Selection",
      "section.character.desc":
        "Choose category → sub category → detailed character in order.",

      "section.emotion.title": "Emotion & Situation Sets",
      "section.emotion.desc":
        "Pick one of Daily / Work / Couple / Christmas / New Year / Year-end sets, count, and background theme.",

      "section.advanced.title": "Advanced Options (Outfit / Color)",
      "section.advanced.desc":
        "Default is No override. Use these only if you want to fine-tune outfit style and colors.",

      "section.result.title": "Prompt Results",
      "section.result.desc":
        "Use the copy button on each item, or copy all prompts at once.",

      "labels.category": "Category",
      "labels.subCategory": "Sub Category",
      "labels.detail": "Detailed Character",
      "labels.emotionSet": "Emotion Set",
      "labels.count": "Count",
      "labels.theme": "Background Theme",
      "labels.outfit": "Outfit Style",
      "labels.color": "Color",
      "labels.auto": "No override (set default)",

      "labels.conceptStyle": "Concept style",
      "labels.propItem": "Prop / Item",

      "buttons.generate": "Generate Prompts",
      "buttons.copyAll": "Copy All Prompts",
      "buttons.copy": "Copy",
      "buttons.copied": "Copied!",

      "messages.noCharacter": "Please choose a character first.",
      "messages.noEmotion": "Please choose an emotion set."
    },
    ja: {
      "app.title": "イモジミント",
      "app.subtitle": "EmojiMint 絵文字プロンプトジェネレーター",
      "badge.beta": "ベータ",
      "badge.global": "グローバル",

      "nav.recraft": "Recraft を開く",
      "nav.cafe": "AI BIZ ネイバー カフェ",

      "section.character.title": "キャラクター選択",
      "section.character.desc":
        "大分類 → 小分類 → 詳細キャラクターの順に選択してください。",

      "section.emotion.title": "感情・シチュエーションセット",
      "section.emotion.desc":
        "日常 / 仕事 / 恋人 / クリスマス / 正月 / 年末セットの中から選び、生成数と背景テーマを指定します。",

      "section.advanced.title": "上級オプション（服 / カラー）",
      "section.advanced.desc":
        "基本は「指定なし」です。必要な場合のみ衣装スタイルと色を細かく指定してください。",

      "section.result.title": "プロンプト結果",
      "section.result.desc":
        "各プロンプトのコピー ボタン、または全体コピーができます。",

      "labels.category": "大分類",
      "labels.subCategory": "小分類",
      "labels.detail": "詳細キャラクター",
      "labels.emotionSet": "感情セット",
      "labels.count": "生成数",
      "labels.theme": "背景テーマ",
      "labels.outfit": "衣装スタイル",
      "labels.color": "カラー",
      "labels.auto": "指定なし（セット基本）",

      "labels.conceptStyle": "コンセプトスタイル",
      "labels.propItem": "小物・アイテム",

      "buttons.generate": "プロンプト生成",
      "buttons.copyAll": "すべてコピー",
      "buttons.copy": "コピー",
      "buttons.copied": "コピー済み！",

      "messages.noCharacter": "キャラクターを先に選択してください。",
      "messages.noEmotion": "感情セットを選択してください。"
    },
    zh: {
      "app.title": "이모지민트",
      "app.subtitle": "EmojiMint 表情符号提示生成器",
      "badge.beta": "测试版",
      "badge.global": "全球",

      "nav.recraft": "打开 Recraft",
      "nav.cafe": "AI BIZ Naver 咖啡馆",

      "section.character.title": "角色选择",
      "section.character.desc": "按顺序选择大类 → 子类 → 细分角色。",

      "section.emotion.title": "情绪·场景套装",
      "section.emotion.desc":
        "从日常 / 职场 / 恋人 / 圣诞 / 新年 / 年末套装中选择，并设置数量和背景主题。",

      "section.advanced.title": "高级选项（服装 / 颜色）",
      "section.advanced.desc":
        "默认为“不指定”。只在需要时手动指定服装风格和颜色。",

      "section.result.title": "提示语结果",
      "section.result.desc":
        "可以逐个复制，也可以一次复制全部提示语。",

      "labels.category": "大类",
      "labels.subCategory": "子类",
      "labels.detail": "细分角色",
      "labels.emotionSet": "情绪套装",
      "labels.count": "生成数量",
      "labels.theme": "背景主题",
      "labels.outfit": "服装风格",
      "labels.color": "颜色",
      "labels.auto": "不指定（套装默认）",

      "labels.conceptStyle": "风格概念",
      "labels.propItem": "道具 / 物品",

      "buttons.generate": "生成提示语",
      "buttons.copyAll": "复制全部提示语",
      "buttons.copy": "复制",
      "buttons.copied": "已复制！",

      "messages.noCharacter": "请先选择角色。",
      "messages.noEmotion": "请选择情绪套装。"
    }
  };

  // 생성 개수 옵션
  const COUNT_OPTIONS = [1, 9, 24, 50, 100];

  // 캐릭터 트리
  const CHARACTER_TREE = {
    animal: {
      id: "animal",
      labels: { ko: "동물", en: "Animals", ja: "動物", zh: "动物" },
      subCategories: {
        dog: {
          id: "dog",
          labels: { ko: "강아지", en: "Dogs", ja: "犬", zh: "狗" },
          details: [
            "animal_dog_maltese",
            "animal_dog_poodle",
            "animal_dog_retriever",
            "animal_dog_corgi",
            "animal_dog_shiba",
            "animal_dog_dachshund",
            "animal_dog_pomeranian",
            "animal_dog_bulldog",
            "animal_dog_beagle",
            "animal_dog_husky"
          ]
        },
        cat: {
          id: "cat",
          labels: { ko: "고양이", en: "Cats", ja: "猫", zh: "猫" },
          details: [
            "animal_cat_tuxedo",
            "animal_cat_calico",
            "animal_cat_siamese",
            "animal_cat_british",
            "animal_cat_scottish",
            "animal_cat_persian",
            "animal_cat_black",
            "animal_cat_tabby",
            "animal_cat_white",
            "animal_cat_ragdoll"
          ]
        },
        tiger: {
          id: "tiger",
          labels: { ko: "호랑이", en: "Tiger", ja: "トラ", zh: "老虎" },
          details: ["animal_tiger_default"]
        },
        rabbit: {
          id: "rabbit",
          labels: { ko: "토끼", en: "Rabbit", ja: "ウサギ", zh: "兔子" },
          details: ["animal_rabbit_default"]
        },
        bear: {
          id: "bear",
          labels: { ko: "곰", en: "Bear", ja: "クマ", zh: "熊" },
          details: ["animal_bear_default"]
        },
        fox: {
          id: "fox",
          labels: { ko: "여우", en: "Fox", ja: "キツネ", zh: "狐狸" },
          details: ["animal_fox_default"]
        },
        panda: {
          id: "panda",
          labels: { ko: "판다", en: "Panda", ja: "パンダ", zh: "熊猫" },
          details: ["animal_panda_default"]
        },
        bird: {
          id: "bird",
          labels: { ko: "새", en: "Bird", ja: "鳥", zh: "鸟" },
          details: ["animal_bird_default"]
        },
        hamster: {
          id: "hamster",
          labels: { ko: "햄스터", en: "Hamster", ja: "ハムスター", zh: "仓鼠" },
          details: ["animal_hamster_default"]
        },
        penguin: {
          id: "penguin",
          labels: { ko: "펭귄", en: "Penguin", ja: "ペンギン", zh: "企鹅" },
          details: ["animal_penguin_default"]
        }
      }
    },

    plant: {
      id: "plant",
      labels: { ko: "식물", en: "Plants", ja: "植物", zh: "植物" },
      subCategories: {
        flower: {
          id: "flower",
          labels: { ko: "꽃", en: "Flowers", ja: "花", zh: "花" },
          details: [
            "plant_flower_rose",
            "plant_flower_tulip",
            "plant_flower_sunflower",
            "plant_flower_cherry",
            "plant_flower_lily",
            "plant_flower_daisy",
            "plant_flower_carnation",
            "plant_flower_lavender",
            "plant_flower_peony",
            "plant_flower_cosmos"
          ]
        },
        tree: {
          id: "tree",
          labels: { ko: "나무", en: "Trees", ja: "木", zh: "树" },
          details: [
            "plant_tree_sprout",
            "plant_tree_pine",
            "plant_tree_maple",
            "plant_tree_cherry",
            "plant_tree_palm",
            "plant_tree_bonsai",
            "plant_tree_birch",
            "plant_tree_oak",
            "plant_tree_willow",
            "plant_tree_ginkgo"
          ]
        }
      }
    },

    human: {
      id: "human",
      labels: { ko: "사람", en: "People", ja: "人", zh: "人" },
      subCategories: {
        male: {
          id: "male",
          labels: { ko: "남자", en: "Male", ja: "男性", zh: "男性" },
          details: [
            "human_male_office",
            "human_male_manual",
            "human_male_parttime",
            "human_male_child",
            "human_male_elementary",
            "human_male_middle",
            "human_male_high",
            "human_male_univ"
          ]
        },
        female: {
          id: "female",
          labels: { ko: "여자", en: "Female", ja: "女性", zh: "女性" },
          details: [
            "human_female_office",
            "human_female_manual",
            "human_female_parttime",
            "human_female_child",
            "human_female_elementary",
            "human_female_middle",
            "human_female_high",
            "human_female_univ"
          ]
        }
      }
    },

    food: {
      id: "food",
      labels: { ko: "음식", en: "Food", ja: "食べ物", zh: "食物" },
      subCategories: {
        breakfast: {
          id: "breakfast",
          labels: { ko: "아침메뉴", en: "Breakfast", ja: "朝食", zh: "早餐" },
          details: ["food_breakfast_default"]
        },
        lunch: {
          id: "lunch",
          labels: { ko: "점심메뉴", en: "Lunch", ja: "昼食", zh: "午餐" },
          details: ["food_lunch_default"]
        },
        dinner: {
          id: "dinner",
          labels: { ko: "저녁메뉴", en: "Dinner", ja: "夕食", zh: "晚餐" },
          details: ["food_dinner_default"]
        },
        dessert: {
          id: "dessert",
          labels: { ko: "디저트", en: "Dessert", ja: "デザート", zh: "甜点" },
          details: ["food_dessert_default"]
        }
      }
    },

    miniature: {
      id: "miniature",
      labels: { ko: "미니어처", en: "Miniature", ja: "ミニチュア", zh: "微缩" },
      subCategories: {
        mini_animal: {
          id: "mini_animal",
          labels: { ko: "동물", en: "Animals", ja: "動物", zh: "动物" },
          details: [
            "mini_animal_bee",
            "mini_animal_ant",
            "mini_animal_beetle",
            "mini_animal_stag"
          ]
        },
        mini_human: {
          id: "mini_human",
          labels: { ko: "사람", en: "People", ja: "人", zh: "人" },
          details: ["mini_human_male_helmet", "mini_human_female_helmet"]
        },
        special: {
          id: "special",
          labels: { ko: "특이성", en: "Special", ja: "特殊", zh: "特殊" },
          details: [
            "mini_special_robot",
            "mini_special_anime_male",
            "mini_special_anime_female",
            "mini_special_ghost",
            "mini_special_angel",
            "mini_special_devil"
          ]
        }
      }
    }
  };

  // 세분화 캐릭터 라벨
  const DETAIL_LABELS = {
    // --- 동물: 강아지 ---
    animal_dog_maltese: { ko: "말티즈 강아지", en: "Maltese dog", ja: "マルチーズ犬", zh: "马尔济斯犬" },
    animal_dog_poodle: { ko: "푸들 강아지", en: "Poodle dog", ja: "プードル犬", zh: "贵宾犬" },
    animal_dog_retriever: { ko: "리트리버 강아지", en: "Retriever dog", ja: "レトリバー犬", zh: "寻回犬" },
    animal_dog_corgi: { ko: "코기 강아지", en: "Corgi dog", ja: "コーギー犬", zh: "柯基犬" },
    animal_dog_shiba: { ko: "시바견", en: "Shiba dog", ja: "シバ犬", zh: "柴犬" },
    animal_dog_dachshund: { ko: "닥스훈트 강아지", en: "Dachshund dog", ja: "ダックスフント犬", zh: "腊肠犬" },
    animal_dog_pomeranian: { ko: "포메라니안 강아지", en: "Pomeranian dog", ja: "ポメラニアン犬", zh: "博美犬" },
    animal_dog_bulldog: { ko: "불도그 강아지", en: "Bulldog dog", ja: "ブルドッグ犬", zh: "斗牛犬" },
    animal_dog_beagle: { ko: "비글 강아지", en: "Beagle dog", ja: "ビーグル犬", zh: "比格犬" },
    animal_dog_husky: { ko: "허스키 강아지", en: "Husky dog", ja: "ハスキー犬", zh: "哈士奇犬" },

    // --- 동물: 고양이 ---
    animal_cat_tuxedo: { ko: "턱시도 고양이", en: "Tuxedo cat", ja: "タキシード猫", zh: "燕尾服猫" },
    animal_cat_calico: { ko: "칼리코 고양이", en: "Calico cat", ja: "三毛猫", zh: "三花猫" },
    animal_cat_siamese: { ko: "샴 고양이", en: "Siamese cat", ja: "シャム猫", zh: "暹罗猫" },
    animal_cat_british: { ko: "브리티시 쇼트헤어", en: "British Shorthair", ja: "ブリティッシュショートヘア", zh: "英短猫" },
    animal_cat_scottish: { ko: "스코티시 폴드", en: "Scottish Fold", ja: "スコティッシュフォールド", zh: "苏格兰折耳猫" },
    animal_cat_persian: { ko: "페르시안 고양이", en: "Persian cat", ja: "ペルシャ猫", zh: "波斯猫" },
    animal_cat_black: { ko: "검은 고양이", en: "Black cat", ja: "黒猫", zh: "黑猫" },
    animal_cat_tabby: { ko: "줄무늬 고양이", en: "Tabby cat", ja: "トラ猫", zh: "虎斑猫" },
    animal_cat_white: { ko: "하얀 고양이", en: "White cat", ja: "白猫", zh: "白猫" },
    animal_cat_ragdoll: { ko: "랙돌 고양이", en: "Ragdoll cat", ja: "ラグドール猫", zh: "布偶猫" },

    // --- 동물: 기타 ---
    animal_tiger_default: { ko: "귀여운 아기 호랑이", en: "Cute baby tiger", ja: "かわいい子トラ", zh: "可爱的小老虎" },
    animal_rabbit_default: { ko: "통통한 토끼 캐릭터", en: "Chubby rabbit character", ja: "ふっくらウサギキャラ", zh: "圆润的兔子角色" },
    animal_bear_default: { ko: "곰돌이 캐릭터", en: "Teddy bear character", ja: "クマさんキャラ", zh: "小熊角色" },
    animal_fox_default: { ko: "여우 캐릭터", en: "Fox character", ja: "キツネキャラ", zh: "狐狸角色" },
    animal_panda_default: { ko: "판다 캐릭터", en: "Panda character", ja: "パンダキャラ", zh: "熊猫角色" },
    animal_bird_default: { ko: "작은 새 캐릭터", en: "Small bird character", ja: "小さな鳥キャラ", zh: "小鸟角色" },
    animal_hamster_default: { ko: "통통한 햄스터", en: "Chubby hamster", ja: "ぽっちゃりハムスター", zh: "胖乎乎的仓鼠" },
    animal_penguin_default: { ko: "펭귄 캐릭터", en: "Penguin character", ja: "ペンギンキャラ", zh: "企鹅角色" },

    // --- 식물: 꽃 ---
    plant_flower_rose: { ko: "장미 꽃", en: "Rose flower", ja: "バラの花", zh: "玫瑰花" },
    plant_flower_tulip: { ko: "튤립 꽃", en: "Tulip flower", ja: "チューリップの花", zh: "郁金香花" },
    plant_flower_sunflower: { ko: "해바라기 꽃", en: "Sunflower", ja: "ひまわり", zh: "向日葵" },
    plant_flower_cherry: { ko: "벚꽃", en: "Cherry blossom", ja: "桜の花", zh: "樱花" },
    plant_flower_lily: { ko: "백합 꽃", en: "Lily flower", ja: "ユリの花", zh: "百合花" },
    plant_flower_daisy: { ko: "데이지 꽃", en: "Daisy flower", ja: "デイジーの花", zh: "雏菊" },
    plant_flower_carnation: { ko: "카네이션 꽃", en: "Carnation flower", ja: "カーネーションの花", zh: "康乃馨" },
    plant_flower_lavender: { ko: "라벤더 꽃", en: "Lavender flower", ja: "ラベンダーの花", zh: "薰衣草" },
    plant_flower_peony: { ko: "모란/작약 꽃", en: "Peony flower", ja: "ボタンの花", zh: "牡丹花" },
    plant_flower_cosmos: { ko: "코스모스 꽃", en: "Cosmos flower", ja: "コスモスの花", zh: "波斯菊" },

    // --- 식물: 나무 ---
    plant_tree_sprout: { ko: "새싹 나무", en: "Sprout tree", ja: "芽吹いた木", zh: "嫩芽小树" },
    plant_tree_pine: { ko: "소나무", en: "Pine tree", ja: "松の木", zh: "松树" },
    plant_tree_maple: { ko: "단풍나무", en: "Maple tree", ja: "カエデの木", zh: "枫树" },
    plant_tree_cherry: { ko: "벚꽃 나무", en: "Cherry tree", ja: "桜の木", zh: "樱花树" },
    plant_tree_palm: { ko: "야자나무", en: "Palm tree", ja: "ヤシの木", zh: "棕榈树" },
    plant_tree_bonsai: { ko: "분재 나무", en: "Bonsai tree", ja: "盆栽の木", zh: "盆景树" },
    plant_tree_birch: { ko: "자작나무", en: "Birch tree", ja: "シラカバの木", zh: "白桦树" },
    plant_tree_oak: { ko: "참나무", en: "Oak tree", ja: "オークの木", zh: "橡树" },
    plant_tree_willow: { ko: "버드나무", en: "Willow tree", ja: "柳の木", zh: "柳树" },
    plant_tree_ginkgo: { ko: "은행나무", en: "Ginkgo tree", ja: "イチョウの木", zh: "银杏树" },

    // --- 사람: 남자 ---
    human_male_office: { ko: "남자 직장인", en: "Male office worker", ja: "男性会社員", zh: "男职员" },
    human_male_manual: { ko: "남자 현장 근로자", en: "Male manual worker", ja: "男性現場作業員", zh: "男体力劳动者" },
    human_male_parttime: { ko: "남자 알바생", en: "Male part-timer", ja: "男性アルバイト", zh: "男兼职生" },
    human_male_child: { ko: "남자 아이", en: "Boy (child)", ja: "男の子（子ども）", zh: "男孩（儿童）" },
    human_male_elementary: { ko: "남자 초등학생", en: "Boy elementary student", ja: "男子小学生", zh: "男小学生" },
    human_male_middle: { ko: "남자 중학생", en: "Boy middle-school student", ja: "男子中学生", zh: "男初中生" },
    human_male_high: { ko: "남자 고등학생", en: "Boy high-school student", ja: "男子高校生", zh: "男高中生" },
    human_male_univ: { ko: "남자 대학생", en: "Male college student", ja: "男子大学生", zh: "男大学生" },

    // --- 사람: 여자 ---
    human_female_office: { ko: "여자 직장인", en: "Female office worker", ja: "女性会社員", zh: "女职员" },
    human_female_manual: { ko: "여자 현장 근로자", en: "Female manual worker", ja: "女性現場作業員", zh: "女体力劳动者" },
    human_female_parttime: { ko: "여자 알바생", en: "Female part-timer", ja: "女性アルバイト", zh: "女兼职生" },
    human_female_child: { ko: "여자 아이", en: "Girl (child)", ja: "女の子（子ども）", zh: "女孩（儿童）" },
    human_female_elementary: { ko: "여자 초등학생", en: "Girl elementary student", ja: "女子小学生", zh: "女小学生" },
    human_female_middle: { ko: "여자 중학생", en: "Girl middle-school student", ja: "女子中学生", zh: "女初中生" },
    human_female_high: { ko: "여자 고등학생", en: "Girl high-school student", ja: "女子高校生", zh: "女高中生" },
    human_female_univ: { ko: "여자 대학생", en: "Female college student", ja: "女子大学生", zh: "女大学生" },

    // --- 음식 ---
    food_breakfast_default: { ko: "아침 식사 세트 캐릭터", en: "Breakfast meal character", ja: "朝食セットキャラ", zh: "早餐组合角色" },
    food_lunch_default: { ko: "점심 식사 세트 캐릭터", en: "Lunch meal character", ja: "昼食セットキャラ", zh: "午餐组合角色" },
    food_dinner_default: { ko: "저녁 식사 세트 캐릭터", en: "Dinner meal character", ja: "夕食セットキャラ", zh: "晚餐组合角色" },
    food_dessert_default: { ko: "디저트 캐릭터", en: "Dessert character", ja: "デザートキャラ", zh: "甜点角色" },

    // --- 미니어처: 동물 ---
    mini_animal_bee: { ko: "미니 꿀벌 캐릭터", en: "Mini bee character", ja: "ミニハチキャラ", zh: "迷你蜜蜂角色" },
    mini_animal_ant: { ko: "미니 개미 캐릭터", en: "Mini ant character", ja: "ミニアリキャラ", zh: "迷你蚂蚁角色" },
    mini_animal_beetle: { ko: "미니 풍뎅이 캐릭터", en: "Mini beetle character", ja: "ミニカブトムシキャラ", zh: "迷你甲虫角色" },
    mini_animal_stag: { ko: "미니 사슴벌레 캐릭터", en: "Mini stag beetle character", ja: "ミニクワガタキャラ", zh: "迷你锹形虫角色" },

    // --- 미니어처: 사람 ---
    mini_human_male_helmet: { ko: "미니 남자 헬멧 캐릭터", en: "Mini male character with helmet", ja: "ミニ男性ヘルメットキャラ", zh: "迷你戴头盔男角色" },
    mini_human_female_helmet: { ko: "미니 여자 헬멧 캐릭터", en: "Mini female character with helmet", ja: "ミニ女性ヘルメットキャラ", zh: "迷你戴头盔女角色" },

    // --- 미니어처: 특이성 ---
    mini_special_robot: { ko: "미니 로봇 캐릭터", en: "Mini robot character", ja: "ミニロボットキャラ", zh: "迷你机器人角色" },
    mini_special_anime_male: { ko: "애니풍 남자 미니 캐릭터", en: "Anime-style mini male character", ja: "アニメ風ミニ男性キャラ", zh: "动漫风迷你男角色" },
    mini_special_anime_female: { ko: "애니풍 여자 미니 캐릭터", en: "Anime-style mini female character", ja: "アニメ風ミニ女性キャラ", zh: "动漫风迷你女角色" },
    mini_special_ghost: { ko: "유령 미니 캐릭터", en: "Ghost mini character", ja: "ゴーストミニキャラ", zh: "幽灵迷你角色" },
    mini_special_angel: { ko: "천사 미니 캐릭터", en: "Angel mini character", ja: "天使ミニキャラ", zh: "天使迷你角色" },
    mini_special_devil: { ko: "악마 미니 캐릭터", en: "Devil mini character", ja: "悪魔ミニキャラ", zh: "恶魔迷你角色" }
  };

  // 감정·상황 세트 (정책 적용)
  const EMOTION_SETS_INFO_BASE = {
    daily: {
      id: "daily",
      labels: { ko: "일상생활 24종", en: "Daily Life 24", ja: "日常生活 24種", zh: "日常生活24套" }
    },
    work: {
      id: "work",
      labels: { ko: "직장생활 24종", en: "Work 24", ja: "仕事 24種", zh: "职场24套" }
    },
    couple: {
      id: "couple",
      labels: { ko: "연인 데이트 24종", en: "Couple Date 24", ja: "恋人デート 24種", zh: "情侣约会24套" }
    },
    christmas: {
      id: "christmas",
      labels: { ko: "크리스마스 24종", en: "Christmas 24", ja: "クリスマス 24種", zh: "圣诞节24套" }
    },
    seollal: {
      id: "seollal",
      labels: { ko: "설날 24종", en: "Korean New Year 24", ja: "正月 24種", zh: "新年24套" }
    },
    yearend: {
      id: "yearend",
      labels: { ko: "연말 24종", en: "Year-end 24", ja: "年末 24種", zh: "年末24套" }
    }
  };

  function buildEmotionSets(policy) {
    const sets = JSON.parse(JSON.stringify(EMOTION_SETS_INFO_BASE));

    const allowedA = {
      daily: [1, 9, 24, 50],
      work: [1, 9, 24],
      couple: [1, 9, 24],
      christmas: [1, 9, 24],
      seollal: [1, 9, 24],
      yearend: [1, 9, 24]
    };

    const allowedB = {
      daily: [1, 9, 24, 50],
      work: [1, 9, 24, 50],
      couple: [1, 9, 24, 50],
      christmas: [1, 9, 24, 50],
      seollal: [1, 9, 24, 50],
      yearend: [1, 9, 24, 50]
    };

    const allowed = policy === "B" ? allowedB : allowedA;

    Object.keys(sets).forEach((key) => {
      const max = Math.max(...allowed[key]);
      sets[key].allowedCounts = allowed[key];
      sets[key].defaultCount = allowed[key].includes(24) ? 24 : allowed[key][allowed[key].length - 1];

      // 라벨 표시를 max에 맞춰 자동 변경
      sets[key].labels.ko = sets[key].labels.ko.replace(/\d+종/g, `${max}종`);
      sets[key].labels.en = sets[key].labels.en.replace(/\d+/g, `${max}`);
      sets[key].labels.ja = sets[key].labels.ja.replace(/\d+種/g, `${max}種`);
      sets[key].labels.zh = sets[key].labels.zh.replace(/\d+/g, `${max}`);
    });

    return sets;
  }

  const EMOTION_SETS_INFO = buildEmotionSets(SET_POLICY);

  // 배경 테마 (✅ 투명 배경 포함)
  const THEMES_INFO = {
    park: { id: "park", labels: { ko: "공원", en: "Park", ja: "公園", zh: "公园" } },
    bench: { id: "bench", labels: { ko: "벤치", en: "Bench", ja: "ベンチ", zh: "长椅" } },
    restaurant: { id: "restaurant", labels: { ko: "식당", en: "Restaurant", ja: "レストラン", zh: "餐厅" } },
    office: { id: "office", labels: { ko: "회사", en: "Office", ja: "会社", zh: "公司" } },
    hospital: { id: "hospital", labels: { ko: "병원", en: "Hospital", ja: "病院", zh: "医院" } },
    white: { id: "white", labels: { ko: "흰색 배경", en: "White Background", ja: "白背景", zh: "白色背景" } },
    transparent: { id: "transparent", labels: { ko: "투명 배경", en: "Transparent", ja: "透明背景", zh: "透明背景" } }
  };

  // 의상 30종
  const OUTFIT_INFO = {
    auto: { id: "auto", labels: { ko: "선택 안 함 (세트 기본 옷)", en: "No override (set default outfit)", ja: "指定なし（セット基本衣装）", zh: "不指定（套装默认服装）" } },
    casual: { id: "casual", labels: { ko: "캐주얼", en: "Casual outfit", ja: "カジュアル", zh: "休闲装" } },
    hoodie: { id: "hoodie", labels: { ko: "후드티", en: "Hoodie outfit", ja: "パーカー", zh: "连帽衫" } },
    shirt_jeans: { id: "shirt_jeans", labels: { ko: "셔츠 + 청바지", en: "Shirt & jeans", ja: "シャツ＋ジーンズ", zh: "衬衫＋牛仔裤" } },
    suit: { id: "suit", labels: { ko: "정장", en: "Formal suit", ja: "スーツ", zh: "西装" } },
    office_casual: { id: "office_casual", labels: { ko: "오피스 캐주얼", en: "Office casual", ja: "オフィスカジュアル", zh: "职场休闲" } },
    school_uniform: { id: "school_uniform", labels: { ko: "교복", en: "School uniform", ja: "制服", zh: "校服" } },
    pe_uniform: { id: "pe_uniform", labels: { ko: "체육복", en: "PE uniform", ja: "体操服", zh: "运动服" } },
    pajama: { id: "pajama", labels: { ko: "파자마", en: "Pajamas", ja: "パジャマ", zh: "睡衣" } },
    training: { id: "training", labels: { ko: "트레이닝복", en: "Training wear", ja: "ジャージ", zh: "运动套装" } },
    idol_stage: { id: "idol_stage", labels: { ko: "아이돌 무대 의상", en: "Idol stage outfit", ja: "アイドルステージ衣装", zh: "爱豆舞台服" } },
    idol_casual: { id: "idol_casual", labels: { ko: "아이돌 사복", en: "Idol casual outfit", ja: "アイドル私服", zh: "爱豆私服" } },
    dress: { id: "dress", labels: { ko: "원피스/드레스", en: "Dress", ja: "ワンピース", zh: "连衣裙" } },
    coat_scarf: { id: "coat_scarf", labels: { ko: "코트 + 머플러", en: "Coat & scarf", ja: "コート＋マフラー", zh: "大衣＋围巾" } },
    raincoat: { id: "raincoat", labels: { ko: "우비", en: "Raincoat", ja: "レインコート", zh: "雨衣" } },
    hanbok: { id: "hanbok", labels: { ko: "한복 스타일", en: "Hanbok style", ja: "韓服風", zh: "韩服风" } },
    workwear_construction: { id: "workwear_construction", labels: { ko: "작업복 (노가다 느낌)", en: "Construction workwear", ja: "作業服", zh: "工地工作服" } },
    apron_cafe: { id: "apron_cafe", labels: { ko: "카페 앞치마", en: "Cafe apron outfit", ja: "カフェエプロン", zh: "咖啡厅围裙装" } },
    doctor: { id: "doctor", labels: { ko: "의사 가운", en: "Doctor coat", ja: "白衣（医者）", zh: "医生白大褂" } },
    nurse: { id: "nurse", labels: { ko: "간호복", en: "Nurse uniform", ja: "看護服", zh: "护士服" } },
    santa: { id: "santa", labels: { ko: "산타복", en: "Santa costume", ja: "サンタ衣装", zh: "圣诞老人服装" } },
    winter_knit: { id: "winter_knit", labels: { ko: "겨울 니트", en: "Winter knit outfit", ja: "冬ニット", zh: "冬季针织衫" } },
    cardigan_skirt: { id: "cardigan_skirt", labels: { ko: "가디건 + 스커트", en: "Cardigan & skirt", ja: "カーディガン＋スカート", zh: "开衫＋裙子" } },
    sailor_uniform: { id: "sailor_uniform", labels: { ko: "세일러복", en: "Sailor uniform", ja: "セーラー服", zh: "水手服" } },
    techwear: { id: "techwear", labels: { ko: "테크웨어", en: "Techwear style", ja: "テックウェア", zh: "机能风" } },
    oversized_sweater: { id: "oversized_sweater", labels: { ko: "오버핏 스웨터", en: "Oversized sweater", ja: "オーバーサイズセーター", zh: "宽松毛衣" } },
    summer_shorts: { id: "summer_shorts", labels: { ko: "반팔 + 반바지", en: "T-shirt & shorts", ja: "半袖＋ショートパンツ", zh: "短袖＋短裤" } },
    yukata: { id: "yukata", labels: { ko: "유카타 스타일", en: "Yukata style", ja: "浴衣スタイル", zh: "浴衣风" } },
    chinese_traditional: { id: "chinese_traditional", labels: { ko: "중국 전통 스타일", en: "Chinese traditional style", ja: "中国伝統風", zh: "中国传统风" } },
    magician_cape: { id: "magician_cape", labels: { ko: "마법사 망토", en: "Magician cape outfit", ja: "魔法使いマント", zh: "魔法师披风装" } }
  };

  // 색상 옵션
  const COLOR_INFO = {
    auto: { id: "auto", labels: { ko: "선택 안 함 (세트 기본 색상)", en: "No override (set default colors)", ja: "指定なし（セット基本カラー）", zh: "不指定（套装默认颜色）" } },
    red: { id: "red", labels: { ko: "레드 계열", en: "Red tones", ja: "レッド系", zh: "红色系" } },
    blue: { id: "blue", labels: { ko: "블루 계열", en: "Blue tones", ja: "ブルー系", zh: "蓝色系" } },
    green: { id: "green", labels: { ko: "그린 계열", en: "Green tones", ja: "グリーン系", zh: "绿色系" } },
    yellow: { id: "yellow", labels: { ko: "옐로우 계열", en: "Yellow tones", ja: "イエロー系", zh: "黄色系" } },
    pink: { id: "pink", labels: { ko: "핑크 계열", en: "Pink tones", ja: "ピンク系", zh: "粉色系" } },
    purple: { id: "purple", labels: { ko: "퍼플 계열", en: "Purple tones", ja: "パープル系", zh: "紫色系" } },
    bw: { id: "bw", labels: { ko: "블랙 & 화이트", en: "Black & white", ja: "白黒", zh: "黑白" } },
    pastel: { id: "pastel", labels: { ko: "파스텔 톤", en: "Pastel palette", ja: "パステル調", zh: "马卡龙色" } },
    neon: { id: "neon", labels: { ko: "네온 톤", en: "Neon accents", ja: "ネオン調", zh: "霓虹色" } }
  };

  // 컨셉 스타일 4종
  const CONCEPT_STYLES = [
    {
      id: "word_icon_doodle",
      labels: { ko: "손글씨 글자+아이콘", en: "Handwritten text + icon", ja: "手書き文字＋アイコン", zh: "手写文字＋小图标" },
      descriptions: {
        ko: "손으로 휘갈겨 쓴 듯한 낙서 스타일의 한글 단어와 간단한 아이콘이 함께 있는 이모티콘. 파스텔 톤, 살짝 거친 크레파스 느낌의 두꺼운 선, 동글동글한 글자와 심플한 그림 중심, 깨끗한 흰색 배경.",
        en: "Doodle style emoticons with handwritten Korean words and simple icons. Pastel tones, slightly rough crayon-like thick lines, round letters and simple drawings on a clean white background.",
        ja: "ラフな手書きハングル文字とシンプルなアイコンを組み合わせた落書きスタイルの絵文字。パステルカラー、少しざらっとしたクレヨン風の太い線、白い背景。",
        zh: "涂鸦风格表情符号，搭配手写韩文单词和简单小图标。马卡龙配色，略带蜡笔质感的粗线条，干净的白色背景。"
      }
    },
    {
      id: "heart_bear_love",
      labels: { ko: "하트 곰돌이 응원", en: "Heart bear cheering", ja: "ハートくま応援", zh: "爱心小熊应援" },
      descriptions: {
        ko: "통통한 크림색 곰 캐릭터가 하트, 꽃, 선물, 커피, 집, 욕조 등 일상 소품을 들고 응원·위로·감사 인사를 전하는 이모티콘. 따뜻한 파스텔 톤과 부드러운 곡선, 심플한 배경이 특징.",
        en: "Chubby cream-colored bear holding hearts, flowers, gifts, coffee or daily props, sending cheering, comfort and thanks. Warm pastel tones, soft curves and simple backgrounds.",
        ja: "ふっくらしたクリーム色のクマがハートや花、プレゼントなどの日常小物を持って応援や感謝のメッセージを伝える絵文字。柔らかいパステルカラーとシンプルな背景が特徴。",
        zh: "胖乎乎的奶油色小熊拿着爱心、花朵、礼物、咖啡等日常小物，表达应援、安慰和感谢。柔和的粉彩色调，简洁背景。"
      }
    },
    {
      id: "hamster_polite_talk",
      labels: { ko: "햄스터 존댓말 토크", en: "Hamster polite talk", ja: "ハムスター敬語トーク", zh: "仓鼠礼貌对话" },
      descriptions: {
        ko: "작은 햄스터 캐릭터가 회사·일상 대화에서 자주 쓰는 정중한 말과 가벼운 유머를 함께 표현하는 이모티콘. 흰 털, 얇은 선, 파스텔 포인트 컬러, 말풍선 또는 짧은 문장을 함께 배치.",
        en: "Small hamster character expressing polite phrases and light humor used in work and daily chat. White fur, thin lines, pastel accent colors and short text or speech bubbles.",
        ja: "小さなハムスターキャラが仕事や日常会話で使う丁寧な言葉と軽いユーモアを表現する絵文字。白い毛、細いライン、パステルのアクセントカラー、短い文字付き。",
        zh: "小仓鼠角色，用在职场和日常聊天中的礼貌用语和一点幽默。白色毛发，细线条，淡雅配色，配合对话框或短句。"
      }
    },
    {
      id: "soft_puppy_greeting",
      labels: { ko: "부드러운 인사 캐릭터", en: "Soft greeting character", ja: "やさしい挨拶キャラ", zh: "温柔问候角色" },
      descriptions: {
        ko: "둥글둥글한 강아지나 곰 느낌의 캐릭터가 정중한 인사와 감정 표현을 하는 이모티콘. 과한 디테일 없이 심플한 몸짓과 한글 문장을 함께 보여주고, 차분한 파스텔 톤과 깨끗한 흰 배경을 사용.",
        en: "Round puppy/bear-like character giving polite greetings and emotional messages. Simple poses with Korean text, calm pastel tones and a clean white background.",
        ja: "丸い子犬やクマ風キャラが丁寧な挨拶や気持ちを伝える絵文字。シンプルなポーズとハングル文字、落ち着いたパステルカラー、白背景。",
        zh: "圆润的狗狗或小熊风角色，用简洁动作和韩文句子表达礼貌问候与情感。安静的粉彩色调，干净白底。"
      }
    }
  ];

  // 소품 / 물건 리스트
  const PROP_ITEMS = [
    { id: "none", labels: { ko: "소품 없이", en: "No props", ja: "小物なし", zh: "无道具" }, prompts: { ko: "", en: "", ja: "", zh: "" } },
    { id: "coffee_mug", labels: { ko: "머그컵 커피", en: "Coffee mug", ja: "マグカップコーヒー", zh: "马克杯咖啡" },
      prompts: { ko: "손에는 따뜻한 머그컵 커피를 들고 있고", en: "holding a warm coffee mug in one hand", ja: "片手に温かいマグカップのコーヒーを持っていて", zh: "一只手端着一杯温热的咖啡" } },
    { id: "smartphone", labels: { ko: "스마트폰", en: "Smartphone", ja: "スマートフォン", zh: "手机" },
      prompts: { ko: "한 손에는 스마트폰을 들고 화면을 바라보며", en: "holding a smartphone and looking at the screen", ja: "片手にスマホを持ち画面を見つめながら", zh: "一手拿着手机看着屏幕" } },
    { id: "gift_box", labels: { ko: "선물 상자", en: "Gift box", ja: "プレゼント箱", zh: "礼物盒" },
      prompts: { ko: "앞에는 리본이 달린 작은 선물 상자가 놓여 있고", en: "with a small gift box with a ribbon placed in front", ja: "前にはリボン付きの小さなプレゼント箱が置かれていて", zh: "面前放着一个系着丝带的小礼盒" } },
    { id: "laptop", labels: { ko: "노트북", en: "Laptop", ja: "ノートパソコン", zh: "笔记本电脑" },
      prompts: { ko: "앞에 노트북이 펼쳐져 있고 그 앞에 앉아 있으며", en: "sitting in front of an open laptop", ja: "開いたノートPCの前に座っていて", zh: "坐在打开的笔记本电脑前" } },
    { id: "earphones", labels: { ko: "이어폰", en: "Earphones", ja: "イヤホン", zh: "耳机" },
      prompts: { ko: "귀에는 작은 이어폰을 꽂고 음악을 들으며", en: "wearing small earphones and listening to music", ja: "耳に小さなイヤホンをつけて音楽を聴きながら", zh: "耳朵里戴着小耳机听音乐" } },
    { id: "umbrella", labels: { ko: "우산", en: "Umbrella", ja: "傘", zh: "伞" },
      prompts: { ko: "한 손에 접힌 우산을 들고 있고", en: "holding a folded umbrella in one hand", ja: "片手に畳んだ傘を持っていて", zh: "一只手拿着折叠的雨伞" } },
    { id: "flower_bouquet", labels: { ko: "꽃다발", en: "Flower bouquet", ja: "花束", zh: "花束" },
      prompts: { ko: "두 손으로 작은 꽃다발을 꼭 안고 있으며", en: "hugging a small flower bouquet with both hands", ja: "両手で小さな花束をぎゅっと抱えていて", zh: "双手紧紧抱着一束小花" } },
    { id: "blanket", labels: { ko: "담요", en: "Blanket", ja: "ブランケット", zh: "小毯子" },
      prompts: { ko: "포근한 담요를 몸에 두르고 편안한 느낌으로", en: "wrapped in a cozy blanket, looking relaxed", ja: "ふかふかのブランケットにくるまれてリラックスした様子で", zh: "裹着柔软的毯子，表情放松" } },
    { id: "pillow", labels: { ko: "베개", en: "Pillow", ja: "枕", zh: "枕头" },
      prompts: { ko: "작은 베개를 끌어안고 포근하게 기대어 있으며", en: "snuggling against a small pillow", ja: "小さな枕を抱きしめてもたれかかっていて", zh: "抱着小枕头轻轻依靠着" } }
  ];

  // ✅ 최종 Export (딱 1번만)
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
    PROP_ITEMS,

    // 디버깅 확인용
    __META: {
      SET_POLICY,
      allowedCountsBySet: Object.fromEntries(
        Object.entries(EMOTION_SETS_INFO).map(([k, v]) => [k, v.allowedCounts])
      )
    }
  };
})();
