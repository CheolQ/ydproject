var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//로그인,회원가입
var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');

//유저

var cartRouter = require('./routes/cart');

// var wishRouter = require('./routes/wish');
const wishRouter = require('./routes/wish.js');

//관리자
const adminMemberRouter = require('./routes/admin/adminMember.js')
const AdminOrderRouter = require('./routes/admin/adminOrder.js')
const adminProdRouter = require('./routes/admin/adminProd.js')


const prodRouter = require('./routes/prod.js');
const noticeRouter = require('./routes/notice.js');
const mypageRouter = require('./routes/mypage.js');
const commonRouter = require('./routes/common.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//공통
app.use('/common', commonRouter);

//유저
app.use('/cart', cartRouter);

//로그인
app.use('/users', usersRouter);

app.use('/wish', wishRouter);

app.use('/shop', prodRouter);
app.use('/notice', noticeRouter);

app.use('/mypage', mypageRouter);

//관리자

app.use("/adminMember", adminMemberRouter)
app.use("/adminOrder", AdminOrderRouter)
app.use("/adminProd", adminProdRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
