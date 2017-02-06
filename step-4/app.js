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
    actionType: 'signUp',
    formData: {
      username: '',
      password: ''
    },
    newTodo: '',
    todoList: [],
    currentUser: null
  },

  created: function(){
  	window.onbeforeunload = ()=>{
  		let dataString = JSON.stringify(this.todoList);
  		window.localStorage.setItem('mytodos', dataString);
  	};
  	let oldDate = JSON.parse(window.localStorage.getItem('mytodos'));
  	this.todoList = oldDate || [];
  },

  methods: {
  	addTodo: function(){
  		this.todoList.push({
  			title: this.newTodo,
  			createdAt: this.getTime() ,
  			done: false
  		})
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
       },(error)=>{
          alert('登录失败')
       });
    },

    logout: function(){
       AV.User.logOut();
       this.currentUser = null;
       window.location.reload();
    },

    getCurrentUser: function () { // 👈
      let {id, createdAt, attributes: {username}} = AV.User.current()
      return {id, username, createdAt} 
    }
  }
})
