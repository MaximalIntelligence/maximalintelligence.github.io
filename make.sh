rm _site/*
cp logo.svg _site/logo.svg
cp style.css _site/style.css
cp script.js _site/script.js
pandoc index.md -s --css=style.css -o _site/index.html