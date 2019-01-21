.. _config:

Configuration
=============

For configuration we use two libraries: `Convict <https://github.com/mozilla/node-convict>`_ and `dotEnv <https://github.com/motdotla/dotenv>`_. 

You can found config schema in: `lib/config.js`. 

For secrets values like Twitter API credentials you can put them on a `.env` file or `[env].json` file.

Is important to know that this files are relative to where the code runs. 

References
==========

`Managing configurations <https://medium.com/@sherryhsu/managing-configurations-in-node-js-apps-with-dotenv-and-convict-d74070d37373>`_
`Node Config best practices <https://codingsans.com/blog/node-config-best-practices>`_
