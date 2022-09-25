(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/swiperAction"],{"36b5":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={name:"swiperAction",data:function(){return{startTime:0,startX:0,startY:0}},methods:{handleTouchstart:function(t){this.startTime=Date.now(),this.startX=t.changedTouches[0].clientX,this.startY=t.changedTouches[0].clientY},handleTouchend:function(t){var n=Date.now(),e=t.changedTouches[0].clientX,a=t.changedTouches[0].clientY;if(!(n-this.startTime>2e3)){var r="";Math.abs(e-this.startX)>10&&Math.abs(a-this.startY)<10&&(r=e-this.startX>0?"right":"left",this.$emit("swiperAction",{direction:r}))}}}};n.default=a},4962:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var r=function(){var t=this,n=t.$createElement;t._self._c},i=[]},9258:function(t,n,e){"use strict";e.r(n);var a=e("4962"),r=e("f421");for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);var c,s=e("f0c5"),u=Object(s["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=u.exports},f421:function(t,n,e){"use strict";e.r(n);var a=e("36b5"),r=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/swiperAction-create-component',
    {
        'components/swiperAction-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9258"))
        })
    },
    [['components/swiperAction-create-component']]
]);
