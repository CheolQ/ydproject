module.exports = {
    prodList: `SELECT prod_no, prod_name, category_code, prod_price, prod_explain, main_img, detail_img, maker, origin, exp_date
             FROM prod`,
    prodInfo: `SELECT prod_no, prod_name, category_code, prod_price, prod_explain, main_img, detail_img, maker, origin, exp_date
             FROM prod
             WHERE prod_no = ?`,
    reviewList: `SELECT review_no, user_id, review_content, create_date, rating, review_title, prod_no, order_detail_no, order_no
              FROM review 
              where prod_no = ?`,
    qnaList: `SELECT board_no, user_id, title, content, create_date, board_pw, update_date, user_no, prod_no   
            FROM qna 
            where prod_no = ?`,
    qnaInfo: `SELECT board_no, user_id, title, content, create_date, board_pw, update_date, user_no, prod_no   
            FROM qna 
            where prod_no = ? and board_no = ?`,

    qnaInsert: `insert into qna set ?`,
    qnaUpdate: 'UPDATE qna SET ? WHERE board_no = ?',
};
