define(['com/dropdown','com/serviceNav'],function(Dropdown,serviceNav){
    new Dropdown('#ttbar-mycity', '.dropdown-layer');
    new Dropdown('#jd-mobile-qrcode', '#dropdown-qrcode');
    new Dropdown('#my-shopping-c', '.dorpdown-layer');
    serviceNav()
})