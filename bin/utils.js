const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);

function saveFile(data, metadata, iterator){

	console.log(`saveFile: Id: ${data[0].id_str}, iterator ${iterator}`);

	const jsonFile = { data, resp: metadata };
	return new Promise(function(resolve, reject){
		fs.writeFile(`user_timeline-${iterator}.json`,
			JSON.stringify(jsonFile),
			function(err, ok){
				if(err){
					reject(err)
				} else {
					resolve(ok);
			}
		})
	})
}

/**
 * @function shardTweets
 * @param string file
 * @param number pageSize
 * It opens user_timeline.json and it separates tweet data in different files.
 */
async function shardTweets(file, pageSize) {
	//const data = await readFileFunc(file, 'utf8');
	const data = JSON.parse(fs.readFileSync(file));
	var iterator = 0;
	let pageNumber = 0;
	const length = data.data.length;
	const tasks = [];

	while(iterator <= length) {
		console.log(`getData() Iterator: ${iterator}, ${data.data[iterator].id_str}`);
		tasks.push(
			saveFile(
				data.data.slice(iterator, iterator + pageSize),
				data.resp,
				pageNumber));
		pageNumber += 1;
		iterator += pageSize;
	}
	return Promise.all(tasks);
}

module.exports = {shardTweets };

/*
const file = './user_timeline.json';
getData(file, 15).then(
	fs.readdir('./', (err, items) => console.log(items))
).catch(err => console.log(err));
*/

