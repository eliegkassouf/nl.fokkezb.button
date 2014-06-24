var _ = require('alloy')._;

var _default = OS_IOS ? "ios" : undefined;
var _styles = {};

_styles["ios"] = {
	height: "43dp",
	padding: {
		left: "11dp",
		right: "11dp"
	},
	spacing: "6dp",
		
	borderColor: "#ababab",
	borderWidth: "1dp",
	borderRadius: "7dp",
	
	backgroundGradient: _backgroundGradient([{ color: "#e3e3e3", offset: 0.0 }, { color: 'white', offset: 0.07 }]),
	
	color: "#385487",
	font: {
		fontSize: "15dp",
		fontWeight: "bold"
	},
	
	disabledStyle: {
		color: "#808080"
	},
	
	activeStyle: {
		backgroundGradient: _backgroundGradient([{ color: "#3294e0", offset: 0.0 }, { color: '#015ee6', offset: 1.0 }]),
		color: "white"
	}
};
	
_styles["bs-default"] = {
	height: "43dp",
	padding: {
		left: "11dp",
		right: "11dp"
	},
	spacing: "6dp",
		
	borderColor: "#dbdbdb",
	borderWidth: "1dp",
	borderRadius: "5dp",
	
	backgroundGradient: _backgroundGradient([{ color: "#f9f9f9", offset: 0.0 }, { color: "#e7e7e7", offset: 1.0 }]),
	
	color: "#333333",
	shadowColor: "#bfffffff",
	shadowOffset: {
		x: "0dp",
		y: "1dp"
	},
	font: {
		fontSize: "15dp",
	},
	
	activeStyle: {
		backgroundGradient: _backgroundGradient([{ color: "#cccccc", offset: 0.0 }, { color: "#e6e6e6", offset: 0.3 }, { color: "#e2e2e2", offset: 1.0 }]),
	},
	
	disabledStyle: {
		backgroundGradient: undefined,
		backgroundColor: "#e6e6e6",
		opacity: .65
	}
};

_styles["bs-primary"] = _.defaults({	
	borderColor: "#005fb8",
	
	backgroundGradient: _backgroundGradient([{ color: "#339fd6", offset: 0.0 }, { color: "#0085cc", offset: 0.1 }, { color: "#0045cc", offset: 1.0 }]),
	
	color: "#ffffff",
	shadowColor: "#3f000000",
	shadowOffset: {
		x: "0dp",
		y: "-1dp"
	},
	
	activeStyle: {
		backgroundGradient: _backgroundGradient([{ color: "#003db8", offset: 0.0 }, { color: "#0044cc", offset: 0.3 }, { color: "#0043c9", offset: 1.0 }]),
	},
	
	disabledStyle: {
		backgroundGradient: undefined,
		backgroundColor: "#0044cc",
		opacity: .65
	}
	
}, _styles['bs-default']);

_styles["bs-info"] = _.defaults({
	borderColor: "#2f96b4",
	backgroundGradient: _backgroundGradient([{ color: "#7bcce4", offset: 0.0 }, { color: "#59bfdd", offset: 0.1 }, { color: "#3097b5", offset: 1.0 }]),
	activeStyle: {
		backgroundGradient: _backgroundGradient([{ color: "#2a87a2", offset: 0.0 }, { color: "#2f96b4", offset: 0.3 }, { color: "#2f95b3", offset: 1.0 }]),
	},
	disabledStyle: {
		backgroundGradient: undefined,
		backgroundColor: "#2f96b4",
		opacity: .65
	}
}, _styles['bs-primary']);

_styles["bs-success"] = _.defaults({
	borderColor: "#53a753",
	backgroundGradient: _backgroundGradient([{ color: "#81d081", offset: 0.0 }, { color: "#61c361", offset: 0.1 }, { color: "#52a452", offset: 1.0 }]),
	activeStyle: {
		backgroundGradient: _backgroundGradient([{ color: "#499349", offset: 0.0 }, { color: "#51a351", offset: 0.3 }, { color: "#50a050", offset: 1.0 }]),
	},
	disabledStyle: {
		backgroundGradient: undefined,
		backgroundColor: "#51a351",
		opacity: .65
	}
}, _styles['bs-primary']);

_styles["bs-warning"] = _.defaults({
	borderColor: "#e19933",
	backgroundGradient: _backgroundGradient([{ color: "#fcc372", offset: 0.0 }, { color: "#fbb34e", offset: 0.1 }, { color: "#fbb34e", offset: 1.0 }]),
	activeStyle: {
		backgroundGradient: _backgroundGradient([{ color: "#dc8305", offset: 0.0 }, { color: "#f89406", offset: 0.3 }, { color: "#f49206", offset: 1.0 }]),
	},
	disabledStyle: {
		backgroundGradient: undefined,
		backgroundColor: "#f89406",
		opacity: .65
	}
}, _styles['bs-primary']);

_styles["bs-danger"] = _.defaults({
	borderColor: "#cb4c47",
	backgroundGradient: _backgroundGradient([{ color: "#f17f7c", offset: 0.0 }, { color: "#ec5e59", offset: 0.1 }, { color: "#be3730", offset: 1.0 }]),
	activeStyle: {
		backgroundGradient: _backgroundGradient([{ color: "#a8302a", offset: 0.0 }, { color: "#bd362f", offset: 0.3 }, { color: "#ba352e", offset: 1.0 }]),
	},
	disabledStyle: {
		backgroundGradient: undefined,
		backgroundColor: "#bd362f",
		opacity: .65
	}
}, _styles['bs-primary']);

_styles["bs-inverse"] = _.defaults({
	borderColor: "#222222",
	backgroundGradient: _backgroundGradient([{ color: "#5a5a5a", offset: 0.0 }, { color: "#303030", offset: 0.1 }, { color: "#222222", offset: 1.0 }]),
	activeStyle: {
		backgroundGradient: _backgroundGradient([{ color: "#1f1f1f", offset: 0.0 }, { color: "#222222", offset: 0.3 }, { color: "#212121", offset: 1.0 }]),
	},
	disabledStyle: {
		backgroundGradient: undefined,
		backgroundColor: "#222222",
		opacity: .65
	}
}, _styles['bs-primary']);

_styles["bs-link"] = {
	height: "43dp",
	padding: {
		left: "11dp",
		right: "11dp"
	},
	spacing: "6dp",
			
	borderColor: "#ffffff",
	borderWidth: "1dp",
	borderSize: "1dp",

	backgroundColor: "#ffffff",
	
	color: "#0088cc",
	
	activeStyle: {
		color: "#005580"
	},
	
	disabledStyle: {
		color: "#333333",
		backgroundColor: "#e6e6e6"
	}
}

function _backgroundGradient(colors) {
	return {
		type: "linear",
		startPoint: { x: '0%', y: '0%' },
		endPoint: { x: '0%', y: '100%' },
		colors: colors
	}
}

function setDefault(style) {
	_default = style;
}

function getDefault() {
	return _default;
}

function has(style) {
	return _.has(_styles, style);
}

function get(style) {
	return _styles[style];
}

function set(style, properties) {
	_styles[style] = properties;
}

exports.has = has;
exports.get = get;
exports.set = set;

exports.getDefault = getDefault;
exports.setDefault = setDefault;
