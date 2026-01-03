const EMO_DATA = window.EMOTIMINT_DATA || {};
const I18N = EMO_DATA.I18N || {};
// frontend/js/main.js
"use strict";

(function () {
  const API_BASE = ""; // 같은 도메인에서 API 호출

  const {
    I18N,
    COUNT_OPTIONS,
    CHARACTER_TREE,
    DETAIL_LABELS, // 다국어 세분화 라벨
    EMOTION_SETS_INFO,
    THEMES_INFO,
    OUTFIT_INFO,
    COLOR_INFO
  } = window.EMOTIMINT_DATA;

  // ─────────────────────────────────────────────
  // 1. 컨셉 스타일 & 소품 정의 (이 파일 안에서만 사용)
  // ─────────────────────────────────────────────

  // 위에서 보여준 4가지 샘플 시트 기반 컨셉
  const CONCEPT_STYLES = {
    auto: {
      id: "auto",
      labels: {
        ko: "선택 안 함 (기본 컨셉)",
        en: "No override (default concept)"
      }
    },
    // 1) 손글씨 단어 + 작은 아이콘 스타일 (첫 번째 이미지)
    words_emotion: {
      id: "words_emotion",
      labels: {
        ko: "손글씨 단어 이모티콘",
        en: "Handwritten words & doodles"
      }
    },
    // 2) 하트 들고 있는 곰돌이 응원 스타일 (두 번째 이미지)
    bear_love: {
      id: "bear_love",
      labels: {
        ko: "하트 곰돌이 응원 스타일",
        en: "Heart bear cheering style"
      }
    },
    // 3) 말 많고 리액션 많은 햄스터 스타일 (세 번째 이미지)
    hamster_reaction: {
      id: "hamster_reaction",
      labels: {
        ko: "리액션 햄스터 스타일",
        en: "Reaction hamster style"
      }
    },
    // 4) 말랑한 몽글이 캐릭터 + 정중 멘트 스타일 (네 번째 이미지)
    blob_soft: {
      id: "blob_soft",
      labels: {
        ko: "말랑 몽글이 정중 스타일",
        en: "Soft blob polite style"
      }
    }
  };

  // 소품 / 물건 리스트
  const PROP_ITEMS = {
    auto: {
      id: "auto",
      labels: {
        ko: "소품 없음 (기본 연출)",
        en: "No props (default)"
      }
    },
    heart_balloon: {
      id: "heart_balloon",
      labels: {
        ko: "하트 풍선 / 하트 뭉치",
        en: "Heart balloons"
      }
    },
    bouquet: {
      id: "bouquet",
      labels: {
        ko: "꽃다발",
        en: "Flower bouquet"
      }
    },
    coffee: {
      id: "coffee",
      labels: {
        ko: "커피 / 음료 컵",
        en: "Coffee cup"
      }
    },
    gift_box: {
      id: "gift_box",
      labels: {
        ko: "선물 상자",
        en: "Gift box"
      }
    },
    cake: {
      id: "cake",
      labels: {
        ko: "케이크 / 축하 케이크",
        en: "Celebration cake"
      }
    },
    cheer_board: {
      id: "cheer_board",
      labels: {
        ko: "응원 피켓 / 메시지 보드",
        en: "Cheering sign board"
      }
    },
    blanket: {
      id: "blanket",
      labels: {
        ko: "담요 / 이불",
        en: "Blanket"
      }
    },
    medicine: {
      id: "medicine",
      labels: {
        ko: "약 / 구급 상자",
        en: "Medicine / first-aid kit"
      }
    },
    money_envelope: {
      id: "money_envelope",
      labels: {
        ko: "돈 봉투 / 보너스 봉투",
        en: "Money envelope"
      }
    }
  };

  // ─────────────────────────────────────────────
  // 2. 세분화 캐릭터 라벨 (다국어)
  // ─────────────────────────────────────────────

  function detailLabel(id, lang) {
    const info = DETAIL_LABELS[id];
    if (!info) return id;

    return info[lang] || info.ko || Object.values(info)[0] || id;
  }

  const state = {
    lang: "ko",
    selectedCategoryId: null,
    selectedSubCategoryId: null,
    selectedDetailId: null,
    selectedEmotionSetId: "daily",
    selectedThemeId: "white",
    selectedCount: COUNT_OPTIONS[2], // 기본 24
    selectedOutfitId: "auto",
    selectedColorId: "auto",
    selectedConceptStyleId: "auto",
    selectedPropItemId: "auto"
  };

  // DOM 헬퍼
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

  // ─────────────────────────────────────────────
  // 3. 다국어 유틸
  // ─────────────────────────────────────────────

  function getI18nValue(key) {
    const pack = I18N[state.lang] || I18N.ko;
    if (pack && Object.prototype.hasOwnProperty.call(pack, key)) {
      return pack[key];
    }
    if (I18N.ko && Object.prototype.hasOwnProperty.call(I18N.ko, key)) {
      return I18N.ko[key];
    }
    return null; // 없는 키면 null
  }

  function t(key) {
    const v = getI18nValue(key);
    return v != null ? v : key;
  }

  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = getI18nValue(key);
      // I18N에 없는 키는 건드리지 않는다 (guide.body, 새 라벨 등은 그대로 둠)
      if (value == null) return;
      el.textContent = value;
    });
  }

  function labelFrom(obj) {
    if (!obj || !obj.labels) return "";
    return obj.labels[state.lang] || obj.labels.ko || "";
  }

  // ─────────────────────────────────────────────
  // 4. 셀렉트 박스 렌더링
  // ─────────────────────────────────────────────

  function renderCategoryOptions() {
    categorySelect.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "—";
    categorySelect.appendChild(placeholder);

    Object.values(CHARACTER_TREE).forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat.id;
      opt.textContent = labelFrom(cat);
      if (cat.id === state.selectedCategoryId) opt.selected = true;
      categorySelect.appendChild(opt);
    });
  }

  function renderSubCategoryOptions() {
    subCategorySelect.innerHTML = "";
    detailSelect.innerHTML = "";

    if (!state.selectedCategoryId) return;
    const cat = CHARACTER_TREE[state.selectedCategoryId];
    if (!cat) return;

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "—";
    subCategorySelect.appendChild(placeholder);

    Object.values(cat.subCategories).forEach((sub) => {
      const opt = document.createElement("option");
      opt.value = sub.id;
      opt.textContent = labelFrom(sub);
      if (sub.id === state.selectedSubCategoryId) opt.selected = true;
      subCategorySelect.appendChild(opt);
    });
  }

  function renderDetailOptions() {
    detailSelect.innerHTML = "";
    if (!state.selectedCategoryId || !state.selectedSubCategoryId) return;

    const cat = CHARACTER_TREE[state.selectedCategoryId];
    const sub = cat?.subCategories[state.selectedSubCategoryId];
    if (!sub) return;

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "—";
    detailSelect.appendChild(placeholder);

    sub.details.forEach((detailId) => {
      const opt = document.createElement("option");
      opt.value = detailId;
      opt.textContent = detailLabel(detailId, state.lang);
      if (detailId === state.selectedDetailId) opt.selected = true;
      detailSelect.appendChild(opt);
    });
  }

  function renderEmotionOptions() {
    emotionSelect.innerHTML = "";
    Object.values(EMOTION_SETS_INFO).forEach((set) => {
      const opt = document.createElement("option");
      opt.value = set.id;
      opt.textContent = labelFrom(set);
      if (set.id === state.selectedEmotionSetId) opt.selected = true;
      emotionSelect.appendChild(opt);
    });
  }

  function renderCountOptions() {
    countSelect.innerHTML = "";
    COUNT_OPTIONS.forEach((num) => {
      const opt = document.createElement("option");
      opt.value = String(num);
      opt.textContent = String(num);
      if (num === state.selectedCount) opt.selected = true;
      countSelect.appendChild(opt);
    });
  }

  function renderThemeOptions() {
    themeSelect.innerHTML = "";
    Object.values(THEMES_INFO).forEach((theme) => {
      const opt = document.createElement("option");
      opt.value = theme.id;
      opt.textContent = labelFrom(theme);
      if (theme.id === state.selectedThemeId) opt.selected = true;
      themeSelect.appendChild(opt);
    });
  }

  function renderOutfitOptions() {
    if (!outfitSelect) return;
    outfitSelect.innerHTML = "";
    Object.values(OUTFIT_INFO).forEach((o) => {
      const opt = document.createElement("option");
      opt.value = o.id;
      opt.textContent = labelFrom(o);
      if (o.id === state.selectedOutfitId) opt.selected = true;
      outfitSelect.appendChild(opt);
    });
  }

  function renderColorOptions() {
    if (!colorSelect) return;
    colorSelect.innerHTML = "";
    Object.values(COLOR_INFO).forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = labelFrom(c);
      if (c.id === state.selectedColorId) opt.selected = true;
      colorSelect.appendChild(opt);
    });
  }

  // ✅ 컨셉 스타일 셀렉트
  function renderConceptStyleOptions() {
    if (!conceptStyleSelect) return;
    conceptStyleSelect.innerHTML = "";
    Object.values(CONCEPT_STYLES).forEach((cs) => {
      const opt = document.createElement("option");
      opt.value = cs.id;
      opt.textContent = labelFrom(cs);
      if (cs.id === state.selectedConceptStyleId) opt.selected = true;
      conceptStyleSelect.appendChild(opt);
    });
  }

  // ✅ 소품 셀렉트
  function renderPropOptions() {
    if (!propSelect) return;
    propSelect.innerHTML = "";
    Object.values(PROP_ITEMS).forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = labelFrom(p);
      if (p.id === state.selectedPropItemId) opt.selected = true;
      propSelect.appendChild(opt);
    });
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
  // 5. 이벤트 바인딩
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

  if (outfitSelect) {
    outfitSelect.addEventListener("change", () => {
      state.selectedOutfitId = outfitSelect.value || "auto";
    });
  }

  if (colorSelect) {
    colorSelect.addEventListener("change", () => {
      state.selectedColorId = colorSelect.value || "auto";
    });
  }

  if (conceptStyleSelect) {
    conceptStyleSelect.addEventListener("change", () => {
      state.selectedConceptStyleId = conceptStyleSelect.value || "auto";
    });
  }

  if (propSelect) {
    propSelect.addEventListener("change", () => {
      state.selectedPropItemId = propSelect.value || "auto";
    });
  }

  // 언어 버튼
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      state.lang = lang;

      document
        .querySelectorAll(".lang-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      applyStaticI18n();
      renderAllSelects(); // 언어 바뀌면 전체 셀렉트 다시 그리기
    });
  });

  // ─────────────────────────────────────────────
  // 6. 결과 렌더링
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

      const koLabel = p && p.koLabel ? ` (${p.koLabel})` : "";
      indexEl.textContent = `#${idx + 1}${koLabel}`;

      const textarea = document.createElement("textarea");
      textarea.className = "result-text";
      textarea.readOnly = true;
      textarea.value = (p && p.text) || "";

      left.appendChild(indexEl);
      left.appendChild(textarea);

      const btn = document.createElement("button");
      btn.className = "btn btn-copy result-copy-btn";
      btn.textContent = t("buttons.copy");
      btn.addEventListener("click", () => {
        const toCopy = (p && p.text) || "";
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

  // 전체 복사
  copyAllBtn.addEventListener("click", () => {
    const texts = Array.from(
      resultsContainer.querySelectorAll(".result-text")
    )
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
  // 7. API 호출
  // ─────────────────────────────────────────────

  async function generatePrompts() {
    if (!state.selectedDetailId) {
      alert(t("messages.noCharacter"));
      return;
    }
    if (!state.selectedEmotionSetId) {
      alert(t("messages.noEmotion"));
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
        console.error("API status", res.status);
        return;
      }

      const data = await res.json();
      if (data && data.ok && Array.isArray(data.prompts)) {
        renderPromptList(data.prompts);
      }
    } catch (err) {
      console.error("API error", err);
    }
  }

  generateBtn.addEventListener("click", generatePrompts);

  // ─────────────────────────────────────────────
  // 8. 초기화
  // ─────────────────────────────────────────────

  function init() {
    applyStaticI18n();
    renderAllSelects();
  }

  init();
})();
