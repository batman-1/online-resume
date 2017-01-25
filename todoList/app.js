import Vue from 'vue'

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
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
    }
  }
})