===============
Timeline model
===============

This module can be used to save tweets from a user timeline in MongoDatabase.

An example: 

.. code-block:: javascript
   :linenos:

   const makeTimeline = require('./models/timeline');
   const timeline = makeTimeline('example');
   timeline.save();

`'example'` is the name of the collection in MongoDB.

API Doc
-------
.. js:autoattribute:: models/timeline.tweetSchema
An object of type mongoose.Schema used by :js:func:`makeTimelineModel`.

.. code-block:: javascript
   :linenos:


   const tweetSchema = new mongoose.Schema({
      id: Number,
      id_str: String,
      create_at: Date,
      text: String,
      tags: String,
      retweeted: Boolean,
      retweet_count: Number,
      favorite_count: Number,
   });

.. note::
   More at :ref:`timeline_description`. 


.. autofunction:: models/timeline.makeTimelineModel


