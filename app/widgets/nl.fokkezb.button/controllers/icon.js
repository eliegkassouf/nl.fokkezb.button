var IconicFont,
	view,
	type = 'font',
	icon = 'icon-sign-blank',
	iconFont = 'FontAwesome',
	iconSize;

function applyProperties(_properties) {
	var _apply = {}, _view;

	// Spacing
	if (_properties.spacing && (_properties.title || _properties.titleid)) {

		if (_properties.iconPosition !== 'right') {
			_apply.right = _properties.spacing;
		} else {
			_apply.left = _properties.spacing;
		}
	}

	// iconSize
	if (typeof _properties.iconSize !== 'undefined') {
		iconSize = _properties.iconSize;
	}

	// Image
	if (type === 'image' || (_properties.icon && _properties.icon.indexOf('.') !== -1)) {

		// Use iconSize as dimenions
		if (iconSize) {

			if (_.isArray(iconSize)) {
				_apply.width = iconSize[0];
				_apply.height = iconSize[1];

			} else if (_.isObject(iconSize)) {
				iconSize.width && (_apply.width = iconSize.width);
				iconSize.height && (_apply.height = iconSize.height);

			} else {
				_apply.width = _apply.height = iconSize;
			}
		}

		// Change icon
		if (_properties.icon) {
			icon = _properties.icon;

			if (view && type === 'image') {
				_apply.image = icon;

			// Change type	
			} else {
				_view = Ti.UI.createImageView(_.extend({
					width: Ti.UI.SIZE,
					height: Ti.UI.SIZE,

					image: icon,
					touchEnabled: false
				}, _apply));

				// Don't apply again
				_apply = {};

				if (view) {
					$.iconWrap.remove(view);
				}

				$.iconWrap.add(_view);
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
		}

		// Clone nested object
		_apply.font = _properties.font ? _.clone(_properties.font) : ($.iconWrap.font || {});

		// Overwrite fontSize by iconSize if given
		if (iconSize) {
			_apply.font.fontSize = iconSize;
		}

		// Always overwrite fontFamily
		_apply.font.fontFamily = iconFont;

		_.extend(_apply, _.pick(_properties, 'color', 'shadowOffset', 'shadowColor'));

		// Change icon
		if (_properties.icon) {
			icon = _properties.icon;

			_apply.text = icon;

			if (!view || type !== 'font') {
				_view = Ti.UI.createLabel(_.extend({
					touchEnabled: false,
					textAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM
				}, _apply));

				// Don't apply again
				_apply = {};

				if (view) {
					$.iconWrap.remove(view);
				}

				$.iconWrap.add(_view);
				view = _view;

				type = 'font';
			}
		}
	}

	if (!_.isEmpty(_apply)) {
		view.applyProperties(_apply);
	}

	return;
}

function setIcon(icon, iconFont) {
    
    return applyProperties({
        icon: icon,
        iconFont: iconFont
    });
}

function getIcon() {

	return {
		icon: icon,
		iconFont: iconFont
	};
}

Object.defineProperty($, "icon", {
    get: getIcon,
    set: setIcon
});

if (arguments[0]) {
	applyProperties(arguments[0]);
}

exports.applyProperties = applyProperties;
exports.getIcon = getIcon;
exports.setIcon = setIcon;
