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

        // stage('Run Docker Container') {
        //     steps {
        //         script {
        //             // Run Docker container
        //             sh "docker run -d -p 4300:80 ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                       
        //         }
        //     }
        // }
    }
}
