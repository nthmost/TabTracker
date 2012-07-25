#!/usr/bin/python
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
      print "PUT request"


def main():
   try:
       httpd = SocketServer.ThreadingTCPServer(('localhost', PORT),FrankenServer)

       print "serving on port", PORT
       httpd.serve_forever()
   except:
      print "Igor!"

if __name__=='__main__':
   main()

