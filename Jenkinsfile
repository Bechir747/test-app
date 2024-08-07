pipeline {
  agent any

  environment {
    DOCKER_REGISTRY = 'docker.io'
    DOCKER_IMAGE = 'bechirbo/test-app'
    DOCKER_TAG = 'latest'
    DOCKER_CREDENTIALS = 'docker-hub-cred'  // Replace with your credential ID
  }

  stages {
    stage('Checkout') {
      steps {
        script {
          checkout scm
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
        }
      }
    }

    stage('Run Docker Image') {
      steps {
        sh "docker run -d -p 4300:80 ${DOCKER_IMAGE}:${DOCKER_TAG}" // Run the image in detached mode
      }
    }

    stage('Push to Docker Hub') {
      steps {
        docker.withRegistry('${DOCKER_REGISTRY}', '${DOCKER_CREDENTIALS}') {
          docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
        }
      }
    }
  }
}
