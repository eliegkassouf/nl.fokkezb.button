var IconicFont,
	view,
	type = 'font',	
	icon = 'icon-sign-blank',
   	iconFont = 'FontAwesome';

function applyProperties(_properties) {
	var _apply = {};

	// Spacing
	if (_properties.spacing && (_properties.title || _properties.titleid)) {
		
		if (_properties.iconPosition !== 'right') {
			_apply.right = _properties.spacing;
		} else {
			_apply.left = _properties.spacing;
		}
	}
	
	// Image
	if (type === 'image' || (_properties.icon && _properties.icon.indexOf('.') !== -1)) {
		
		// Use iconSize as dimenions
		if (_properties.iconSize) {
		    
			if (_.isArray(_properties.iconSize)) {
				_apply.width = _properties.iconSize[0];
				_apply.height = _properties.iconSize[1];
				
			} else if (_.isObject(_properties.iconSize)) {
				_properties.iconSize.width && (_apply.width = _properties.iconSize.width);
				_properties.iconSize.height && (_apply.height = _properties.iconSize.height);
				
			} else {
				_apply.width = _apply.height = _properties.iconSize;
			}
		}
			
		// Change icon
		if (_properties.icon) {
			icon = _properties.icon;
			
			if (view && type === 'image') {
				_apply.image = icon;
			
			// Change type	
			} else {
				var _view = Ti.UI.createImageView(_.extend({
					width: Ti.UI.SIZE,
					height: Ti.UI.SIZE,
					
					image: icon,
					touchEnabled: false
				}, _apply));
				
				// Don't apply again
				_apply = {};
				
				if (view) {
					$.icon.remove(view);
				}
			
				$.icon.add(_view);
				view = _view;
				
				type = 'image';
				IconicFont = null;
			}
		}
		
	// Font
	} else if (type === 'font' || (_properties.icon && _properties.icon.indexOf('.') === -1)) {
	
		// First or changed IconFont
		if (!IconicFont || (_properties.iconFont && _properties.iconFont !== iconFont)) {
			
			// Change iconFont
			if (_properties.iconFont) {
				iconFont = _properties.iconFont;
			}
			
			IconicFont = require('IconicFont').IconicFont({
				font: iconFont,
				ligature: false
			});
		}
		
		// Always set text
		_apply.text = IconicFont.icon(icon);
		
		// Clone nested object
		_apply.font = _properties.font ? _.clone(_properties.font) : $.icon.font;
		
		// Overwrite fontSize by iconSize if given
		if (_properties.iconSize) {
		    _apply.font.fontSize = _properties.iconSize;
		}
		
		// Always overwrite fontFamily
		_apply.font.fontFamily = IconicFont.fontfamily();
		
		_.extend(_apply, _.pick(_properties, 'color', 'shadowOffset', 'shadowColor'));
		
		// Change icon
		if (_properties.icon) {
			icon = _properties.icon;
			
			if (!view || type !== 'font') {
				var _view = Ti.UI.createLabel(_.extend({
					touchEnabled: false,
					textAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM
				}, _apply));
				
				// Don't apply again
				_apply = {};
				
				if (view) {
					$.icon.remove(view);
				}
			
				$.icon.add(_view);
				view = _view;
				
				type = 'font';
			}
		}
	}
	
	if (!_.isEmpty(_apply)) {
		view.applyProperties(_apply);
	}
}

if (arguments[0]) {
	applyProperties(arguments[0]);
}

exports.applyProperties = applyProperties;