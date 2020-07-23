#!/bin/bash
# Installing basic requirements
sudo dnf update &&
sudo dnf install python37 &&
sudo dnf install -y python3-devel python3-pip python3-virtualenv &&
sudo dnf install -y nodejs npm &&
sudo npm install -g n &&
sudo n stable &&
PATH="$PATH" &&
sudo dnf install -y docker-ce &&

# Installing node modules for Web server
npm install &&

# Adding required packages for chatroom
cd chatroom && sudo npm install -g yarn && yarn install &&

# Installing virtualenv requirements for Rasa (Not working on Fedora 32 yet? Python3.8?)
cd ../Rasa &&
python3.7 -m venv --system-site-packages ./venv &&
source ./venv/bin/activate &&
python3.7 --version &&
pip3.7 install -U pip &&
#pip3 install https://github.com/tensorflow/addons/archive/v0.7.1.zip &&
pip3.7 install rasa==1.10.2 &&
rasa train &&
deactivate &&

# Creating and running OSM Server on port 8081
cd ./../MapServer &&
sudo docker stop osm_container || true &&
sudo docker kill osm_container || true &&
sudo docker rm osm_container || true &&
sudo docker volume create openstreetmap-data &&
sudo docker run -v "$(readlink -f ./../MapServer/Openstreetmap/Data/kristiansand-latest.osm.pbf):/data.osm.pbf" -v openstreetmap-data:/var/lib/postgresql/12/main overv/openstreetmap-tile-server import &&
cd ./../MapServer &&
sudo docker run -d --name osm_container -p 8081:80 -v openstreetmap-data:/var/lib/postgresql/12/main -v openstreetmap-rendered-tiles:/var/lib/mod_tile -e ALLOW_CORS=1 -d overv/openstreetmap-tile-server run &&

# Complete
echo 'Build Complete'
