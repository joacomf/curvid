#!/usr/bin/env bash
YELLOW='\e[33m'
DEFAULT='\e[39m'
PS1="\[${YELLOW}\]Curvid\[${DEFAULT}\] ${PS1}"

export NODEJS_HOME=~/herramientas/node/node-v12.16.1
export PATH=$NODEJS_HOME/bin:$PATH