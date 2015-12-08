import os
import getopt
import sys
#get directory
directory = os.getcwd()
folders = ['/len3images/', '/len4images/']

for folder in folders:
	
	currentdir = directory+folder
	listdir = os.listdir(currentdir)
	
	#set name variable
	if folders.index(folder) == 0:
		suffix = '-3--------7'
	else:
		suffix = '-4--------7'
		
	for filename in listdir:
		i = listdir.index(filename)
		if folders.index(folder)==0:
			newname = str(i+311)+suffix
		else:
			newname = str(i+557)+suffix
		print newname
		print filename
		os.rename(os.path.join(currentdir,filename),os.path.join(currentdir,newname+'.png'))

print('batch processing complete.')
