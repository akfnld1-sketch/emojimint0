"use strict";

/**
 * 캐릭터 디테일: 프론트에서 보내는 detailId -> 실제 마스터 프롬프트 조각
 */
const CHARACTER_DETAILS = {
  // --- 동물 > 강아지 10종 ---
  animal_dog_maltese: {
    base: "cute maltese puppy, fluffy white fur, round face, big black eyes"
  },
  animal_dog_poodle: {
    base: "small toy poodle, curly brown fur, energetic pose"
  },
  animal_dog_retriever: {
    base: "golden retriever puppy, soft golden fur, gentle smile"
  },
  animal_dog_corgi: {
    base: "corgi puppy, short legs, chubby body, big ears"
  },
  animal_dog_shiba: {
    base: "shiba inu puppy, fox-like face, orange fur, confident look"
  },
  animal_dog_dachshund: {
    base: "dachshund puppy, long body, short legs, curious expression"
  },
  animal_dog_pomeranian: {
    base: "pomeranian puppy, fluffy round body, very puffy fur"
  },
  animal_dog_bulldog: {
    base: "bulldog puppy, wrinkled face, sturdy body, cute stubborn look"
  },
  animal_dog_beagle: {
    base: "beagle puppy, tricolor fur, long ears, sniffing pose"
  },
  animal_dog_husky: {
    base: "husky puppy, blue eyes, wolf-like fur, playful expression"
  },

  // --- 동물 > 고양이 10종 ---
  animal_cat_tuxedo: {
    base: "tuxedo cat, black and white fur, sharp contrast, curious eyes"
  },
  animal_cat_calico: {
    base: "calico cat, orange and black patches, gentle smile"
  },
  animal_cat_siamese: {
    base: "siamese cat, slim body, blue eyes, elegant pose"
  },
  animal_cat_british: {
    base: "british shorthair cat, round face, thick gray fur"
  },
  animal_cat_scottish: {
    base: "scottish fold cat, folded ears, huge round eyes"
  },
  animal_cat_persian: {
    base: "persian cat, long fluffy fur, slightly grumpy cute face"
  },
  animal_cat_black: {
    base: "black cat, shiny fur, yellow eyes, mysterious smile"
  },
  animal_cat_tabby: {
    base: "tabby cat, striped fur, relaxed pose"
  },
  animal_cat_white: {
    base: "white cat, pure white fur, pink nose, innocent look"
  },
  animal_cat_ragdoll: {
    base: "ragdoll cat, blue eyes, semi-long fur, soft relaxed body"
  },

  // --- 대표 동물들 (호랑이 등) ---
  animal_tiger_default: {
    base: "baby tiger, small round body, orange fur with stripes"
  },
  animal_rabbit_default: {
    base: "chubby bunny, long ears, soft white fur"
  },
  animal_bear_default: {
    base: "baby bear, round ears, plump body, friendly smile"
  },
  animal_fox_default: {
    base: "baby fox, orange fur, fluffy tail, clever expression"
  },
  animal_panda_default: {
    base: "baby panda, black and white fur, sleepy cute eyes"
  },
  animal_bird_default: {
    base: "small round bird, tiny wings, simple color, singing"
  },
  animal_hamster_default: {
    base: "hamster, small chubby body, holding a snack"
  },
  animal_penguin_default: {
    base: "baby penguin, tiny wings, round belly, wobbling pose"
  },

  // --- 식물: 꽃 / 나무 각 10종 (간단 예시) ---
  plant_flower_rose: {
    base: "single rose flower character, round petals, soft red color"
  },
  plant_flower_tulip: {
    base: "tulip flower character, simple petal shape, pastel colors"
  },
  plant_flower_sunflower: {
    base: "sunflower character, big round face, yellow petals"
  },
  plant_flower_cherry: {
    base: "cherry blossom flower character, soft pink petals"
  },
  plant_flower_lily: {
    base: "lily flower character, elegant white petals"
  },
  plant_flower_daisy: {
    base: "daisy flower character, white petals, yellow center"
  },
  plant_flower_carnation: {
    base: "carnation flower character, frilled petals"
  },
  plant_flower_lavender: {
    base: "lavender flower character, tall slim shape, purple color"
  },
  plant_flower_peony: {
    base: "peony flower character, many thick petals, luxury feel"
  },
  plant_flower_cosmos: {
    base: "cosmos flower character, light petals, gentle mood"
  },

  plant_tree_sprout: {
    base: "small sprout character, two leaves, tiny body"
  },
  plant_tree_pine: {
    base: "pine tree character, triangular shape, deep green"
  },
  plant_tree_maple: {
    base: "maple tree character, red leaves, autumn mood"
  },
  plant_tree_cherry: {
    base: "cherry blossom tree character, full pink blossoms"
  },
  plant_tree_palm: {
    base: "palm tree character, long trunk, tropical leaves"
  },
  plant_tree_bonsai: {
    base: "bonsai tree character, tiny pot, twisted trunk"
  },
  plant_tree_birch: {
    base: "birch tree character, white trunk, light green leaves"
  },
  plant_tree_oak: {
    base: "oak tree character, wide crown, sturdy feel"
  },
  plant_tree_willow: {
    base: "willow tree character, long hanging branches"
  },
  plant_tree_ginkgo: {
    base: "ginkgo tree character, fan-shaped leaves, yellow color"
  },

  // --- 사람: 남자 셋트 ---
  human_male_office: {
    base: "office worker man, neat shirt and tie, simple hairstyle"
  },
  human_male_manual: {
    base: "construction worker man, safety helmet, work vest"
  },
  human_male_parttime: {
    base: "part-time worker man, apron, casual clothes"
  },
  human_male_child: {
    base: "young boy, short hair, simple T-shirt"
  },
  human_male_elementary: {
    base: "elementary school boy, backpack, school uniform"
  },
  human_male_middle: {
    base: "middle school boy, casual school uniform"
  },
  human_male_high: {
    base: "high school boy, blazer uniform, teenage look"
  },
  human_male_univ: {
    base: "college student man, hoodie, backpack"
  },

  // --- 사람: 여자 셋트 ---
  human_female_office: {
    base: "office worker woman, blouse and skirt, tidy hairstyle"
  },
  human_female_manual: {
    base: "construction worker woman, safety helmet, work gloves"
  },
  human_female_parttime: {
    base: "part-time worker woman, cafe apron, ponytail"
  },
  human_female_child: {
    base: "young girl, bobbed hair, cute dress"
  },
  human_female_elementary: {
    base: "elementary school girl, backpack, school uniform"
  },
  human_female_middle: {
    base: "middle school girl, casual uniform"
  },
  human_female_high: {
    base: "high school girl, blazer uniform"
  },
  human_female_univ: {
    base: "college student woman, knitwear, shoulder bag"
  },

  // --- 미니어쳐: 동물 / 사람 / 특이성 ---
  mini_animal_bee: {
    base: "tiny bee character, round body, small wings, cute stripes"
  },
  mini_animal_ant: {
    base: "tiny ant character, simple body, three segments"
  },
  mini_animal_beetle: {
    base: "small beetle character, shiny shell"
  },
  mini_animal_stag: {
    base: "small stag beetle character, big antlers, chibi style"
  },

  mini_human_male_helmet: {
    base: "miniature man with safety helmet, simplified body"
  },
  mini_human_female_helmet: {
    base: "miniature woman with safety helmet, simplified body"
  },

  mini_special_robot: {
    base: "small robot character, simple metal body, LED eyes"
  },
  mini_special_anime_male: {
    base: "anime-style male chibi character, big hair, expressive eyes"
  },
  mini_special_anime_female: {
    base: "anime-style female chibi character, flowing hair"
  },
  mini_special_ghost: {
    base: "cute ghost character, soft outline, floating"
  },
  mini_special_angel: {
    base: "angel character, small wings, halo"
  },
  mini_special_devil: {
    base: "devil character, small horns, mischievous smile"
  }
};

