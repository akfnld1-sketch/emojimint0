// backend/server.js
"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { buildPrompts } = require("./core/masterPromptEngine"); // 마스터 엔진

const app = express();
const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────────
// 프론트엔드 정적 파일 설정 (이모지민트 화면)
// 폴더 구조: 프로젝트루트 / frontend / index.html
//           프로젝트루트 / backend / server.js
// ─────────────────────────────────────────────
const FRONT_DIR = path.join(__dirname, "..", "frontend");

// frontend 정적 파일 제공
app.use(express.static(FRONT_DIR));

// 루트(/)로 들어오면 index.html 보내기
app.get("/", (req, res) => {
  res.sendFile(path.join(FRONT_DIR, "index.html"));
});

// ─────────────────────────────────────────────
// 공통 미들웨어
// ─────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json());

// 헬스 체크
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// 프롬프트 생성
app.post("/api/generate-prompts", (req, res) => {
  try {
    const {
      detailId,
      emotionSetId,
      themeId,
      count,
      outfitId = "auto",
      colorId = "auto"
    } = req.body || {};

    if (!detailId || !emotionSetId || !themeId || !count) {
      return res.status(400).json({ ok: false, error: "MISSING_PARAMS" });
    }

    const prompts = buildPrompts({
      detailId,
      emotionSetId,
      themeId,
      count,
      outfitId,
      colorId
    });

    // buildPrompts에서 [{ emotionLabelKo, text }, ...] 형식으로 내려온 걸 그대로 전달
    res.json({ ok: true, prompts });
  } catch (err) {
    console.error("generate-prompts error:", err);
    res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
});

app.listen(PORT, () => {
  console.log(`EmojiMint / 이모지민트 backend listening on port ${PORT}`);
});
