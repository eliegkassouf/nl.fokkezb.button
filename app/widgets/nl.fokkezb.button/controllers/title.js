function applyProperties(properties) {
	var apply = {};

	if (properties.title) {
		apply.text = properties.title;
	}
	
	_.extend(apply, _.pick(properties, 'color', 'font', 'shadowColor', 'shadowOffset'));
	
	if (_.size(apply)) {
		$.title.applyProperties(apply);
	}
}

if (arguments[0]) {
	applyProperties(arguments[0]);
}

exports.applyProperties = applyProperties;