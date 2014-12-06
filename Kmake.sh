#!/bin/bash

khamake='';

if [[ $# -lt 1 || $# -gt 2 ]]
then

        echo usage : Kmake [target];
        exit 0;
fi


#clean
pkill python;
if [ $1 = "html5" ]
then
echo rm
        rm -r build/"$1";
fi
node ./Kha/Tools/khamake/khamake.js $1;
cd build/"$1";

python -m SimpleHTTPServer;
