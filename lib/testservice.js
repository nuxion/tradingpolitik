const TimelineService = require('./services');
const conf = require('./config.js');
const mongoose = require('mongoose');

mongoose.connect(`${conf.get('mongodb.url')}`, { useNuewUrlParser:true})
	.then(() => console.log('Now connected to MongoDB'))
	.then(() => {
		const timeline = new TimelineService('test_command');
		const days = 7;
		const end = new Date();
		const start = new Date(end.getTime() - (days * 24 * 60 * 60 * 1000));

		timeline.topTweets(
		{ 
			start,
			end,
			limit: 10, 
			sort: { 'favorite_count': 1 }
		}).then((data)=> console.log(data));
	}).catch(err => console.log("Something went worng", err))



