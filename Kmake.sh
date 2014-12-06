#!/bin/bash

khamake='';


if [ $# -ne 1 ]
then
    echo usage : Kmake [target];
    exit 0;
fi


#clean
pkill python;
rm -r build/"$1";

node ./Kha/Tools/khamake/khamake.js $1;
cd build/"$1";
python -m SimpleHTTPServer;
