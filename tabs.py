"""

( object )
id ( integer )
The ID of the tab. Tab IDs are unique within a browser session.
index ( integer )
The zero-based index of the tab within its window.
windowId ( integer )
The ID of the window the tab is contained within.
openerTabId ( optional integer )
The ID of the tab that opened this tab, if any. This will only be present if the opener tab still exists.
highlighted ( boolean )
Whether the tab is highlighted.
active ( boolean )
Whether the tab is active in its window.
pinned ( boolean )
Whether the tab is pinned.
url ( string )
The URL the tab is displaying.
title ( optional string )
The title of the tab. This may not be available if the tab is loading.
favIconUrl ( optional string )
The URL of the tab's favicon. This may not be available if the tab is loading.
status ( optional string )
Either loading or complete.
incognito ( boolean )
Whether the tab is in an incognito window.
"""

class ChromeTab:
	id = 0
	index = 0
	windowId = 0
	openerTabId = 0
	active = False
	pinned = False
	url = ""
	title = ""
	favIconUrl = ""
	status = ""
	incognito = ""
	
	def __init__(self):
	
class ChromeWindow:
	id = 0
	array = []
	focused = True

		