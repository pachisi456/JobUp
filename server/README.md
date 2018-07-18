# Info
This repo contains a simple docker environment with a dockerized node server and mongoose data base.

# Installation
Pull this repository to your local maschine.

# Testing
Run docker and cd to the directory. Run "docker-compose up".  
Send a get request to the IP of your docker to port 3000 using a REST-Client like Postman. Result should be "Hello World!"

# boot up server
## redirect port
 iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000