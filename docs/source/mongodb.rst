Agrupaciones o selecciones:

search retweet that doesn't mark as retweeted: 

1) create index:
//db.test_command.createIndex( { text: "text"  } )
//db.test_command.find( { $text: {$search: "\"RT @\"", $caseSensitive: true}})

2) Update:
db.test_command.update({ $text: {$search: "\"RT @\"", $caseSensitive: true}, retweeted: false}, { '$set': {"retweeted": true} }, {multi: true})




- find by day
db.getCollection('test_command').find({created_at: 
    {
        $gte: ISODate("2019-02-23T00:00:00.000Z"),
        $lt: ISODate("2019-02-24T00:00:00.000Z")
    }})


- Total retweets count in a period of time
db.test_command.aggregate([
{
    $match: {
        'retweeted': false,
        'created_at':{
            $gte: ISODate("2019-02-01T00:00:00.000Z")
        }
    }
},{
    $group: {
        _id: null,
        total: {
            $sum: "$retweet_count"
        },
        average: {
            $avg: "$retweet_count"
        },
        max: {
            $max: "$retweet_count"
        },
        min: {
            $min: "$retweet_count"
        }
        
    }
}]);




- Retweet count by day in a period of time
db.test_command.aggregate([
{
    $match: {
        'retweeted': false,
        'created_at':{
            $gte: ISODate("2019-02-01T00:00:00.000Z")
        }
    }
},{
    $group: {
        _id: {
            dayOfMonth: {$dayOfMonth: "$created_at"},
            created_at: {
                $dateToString: { format: "%Y-%m-%d", date:"$created_at"}}
        },
        tweets: { $sum: 1 },
        total_retweets: {
            $sum: "$retweet_count"
        },
    }
}]);

Index: { v: 2, key: { _fts: "text", _ftsx: 1 }, name: "text_text", ns: "testing.test_command", weights: { text: 1 }, default_language: "english", language_override: "language", textIndexVersion: 3 } already exists with different options: { v: 2, key: { _fts: "text", _ftsx: 1 }, name: "name_text_description_text", ns: "testing.test_command", weights: { description: 1, name: 1 }, default_language: "english", language_override: "language", textIndexVersion: 3 }


- Most retweeted tweets in a period of time
db.getCollection('test_command').find({created_at: 
    {
        $gte: ISODate("2019-02-23T00:00:00.000Z"),
        $lt: ISODate("2019-02-24T00:00:00.000Z")
    }}).limit(10).sort({retweet_count: -1});

