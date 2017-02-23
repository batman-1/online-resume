define([ 'jquery'], function($) {
    
   function Dropdown(parentNode,node){
        this.parentNode = $(parentNode);
        this.node = $(node);
       // this.init();
        this.bind();
    }
    Dropdown.prototype.init = function(){
        // this.node.addClass('hide');   
    }
    Dropdown.prototype.bind = function(){
        var that = this;
        this.parentNode.on('mouseover',function(e){  
            that.node.css("display","block")
        })
        this.parentNode.on('mouseout',function(e){
            that.node.css('display','none')
        })
    }
    return Dropdown;
});