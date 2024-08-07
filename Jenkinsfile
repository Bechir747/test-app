pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE = 'bechirbo/test-app'
        DOCKER_TAG = 'latest'
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

        stage('Run Docker Container') {
            steps {
                script {
                    // Run Docker container
                    docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").inside('-p 4201:80') {
                        sh 'echo "Running Angular application"'
                        // You can add additional commands here to test the running application, e.g., curl commands.
                    }
                }
            }
        }
    }
}
