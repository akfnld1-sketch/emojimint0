// frontend/js/main.js
"use strict";

(function () {
  // =========================
  // Helpers
  // =========================

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }
  function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }
  function clampInt(n, min, max) {
    const x = parseInt(n, 10);
    if (Number.isNaN(x)) return min;
    return Math.max(min, Math.min(max, x));
  }
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // =========================
  // State
  // =========================

  const state = {
    lang: "ko",

    selectedCategoryId: "",
    selectedSubCategoryId: "",
    selectedDetailId: "",

    selectedEmotionSetId: "",
    selectedCount: 24,

    selectedThemeId: "white",
    selectedOutfitId: "auto",
    selectedColorId: "auto",

    selectedConceptStyleId: "",
    selectedPropItemId: "none"
  };

  // =========================
  // Data
  // =========================

  const DATA = window.EMOTIMINT_DATA;
  if (!DATA) {
    console.error("EMOTIMINT_DATA not found. Make sure data.js is loaded before main.js");
    return;
  }

  const I18N = DATA.I18N || {};
  const CHARACTER_TREE = DATA.CHARACTER_TREE || {};
  const DETAIL_LABELS = DATA.DETAIL_LABELS || {};
  const EMOTION_SETS_INFO = DATA.EMOTION_SETS_INFO || {};
  const THEMES_INFO = DATA.THEMES_INFO || {};
  const OUTFIT_INFO = DATA.OUTFIT_INFO || {};
  const COLOR_INFO = DATA.COLOR_INFO || {};
  const CONCEPT_STYLES = DATA.CONCEPT_STYLES || [];
  const PROP_ITEMS = DATA.PROP_ITEMS || [];
  const COUNT_OPTIONS = DATA.COUNT_OPTIONS || [1, 9, 24, 50, 100];

  // =========================
  // 감성 50개 (추가)
  // - data.js에 EMOTION_TEXTS가 없으면 여기 값을 사용
  // =========================
  const FALLBACK_EMOTION_50 = [
    "오늘은 조용히 있고 싶어요",
    "괜찮은 척 했는데 사실 좀 힘들었어요",
    "그냥… 잠깐 숨 고르는 중",
    "말은 못 했지만 고마웠어요",
    "나도 나를 좀 아껴볼게요",
    "괜히 눈물이 나요",
    "마음이 몽글몽글해요",
    "조용히 당신 편이에요",
    "오늘도 버텼다, 나",
    "마음이 조금 무거워요",
    "그래도 괜찮아질 거예요",
    "지금은 천천히 가도 돼요",
    "괜히 보고 싶네요",
    "응원 받고 싶은 날",
    "내일의 나에게 부탁할게요",
    "잠깐만, 멍 때리는 중",
    "오늘은 나에게 친절하기",
    "감정이 뒤죽박죽이에요",
    "괜찮아, 잘하고 있어",
    "그냥 따뜻한 말이 필요해요",
    "갑자기 마음이 찡해요",
    "아무것도 안 하고 싶어요",
    "나도 모르게 미소가 나요",
    "괜히 서운했어요",
    "조금만 더 쉬었다 갈래요",
    "오늘은 예민한 날",
    "눈치 보지 말자, 나",
    "그냥 안아주고 싶어요",
    "마음이 파도처럼 오네요",
    "괜찮다고 말해줘요",
    "기분이 살짝 좋아졌어요",
    "갑자기 외로워요",
    "나를 믿어볼게요",
    "오늘은 조용한 위로가 좋아요",
    "말 없이 곁에 있어줘요",
    "내 마음도 쉬는 중",
    "괜히 울컥했어요",
    "오늘은 비 오는 감정",
    "마음이 따뜻해졌어요",
    "스스로를 다독이는 중",
    "보고 싶단 말, 참 어렵네요",
    "잠깐, 마음 정리 중",
    "오늘은 좀 지쳤어요",
    "괜찮아질 때까지 천천히",
    "내 편이 되어줄게요",
    "기대하지 않으려 했는데",
    "조용히 안심이 돼요",
    "마음이 살짝 풀렸어요",
    "오늘은 그냥, 나답게"
  ];

  // =========================
  // i18n
  // =========================

  function t(key) {
    const pack = I18N[state.lang] || I18N.ko || {};
    return pack[key] || (I18N.ko ? I18N.ko[key] : key) || key;
  }

  function applyI18nStatic() {
    const elTitle = qs('[data-i18n="app.title"]');
    const elSub = qs('[data-i18n="app.subtitle"]');
    const elBeta = qs('[data-i18n="badge.beta"]');
    const elGlobal = qs('[data-i18n="badge.global"]');

    if (elTitle) elTitle.textContent = t("app.title");
    if (elSub) elSub.textContent = t("app.subtitle");
    if (elBeta) elBeta.textContent = t("badge.beta");
    if (elGlobal) elGlobal.textContent = t("badge.global");

    qsa("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (!key) return;
      if (key.startsWith("app.") || key.startsWith("badge.")) return;
      node.textContent = t(key);
    });
  }

  // =========================
  // DOM
  // =========================

  const dom = {
    langSelect: qs("#langSelect"),

    categorySelect: qs("#categorySelect"),
    subCategorySelect: qs("#subCategorySelect"),
    detailSelect: qs("#detailSelect"),

    emotionSetSelect: qs("#emotionSetSelect"),
    countSelect: qs("#countSelect"),

    themeSelect: qs("#themeSelect"),
    outfitSelect: qs("#outfitSelect"),
    colorSelect: qs("#colorSelect"),

    conceptStyleSelect: qs("#conceptStyleSelect"),
    propItemSelect: qs("#propItemSelect"),

    btnGenerate: qs("#btnGenerate"),
    btnCopyAll: qs("#btnCopyAll"),

    resultsWrap: qs("#resultsWrap"),
    resultsList: qs("#resultsList"),

    toast: qs("#toast")
  };

  function toast(msg) {
    if (!dom.toast) return;
    dom.toast.textContent = msg;
    dom.toast.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => dom.toast.classList.remove("show"), 1100);
  }

  // =========================
  // Populate Selects
  // =========================

  function option(label, value) {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    return o;
  }

  function getLabel(obj, lang) {
    return (obj && obj.labels && (obj.labels[lang] || obj.labels.ko)) || "";
  }

  function getDetailLabel(detailId) {
    const item = DETAIL_LABELS[detailId];
    if (!item) return detailId;
    return item[state.lang] || item.ko || detailId;
  }

  function populateCategories() {
    if (!dom.categorySelect) return;
    dom.categorySelect.innerHTML = "";
    dom.categorySelect.appendChild(option(t("labels.category"), ""));

    Object.keys(CHARACTER_TREE).forEach((k) => {
      const cat = CHARACTER_TREE[k];
      dom.categorySelect.appendChild(option(getLabel(cat, state.lang), cat.id));
    });
  }

  function populateSubCategories() {
    if (!dom.subCategorySelect) return;
    dom.subCategorySelect.innerHTML = "";
    dom.subCategorySelect.appendChild(option(t("labels.subCategory"), ""));

    const cat = Object.values(CHARACTER_TREE).find((c) => c.id === state.selectedCategoryId);
    if (!cat) return;

    const subs = cat.subCategories || {};
    Object.keys(subs).forEach((k) => {
      const sub = subs[k];
      dom.subCategorySelect.appendChild(option(getLabel(sub, state.lang), sub.id));
    });
  }

  function populateDetails() {
    if (!dom.detailSelect) return;
    dom.detailSelect.innerHTML = "";
    dom.detailSelect.appendChild(option(t("labels.detail"), ""));

    const cat = Object.values(CHARACTER_TREE).find((c) => c.id === state.selectedCategoryId);
    if (!cat) return;

    const sub = Object.values(cat.subCategories || {}).find((s) => s.id === state.selectedSubCategoryId);
    if (!sub) return;

    (sub.details || []).forEach((detailId) => {
      dom.detailSelect.appendChild(option(getDetailLabel(detailId), detailId));
    });
  }

  function populateEmotionSets() {
    if (!dom.emotionSetSelect) return;
    dom.emotionSetSelect.innerHTML = "";
    dom.emotionSetSelect.appendChild(option(t("labels.emotionSet"), ""));

    Object.keys(EMOTION_SETS_INFO).forEach((k) => {
      const s = EMOTION_SETS_INFO[k];
      dom.emotionSetSelect.appendChild(option(getLabel(s, state.lang), s.id));
    });
  }

  function populateCountsForSet() {
    if (!dom.countSelect) return;
    dom.countSelect.innerHTML = "";

    const set = Object.values(EMOTION_SETS_INFO).find((s) => s.id === state.selectedEmotionSetId);
    const allowed = (set && set.allowedCounts) ? set.allowedCounts : COUNT_OPTIONS;

    allowed.forEach((n) => {
      dom.countSelect.appendChild(option(String(n), String(n)));
    });

    // default count 유지
    const defaultCount =
      (set && set.defaultCount) ? set.defaultCount : (allowed.includes(24) ? 24 : allowed[allowed.length - 1]);

    if (!allowed.includes(state.selectedCount)) {
      state.selectedCount = defaultCount;
    }
    dom.countSelect.value = String(state.selectedCount);
  }

  function populateThemes() {
    if (!dom.themeSelect) return;
    dom.themeSelect.innerHTML = "";
    Object.keys(THEMES_INFO).forEach((k) => {
      const th = THEMES_INFO[k];
      dom.themeSelect.appendChild(option(getLabel(th, state.lang), th.id));
    });
    dom.themeSelect.value = state.selectedThemeId;
  }

  function populateOutfits() {
    if (!dom.outfitSelect) return;
    dom.outfitSelect.innerHTML = "";
    Object.keys(OUTFIT_INFO).forEach((k) => {
      const o = OUTFIT_INFO[k];
      dom.outfitSelect.appendChild(option(getLabel(o, state.lang), o.id));
    });
    dom.outfitSelect.value = state.selectedOutfitId;
  }

  function populateColors() {
    if (!dom.colorSelect) return;
    dom.colorSelect.innerHTML = "";
    Object.keys(COLOR_INFO).forEach((k) => {
      const c = COLOR_INFO[k];
      dom.colorSelect.appendChild(option(getLabel(c, state.lang), c.id));
    });
    dom.colorSelect.value = state.selectedColorId;
  }

  function populateConceptStyles() {
    if (!dom.conceptStyleSelect) return;
    dom.conceptStyleSelect.innerHTML = "";
    dom.conceptStyleSelect.appendChild(option(t("labels.conceptStyle"), ""));

    CONCEPT_STYLES.forEach((cs) => {
      dom.conceptStyleSelect.appendChild(option(getLabel(cs, state.lang), cs.id));
    });
    dom.conceptStyleSelect.value = state.selectedConceptStyleId;
  }

  function populateProps() {
    if (!dom.propItemSelect) return;
    dom.propItemSelect.innerHTML = "";
    PROP_ITEMS.forEach((p) => {
      dom.propItemSelect.appendChild(option(getLabel(p, state.lang), p.id));
    });
    dom.propItemSelect.value = state.selectedPropItemId;
  }

  // =========================
  // Emotion / Prompt building
  // =========================

  // ✅ 감성 텍스트 소스: data.js의 EMOTION_TEXTS 있으면 우선 사용, 없으면 FALLBACK_EMOTION_50 사용
  function getEmotionTexts(setId) {
    const fromData = window.EMOTIMINT_DATA?.EMOTION_TEXTS?.[setId] || window.EMOTIMINT_DATA?.EMOTION_TEXTS?.emotional;
    if (Array.isArray(fromData) && fromData.length) return fromData;
    return FALLBACK_EMOTION_50;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // 기존 코드에서 emotionItems를 쓰는 구조가 있으면 유지하되,
  // 없을 때(=감정1/2 fallback)만 "감성 50"을 사용하도록 처리
  function getEmotionItems(setId) {
    // 🔸 기존 프로젝트에 이미 emotion DB가 있다면 여기에 연결되어 있을 수 있음
    // 현재는 data.js에서 EMOTION_TEXTS만 쓰는 구조를 지원
    // 반환 포맷: [{ ko: "문구" }, ...]
    const list = getEmotionTexts(setId);
    return list.map((x) => ({ ko: x }));
  }

  function getSelectedMeta() {
    return {
      lang: state.lang,
      categoryId: state.selectedCategoryId,
      subCategoryId: state.selectedSubCategoryId,
      detailId: state.selectedDetailId,
      emotionSetId: state.selectedEmotionSetId,
      themeId: state.selectedThemeId,
      outfitId: state.selectedOutfitId,
      colorId: state.selectedColorId,
      conceptStyleId: state.selectedConceptStyleId,
      propItemId: state.selectedPropItemId
    };
  }

  function buildOnePrompt(meta, emotionObj) {
    const detailLabel = getDetailLabel(meta.detailId);

    const themeLabel = getLabel(THEMES_INFO[meta.themeId] || {}, meta.lang) || "white background";
    const outfitLabel = getLabel(OUTFIT_INFO[meta.outfitId] || {}, meta.lang);
    const colorLabel = getLabel(COLOR_INFO[meta.colorId] || {}, meta.lang);

    const concept = CONCEPT_STYLES.find((x) => x.id === meta.conceptStyleId);
    const conceptDesc = concept ? (concept.descriptions?.[meta.lang] || concept.descriptions?.ko || "") : "";

    const prop = PROP_ITEMS.find((x) => x.id === meta.propItemId);
    const propPrompt = prop ? (prop.prompts?.[meta.lang] || prop.prompts?.ko || "") : "";

    // ✅ “감정1/감정2” 대신, emotionObj.ko가 항상 감성 문구가 됨
    const emotionText = (emotionObj && emotionObj.ko) ? emotionObj.ko : "오늘은 조용히 있고 싶어요";

    // 결과 프롬프트(현우님 프로젝트 톤 유지: 카카오 이모티콘 / 리크레프트용으로 무난한 형태)
    const parts = [
      `cute original chibi character`,
      `kakao emoji style`,
      `clean thick lineart, consistent line thickness`,
      `soft pastel color palette, warm gentle atmosphere`,
      `character: ${detailLabel}`,
      `emotion/phrase: ${emotionText}`,
      propPrompt ? `prop: ${propPrompt}` : "",
      meta.outfitId && meta.outfitId !== "auto" ? `outfit: ${outfitLabel}` : "",
      meta.colorId && meta.colorId !== "auto" ? `color theme: ${colorLabel}` : "",
      meta.themeId ? `background: ${themeLabel}` : `background: white`,
      `centered composition, no logo, no watermark, no text except the phrase`
    ].filter(Boolean);

    return parts.join(", ");
  }

  function generatePromptsLocal() {
    const meta = getSelectedMeta();

    if (!meta.detailId) {
      toast(t("messages.noCharacter"));
      return [];
    }
    if (!meta.emotionSetId) {
      toast(t("messages.noEmotion"));
      return [];
    }

    const emotionItems = getEmotionItems(meta.emotionSetId);

    const shuffled = shuffle(emotionItems);
    const prompts = [];
    for (let i = 0; i < state.selectedCount; i++) {
      prompts.push(buildOnePrompt(meta, shuffled[i % shuffled.length]));
    }
    return prompts;
  }

  // =========================
  // Render Results
  // =========================

  function renderResults(prompts) {
    if (!dom.resultsList) return;
    dom.resultsList.innerHTML = "";

    prompts.forEach((p, idx) => {
      const li = document.createElement("li");
      li.className = "result-item";

      const pre = document.createElement("pre");
      pre.className = "result-text";
      pre.textContent = p;

      const btn = document.createElement("button");
      btn.className = "btn-copy";
      btn.type = "button";
      btn.textContent = t("buttons.copy");
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(p);
          btn.textContent = t("buttons.copied");
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = t("buttons.copy");
            btn.classList.remove("copied");
          }, 900);
        } catch (e) {
          console.error(e);
          toast("Copy failed");
        }
      });

      const num = document.createElement("div");
      num.className = "result-num";
      num.textContent = String(idx + 1);

      li.appendChild(num);
      li.appendChild(pre);
      li.appendChild(btn);

      dom.resultsList.appendChild(li);
    });

    if (dom.resultsWrap) dom.resultsWrap.style.display = prompts.length ? "block" : "none";
  }

  async function copyAll(prompts) {
    if (!prompts || !prompts.length) return;
    const text = prompts.join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      toast(t("buttons.copied"));
    } catch (e) {
      console.error(e);
      toast("Copy failed");
    }
  }

  // =========================
  // Events
  // =========================

  function bindEvents() {
    if (dom.langSelect) {
      dom.langSelect.addEventListener("change", () => {
        state.lang = dom.langSelect.value || "ko";
        applyI18nStatic();

        populateCategories();
        populateSubCategories();
        populateDetails();

        populateEmotionSets();
        populateCountsForSet();

        populateThemes();
        populateOutfits();
        populateColors();
        populateConceptStyles();
        populateProps();
      });
    }

    if (dom.categorySelect) {
      dom.categorySelect.addEventListener("change", () => {
        state.selectedCategoryId = dom.categorySelect.value || "";
        state.selectedSubCategoryId = "";
        state.selectedDetailId = "";
        populateSubCategories();
        populateDetails();
      });
    }

    if (dom.subCategorySelect) {
      dom.subCategorySelect.addEventListener("change", () => {
        state.selectedSubCategoryId = dom.subCategorySelect.value || "";
        state.selectedDetailId = "";
        populateDetails();
      });
    }

    if (dom.detailSelect) {
      dom.detailSelect.addEventListener("change", () => {
        state.selectedDetailId = dom.detailSelect.value || "";
      });
    }

    if (dom.emotionSetSelect) {
      dom.emotionSetSelect.addEventListener("change", () => {
        state.selectedEmotionSetId = dom.emotionSetSelect.value || "";
        populateCountsForSet();
      });
    }

    if (dom.countSelect) {
      dom.countSelect.addEventListener("change", () => {
        state.selectedCount = clampInt(dom.countSelect.value, 1, 100);
      });
    }

    if (dom.themeSelect) {
      dom.themeSelect.addEventListener("change", () => {
        state.selectedThemeId = dom.themeSelect.value || "white";
      });
    }

    if (dom.outfitSelect) {
      dom.outfitSelect.addEventListener("change", () => {
        state.selectedOutfitId = dom.outfitSelect.value || "auto";
      });
    }

    if (dom.colorSelect) {
      dom.colorSelect.addEventListener("change", () => {
        state.selectedColorId = dom.colorSelect.value || "auto";
      });
    }

    if (dom.conceptStyleSelect) {
      dom.conceptStyleSelect.addEventListener("change", () => {
        state.selectedConceptStyleId = dom.conceptStyleSelect.value || "";
      });
    }

    if (dom.propItemSelect) {
      dom.propItemSelect.addEventListener("change", () => {
        state.selectedPropItemId = dom.propItemSelect.value || "none";
      });
    }

    if (dom.btnGenerate) {
      dom.btnGenerate.addEventListener("click", () => {
        const prompts = generatePromptsLocal();
        renderResults(prompts);
        // copyAll 버튼에서 사용할 수 있게 저장
        dom.btnGenerate.__last = prompts;
      });
    }

    if (dom.btnCopyAll) {
      dom.btnCopyAll.addEventListener("click", () => {
        const prompts = dom.btnGenerate?.__last || [];
        copyAll(prompts);
      });
    }
  }

  // =========================
  // Init
  // =========================

  function initDefaults() {
    if (dom.langSelect) {
      state.lang = dom.langSelect.value || "ko";
    }
    if (dom.themeSelect) state.selectedThemeId = dom.themeSelect.value || "white";
    if (dom.outfitSelect) state.selectedOutfitId = dom.outfitSelect.value || "auto";
    if (dom.colorSelect) state.selectedColorId = dom.colorSelect.value || "auto";
    if (dom.propItemSelect) state.selectedPropItemId = dom.propItemSelect.value || "none";
  }

  function init() {
    initDefaults();
    applyI18nStatic();

    populateCategories();
    populateSubCategories();
    populateDetails();

    populateEmotionSets();
    populateCountsForSet();

    populateThemes();
    populateOutfits();
    populateColors();
    populateConceptStyles();
    populateProps();

    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
