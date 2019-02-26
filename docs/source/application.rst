==================
Application Class
==================

This is the entrypoint of the module. 

How to run?
-----------
You need to get Twit library 

.. code-block:: javascript

   const App = require('TwitterTimeline')
   const app = new App();
   const T = new Twit({ TOKEN_DATA });
   app.setTimeline(T, colName);
   app.run(screen_name, count).then(
      () => console.log('finish');
   );

API DOC
--------
.. js:autoclass:: App

.. js:autofunction:: setTimeline

.. js:autofunction:: run

