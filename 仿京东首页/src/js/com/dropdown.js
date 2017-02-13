define([ 'jquery'], function($) {
    
   function Dropdown(parentNode,node){
        this.parentNode = $(parentNode);
        this.node = $(node);
        this.init();
    }
    Dropdown.prototype.init = function(){
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