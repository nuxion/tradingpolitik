#############
User Timeline
#############

Los datos que importan de la anatomia de los tweets que aparecen en el home de un usuario.

Desde la libreria de Nodejs para usar tweets `Twit <https://www.npmjs.com/package/twit>`_, se recibe un objeto que es tiene dos keys: **data**, y **resp**. 

.. _timeline_description:

data
====
Es un array donde cada elemento del array contiene el texto y la metadata del tweet.
Lo que me interesa guardar de cada tweet entonces, es:

* **created_at**: "Mon Nov 26 14:55:22 +0000 2018"
* **id**: bigint
* id_str: string
* **text**: "RT @user Keynote from @anotheruser."
* truncated: true|false
* entities:
      * **hastags**
      * symbols
* user_mentions:
      * array with: screen_name, id, id_str, name.
* source
* in_reply_to_status_id
* in_reply_to_status_id_str
* in_reply_to_user_id_str
* in_reply_to_screen_name
* **retweeted**: false|true
* **retweet_count**: int
* **favorite_count**: int

De todos estos los mas importantes a evaluar son:
el id, la fecha, los hastags, que no sea un retweet, el texto, la cantidad de retweet y favoritos recibidos. Queda por fuera de la API en primera instancia, la cantidad de comentarios que el tweet recibe. 
