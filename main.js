// main.js
"use strict";

(function () {
  // ✅ API 서버 붙일 때만 사용 (Render 등)
  const API_BASE = "";

  // ✅ 0) 안전 가드: 데이터가 없으면 터지지 않게
  const EMO_DATA = window.EMOTIMINT_DATA || null;
  if (!EMO_DATA) {
    console.error("[EmotiMint] window.EMOTIMINT_DATA가 없습니다. data.js 로드 순서를 확인하세요.");
    return;
  }

  // ✅ 구조분해도 안전하게 (없으면 기본값)
  const I18N = EMO_DATA.I18N || {};
  const COUNT_OPTIONS = Array.isArray(EMO_DATA.COUNT_OPTIONS)
    ? EMO_DATA.COUNT_OPTIONS
    : [1, 9, 24, 50, 100];

  const CHARACTER_TREE = EMO_DATA.CHARACTER_TREE || {};
  const DETAIL_LABELS = EMO_DATA.DETAIL_LABELS || {};
  const EMOTION_SETS_INFO = EMO_DATA.EMOTION_SETS_INFO || {};
  const THEMES_INFO = EMO_DATA.THEMES_INFO || {};
  const OUTFIT_INFO = EMO_DATA.OUTFIT_INFO || {};
  const COLOR_INFO = EMO_DATA.COLOR_INFO || {};

  // ─────────────────────────────────────────────
  // 1. 컨셉 스타일 & 소품 정의
  // ─────────────────────────────────────────────
  const CONCEPT_STYLES = {
    auto: { id: "auto", labels: { ko: "선택 안 함 (기본 컨셉)", en: "No override (default concept)" } },
    words_emotion: { id: "words_emotion", labels: { ko: "손글씨 단어 이모티콘", en: "Handwritten words & doodles" } },
    bear_love: { id: "bear_love", labels: { ko: "하트 곰돌이 응원 스타일", en: "Heart bear cheering style" } },
    hamster_reaction: { id: "hamster_reaction", labels: { ko: "리액션 햄스터 스타일", en: "Reaction hamster style" } },
    blob_soft: { id: "blob_soft", labels: { ko: "말랑 몽글이 정중 스타일", en: "Soft blob polite style" } }
  };

  const PROP_ITEMS = {
    auto: { id: "auto", labels: { ko: "소품 없음 (기본 연출)", en: "No props (default)" } },
    heart_balloon: { id: "heart_balloon", labels: { ko: "하트 풍선 / 하트 뭉치", en: "Heart balloons" } },
    bouquet: { id: "bouquet", labels: { ko: "꽃다발", en: "Flower bouquet" } },
    coffee: { id: "coffee", labels: { ko: "커피 / 음료 컵", en: "Coffee cup" } },
    gift_box: { id: "gift_box", labels: { ko: "선물 상자", en: "Gift box" } },
    cake: { id: "cake", labels: { ko: "케이크 / 축하 케이크", en: "Celebration cake" } },
    cheer_board: { id: "cheer_board", labels: { ko: "응원 피켓 / 메시지 보드", en: "Cheering sign board" } },
    blanket: { id: "blanket", labels: { ko: "담요 / 이불", en: "Blanket" } },
    medicine: { id: "medicine", labels: { ko: "약 / 구급 상자", en: "Medicine / first-aid kit" } },
    money_envelope: { id: "money_envelope", labels: { ko: "돈 봉투 / 보너스 봉투", en: "Money envelope" } }
  };

  // ─────────────────────────────────────────────
  // 2. 세분화 캐릭터 라벨
  // ─────────────────────────────────────────────
  function detailLabel(id, lang) {
    const info = DETAIL_LABELS[id];
    if (!info) return id;
    return info[lang] || info.ko || Object.values(info)[0] || id;
  }

  // ─────────────────────────────────────────────
  // 3. state + DOM
  // ─────────────────────────────────────────────
  const state = {
    lang: "ko",
    selectedCategoryId: null,
    selectedSubCategoryId: null,
    selectedDetailId: null,
    selectedEmotionSetId: "daily",
    selectedThemeId: "white",
    selectedCount: COUNT_OPTIONS.includes(24) ? 24 : (COUNT_OPTIONS[0] ?? 24),
    selectedOutfitId: "auto",
    selectedColorId: "auto",
    selectedConceptStyleId: "auto",
    selectedPropItemId: "auto"
  };

  const $ = (id) => document.getElementById(id);

  const categorySelect = $("categorySelect");
  const subCategorySelect = $("subCategorySelect");
  const detailSelect = $("detailSelect");
  const emotionSelect = $("emotionSelect");
  const countSelect = $("countSelect");
  const themeSelect = $("themeSelect");
  const outfitSelect = $("outfitSelect");
  const colorSelect = $("colorSelect");
  const conceptStyleSelect = $("conceptStyleSelect");
  const propSelect = $("propSelect");
  const generateBtn = $("generateBtn");
  const copyAllBtn = $("copyAllBtn");
  const resultsContainer = $("resultsContainer");

  if (
    !categorySelect || !subCategorySelect || !detailSelect ||
    !emotionSelect || !countSelect || !themeSelect ||
    !generateBtn || !copyAllBtn || !resultsContainer
  ) {
    console.error("[EmotiMint] 필수 DOM 요소를 찾지 못했습니다. index.html의 id들을 확인하세요.");
    return;
  }

  // ─────────────────────────────────────────────
  // 4. i18n
  // ─────────────────────────────────────────────
  function getI18nValue(key) {
    const pack = I18N[state.lang] || I18N.ko || {};
    if (Object.prototype.hasOwnProperty.call(pack, key)) return pack[key];
    if (I18N.ko && Object.prototype.hasOwnProperty.call(I18N.ko, key)) return I18N.ko[key];
    return null;
  }

  function t(key) {
    const v = getI18nValue(key);
    return v != null ? v : key;
  }

  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = getI18nValue(key);
      if (value == null) return;
      el.textContent = value;
    });
  }

  function labelFrom(obj) {
    if (!obj || !obj.labels) return "";
    return obj.labels[state.lang] || obj.labels.ko || "";
  }

  // ─────────────────────────────────────────────
  // 5. 트리 접근 (id/key 혼용 안전)
  // ─────────────────────────────────────────────
  function getCategoryById(id) {
    if (!id) return null;
    if (CHARACTER_TREE[id]) return CHARACTER_TREE[id];
    return Object.values(CHARACTER_TREE).find((c) => c?.id === id) || null;
  }

  function getSubById(cat, subId) {
    if (!cat || !subId) return null;
    if (cat.subCategories?.[subId]) return cat.subCategories[subId];
    return Object.values(cat.subCategories || {}).find((s) => s?.id === subId) || null;
  }

  // ─────────────────────────────────────────────
  // 6. Select 렌더 + 자동 기본값 세팅
  // ─────────────────────────────────────────────
  function renderCategoryOptions() {
    categorySelect.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "—";
    categorySelect.appendChild(placeholder);

    const cats = Object.values(CHARACTER_TREE);
    cats.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat.id;
      opt.textContent = labelFrom(cat);
      categorySelect.appendChild(opt);
    });

    // ✅ 기본값 자동 세팅 (비어있으면 첫 카테고리)
    if (!state.selectedCategoryId && cats.length) {
      state.selectedCategoryId = cats[0].id;
    }
    categorySelect.value = state.selectedCategoryId || "";
  }

  function renderSubCategoryOptions() {
    subCategorySelect.innerHTML = "";
    detailSelect.innerHTML = "";

    const cat = getCategoryById(state.selectedCategoryId);
    if (!cat) return;

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "—";
    subCategorySelect.appendChild(placeholder);

    const subs = Object.values(cat.subCategories || {});
    subs.forEach((sub) => {
      const opt = document.createElement("option");
      opt.value = sub.id;
      opt.textContent = labelFrom(sub);
      subCategorySelect.appendChild(opt);
    });

    // ✅ 기본값 자동 세팅 (비어있으면 첫 소분류)
    if (!state.selectedSubCategoryId && subs.length) {
      state.selectedSubCategoryId = subs[0].id;
    }
    subCategorySelect.value = state.selectedSubCategoryId || "";
  }

  function renderDetailOptions() {
    detailSelect.innerHTML = "";

    const cat = getCategoryById(state.selectedCategoryId);
    const sub = getSubById(cat, state.selectedSubCategoryId);
    if (!sub) return;

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "—";
    detailSelect.appendChild(placeholder);

    const details = Array.isArray(sub.details) ? sub.details : [];
    details.forEach((detailId) => {
      const opt = document.createElement("option");
      opt.value = detailId;
      opt.textContent = detailLabel(detailId, state.lang);
      detailSelect.appendChild(opt);
    });

    // ✅ 기본값 자동 세팅 (비어있으면 첫 세분화)
    if (!state.selectedDetailId && details.length) {
      state.selectedDetailId = details[0];
    }
    detailSelect.value = state.selectedDetailId || "";
  }

  function renderEmotionOptions() {
    emotionSelect.innerHTML = "";
    const sets = Object.values(EMOTION_SETS_INFO);

    sets.forEach((set) => {
      const opt = document.createElement("option");
      opt.value = set.id;
      opt.textContent = labelFrom(set);
      emotionSelect.appendChild(opt);
    });

    if (!state.selectedEmotionSetId && sets.length) state.selectedEmotionSetId = sets[0].id;
    emotionSelect.value = state.selectedEmotionSetId || "";
  }

  function renderCountOptions() {
    countSelect.innerHTML = "";
    COUNT_OPTIONS.forEach((num) => {
      const opt = document.createElement("option");
      opt.value = String(num);
      opt.textContent = String(num);
      countSelect.appendChild(opt);
    });

    if (!COUNT_OPTIONS.includes(state.selectedCount)) {
      state.selectedCount = COUNT_OPTIONS[0] ?? 24;
    }
    countSelect.value = String(state.selectedCount);
  }

  function renderThemeOptions() {
    themeSelect.innerHTML = "";
    const themes = Object.values(THEMES_INFO);

    themes.forEach((theme) => {
      const opt = document.createElement("option");
      opt.value = theme.id;
      opt.textContent = labelFrom(theme);
      themeSelect.appendChild(opt);
    });

    if (!state.selectedThemeId && themes.length) state.selectedThemeId = themes[0].id;
    themeSelect.value = state.selectedThemeId || "";
  }

  function renderOutfitOptions() {
    if (!outfitSelect) return;
    outfitSelect.innerHTML = "";
    Object.values(OUTFIT_INFO).forEach((o) => {
      const opt = document.createElement("option");
      opt.value = o.id;
      opt.textContent = labelFrom(o);
      outfitSelect.appendChild(opt);
    });
    outfitSelect.value = state.selectedOutfitId || "auto";
  }

  function renderColorOptions() {
    if (!colorSelect) return;
    colorSelect.innerHTML = "";
    Object.values(COLOR_INFO).forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = labelFrom(c);
      colorSelect.appendChild(opt);
    });
    colorSelect.value = state.selectedColorId || "auto";
  }

  function renderConceptStyleOptions() {
    if (!conceptStyleSelect) return;
    conceptStyleSelect.innerHTML = "";
    Object.values(CONCEPT_STYLES).forEach((cs) => {
      const opt = document.createElement("option");
      opt.value = cs.id;
      opt.textContent = labelFrom(cs);
      conceptStyleSelect.appendChild(opt);
    });
    conceptStyleSelect.value = state.selectedConceptStyleId || "auto";
  }

  function renderPropOptions() {
    if (!propSelect) return;
    propSelect.innerHTML = "";
    Object.values(PROP_ITEMS).forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = labelFrom(p);
      propSelect.appendChild(opt);
    });
    propSelect.value = state.selectedPropItemId || "auto";
  }

  function renderAllSelects() {
    renderCategoryOptions();
    renderSubCategoryOptions();
    renderDetailOptions();
    renderEmotionOptions();
    renderCountOptions();
    renderThemeOptions();
    renderOutfitOptions();
    renderColorOptions();
    renderConceptStyleOptions();
    renderPropOptions();
  }

  // ─────────────────────────────────────────────
  // 7. 이벤트 바인딩
  // ─────────────────────────────────────────────
  categorySelect.addEventListener("change", () => {
    state.selectedCategoryId = categorySelect.value || null;
    state.selectedSubCategoryId = null;
    state.selectedDetailId = null;
    renderSubCategoryOptions();
    renderDetailOptions();
  });

  subCategorySelect.addEventListener("change", () => {
    state.selectedSubCategoryId = subCategorySelect.value || null;
    state.selectedDetailId = null;
    renderDetailOptions();
  });

  detailSelect.addEventListener("change", () => {
    state.selectedDetailId = detailSelect.value || null;
  });

  emotionSelect.addEventListener("change", () => {
    state.selectedEmotionSetId = emotionSelect.value;
  });

  countSelect.addEventListener("change", () => {
    state.selectedCount = Number(countSelect.value) || 1;
  });

  themeSelect.addEventListener("change", () => {
    state.selectedThemeId = themeSelect.value;
  });

  if (outfitSelect) outfitSelect.addEventListener("change", () => (state.selectedOutfitId = outfitSelect.value || "auto"));
  if (colorSelect) colorSelect.addEventListener("change", () => (state.selectedColorId = colorSelect.value || "auto"));
  if (conceptStyleSelect) conceptStyleSelect.addEventListener("change", () => (state.selectedConceptStyleId = conceptStyleSelect.value || "auto"));
  if (propSelect) propSelect.addEventListener("change", () => (state.selectedPropItemId = propSelect.value || "auto"));

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.lang = btn.getAttribute("data-lang") || "ko";
      document.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyStaticI18n();
      renderAllSelects();
    });
  });

  // ─────────────────────────────────────────────
  // 8. 결과 렌더링
  // ─────────────────────────────────────────────
  function renderPromptList(prompts) {
    resultsContainer.innerHTML = "";
    if (!Array.isArray(prompts) || !prompts.length) return;

    prompts.forEach((p, idx) => {
      const item = document.createElement("div");
      item.className = "result-item";

      const left = document.createElement("div");
      left.className = "result-left";

      const indexEl = document.createElement("div");
      indexEl.className = "result-index";

      const koLabel = p?.koLabel ? ` (${p.koLabel})` : "";
      indexEl.textContent = `#${idx + 1}${koLabel}`;

      const textarea = document.createElement("textarea");
      textarea.className = "result-text";
      textarea.readOnly = true;
      textarea.value = p?.text || "";

      left.appendChild(indexEl);
      left.appendChild(textarea);

      const btn = document.createElement("button");
      btn.className = "btn btn-copy result-copy-btn";
      btn.textContent = t("buttons.copy");
      btn.addEventListener("click", () => {
        const toCopy = p?.text || "";
        if (!toCopy) return;
        navigator.clipboard.writeText(toCopy);
        btn.classList.remove("btn-copy");
        btn.classList.add("btn-success");
        btn.textContent = t("buttons.copied");
        setTimeout(() => {
          btn.classList.remove("btn-success");
          btn.classList.add("btn-copy");
          btn.textContent = t("buttons.copy");
        }, 1200);
      });

      item.appendChild(left);
      item.appendChild(btn);
      resultsContainer.appendChild(item);
    });
  }

  copyAllBtn.addEventListener("click", () => {
    const texts = Array.from(resultsContainer.querySelectorAll(".result-text"))
      .map((ta) => ta.value.trim())
      .filter((v) => v.length > 0);

    if (!texts.length) return;

    navigator.clipboard.writeText(texts.join("\n\n"));
    copyAllBtn.classList.add("btn-success");
    copyAllBtn.textContent = t("buttons.copied");
    setTimeout(() => {
      copyAllBtn.classList.remove("btn-success");
      copyAllBtn.textContent = t("buttons.copyAll");
    }, 1200);
  });

  // ─────────────────────────────────────────────
  // 9. 로컬 생성 (GitHub Pages용)
  // ─────────────────────────────────────────────
  function getSelectedMeta() {
    const cat = getCategoryById(state.selectedCategoryId);
    const sub = getSubById(cat, state.selectedSubCategoryId);
    const detailName = state.selectedDetailId ? detailLabel(state.selectedDetailId, state.lang) : "";

    const theme = THEMES_INFO[state.selectedThemeId] || Object.values(THEMES_INFO)[0];

    const outfit = OUTFIT_INFO[state.selectedOutfitId] || OUTFIT_INFO.auto || { id: "auto", labels: { ko: "자동", en: "auto" } };
    const color = COLOR_INFO[state.selectedColorId] || COLOR_INFO.auto || { id: "auto", labels: { ko: "자동", en: "auto" } };

    const concept = CONCEPT_STYLES[state.selectedConceptStyleId] || CONCEPT_STYLES.auto;
    const prop = PROP_ITEMS[state.selectedPropItemId] || PROP_ITEMS.auto;

    return {
      categoryName: cat ? labelFrom(cat) : "",
      subName: sub ? labelFrom(sub) : "",
      detailName,
      theme,
      outfit,
      color,
      concept,
      prop
    };
  }

  function getEmotionItems(setId) {
    const set = EMOTION_SETS_INFO[setId] || Object.values(EMOTION_SETS_INFO).find((s) => s?.id === setId);
    const items = set?.items || set?.emotions || set?.list || [];
    return Array.isArray(items) ? items : [];
  }

  function buildOnePrompt(meta, emotionItem, idx) {
    const koLabel = emotionItem?.ko || emotionItem?.labelKo || emotionItem?.nameKo || emotionItem?.label || `감정 ${idx + 1}`;
    const enLabel = emotionItem?.en || emotionItem?.labelEn || emotionItem?.nameEn || "";

    const outfitText = meta.outfit?.id !== "auto" ? labelFrom(meta.outfit) : "";
    const colorText = meta.color?.id !== "auto" ? labelFrom(meta.color) : "";
    const conceptText = meta.concept?.id !== "auto" ? labelFrom(meta.concept) : "";
    const propText = meta.prop?.id !== "auto" ? labelFrom(meta.prop) : "";

    const themeText = meta.theme ? labelFrom(meta.theme) : "";
    const characterLine = meta.detailName || meta.subName || meta.categoryName || "Character";
    const emotionLine = state.lang === "ko" ? koLabel : (enLabel || koLabel);

    const lines = [
      `Character: ${characterLine}`,
      `Emotion: ${emotionLine}`,
      themeText ? `Background: ${themeText}` : "",
      outfitText ? `Outfit: ${outfitText}` : "",
      colorText ? `Color: ${colorText}` : "",
      conceptText ? `Concept style: ${conceptText}` : "",
      propText ? `Prop: ${propText}` : "",
      "",
      `Style: kakao emoji style, clean thick lineart, consistent line thickness, centered composition, white/clean background, no text, no logo, no watermark`
    ].filter(Boolean);

    return {
      koLabel: emotionLine,
      text: lines.join("\n")
    };
  }

  function generatePromptsLocal() {
    const meta = getSelectedMeta();
    const emotionItems = getEmotionItems(state.selectedEmotionSetId);

    const baseList = emotionItems.length
      ? emotionItems
      : Array.from({ length: state.selectedCount }, (_, i) => ({ ko: `감정 ${i + 1}` }));

    const prompts = [];
    for (let i = 0; i < state.selectedCount; i++) {
      prompts.push(buildOnePrompt(meta, baseList[i % baseList.length], i));
    }
    return prompts;
  }

  // ─────────────────────────────────────────────
  // 10. API 호출 + 실패 시 로컬 fallback
  // ─────────────────────────────────────────────
  function isGitHubPages() {
    return /github\.io$/i.test(location.hostname);
  }

  async function generatePrompts() {
    if (!state.selectedDetailId) {
      alert(t("messages.noCharacter"));
      return;
    }
    if (!state.selectedEmotionSetId) {
      alert(t("messages.noEmotion"));
      return;
    }

    // ✅ GitHub Pages면 API 시도 자체를 건너뜀
    if (isGitHubPages() || !API_BASE) {
      renderPromptList(generatePromptsLocal());
      return;
    }

    const payload = {
      detailId: state.selectedDetailId,
      emotionSetId: state.selectedEmotionSetId,
      themeId: state.selectedThemeId,
      count: state.selectedCount,
      outfitId: state.selectedOutfitId || "auto",
      colorId: state.selectedColorId || "auto",
      conceptStyleId: state.selectedConceptStyleId || "auto",
      propItemId: state.selectedPropItemId || "auto"
    };

    try {
      const res = await fetch(`${API_BASE}/api/generate-prompts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        console.warn("[EmotiMint] API 호출 실패 → 로컬 생성으로 전환", res.status);
        renderPromptList(generatePromptsLocal());
        return;
      }

      const data = await res.json();
      if (data?.ok && Array.isArray(data.prompts)) {
        renderPromptList(data.prompts);
      } else {
        console.warn("[EmotiMint] API 응답 형식 불일치 → 로컬 생성으로 전환");
        renderPromptList(generatePromptsLocal());
      }
    } catch (err) {
      console.warn("[EmotiMint] API 에러 → 로컬 생성으로 전환", err);
      renderPromptList(generatePromptsLocal());
    }
  }

  generateBtn.addEventListener("click", generatePrompts);

  // ─────────────────────────────────────────────
  // 11. 초기화
  // ─────────────────────────────────────────────
  function init() {
    applyStaticI18n();
    renderAllSelects();
  }

  init();
})();