/**
 * 감정 세트: 각 24종, 프롬프트용 영어만 서버에 보관
 */
const EMOTION_SETS = {
  daily: {
    label: "daily life 24 set",
    items: [
      "bright joyful smile",
      "big laughing face",
      "slightly annoyed expression",
      "sleepy tired eyes",
      "sad teary eyes",
      "surprised wide eyes",
      "soft happy smile",
      "curious tilted head",
      "confused expression",
      "relieved sigh",
      "embarrassed blush",
      "shy smile",
      "confident pose",
      "excited sparkling eyes",
      "bored face",
      "serious focused eyes",
      "panicked expression",
      "pouting lips",
      "playful wink",
      "deeply touched tears",
      "expectant eyes",
      "calm relaxed face",
      "frustrated facepalm",
      "healing peaceful smile"
    ]
  },

  work: {
    label: "office & work 24 set",
    items: [
      "typing hard on keyboard",
      "giving presentation with pointer",
      "drinking coffee sleepily",
      "overwhelmed by documents",
      "celebrating success with fist pump",
      "checking time on watch",
      "talking in meeting",
      "secretly yawning",
      "making phone call",
      "focused on monitor",
      "stressed with sweat drop",
      "raising hand with idea",
      "reading report seriously",
      "stretching at desk",
      "eating quick lunch at desk",
      "slumped from overtime",
      "smiling kindly to coworker",
      "resentful look at workload",
      "happy payday expression",
      "signing document",
      "running late in corridor",
      "taking memo in notebook",
      "relaxed after work",
      "cheering team with both hands"
    ]
  },

  couple: {
    label: "couple & date 24 set",
    items: [
      "holding hands shyly",
      "blushing while looking away",
      "heart eyes expression",
      "sharing drink together",
      "taking selfie together",
      "jealous pout",
      "surprised by small gift",
      "laughing together",
      "arguing lightly",
      "crying then being comforted",
      "hugging tightly",
      "waving goodbye sadly",
      "waiting alone with phone",
      "excited before date",
      "forgiving smile",
      "playful teasing face",
      "serious talk expression",
      "embarrassed but happy",
      "small kiss on cheek",
      "watching movie together",
      "walking side by side",
      "looking at stars together",
      "celebrating anniversary",
      "promising with pinky fingers"
    ]
  },

  christmas: {
    label: "christmas 24 set",
    items: [
      "wearing santa hat",
      "holding small present box",
      "decorating christmas tree",
      "drinking hot cocoa",
      "throwing snowball",
      "building snowman",
      "sitting by fireplace",
      "singing carol",
      "opening gift with surprise",
      "hugging big present",
      "looking at falling snow",
      "riding sleigh",
      "wearing reindeer headband",
      "lighting sparkler",
      "sending christmas card",
      "wearing warm scarf",
      "sleeping with stocking full",
      "taking photo with tree",
      "laughing in snow",
      "waving merry christmas sign",
      "waiting for santa",
      "standing under mistletoe",
      "sharing cookie plate",
      "celebrating with party popper"
    ]
  },

  seollal: {
    label: "korean new year 24 set",
    items: [
      "wearing hanbok and bowing",
      "holding lucky pouch",
      "eating tteokguk",
      "receiving new year money",
      "giving new year money",
      "playing yut game",
      "visiting grandparents",
      "sweeping yard neatly",
      "cleaning house",
      "praying for good luck",
      "watching new year sunrise",
      "writing new year wish",
      "sharing traditional snacks",
      "calling relatives",
      "driving to hometown",
      "packing travel bag",
      "taking family photo",
      "smiling with full belly",
      "relieved after holiday",
      "worried about weight gain",
      "sleepy after long trip",
      "arguing lightly with sibling",
      "laughing at family story",
      "waving happy new year"
    ]
  },

  yearend: {
    label: "year-end 24 set",
    items: [
      "looking back at the year",
      "writing to-do list",
      "checking calendar last day",
      "drinking warm tea alone",
      "counting down with friends",
      "watching fireworks",
      "staring at night city lights",
      "hugging blanket on sofa",
      "working overtime at year-end",
      "closing laptop with relief",
      "teary eyes from memories",
      "smiling with gratitude",
      "nervous about next year",
      "making new year resolutions",
      "celebrating at party",
      "taking selfie with fireworks",
      "looking at clock at midnight",
      "feeling lonely in crowd",
      "cheering with both hands",
      "saying thank you message",
      "updating diary",
      "packing desk at year change",
      "wiping tears then smiling",
      "peaceful deep breath"
    ]
  }
};

/**
 * 테마: 뒷배경 / 장면
 */
const THEMES = {
  park: "in a simple park background",
  bench: "sitting on a bench background",
  restaurant: "inside a simple restaurant background",
  office: "in a clean office background",
  hospital: "in a simple hospital room background",
  white: "on pure white background only, no extra objects",
  transparent: "no background, only character on transparent canvas"
};

/**
 * 마스터 프롬프트 엔진에서 사용할 상수
 */
const MASTER_PREFIX =
  "super cute chibi emoji style, head 70% body 30%, full body visible, no cropping, single character only, no logo, no text, clean 2D line illustration, suitable for emoji and sticker, ";

const MASTER_SUFFIX =
  ", ultra clean edges, simple shading, consistent proportions every time";

module.exports = {
  CHARACTER_DETAILS,
  EMOTION_SETS,
  THEMES,
  MASTER_PREFIX,
  MASTER_SUFFIX
};
