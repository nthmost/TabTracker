#!/usr/bin/env python

from logmsg import *

class BrowserEvents:
   tabid = 0
   #and so on

   def __init__(self,incomingstuff):
      #from incomingstuff, set relevant variables for this object
      logmsg("hi...bitch",4)
      
if __name__ == "__main__": ## It's used when you want to run a simple test. (only happens when you're not importing it). 
   yoda = BrowserEvents("do or do not")

