#!/bin/bash

khamake='';

if [[ $# -lt 1 || $# -gt 2 ]]
then

        echo usage : Kmake [target];
        exit 0;
fi


#clean

if [ $1 = "html5" ]
then
        pkill python;
        echo rm
        rm -r build/"$1"/kha*;
fi

node ./Kha/Tools/khamake/khamake.js $1;

if [ $1 = "html5" ]
then
        cd build/"$1";
        python -m SimpleHTTPServer;
fi

