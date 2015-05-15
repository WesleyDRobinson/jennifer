app.factory('ProjectorFactory', function() {
	var timelineItem1 = {
		title: "presentation",
		presentation: {
			media: [
				{
					mediaType: "image",
					url: "http://www.da-files.com/contests/wechat/mon01.gif"
				},
				{
					mediaType: "image",
					url: "http://www.da-files.com/contests/wechat/mon02.gif"
				},
				{
					mediaType: "image",
					url: "http://www.da-files.com/contests/wechat/mon03.gif"
				}
			],
			title: "My Monmon",
			presenter: "Evan"
		}
	};	

	var timelineItem2 = {
		title: "presentation",
		presentation: {
			media: [
				{
					mediaType: "image",
					url: "http://dummyimage.com/600x400/000/fff&text=Angular"
				},
				{
					mediaType: "image",
					url: "http://dummyimage.com/600x400/000/fff&text=FTW"
				},
				{
					mediaType: "image",
					url: "http://dummyimage.com/600x400/000/fff&text=or+WTF"
				}
			],
			title: "Angular",
			presenter: "Ash"
		}
	};

	function timeline() {

		return [timelineItem1, timelineItem2];
	}

	function timelineFlat(timeline) {
		var flattenedTimeline = [];

		for (var i = 0; i < timeline.length; i++) {
			Array.prototype.push.apply(flattenedTimeline, timeline[i].presentation.media);
		} 

		return flattenedTimeline;
	}

	return {
		timeline: timeline,
		timelineFlat: timelineFlat
	};
});