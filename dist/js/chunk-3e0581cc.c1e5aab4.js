(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e0581cc"],{a314:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"proposal-create"},[r("div",{staticClass:"proposal-create-container container"},[r("ProposalFormHeader",{attrs:{"is-creation":!0}}),e.projectId?r("ProposalForm",{attrs:{id:e.projectId},on:{done:e.finishCreate}}):e._e()],1)])},o=[],n=(r("96cf"),r("1da1")),c=r("2708"),s=r("e3fd"),i=r("569c"),p="summit-cur-project-id",d={name:"ProposalCreate",components:{ProposalForm:s["a"],ProposalFormHeader:i["a"]},mixins:[c["a"]],data:function(){return{projectId:null}},created:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=localStorage.getItem(p),!r){t.next=5;break}e.projectId=r,t.next=9;break;case 5:return t.next=7,e.handleApiError(e.$store.dispatch("createEmptyProject"));case 7:e.projectId=t.sent,localStorage.setItem(p,e.projectId);case 9:case"end":return t.stop()}}),t)})))()},methods:{finishCreate:function(){localStorage.setItem(p,"")}}},u=d,l=(r("b0ae"),r("2877")),f=Object(l["a"])(u,a,o,!1,null,"d9d2b7a0",null);t["default"]=f.exports},b0ae:function(e,t,r){"use strict";var a=r("bd0f"),o=r.n(a);o.a},bd0f:function(e,t,r){}}]);
//# sourceMappingURL=chunk-3e0581cc.c1e5aab4.js.map