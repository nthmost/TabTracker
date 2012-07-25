#!/usr/bin/python
import datetime
import time

VERBOSITY = 5

logfile = "logs/server-%s.log" % datetime.date.today().strftime("%Y-%m-%d")
lf = open(logfile,'a')

def logmsg(msg, v=0):
   if v <= VERBOSITY:
      lf.write("%s %s\n" % (time.time(), msg))

if __name__=='__main__':
   logmsg("this is a test of the automatic shit-logging system.", 3)

