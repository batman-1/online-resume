define([ 'jquery'], function($) {
    
   function Dropdown(parentNode,node){
        this.parentNode = $(parentNode);
        this.node = $(node);
        this.init();
        this.bind();
    }
    Dropdown.prototype.init = function(){
        this.node.addClass('hide');   
    }
    Dropdown.prototype.bind = function(){
        var that = this;
        this.parentNode.on('mouseenter',function(){
            that.node.removeClass('hide')
        })
        this.parentNode.on('mouseleave',function(){
            
            that.node.addClass('hide')
        })
    }
    return Dropdown;
});