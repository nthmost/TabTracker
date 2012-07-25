#!/usr/bin/python

import httplib

conn = httplib.HTTPConnection("localhost:8080")
conn.request("GET", "/yourmom")
blah = conn.getresponse()
print blah.status, blah.reason


