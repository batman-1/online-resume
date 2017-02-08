import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'QHBtJVnWGFj6MuLKWXJ5UyKC-gzGzoHsz';
var APP_KEY = 'yH3vQqzqhyqP3oC43NTAWgdR';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var app = new Vue({
  el: '#app',
  data: {
    actionType: 'login',
    formData: {
      username: '',
      password: ''
    },
    newTodo: '',
    todoList: [],
    currentUser: null
  },

  created: function(){
  	this.currentUser = this.getCurrentUser();
    if(this.currentUser){
      var query = new AV.Query('AllTodos');
      query.find()
        .then((todos)=>{
           console.log(todos)
          let avAllTodos = todos[0]
          let id = avAllTodos.id
          this.todoList = JSON.parse(avAllTodos.attributes.content)
          this.todoList.id = id;
        },function(error){
          console.error(error)
        })
    };
  },

  methods: {
    updateTodos: function(){
      let dataString = JSON.stringify(this.todoList) 
      let avTodos = AV.Object.createWithoutData('AllTodos',this.todoList.id)
      avTodos.set('content',dataString)
      avTodos.save().then(()=>{
        console.log('更新成功')
      },(error)=>{
        console.error(error)
      })
    },

    saveTodo: function(){
      let dataString = JSON.stringify(this.todoList);
      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();
      var acl = new AV.ACL();
      acl.setReadAccess(AV.User.current(),true);
      acl.setWriteAccess(AV.User.current(),true);

      avTodos.set('content',dataString);
      avTodos.setACL(acl);
      avTodos.save().then(function(todo){
         this.todoList.id = todo.id
        console.log('保存成功');
      },function(error){
        alert('保存失败');
      });
    },

    saveOrUpdateTodos: function(){
      if (this.todoList.id) {
        this.updateTodos();
      }else{
        this.saveTodo();
      }
    },

  	addTodo: function(){
  		this.todoList.push({
  			title: this.newTodo,
  			createdAt: this.getTime() ,
  			done: false
  		})
      this.saveOrUpdateTodos();
  		this.newTodo = '';  
  	},

  	getTime: function(){
  		let t = new Date(),
  		nowTime = "创建于:" + t.toLocaleDateString() +" "+ t.toLocaleTimeString()+'   ';
  		return nowTime;
    },

    removeTodo: function(todo){
    	let index = this.todoList.indexOf(todo);
    	this.todoList.splice(index,1);
      this.saveOrUpdateTodos();
    },

    signUp: function(){
      let user = new AV.User();
      user.setUsername(this.formData.username);
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser)=>{
        console.log(loginedUser)
        this.currentUser = this.getCurrentUser();
        alert('注册成功')
      },(error)=>{
        alert('注册失败')
      })
    },

    login: function(){
       AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser)=>{
        console.log(loginedUser)
          this.currentUser = this.getCurrentUser()
          window.location.reload();
       },(error)=>{
          alert('登录失败')
       });
    },

    logout: function(){
       AV.User.logOut();
       this.currentUser = null;
       window.location.reload();
    },

    getCurrentUser: function () { 
      let current = AV.User.current()
      if (current) {
           let {id, createdAt, attributes: {username}} = current
           return {id, username, createdAt}
      }else{
        return null;
      }
    }
  }
});
