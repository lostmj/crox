/// <reference path="codegen_js.js"/>
function parsetmpl(s) {
	/// <summary>解析模板，得到语法树</summary>
	/// <param name="s" type="String">模板</param>
	var ast = parse(Lexer(s));
	return ast;
}
function compile2jsfn(s, config) {
	/// <summary>编译模板，得到一个 js 函数</summary>
	/// <param name="config" type="Object" optional="true"></param>
	/// <param name="s" type="String">模板</param>
	/// <returns type="Function" />
	var ast = parsetmpl(s);
	var encodeName;
	if (config) encodeName = config.htmlEncode;
	s = codegen_js_tran(ast, encodeName || '_htmlEncode', true);
	var body = '';
	if (!encodeName)
		body = "var _obj = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '\"': '&quot;' };\
	function _htmlEncode(s) {\
		return String(s).replace(/[<>&\"]/g, function(c) {\
			return _obj[c];\
		});\
	}";
	body += "var _t,_s = '';" + s + "return _s;";

	var f = Function('root', body);
	return f;
}
var Crox = {
	parse: parsetmpl,
	compile: compile2jsfn,
	render: function(s, data) {
		/// <summary>将数据 data 填充到模板 s</summary>
		/// <param name="s" type="String">模板</param>
		/// <returns type="String" />
		var fn = compile2jsfn(s);
		return fn(data);
	}
};
