#BATCH CROP
import os
import getopt
import sys
import Image

#get directory
directory = os.getcwd()
folders = ['/len3images/', '/len4images/']

for folder in folders:
	listdir = os.listdir(directory+folder)
	for image in listdir:
		print('cropping image: ' + image)
		
		currentdir = directory+folder
		#open image
		img = Image.open(currentdir+image)
		
		#crop
		halfwidth = img.size[0]/2
		halfheight = img.size[1]/2
		img = img.crop((halfwidth-271, halfheight-273,halfwidth+271,halfheight+273))
		
		#save it
		img.save(os.path.join(currentdir,image))
print('batch processing complete.')