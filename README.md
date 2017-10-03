# Linguistics server

- Has a transliterator for multiple Indian scripts
- Unique computer-friendly and grammar-friendly orthography
 Work in Progress... Started in 2008 at Univ. of Pune 
Was Originally standalone and embedded in TikiWiki interface. This version is put in MoinMoin so we can have a standalone server (which requires only Python), without a apache/php stack.
The Transliterator was designed for a proof of concept - a transliteration scheme which is grammar and reader-friendly and natural, while at the same time able to hold all necessary information without necessarily declaring it explicitly. The scheme restricts itself to the LATIN-1 charset, was first designed for Sanskrit, then extended to other languages. 
The project was much larger, but unfortulately lost, along with large body ofdocumentation in the tikiwiki database, due to corruption. After much demand from friends, I have put up what I had, and will redevelop it. New uses may be found such as a teaching tool for languages like Kannada etc.

###  Rewriting,
 The main portion is embedded within [MoinMoin](https://moinmo.in/) 1.9.8. Most of the code is therefore MoinMoin and not mine. The main stuff is in [LingoServer/MoinMoin/web/static/htdocs/](./LingoServer/MoinMoin/web/static/htdocs)
in the directories Transliterator/ and Transliterator_old/ 
There will be a server-side component - implemented through MoinMoin Action scripts (and a Php equivalent), but for now it is static and standalone. 

To Run - download and run the Wikiserver.py script with python. Then point your browser to localhost:8080/

