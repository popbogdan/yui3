YUI.add("state",function(B){var A=B.lang;B.State=function(){this.data={};};B.State.prototype={add:function(C,D){B.each(D,function(F,E){if(!this.data[E]){this.data[E]={};}this.data[E][C]=F;},this);},remove:function(D,F){var E=this.data,C=function(G){if(E[G]&&(D in E[G])){delete E[G][D];}};if(A.isString(F)){C(F);}else{B.each(F||E,function(H,G){if(A.isString(G)){C(G);}else{C(H);}},this);}},get:function(C,D){var F=this.data;if(D){return F[D]&&F[D][C];}else{var E={};B.each(F,function(H,G){if(C in F[G]){E[G]=H[C];}},this);return E;}},list:function(C,F){var E={},D=this.data,G=!A.isUndefined(F);B.each(this,function(I,H){if(C&&H!==C){return ;}else{if(G&&I!==F){return ;}}E[H]=I;},this);return E;}};},"3.0.0");YUI.add("attribute",function(A){var G=A.object,H=".",D="Change",I="get",C="set",F="value",J="readonly",B="validator";function E(N,P,K,L,Q,O){N=N+D;this.publish(N,{queuable:false});var M={type:N,prevVal:P,newVal:K,attrName:L,subAttrName:Q};if(O){A.mix(M,O);}this.fire(M);}A.Attribute=function(){this._conf=this._conf||new A.State();A.log("att constructor called","info","Attribute");};A.Attribute.prototype={addAtt:function(K,L){A.log("adding attribute: "+K,"info","Attribute");this._conf.add(K,L);},remove:function(K){this._conf.remove(K);},get:function(M){var L=this._conf,O,K,N,P;if(M.indexOf(H)!==-1){O=M.split(H);M=O.shift();}K=L.get(M,I);N=L.get(M,F);P=(K)?K.call(this,N):N;return(O)?this._getSubValue(O,P):P;},set:function(L,O,K){var S=this._conf,Q,V,T,P,M,N,U,R;if(L.indexOf(H)!==-1){Q=L;V=L.split(H);L=V.shift();}if(S.get(L,J)){A.log("set "+L+"failed; attribute is readonly","error","Attribute");return this;}if(!S.get(L)){A.log("Set called with unconfigured attribute. Adding a new attribute: "+L,"info","Attribute");}N=this.get(L);if(V){O=this._setSubValue(V,A.clone(N),O);if(O===undefined){A.log("set "+Q+"failed; attribute sub path is invalid","error","Attribute");return this;}}T=S.get(L,C);if(T){M=T.call(this,O);if(M!==undefined){A.log("attribute: "+L+" modified by setter","info","Attribute");O=M;}}P=S.get(L,B);if(!P||P.call(this,O)){S.add(L,{value:O});if(V){E.call(this,Q,N,O,L,Q,K);}E.call(this,L,N,O,L,Q,K);}return this;},_getSubValue:function(M,N){var L=M.length,K;if(L>0){for(K=0;N!==undefined&&K<L;++K){N=N[M[K]];}}return N;},_setSubValue:function(N,P,M){var L=N.length-1,K,O;if(L>=0){O=P;for(K=0;O!==undefined&&K<L;++K){O=O[N[K]];}if(O!==undefined){O[N[K]]=M;}else{P=undefined;}}return P;},setAtts:function(L){for(var K in L){if(A.object.owns(L,K)){this.set(K,L[K]);}}},getAtts:function(L){var K={};if(L){K=A.clone(L);}else{A.each(this._conf.get(F),function(N,M){K[M]=N;});}return K;},_initAtts:function(K,M){if(K){var L,N,O=A.merge(K);for(L in O){if(G.owns(O,L)){N=O[L];this.addAtt(L,N);this._initAttValue(L,N,M);}}}},_initAttValue:function(L,K,M){var N=("value" in K),O=K.value;if(M){if(G.owns(M,L)){N=true;O=M[L];}else{}}if(N){this.set(L,O);}}};A.augment(A.Attribute,A.EventTarget,null,null,{emitFacade:true});},"3.0.0",{requires:["state"]});