#!/usr/bin/python

import httplib

conn = httplib.HTTPConnection("localhost:8080")
conn.request("PUT", "/tab")
blah = conn.getresponse()
print blah.status, blah.reason
conn.close()


conn.request("PUT", "/window")
blah = conn.getresponse()
print blah.status, blah.reason

