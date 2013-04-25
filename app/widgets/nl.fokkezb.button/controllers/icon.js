var IconicFont;

var _iconFont 		= 'FontAwesome';
var _icon			= 'icon-sign-blank';

function applyProperties(properties) {
	var apply = {};
	
	// First or changed IconFont
	if (!IconicFont || (properties.iconFont && properties.iconFont !== _iconFont)) {
		
		// Change IconFont
		if (properties.iconFont) {
			_iconFont = properties.iconFont;
		}
		
		// Require IconicFont
		IconicFont = require('IconicFont').IconicFont({
			font: _iconFont,
			ligature: false
		});
	}
		
	// Change icon
	if (properties.icon) {
		_icon = properties.icon;
	}
	
	// Always set text
	apply.text = IconicFont.icon(_icon);
			
	// Set spacing
	if (properties.padding && properties.title) {
		
		if (properties.iconPosition !== 'right') {
			apply.right = properties.spacing;
		} else {
			apply.left = properties.spacing;
		}
	}
	
	_.extend(apply, _.pick(properties, 'color', 'shadowOffset', 'shadowColor', 'font'));
		
	// Take font from properties or existing
	apply.font = properties.font ? _.clone(properties.font) : ($.icon.font || {});
	
	// Always overwrite fontFamily
	apply.font.fontFamily = IconicFont.fontfamily();
	
	if (_.size(apply)) {
		$.icon.applyProperties(apply);
	}
}

if (arguments[0]) {
	applyProperties(arguments[0]);
}

exports.applyProperties = applyProperties;