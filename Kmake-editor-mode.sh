#!/bin/bash

khamake='';

if [[ $# -lt 1 || $# -gt 2 ]]
then

        echo usage : Kmake [target];
        exit 0;
fi


        pkill python;
        echo rm
        rm -vr build/"$1"Editor/kha*;

        cd build;
        haxe project-html5-editor-mode.hxml
        echo `pwd`;
        cd "$1"Editor;

        python -m SimpleHTTPServer;
