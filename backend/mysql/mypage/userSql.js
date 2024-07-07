module.exports = {
    userInfo: `
                select 
                    name, 
                    user_id, 
                    email, 
                    addr, 
                    detail_addr,
                    tel, 
                    point, 
                    (
                        select sum(pay_price) 
                        from orders
                        where user_no = (
							select user_no
                            from user
                            where user_id = ?
                        )
                    ) as total_order_price
                from user
                where user_id = ?`,

    mypagePoint: `
                    select point 
                    from user
                    where user_id = ?;
    `,

    mypagePointList: `
                        SELECT 
                        od.order_no,
                        od.order_date,
                        od.user_no,
                        od.pay_price,
                        od.order_status,
                        'earned' AS point_type, -- 포인트 유형
                        od.point AS points, -- 적립 포인트
                        NULL AS points_refunded, -- 반환된 적립 포인트 (정상 주문의 경우 없음)
                        NULL AS points_used_refunded, -- 반환된 사용 포인트 (정상 주문의 경우 없음)
                        NULL AS cal_up, -- 취소 확정일 (정상 주문의 경우 없음)
                        (SELECT prod_name FROM prod WHERE prod_no = MIN(ods.prod_no)) AS prod_name, -- 상품 이름
                        COUNT(DISTINCT ods.prod_no) AS cnt -- 주문 상품 개수
                        FROM 
                            orders od
                        LEFT JOIN 
                            order_detail ods ON od.order_no = ods.order_no
                        WHERE 
                            od.user_no = (
                                SELECT user_no
                                FROM user
                                WHERE user_id = ?
                            )
                        GROUP BY 
                            od.order_no, 
                            od.order_date, 
                            od.user_no, 
                            od.pay_price, 
                            od.order_status, 
                            od.point

                        UNION ALL

                        SELECT 
                            od.order_no,
                            od.order_date,
                            od.user_no,
                            od.pay_price,
                            od.order_status,
                            'used' AS point_type, -- 포인트 유형
                            od.use_point AS points, -- 사용 포인트
                            NULL AS points_refunded, -- 반환된 적립 포인트 (정상 주문의 경우 없음)
                            NULL AS points_used_refunded, -- 반환된 사용 포인트 (정상 주문의 경우 없음)
                            NULL AS cal_up, -- 취소 확정일 (정상 주문의 경우 없음)
                            (SELECT prod_name FROM prod WHERE prod_no = MIN(ods.prod_no)) AS prod_name, -- 상품 이름
                            COUNT(DISTINCT ods.prod_no) AS cnt -- 주문 상품 개수
                        FROM 
                            orders od
                        LEFT JOIN 
                            order_detail ods ON od.order_no = ods.order_no
                        WHERE 
                            od.user_no = (
                                SELECT user_no
                                FROM user
                                WHERE user_id = ?
                            )
                        GROUP BY 
                            od.order_no, 
                            od.order_date, 
                            od.user_no, 
                            od.pay_price, 
                            od.order_status, 
                            od.use_point

                        UNION ALL

                        -- 주문 취소로 인한 포인트 반환 내역
                        SELECT 
                            oc.order_no,
                            oc.cal_up AS order_date, -- 취소 확정일을 주문 날짜로 표시
                            od.user_no,
                            od.pay_price,
                            'D3' AS order_status, -- 주문 상태를 취소로 표시
                            'refunded' AS point_type, -- 포인트 유형
                            NULL AS points, -- 적립 포인트 (취소 시 적립 없음)
                            od.point AS points_refunded, -- 반환된 적립 포인트
                            od.use_point AS points_used_refunded, -- 반환된 사용 포인트
                            oc.cal_up, -- 취소 확정일
                            (SELECT prod_name FROM prod WHERE prod_no = MIN(ods.prod_no)) AS prod_name, -- 상품 이름
                            COUNT(DISTINCT ods.prod_no) AS cnt -- 주문 상품 개수
                        FROM 
                            orders od
                        LEFT JOIN 
                            order_detail ods ON od.order_no = ods.order_no
                        LEFT JOIN 
                            order_cancel oc ON od.order_no = oc.order_no -- 취소 정보와 조인
                        WHERE 
                            od.user_no = (
                                SELECT user_no
                                FROM user
                                WHERE user_id = ?
                            )
                            AND od.order_status = 'D3' -- 취소된 주문만 선택
                        GROUP BY 
                            oc.order_no, 
                            oc.cal_up, 
                            od.user_no, 
                            od.pay_price, 
                            od.point, 
                            od.use_point

                        ORDER BY 
                            order_date DESC; -- 주문 날짜 순으로 내림차순 정렬
    `,
};
