function doClick(e) {
	Ti.API.info('Icon: ' + JSON.stringify(e.source.icon));
    Ti.API.info('Title: ' + e.source.title);
    Ti.API.info('Style: ' + e.source.style);

    return;
}

$.index.open();