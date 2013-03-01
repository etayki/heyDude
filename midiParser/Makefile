##
## Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
## Creation Date: Sun Jun 21 22:08:52 PDT 2009
## Last Modified: Thu Nov 19 16:40:33 PST 2009
## Filename:      ...meta/Makefile
##
## Description:   Midifile meta-makefile: Downloads and makes 
##                all midifile example programs.
##
## Typing:
##
## make           Will download source code and compile everything 
##                with executable programs stored in midifile/bin.
## make download  Will download the souce code but not unpack it.
##

DATE = `date +"%Y%m%d"`

.PHONY: midifile

default: download compile
	@echo
	@echo "Compiled midifile programs are found in the midifile/bin directory"
	@echo

all: download compile

compile:
	(cd midifile; make)

download: clean

ifeq ($(shell uname),Darwin)
	curl http://midifile.sapp.org/download/midifile.tar.bz2 \
		-o midifile-$(DATE).tar.bz2
else
	wget http://midifile.sapp.org/download/midifile.tar.bz2 \
		-O midifile-$(DATE).tar.bz2
endif
	tar xvjf midifile-$(DATE).tar.bz2

cleanall: clean
	-rm -rf midifile
clean:
	-rm midifile-$(DATE).tar.bz2


