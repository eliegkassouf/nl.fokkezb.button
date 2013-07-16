var Styles = require(WPATH('styles'));

var _initted = false;
var _id;
var _icon, _title;
var _properties = {};

function setStyle(style) {
	
	if (Styles.has(style)) {
		_.extend(_properties, Styles.get(style));
	}
	
	applyProperties();
	
	return;
}

function applyProperties(properties) {
	properties = properties || {};
	_.extend(_properties, properties)
	
	if (_properties.style && Styles.has(_properties.style)) {
		_.defaults(_properties, Styles.get(_properties.style));
	}

	if (properties.enabled === false) {
		$.outer.touchEnabled = false;
		
		if (_properties.disabledStyle) {
			_properties.enabledStyle = _.pick(_properties, _.keys(_properties.disabledStyle));
			_.extend(_properties, _properties.disabledStyle);
		}
		
	} else {
	    
        if (properties.enabled === true) {
            $.outer.touchEnabled = true;
            
            if (_properties.enabledStyle) {
	           _.extend(_properties, _properties.enabledStyle);
	           delete _properties.enabledStyle;
	        }
	    }
	    
	    if (_properties.activeStyle) {
		  _properties.defaultStyle = _.pick(_properties, _.keys(_properties.activeStyle));
		}
	}
	
	if (!_initted) {
	    _initted = true;
	    
	    if (_properties.icon) {
            _icon = Widget.createController("icon", _properties)
        }
	
    	if (_icon && _properties.iconPosition !== 'right') {
    		$.inner.add(_icon.getView());
    	}
    		
    	if (_properties.title || _properties.titleid) {
    		_title = Widget.createController("title", _properties);
    		$.inner.add(_title.getView());
    	}
    	
    	if (_icon && _properties.iconPosition === 'right') {
    		$.inner.add(_icon.getView());
    	}
    	
    } else {
        
        if (_icon) {
            _icon.applyProperties(_properties);
        }
        
        if (_title) {
            _title.applyProperties(_properties);
        }
    }
	
	_applyOuterProperties(_properties);
	_applyInnerProperties(_properties);
}

function setTitle(title) {
    
    if (!_initted || !_title) {
        return false;
    }
    
    _title.applyProperties({
        title: title
    });
    
    return true;
}

function setTitleid(titleid) {
    
    if (!_initted || !_title) {
        return false;
    }
    
    _title.applyProperties({
        titleid: titleid
    });
    
    return true;
}

function setIcon(icon, iconFont) {
    
    if (!_initted || !_icon) {
        return false;
    }
    
    _icon.applyProperties({
        icon: icon,
        iconFont: iconFont
    });
    
    return true;
}

function _applyOuterProperties(properties) {
	var apply = _.pick(properties,
		'width', 'height',
		'top', 'right', 'bottom', 'left', 'center',
		'backgroundColor', 'backgroundGradient', 'backgroundImage', 'backgroundLeftCap', 'backgroundTopCap', 'backgroundRepeat',
		'borderColor', 'borderWidth', 'borderRadius',
		'opacity', 'visible'
	);

	if (_.size(apply)) {
		$.outer.applyProperties(apply);
	}
}

function _applyInnerProperties(properties) {
	var apply = {};

	if (properties.padding) {

		if (typeof properties.padding === 'object') {

			if (_.isArray(properties.padding)) {
				var ln = properties.padding.length;

				if (ln === 1) {
					apply.top		= properties.padding[0];
					apply.right		= apply.right;
					apply.bottom	= apply.bottom;
					apply.left		= apply.left;
					
				} else if (ln === 2) {
					apply.top		= properties.padding[0];
					apply.right		= properties.padding[1];
					apply.bottom	= apply.top;
					apply.left		= apply.right;
					
				} else if (ln === 3) {
					apply.top		= properties.padding[0];
					apply.right		= properties.padding[1];
					apply.bottom	= properties.padding[2];
					apply.left		= apply.right;
					
				} else {
					apply.top		= properties.padding[0];
					apply.right		= properties.padding[1];
					apply.bottom	= properties.padding[2];
					apply.left		= properties.padding[3];
				}
				
			} else {
				_.extend(apply, _.pick(properties.padding, 'top', 'right', 'bottom', 'left'));
			}
			
		} else {
			apply.top		= properties.padding;
			apply.right		= properties.padding;
			apply.bottom	= properties.padding;
			apply.left		= properties.padding;
		}
		
	}

	if (_.size(apply)) {
		$.inner.applyProperties(apply);
	}
}

function _onTouchstart(e) {
	
	if (_properties.activeStyle) {
		
		if (_title) {
			_title.applyProperties(_properties.activeStyle);
		}
		
		if (_icon) {
			_icon.applyProperties(_properties.activeStyle);
		}
		
		_applyOuterProperties(_properties.activeStyle);
		_applyInnerProperties(_properties.activeStyle);
	}
}

function _onTouchend(e) {
	
	if (_properties.defaultStyle) {
		
		if (_title) {
			_title.applyProperties(_properties.defaultStyle);
		}
		
		if (_icon) {
			_icon.applyProperties(_properties.defaultStyle);
		}
		
		_applyOuterProperties(_properties.defaultStyle);
		_applyInnerProperties(_properties.defaultStyle);
	}
	
	if (e.type === 'touchend') {
		$.trigger('click', {
			type: "click",
			source: exports
		});
	}
}

// Public interface methods
exports.applyProperties = applyProperties;
exports.setStyle = setStyle;
exports.hide = $.outer.hide;
exports.setTitle = setTitle;
exports.setTitleid = setTitleid;
exports.setIcon = setIcon;

exports.show = function () {
    delete _properties.visible;
    $.outer.show();
}

// Support Titanium event methods
exports.addEventListener = $.on;
exports.removeEventListener = $.off;
exports.fireEvent = $.trigger;

// Export ID so it's available in e.source.id
exports.id = _id;

if (arguments[0]) {
	var args = arguments[0];
	
	if (args.id) {
		_id = args.id;
		delete args.id;
	}
	
	delete args.__parentSymbol;
	delete args['$model'];
	
	if (args.style === undefined) {
		args.style = Styles.getDefault();
	}
	
	applyProperties(arguments[0]);
}