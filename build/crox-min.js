/*
 Crox v1.2.7
 https://github.com/thx/crox

 Released under the MIT license
 md5: f9150092d0146d7501cafa72ba97a807
*/
(function(t){var n=function(){function n(a,c){this.row=a;this.col=c}function y(a,c){var e=a.substring(0,c),d=e.match(/\r\n?|\n/g),m=1;d&&(m+=d.length);e=1+/[^\r\n]*$/.exec(e)[0].length;return new n(m,e)}function t(a){return'"'+a.replace(/[\x00-\x1f"\\\u2028\u2029]/g,function(c){switch(c){case '"':return'\\"';case "\\":return"\\\\";case "\b":return"\\b";case "\f":return"\\f";case "\n":return"\\n";case "\r":return"\\r";case "\t":return"\\t"}return"\\u"+("000"+c.charCodeAt(0).toString(16)).slice(-4)})+
'"'}function z(a){return eval(a)}function I(a){function c(c,a,k,m){this.tag=c;this.text=a;this.index=k;this.subMatches=m}function e(){}function d(c){for(var a=1,k=[],m=[1],b=[],f=0;f<c.length;++f)m.push(a+=RegExp("|"+c[f][0].source).exec("").length),b.push(c[f][1]||e),k.push("("+c[f][0].source+")");return[RegExp(k.join("|")+"|","g"),m,b]}c.prototype.toString=function(){return this.text};var m=a.$||"$",b={},h;for(h in a)"$"!=h.charAt(0)&&(b[h]=d(a[h]));return function(a){var d=a.length,k=0,h=[""],
l={text:"",index:0,source:a,pushState:function(a){h.push(a)},popState:function(){h.pop()},retract:function(a){k-=a}};return{scan:function(){do{var f;a:{var e=b[h[h.length-1]],g=e[0];g.lastIndex=k;f=g.exec(a);if(""==f[0]){if(k<d)throw Error("lexer error: "+y(a,k)+"\n"+a.slice(k,k+50));f=new c(m,"",k)}else{l.index=k;k=g.lastIndex;for(var g=e[1],q=0;q<g.length;++q)if(f[g[q]]){e=e[2][q].apply(l,f.slice(g[q],g[q+1]));f=new c(e,f[0],l.index,f.slice(g[q]+1,g[q+1]));break a}f=void 0}}}while(null==f.tag);
return f},getPos:function(c){return y(a,c)}}}}function A(a){var c;a:{switch(a){case "id":case "lit":c=!0;break a}c=!1}return c||"."==a||"[]"==a}function x(a){return A(a)||"!"==a||"u-"==a}function B(a){if(x(a))return!0;switch(a){case "*":case "/":case "%":return!0}return!1}function C(a){if(B(a))return!0;switch(a){case "+":case "-":return!0}return!1}function D(a){if(C(a))return!0;switch(a){case "<":case ">":case "<=":case ">=":return!0}return!1}function E(a){if(D(a))return!0;switch(a){case "eq":case "ne":return!0}return!1}
function F(a){return E(a)||"&&"==a}function J(a){return F(a)||"||"==a}function K(a,c,e){function d(a){v+=a}function m(a){for(var b=0;b<a.length;++b){var l=a[b];switch(l[0]){case "if":d("if("+h(l[1])+"){");m(l[2]);d("}");l[3]&&(d("else{"),m(l[3]),d("}"));break;case "each":var f=l[3]?l[3].replace(/^_+/,"$&$&"):"_"+w++,u=h(l[1]);if(/^\w+$/.test(u))var g=u;else g="_"+w++,d("var "+g+" = "+u+";");l[5]?d("for(var "+f+"=0;"+f+"<"+g+".length;"+f+"++){"):d("for(var "+f+" in "+g+") {");d("var "+l[4]+" = "+g+
"["+f+"];");m(l[2]);d("}");break;case "set":d("var "+l[1].replace(/^_+/,"$&$&")+"="+h(l[2])+";");break;case "eval":f=h(l[1]);/^\w+$/.test(f)?u=f:(u="_t",d("_t = "+f+";"));d("if("+u+" !=null)_s += "+((e?!l[2]:l[2])?c+"("+u+")":u)+";");break;case "text":d("_s += "+t(l[1])+";");break;case "inc":break;default:throw Error("unknown stmt: "+l[0]);}}}function b(a,c){var b=h(a);c&&!c(a[0])&&(b="("+b+")");return b}function h(a){switch(a[0]){case "id":return a[1].replace(/^_+/,"$&$&");case "lit":return"string"==
typeof a[1]?t(a[1]):String(a[1]);case ".":return b(a[1],A)+"."+a[2];case "[]":return b(a[1],A)+"["+h(a[2])+"]";case "!":return"!"+b(a[1],x);case "u-":return"- "+b(a[1],x);case "*":case "/":case "%":return b(a[1],B)+a[0]+b(a[2],x);case "+":case "-":return b(a[1],C)+a[0]+" "+b(a[2],B);case "<":case ">":case "<=":case ">=":return b(a[1],D)+a[0]+b(a[2],C);case "==":case "!=":case "===":case "!==":return b(a[1],E)+a[0]+b(a[2],D);case "&&":return b(a[1],F)+"&&"+b(a[2],E);case "||":return b(a[1],J)+"||"+
b(a[2],F);default:throw Error("unknown expr: "+a[0]);}}var w=0,v="";m(a[1]);return v}function G(a){return L(M(a))}function H(a,c){var e=G(a),d;c&&(d=c.htmlEncode);a=K(e,d||"_htmlEncode",!0);e="";d||(e="var _obj = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '\"': '&quot;' };\tfunction _htmlEncode(s) {\t\treturn String(s).replace(/[<>&\"]/g, function(c) {\t\t\treturn _obj[c];\t\t});\t}");return Function("root",e+("var _t,_s = '';"+a+"return _s;"))}n.prototype.toString=function(){return"("+this.row+","+
this.col+")"};var M=function(){var a=[[/\s+/],[/[A-Za-z_]\w*/,function(a){switch(a){case "true":case "false":return"boolean";case "set":case "include":return a;default:if(-1!=" abstract boolean break byte case catch char class const continue debugger default delete do double else enum export extends final finally float for function goto if implements import in instanceof int interface let long native new package private protected public return short static super switch synchronized this throw throws transient try typeof var void volatile while with yield ".indexOf(" "+
a+" ")||"null"==a)throw Error("Reserved: "+a+" "+y(this.source,this.index));return"realId"}}],[/"(?:[^"\\]|\\[\s\S])*"|'(?:[^'\\]|\\[\s\S])*'/,function(a){return"string"}],[/\d+(?:\.\d+)?(?:e-?\d+)?/,function(a){return"number"}],[function(a){a.sort().reverse();for(var e=0;e<a.length;++e)a[e]=a[e].replace(/[()*+?.[\]|]/g,"\\$&");return RegExp(a.join("|"))}("! % && ( ) * + - . / < <= = > >= [ ] || === !== == !=".split(" ")),function(a){return/[*/%]/.test(a)?"mul":/[<>]/.test(a)?"rel":/[!=]=/.test(a)?
"eq":a}]];return I({"":[[/(?:(?!{{)[\s\S])+/,function(a){return"text"}],[/{{{/,function(a){this.pushState(a);return a}],[/{{(?:\/if|else|\/each|\/forin|\/raw)}}/,function(a){return a}],[/{{#raw}}/,function(a){this.pushState("raw");return a}],[/{{(?:#(?:if|each|forin)(?=\s))?/,function(a){this.pushState("{{");return a}]],raw:[[/(?:(?!{{\/raw}})[\s\S])+/,function(a){this.popState();return"rawtext"}]],"{{":a.concat([[/}}/,function(a){this.popState();return a}]]),"{{{":a.concat([[/}}}/,function(a){this.popState();
return a}]])})}(),L=function(){return function(a){function c(a,b){return h[a][b]}for(var e=a.nStart,d=a.tSymbols,m={},b=0;b<d.length;++b)m[d[b]]=b;var h=a.tAction,w=a.tGoto,v=a.tRules,k=a.tFuncs,n=a.actionIndex;n&&(c=function(a,b){var m=h[n[a]];return m[b]||m._});return function(a,b){function h(b){throw Error("Syntax error: "+a.getPos(n.index)+(b?"\n"+b:""));}var g=0,q=[0],n=a.scan(),r=[],t={get:function(a){return r[r.length+a]},set:function(a,b){r[r.length+a]=b}};if(b)for(var p in b)t[p]=b[p];for(;;)if(p=
c(g,m[n.tag]))if(0<p)q.push(g=p),r.push(n),n=a.scan();else if(0>p&&-32768<p){p=-p;var g=v[p],s=g.length-1;q.length-=s;g=w[q[q.length-1]][g[0]-e];q.push(g);k[p]?(p=k[p].apply(t,r.splice(r.length-s,s)),r.push(p)):1!=s&&r.splice(r.length-s,s,null)}else return n.tag!=d[0]&&h(),r[0];else{p=[];for(s=0;s<e;++s)c(g,s)&&p.push(d[s]);h("find "+n.tag+"\nexpect "+p.join(" "))}}}({nStart:36,tSymbols:"$ ! && ( ) + - . = [ ] boolean eq include mul number rawtext realId rel set string text {{ {{#each {{#forin {{#if {{#raw}} {{/each}} {{/forin}} {{/if}} {{/raw}} {{else}} {{{ || }} }}} AdditiveExpression EqualityExpression LogicalAndExpression LogicalOrExpression MemberExpression MultiplicativeExpression PrimaryExpression RelationalExpression UnaryExpression _text epsilon expr id name program statement statements texts".split(" "),
tAction:[{_:-2},{_:-32768},{21:3,22:4,23:5,24:6,25:7,26:8,32:9,_:-1},{_:-19},{1:13,3:14,6:15,11:16,13:17,15:18,17:19,19:20,20:21,_:0},{1:13,3:14,6:15,11:16,13:33,15:18,17:19,19:34,20:21,_:0},{16:38,_:0},{_:-17},{_:-3},{21:3,26:8,_:-13},{_:-26},{20:44,_:-23},{_:-25},{_:-21},{13:33,17:19,19:34,_:-22},{_:-24},{5:46,6:47,_:-40},{12:48,_:-44},{2:49,_:-46},{33:50,_:-48},{7:51,9:52,_:-32},{14:53,_:-37},{_:-29},{18:54,_:-42},{_:-35},{34:55,_:0},{_:-27},{_:-23},{_:-22},{13:33,17:19,19:34,20:56,_:0},{34:60,
_:0},{30:61,_:0},{35:62,_:0},{_:-18},{_:-33},{4:63,_:0},{_:-34},{34:64,_:0},{8:65,_:0},{13:33,17:19,19:34,_:0},{_:-11},{_:-15},{_:-16},{13:33,17:19,19:34,20:56,_:-49},{_:-20},{_:-12},{_:-28},{_:-14},{14:53,_:-38},{14:53,_:-39},{18:54,_:-43},{12:48,_:-45},{2:49,_:-47},{_:-30},{10:81,_:0},{_:-36},{5:46,6:47,_:-41},{34:82,_:0},{34:83,_:0},{34:84,_:0},{34:85,_:0},{21:3,22:4,23:5,24:6,25:7,26:8,29:86,31:87,32:9,_:0},{34:88,_:0},{_:-31},{_:-4},{_:-10},{21:3,22:4,23:5,24:6,25:7,26:8,27:94,32:9,_:0},{21:3,
22:4,23:5,24:6,25:7,26:8,27:95,32:9,_:0},{21:3,22:4,23:5,24:6,25:7,26:8,28:96,32:9,_:0},{21:3,22:4,23:5,24:6,25:7,26:8,28:97,32:9,_:0},{21:3,22:4,23:5,24:6,25:7,26:8,29:98,32:9,_:0},{_:-6},{_:-7},{_:-8},{_:-9},{_:-5}],actionIndex:[0,1,2,3,4,5,5,5,6,5,7,8,9,5,5,5,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,29,30,31,32,33,34,35,36,37,38,5,5,5,5,5,39,5,5,5,40,41,42,43,43,0,44,45,46,47,5,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0,0,64,0,65,66,67,68,69,70,71,72,73,74,75],tGoto:[{14:1,
16:2},,{9:10,15:11,17:12},,{0:22,1:23,2:24,3:25,4:26,5:27,6:28,7:29,8:30,11:31,12:32},{0:22,1:23,2:24,3:25,4:26,5:27,6:28,7:29,8:30,11:35,12:32},{0:22,1:23,2:24,3:25,4:26,5:27,6:28,7:29,8:30,11:36,12:32},{0:22,1:23,2:24,3:25,4:26,5:27,6:28,7:29,8:30,11:37,12:32},,{0:22,1:23,2:24,3:25,4:26,5:27,6:28,7:29,8:30,11:39,12:32},,,{9:40},{4:26,6:28,8:41,12:32},{0:22,1:23,2:24,3:25,4:26,5:27,6:28,7:29,8:30,11:42,12:32},{4:26,6:28,8:43,12:32},,,,,{12:45},,,,,,,,,,,,,,,{12:57,13:58},{12:57,13:59},,,,,,,,,,{4:26,
5:66,6:28,8:30,12:32},{4:26,5:67,6:28,8:30,12:32},{0:22,4:26,5:27,6:28,7:68,8:30,12:32},{0:22,1:69,4:26,5:27,6:28,7:29,8:30,12:32},{0:22,1:23,2:70,4:26,5:27,6:28,7:29,8:30,12:32},{12:71},{0:22,1:23,2:24,3:25,4:26,5:27,6:28,7:29,8:30,11:72,12:32},{4:26,6:28,8:73,12:32},{0:74,4:26,5:27,6:28,8:30,12:32},,,,{10:75,12:57,13:76},{10:77,12:57,13:78},{16:79},,,,,{0:22,1:23,2:24,3:25,4:26,5:27,6:28,7:29,8:30,11:80,12:32},,,,,,,,,,,,,,{9:10,15:11,17:12},,,{16:89},{16:90},{16:91},{16:92},,{16:93},,{9:10,15:11,
17:12},{9:10,15:11,17:12},{9:10,15:11,17:12},{9:10,15:11,17:12},{9:10,15:11,17:12}],tRules:[[54,50],[50,52],[52],[52,52,51],[51,25,47,34,52,29],[51,25,47,34,52,31,52,29],[51,23,47,49,46,34,52,27],[51,23,47,49,49,34,52,27],[51,24,47,49,46,34,52,28],[51,24,47,49,49,34,52,28],[51,22,19,48,8,47,34],[51,22,47,34],[51,32,47,35],[51,53],[51,22,13,20,34],[49,20],[49,48],[53,45],[53,53,45],[45,21],[45,26,16,30],[48,17],[48,19],[48,13],[42,20],[42,15],[42,11],[42,48],[42,3,47,4],[40,42],[40,40,7,48],[40,40,
9,47,10],[44,40],[44,1,44],[44,6,44],[41,44],[41,41,14,44],[36,41],[36,36,5,41],[36,36,6,41],[43,36],[43,43,18,36],[37,43],[37,37,12,43],[38,37],[38,38,2,37],[39,38],[39,39,33,38],[47,39],[46]],tFuncs:function(){function a(a,b,h,c,d,e,n){return["each",b,e,c,h,!0]}function c(a,b,c,d,e,k,n){return["each",b,k,d,c,!1]}function e(a){return a.text}function d(a,b,c){return[b.text,a,c]}return[,function(a){return["prog",a]},function(){return[]},function(a,b){a.push(b);return a},function(a,b,c,d,e){return["if",
b,d]},function(a,b,c,d,e,k,n){return["if",b,d,k]},a,a,c,c,function(a,b,c,d,e,k){return["set",c.text,e]},function(a,b,c){return["eval",b,!1]},function(a,b,c){return["eval",b,!0]},function(a){return["text",a]},function(a,b,c,d){return["inc",z(c.text)]},function(a){return z(a.text)},e,function(a){return a},function(a,b){return a+b},e,function(a,b,c){return b.text},,,,function(a){return["lit",z(a.text)]},function(a){return["lit",+a.text]},function(a){return["lit","true"==a.text]},function(a){return["id",
a.text]},function(a,b,c){return b},,function(a,b,c){return[".",a,c.text]},function(a,b,c,d){return["[]",a,c]},,function(a,b){return["!",b]},function(a,b){return["u-",b]},,d,,d,d,,d,,d,,d,,d]}()})}();return{parse:G,compile:H,render:function(a,c){return H(a)(c)},version:"1.2.7"}}();"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=n:"function"==typeof define&&(define.amd||define.cmd)?define(function(){return n}):"undefined"!=typeof KISSY&&KISSY.add(function(){return n});
t&&(t.Crox=n)})(this);
