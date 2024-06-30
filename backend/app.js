var createError = require('http-errors');
var express = require('express');
const port = 3000;
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');

//유저

var cartRouter = require('./routes/cart');

//로그인
const session = require('express-session'); 
const fileStore = require('session-file-store')(session);



// var wishRouter = require('./routes/wish');
const wishRouter = require('./routes/wish.js')


//관리자
const adminMemberRouter = require('./routes/admin/adminMember.js')
const adminOrderRouter = require('./routes/admin/adminOrder.js')
const adminProdRouter = require('./routes/admin/adminProd.js')
const adminQnaRouter = require('./routes/admin/adminQna.js')

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
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret key', //암호화하는 데 쓰일 키
    resave: false, // 세션에 변경사항이 없어도 항상 다시 저장할지 여부
    saveUninitialized: true, // 초기화되지 않은 세션을 스토어(저장소)에 강제로 저장할지 여부
    cookie: { // 세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
      httpOnly: true, // true 이면 클라이언트 자바스크립트에서 document.cookie로 쿠키 정보를 볼 수 없음
      secure: true, // true 이면 https 환경에서만 쿠키 정보를 주고 받도록 처리,
      maxAge: 60000 // 쿠키가 유지되는 시간 (밀리세컨드 단위)
    },
    store: new fileStore() // 세션 저장소로 fileStore 사용
  }
  ));

const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.use('/', indexRouter);

//공통
app.use('/common', commonRouter);
app.use('/users', usersRouter);

//유저

app.use('/cart', cartRouter);

//이미지 로컬경로

//app.use('/upload', express.static('C:/Users/ekdms/Desktop/images/prodImages'));

app.use('/upload', express.static('D:/images/prodImages'));


//로그인
app.use('/users', usersRouter);


app.get("/", (req, res) => {
    res.send("Hello World!~~");
});


app.use('/wish', wishRouter);
app.use('/shop', prodRouter);
app.use('/notice', noticeRouter);

app.use('/mypage', mypageRouter);

//관리자

app.use("/adminQna", adminQnaRouter)
app.use("/adminMember", adminMemberRouter)
app.use("/adminOrder", adminOrderRouter)
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

// app.listen(port, () => {
//     console.log(`Example app listening on http://localhost:${port}`);
// });

module.exports = app;
