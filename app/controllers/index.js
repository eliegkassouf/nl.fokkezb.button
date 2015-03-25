function doClick(e) {
	Ti.API.info('Icon: ' + JSON.stringify(e.source.icon));
    Ti.API.info('Title: ' + e.source.title);
    Ti.API.info('Style: ' + e.source.style);

    return;
}

function test25(e) {
  $.test25.hide();
}

$.index.open();