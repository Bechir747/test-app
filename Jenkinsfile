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
        script {
          docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").run('-p 4201:80 --name my-container')

        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
            docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
                docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
          }
        }
      }
    }
  }
}
