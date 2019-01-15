=================================
Timeline model and his controller
=================================

This module can be used to save tweets from a user timeline in MongoDatabase.

An example: 

.. code-block:: javascript
   :linenos:

   const makeTimeline = require('./models/timeline');
   const Timeline = makeTimeline('example');
   timelineUser = new Timeline()
   

`'example'` is the name of the collection in MongoDB.

Also, in the root dir, there is :ref:`controller.js`, it has helpers to work with the TimelineModel. Besides, you can import :ref:`TimelineModel` initialized from here too.  

.. _TimelineModel:

TimelineModel API Doc
-------------
.. js:autoattribute:: models/timeline.tweetSchema

   An object of type mongoose.Schema used by :js:meth:`makeTimelineModel`.

.. code-block:: javascript
   :linenos:


   const tweetSchema = new mongoose.Schema({
      id: Number,
      id_str: String,
      created_at: Date,
      text: String,
      tags: String,
      retweeted: Boolean,
      retweet_count: Number,
      favorite_count: Number,
   });

.. note::
   More at :ref:`timeline_description`. 

.. autofunction:: models/timeline.makeTimelineModel

.. _controller.js:

Controller API Doc
------------------
The Controller has functions that helps to manage MongoDB operations.
Basically, this module helps to save, find, and load data from MongoDB.

.. js:autofunction:: controller.getGreatestId

.. js:autofunction:: controller.getLowestId

.. js:autofunction:: controller.preData
.. deprecated:: 3.0.0
   saveData needs a Mongoose model class to save the object.

.. js:autofunction:: controller.saveDataR
.. versionadded:: 3.0.0
   It replaces :js:meth:`controller.preData`
