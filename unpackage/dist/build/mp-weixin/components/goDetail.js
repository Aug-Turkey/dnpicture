(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/goDetail"],{"2c53":function(t,n,e){"use strict";e.r(n);var a=e("5528"),i=e("9297");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);var r,l=e("f0c5"),o=Object(l["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);n["default"]=o.exports},5528:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}));var i=function(){var t=this,n=t.$createElement;t._self._c},u=[]},9297:function(t,n,e){"use strict";e.r(n);var a=e("f90e"),i=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=i.a},f90e:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"goDetail",data:function(){return{}},props:{list:Array,index:Number},methods:{handleClick:function(){getApp().globalData.imgList=this.list,getApp().globalData.imgIndex=this.index,t.navigateTo({url:"/pages/imgDetail/imgDetail"})}}};n.default=e}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/goDetail-create-component',
    {
        'components/goDetail-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2c53"))
        })
    },
    [['components/goDetail-create-component']]
]);
