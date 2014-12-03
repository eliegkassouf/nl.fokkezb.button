var titleid;

if (arguments[0]) {
	applyProperties(arguments[0]);
}

function applyProperties(properties) {
	var apply = {};

	if (properties.title !== undefined) {
		apply.text = properties.title;
		titleid = null;

	} else if (properties.titleid !== undefined) {
		apply.text = properties.titleid ? L(properties.titleid) : '';
		titleid = properties.titleid;
	}
	
	if (properties.upperCase) {
		apply.text = apply.text.toUpperCase();
	}

	_.extend(apply, _.pick(properties, 'color', 'font', 'shadowColor', 'shadowOffset'));

	// textAlign only works with fixed width
	if (properties.textAlign !== undefined && (properties.width || $.title.width !== 'SIZE')) {
		apply.textAlign = properties.textAlign;
		apply.width = Ti.UI.FILL;
	}
	
	// verticalAlign only works with fixed width
	if (properties.verticalAlign !== undefined && (properties.height || $.title.height !== 'SIZE')) {
		apply.verticalAlign = properties.verticalAlign;
		apply.height = Ti.UI.FILL;
	}
	
	// Font needs to be cloned
    if (properties.font) {
        apply.font = _.clone(properties.font);
    }
	
	if (_.size(apply)) {
		$.title.applyProperties(apply);
	}
	
	
}

/*** TITLE ***/

function setTitle(title) {
    
    return applyProperties({
        title: title
    });
}

function getTitle() {

	return $.title.text;
}

/*** TITLEID ***/

function setTitleid(titleid) {
    
    return applyProperties({
        titleid: titleid
    });
}

function getTitleid() {

	return titleid;
}

/*** EXPORTS ***/

exports.applyProperties = applyProperties;

exports.getTitle = getTitle;
exports.setTitle = setTitle;

exports.getTitleid = getTitleid;
exports.setTitleid = setTitleid;