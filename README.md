# Testing Guide



This repository contains a Docker Compose file that sets up a web application with a Presentation tier, a business logic tier, and a data tier al kan be found in the JSprj.


To get started with the application, follow these steps:

- Install Docker and Docker Compose on your machine if you haven't already done so. You can find instructions on how to do this for your operating system here: https://docs.docker.com/get-docker/
- Clone this repository to your local machine.
- Open a terminal and navigate to the directory where you cloned the repository.
- Run the command “sudo docker-compose up” to start the application.
- Wait for Docker Compose to download and build the necessary images and start the containers. This may take a few minutes.
- Once the application is up and running, you can access the frontend at http://localhost:8080 and the backend at http://localhost:8081.
To stop the application, press CTRL+C in the terminal window where you started Docker Compose.



The application consists of the following components:

- A replica set of three MongoDB containers (mongo1, mongo2, and mongo3). To prevent port conflicts, each container exposes port 27017, which is assigned to a distinct host port (40001, 40002, or 40003)..
- Mongo-config is one container that executes a script to build up the replica set.
- A static website is served by a single frontend container (frontend). Port 80, which is mapped to host port 8080, is exposed by the container.
- One backend (backend) container that provides a REST API. Port 3001, which is assigned to host port 8081, is exposed by the container
- Two Nginx containers that serve as reverse proxies for the frontend and backend containers, respectively: nginx-frontend and nginx-backend. In order to prevent port conflicts, the host ports (8080 and 8081) that port 80 is mapped to on the hosts are distinct.
- Two Nginx containers that acts as a load balancer , one for the presentation tier and one for the business tier.
The frontend and backend containers are built using the Dockerfiles located in the frontend and backend directories, respectively. The Dockerfiles use Node.js and NPM to install the necessary dependencies and build the application code.

The frontend directory contains a simple React application that displays a message and a button. When the button is clicked, the application makes a request to the backend API to retrieve a random number, which is then displayed on the page.

The backend directory contains a Node.js application that serves a REST API. The API has one endpoint (/api/submit) that returns a random voucher number using reg expressions.

The Nginx configurations for the frontend and backend containers are located in the nginx-frontend.conf and nginx-backend.conf files, respectively. The configurations set up the reverse proxies and handle SSL termination using self-signed certificates.

Functioning components:
- The MongoDB replica set is fully functional.
- The frontend and backend containers are able to communicate with each other through the backend API.
- The Nginx reverse proxies are able to route requests to the frontend and backend containers.

Non-functioning components:
None.

Testing:

To test the app, go to http://localhost:8080 in your browser and fill the form and click submit. You should see a random voucher number displayed on the page and when you submit the same details again it will tell you that it is invalid and has been used before.
