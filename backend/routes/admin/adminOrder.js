const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")

router.get("/", async (req, res) => {
    let page = Number(req.query.page);

    let pageUnit = Number(req.query.pageUnit);
    console.log(req.query.name);

    let name = '%'+req.query.name+'%';
    let date1 = req.query.date1;
    let date2 = req.query.date2;
    let category = req.query.category;

    if(!date2) {
        date2 = await query("AdminOrderDate");
        date2 = date2[0].date;
    }

    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 10;}
    let offset = (page-1) * pageUnit;

    let list = null;
    let count = null;
    
    console.log(name);
    console.log(req.query.from);
    if(req.query.from === 'order'){
        if(!category){
            list = await query("AdminOrderList", [date1, date2, 'D1', 'D4', name, offset, pageUnit]);
            count = await query('AdminOrderCount', [name, date1, date2, 'D1', 'D4']);
        }else{
            list = await query("AdminOrderList", [date1, date2, category, category, name, offset, pageUnit]);
            count = await query('AdminOrderCount', [name, date1, date2, category, category]);
        }
    }else if(req.query.from === 'delivery'){
        if(!category){
            list = await query("AdminOrderList", [date1, date2, 'D5', 'D6', name, offset, pageUnit]);
            count = await query('AdminOrderCount', [name, date1, date2, 'D5', 'D6']);
        }else{
            list = await query("AdminOrderList", [date1, date2, category, category, name, offset, pageUnit]);
            count = await query('AdminOrderCount', [name, date1, date2, category, category]);
        }
    }else if(req.query.from === 'cancel'){
        if(!category){
            list = await query("AdminOrderList", [date1, date2, 'D2', 'D3', name, offset, pageUnit]);
            count = await query('AdminOrderCount', [name, date1, date2, 'D2', 'D3']);
        }else{
            list = await query("AdminOrderList", [date1, date2, category, category, name, offset, pageUnit]);
            count = await query('AdminOrderCount', [name, date1, date2, category, category]);
        }
    }
    res.send({list,count}); 
})

router.post("/Preparing/:no", async (req, res) => {
    console.log(req.params.no);
    await query("AdminOrderPrepare", req.params.no);
    res.send("ok");
})

router.get("/delivery", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    let orderStauts = req.query.orderStatus;

    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 10;}
    let offset = (page-1) * pageUnit;

    let list = await query("AdminOrderDelList", [offset, pageUnit]);
    let count = await query('AdminOrderDelCount');
    console.log(count);
    res.send({list,count})
})

router.post("/delivery/:no", async (req, res)=>{
    await query("AdminOrderDel", req.params.no);
    res.send("ok");
})

router.get("/cancel", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    let orderStauts = req.query.orderStatus;

    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 10;}
    let offset = (page-1) * pageUnit;

    let list = await query("AdminOrderCancelList", [offset, pageUnit]);
    let count = await query('AdminOrderCancelCount');
    console.log(count);
    res.send({list,count})
})

router.post("/cancel/:no", async (req, res)=>{

    await query("AdminOrderCancel1", req.params.no);
    await query("AdminOrderCancel2", req.params.no);
    let result = await query("AdminOrderCancel3", req.params.no);
    let point = result[0].point;
    let use_point = result[0].use_point;
    let user_no = result[0].user_no
    await query("AdminOrderCancel4", [use_point, point, user_no]);
    res.send("ok");
})

router.post("/", async (req, res) => {
    console.log(req.body);
    let list1 = await query('AdminOrderInfo1', req.body.no);
    let list2 = await query('AdminOrderInfo2', req.body.no);
    let list3 = await query('AdminOrderCancelDate', req.body.no)
    res.send({list1,list2,list3})
})

router.put("/", async (req, res) => {
    console.log(req.body);
    let no = req.body.no;
    let orderStatus = req.body.orderStatus;
    let deilCode = req.body.deilCode;
    await query('AdminOrderInfoUpdate', [orderStatus, deilCode, no])
    res.send('check');
})

module.exports = router;