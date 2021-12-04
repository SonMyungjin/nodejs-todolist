const express = require('express');
const path = require('path');

const app = express();

let todoLists = [];

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {todoListTitle: '오늘의 할 일 : ' + todoLists.length, todoLists})
});

app.post('/add_list', (req, res) => {
    const newContent = req.body.content;
    console.log(newContent + '추가');
    todoLists.push(newContent);
    res.redirect('/');
});

app.get('/delete_list/:id', (req,res) => {
    const deleteContent = req.params.id;
    console.log(deleteContent + '삭제');
    todoLists = todoLists.filter((value) => value != deleteContent);
    res.redirect('/');
});

app.get('/open_update/:id', (req, res) => {
    res.render('update', {prevContent: req.params.id});
});

app.post('/update_list', (req, res) => {
    let prevContent = req.body.prevContent;
    let newContent = req.body.newContent;
    let index = todoLists.indexOf(prevContent);
    todoLists.splice(index, 1, newContent);
    console.log(prevContent + '을(를)' + newContent + '(으)로 수정');
    res.redirect('/');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 연결');
});
