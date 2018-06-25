var todos = [];

var list = document.querySelector('#todo-list');
var inputTodo = document.querySelector('#input-todo');
var delBtn = document.querySelector('.glyphicon-remove-circle');


// 공통 함수 
// 리스트 렌더링 
function renderList () {
   
    list.innerHTML = "";
    
    todos.forEach(function(todo){
    
    var checked = todo.completed ? 'checked' : '';
    //console.log(todo.id);
    list.innerHTML += 
    '<li class="list-group-item"><div class="hover-anchor">'
    + '<a class="hover-action text-muted">'
    + '<span class="glyphicon glyphicon-remove-circle pull-right" data-id="' 
    + todo.id 
    + '"></span></a><label class="i-checks" for="'
    + todo.id 
    + '"><input type="checkbox" '
    + 'id="'
    + todo.id
    + '"'
    + checked
    + '><i></i><span>'
    + todo.content
    + '</span></label></div></li>'
  })
}

// maxID 함수

function getIDs () {
  var arrID = todos.map(function(todo){
    return todo.id; 
  })

  return Math.max.apply(null, arrID)+1;
}


//체크박스에 체크 할 시, todo에서 콘플리티드 상태값 바꿔주고 html로 보낸다.

list.addEventListener('change', function(e){
  
  var id = +e.target.parentNode.querySelector('input').id;

  todos = todos.map(function(todo){
    return todo.id == id ? Object.assign({}, todo, {completed: !todo.completed}) : todo ; 
  }) 

  //console.log(e.target.parentNode);
 
  renderList ();
  
  console.log(todos);
})

// 들리트 버튼을 누를 시, todos 에서 필터를 이용해 빼주고 html로 보낸다.

list.addEventListener('click', function(e){
  if (e.target.nodeName !== 'SPAN') return;
  console.log(e.target.nodeName);
  
  var id = +e.target.parentNode.querySelector('span').dataset.id;
  console.log(id);
  
  
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });
  

  renderList ();
  console.log(todos);
})



//새로운 투두스를 넣은다. -> 인풋 데이터를 투두스 배열에 넣고, 그걸 다시 html로 보낸다. 

inputTodo.addEventListener('keyup', function(e){
  if (e.keyCode !== 13) return;
  //console.log(getID);

  todos = [{
    id: getIDs (),
    content: inputTodo.value,
    completed: false
  }].concat(todos);

  console.log(todos);

  renderList ();
})

//데이터를 가져와서 html로 보낸다.  

window.addEventListener('load', function(){

  todos = [
    {id: 1, content: 'HTML', completed: true},
    {id: 2, content: 'CSS', completed: false},
    {id: 3, content: 'JavaScript', completed: false}
  ];
  //console.log(todos);
 
  renderList();
})