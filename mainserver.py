#!/usr/bin/python

# SIMPLE SERVER FOR TESTING PURPOSES ONLY!
#  Not meant to be developed further, but will be subject to small modifications
#  as testing needs change. --nthmost 
import SimpleHTTPServer
import SocketServer
#import sqlite3 as lite

HOST = 'localhost'
PORT = '8080'
#con = sqlite3.connect(storage.db)
#cur = con.cursor()

class MainServer(SimpleHTTPServer.SimpleHTTPRequestHandler): # (This contains the thing that has print statements for the console). 
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

	def do_PUT(self):
		s = urlparse.urlparse(self.path)
		print s
		print s.path.split('/') ##
		
		#cur.execute("DROP TABLE IF EXISTS Events")
		#cur.execute("CREATE TABLE Events(Id INT, Name TEXT, Price INT)")
		#cur.executemany("INSERT INTO Events VALUES(?, ?, ?)", )
    
		#print urlparse.urlparse(self.path)
		#print urlparse.urlparse(self.path).split('/')[1]

		print "\n" + "###########"
		
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

def main():
   print "main"
   try:
       httpd = SocketServer.ThreadingTCPServer((HOST, PORT),MainServer)

       print "serving on port", PORT
       httpd.serve_forever()
   except:
      print "Igor!"

if __name__=='__main__':
   main()

