# SAMap
## Requirements
* Node and npm  
Check these are installed with:  
$ node -v  
$ npm -v  
and install with:  
$ sudo apt install nodejs  
$ sudo apt install npm  
  
* Python 3.6 and Pip3  
Check the above are installed with:  
$ python3 --version  
$ pip3 --version  
and install with:  
$ sudo apt update  
$ sudo apt install python3-dev python3-pip  

*Recommended to run in a (Ubuntu-based) linux VM*

## Installation
### Linux
Open a termial in the SAMap folder and run  
$ bash linux-build.sh  
*This may take a while*  

## Running
### Linux
Open a terminal in the SAMap folder and run  
$ bash linux-run.sh  
*These scripts have set ports (8000, 8080, and 8081), so please make sure no other programs are using these*  
Now you should be able to view the dashboard by opening a web browser and going to **http://localhost:8080/map.html**
