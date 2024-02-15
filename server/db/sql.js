const boardList = `SELECT no, 
        title,
        writer, 
        content, 
        created_date, 
        updated_date
FROM t_board_board
ORDER BY no`;

const boardInfo = `SELECT no, 
        title, 
        writer, 
        content, 
        created_date, 
        updated_date
FROM t_board_board
WHERE no = ?`;

/* ? > 1. 갯수  => 배열 
       2.각 ?,col연결. 
       col이 명확 x > 객체.
    ? 넣는 이유 no에 조건 주려고  */

const boardInsert = `INSERT INTO t_board_board 
SET ? `;

const boardUpdate = `UPDATE t_board_board 
SET ? 
WHERE no = ? `;

module.exports = {
  boardList,
  boardInfo,
  boardInsert,
  boardUpdate,
};
