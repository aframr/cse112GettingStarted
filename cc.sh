#!/bin/bash
# shell script to run istanbul 
path_to_mocha=$(which mocha)
real_mocha_path="${path_to_mocha/mocha/_mocha}"
istanbul cover $real_mocha_path ./test/test.js

