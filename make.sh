rm docs/*
cp logo.svg docs/logo.svg
cp style.css docs/style.css
cp script.js docs/script.js
pandoc index.md -s -H favicon-header.html --css=style.css -o docs/index.html