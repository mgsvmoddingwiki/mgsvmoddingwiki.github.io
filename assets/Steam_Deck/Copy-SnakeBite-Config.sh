#!/usr/bin/env bash

source=""
dest=""

title="SnakeBite Config Copy"

if cp "${source}" "${dest}" ; then
    msg="Copy successful"
    echo "${msg}"
    kdialog --title "${title}" --passivepopup "${msg}" 3
else
    msg="Copy failed"
    echo "${msg}"
    kdialog --title "${title}" --passivepopup "${msg}"
fi
