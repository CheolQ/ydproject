module.exports = {
  prodList: `SELECT prod_no, prod_name, category_code, prod_price, prod_explain, main_img, detail_img, maker, origin, exp_date
             FROM prod`,
  prodInfo: `SELECT prod_no, prod_name, category_code, prod_price, prod_explain, main_img, detail_img, maker, origin, exp_date
             FROM prod
             WHERE prod_no = ?`,
  reviewList: `SELECT * FROM review where prod_no = ?`,

};
