(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00a2877c"],{2347:function(t,e,a){"use strict";var r=a("274f"),n=a.n(r);n.a},"274f":function(t,e,a){},"8db0":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"propasal-list"},[a("ListHeader",{attrs:{keyword:t.keyword},on:{updateKeyword:function(e){t.keyword=e},updateCurrentPage:function(e){t.paginationData.currentPage=e}}}),a("List",{attrs:{list:t.listByPage,routerName:"ProposalEdit",displayDraftNotice:!0}}),a("ListPagination",{attrs:{perPage:t.paginationData.perPage,currentPage:t.paginationData.currentPage,allDataLength:t.listByKeywordFilter.length},on:{updateCurrentPage:function(e){t.paginationData.currentPage=e}}})],1)},n=[],i=(a("4de4"),a("fb6a"),a("ac1f"),a("841c"),a("96cf"),a("1da1")),o=a("651a"),s=a("74f5"),c=a("6898"),u=a("2708"),g={name:"PropasalManageList",mixins:[u["a"]],components:{ListHeader:o["a"],List:s["a"],ListPagination:c["a"]},beforeRouteEnter:function(t,e,a){a(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$store.getters.isLoggedIn||e.$router.push({name:"Homepage"}),t.next=3,e.handleApiError(e.$store.dispatch("listProjects"));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},data:function(){return{keyword:"",paginationData:{currentPage:1,perPage:12}}},computed:{listByKeywordFilter:function(){var t=this;if(this.keyword){var e=this.$store.getters.myProjectList.filter((function(e){var a=e.versions[e.versions.length-1];return!!a&&(-1!=a.title.toLowerCase().search(t.keyword.toLowerCase())||-1!=a.title_en.toLowerCase().search(t.keyword.toLowerCase()))}));return e}return this.$store.getters.myProjectList},listByPage:function(){return this.listByKeywordFilter.slice((this.paginationData.currentPage-1)*this.paginationData.perPage,this.paginationData.currentPage*this.paginationData.perPage)}}},p=g,l=(a("2347"),a("2877")),d=Object(l["a"])(p,r,n,!1,null,"467e1c6c",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-00a2877c.a2edb741.js.map