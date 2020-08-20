const express = require("express");
const cors = require("cors");
const { isUuid, uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoryId(request, response, next) {
  const { id } = request.params

  if (!isUuid(id)) {
    return response.status(400).json({message: "Invalid repository ID."})
  }

  return next()
}

app.use("/repositories/:id", validateRepositoryId)

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  } 

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params

  const { title, url, techs } = request.body

  let repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).send('Repository was not found.')
  }

  const updatedRepository = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs
  }

  repositories[repositoryIndex] = updatedRepository

  return response.json(updatedRepository)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).send('Repository was not found.')
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params

  const repository = repositories.find(repository => repository.id === id)

  if (!repository) {
    return response.status(400).send('Repository was not found.')
  }

  repository.likes += 1

  return response.json(repository)
});

module.exports = app;
