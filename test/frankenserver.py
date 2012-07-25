#!/usr/bin/python

# SIMPLE SERVER FOR TESTING PURPOSES ONLY!
#  Not meant to be developed further, but will be subject to small modifications
#  as testing needs change. --nthmost 

import SocketServer
import SimpleHTTPServer

PORT = 8080

class FrankenServer(SimpleHTTPServer.SimpleHTTPRequestHandler):
   def do_GET(self):
      if self.path=="/":
          self.send_response(200)
          self.send_header('Content-type','text/html')
          self.end_headers()
          self.wfile.write("aspdoiapsdif")
          return
      else:
         self.send_response(201)
         self.send_header('Content-type','text/html')
         self.end_headers()
         return

   def do_POST(self):
      print "POST request"


   def do_HEAD(self):
      print "HEAD request"

   def do_OPTIONS(self):
      print "OPTIONS request"

   def do_PUT(self):
      if self.path == "/tab":
         print "PUT got a tab event!"
      elif self.path == "/window":
         print "PUT got a window event!"
      return

def main():
   try:
       httpd = SocketServer.ThreadingTCPServer(('localhost', PORT),FrankenServer)

       print "serving on port", PORT
       httpd.serve_forever()
   except:
      print "Igor!"

if __name__=='__main__':
   main()

