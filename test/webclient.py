#!/usr/bin/python

import httplib

TARGET_HOST = "http://nthmost.net:8080"

conn = httplib.HTTPConnection(TARGET_HOST)
conn.request("PUT", "/tab")
blah = conn.getresponse()
print blah.status, blah.reason
conn.close()

