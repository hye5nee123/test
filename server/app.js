// dotenv 패키지를 사용하여 환경 변수를 로드합니다.
require("dotenv").config({ path: "./db/db.env" });

// Express 프레임워크를 가져옵니다.
const express = require("express");

// Express 애플리케이션을 생성합니다.
const app = express();

// JSON 파싱 미들웨어를 Express 애플리케이션에 추가합니다.
// 요청 본문의 JSON을 파싱하고 요청 객체에 추가합니다. 최대 크기를 50MB로 제한합니다.
app.use(express.json({ limit: "50mb" }));

// Express 애플리케이션을 3000번 포트에서 실행하고 서버가 시작되었음을 콘솔에 로그합니다.
app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

// 데이터베이스 모듈을 가져옵니다. "./db.js" 파일에서 데이터베이스 연결을 설정합니다.
const db = require("./db.js");

// REST API 엔드포인트 정의

// 모든 게시물을 조회하는 엔드포인트입니다. 실제 로직은 아직 구현되지 않았습니다.
app.get("/boards", async (request, response) => {
  let result = await db.connection("boardList");
  response.send(result);
});

// 특정 게시물을 조회하는 엔드포인트입니다. ":bno"는 게시물 번호를 나타냅니다.
app.get("/boards/:bno", async (request, response) => {
  let data = request.params.bno;
  let result = (await db.connection("boardInfo", data))[0];
  response.send(result);
});

// 새로운 게시물을 등록하는 엔드포인트입니다. 요청 본문에서 파라미터를 가져옵니다.
app.post("/boards", async (request, response) => {
  let data = request.body.params; // { param : { .. } }
  let result = await db.connection("boardInsert", data);
  response.send(result);
});

// 기존 게시물을 수정하는 엔드포인트입니다. 요청 본문과 게시물 번호를 가져와 수정합니다.
app.put("/boards/:bno", async (request, response) => {
  let data = [request.body.params, request.params.bno];
  let result = await db.connection("boardUpdate", data);
  response.send(result);
});
