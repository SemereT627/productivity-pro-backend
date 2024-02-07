First thing first, we need to install the required packages. We can do this by running the following command in the terminal:

We can run this backend project either locally or using docker. In this guide, I will show you how to run the project using docker. If you don't have docker installed, you can download it from here.

- [Docker](https://www.docker.com/products/docker-desktop)

Once you have docker installed, you can run the following command to start the backend server:

```bash
docker-compose up
```

This will start the backend server on port 1337. You can now make requests to the server using the following URL:

```
http://localhost:1337/api-docs
```

This will open the Swagger UI where you can test the different endpoints of the backend server.

The frontend project is already configured with this URL, so you can start the frontend server and start making requests to the backend server.
