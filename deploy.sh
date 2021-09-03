#!/bin/bash

cd front-end
REACT_APP_PROD_API=true npm run build
cd ..
mv front-end/build back-end/public


