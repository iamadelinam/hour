#!/bin/bash

cd front-end
REACT_APP_PROD_API=true npm run build
cd ..
rm -rf back-end/public
mv front-end/build back-end/public

git push -f heroku main

