pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'bechirbo/test-app'
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/username/test-app'
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    sh '/usr/local/bin/docker build -t test-app .'
                }
            }
        }

        stage('Docker run') {
            steps {
                script {
                    sh '/usr/local/bin/docker run -p 8085:80 --name test-app-container test-app'
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    // Log in to Docker Hub
                    withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh '''
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        '''
                    }
                    
                    // Push Docker image
                    sh '''
                    docker push ${DOCKER_IMAGE_NAME}:latest
                    docker push ${DOCKER_IMAGE_NAME}:${env.BUILD_ID}
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Build, Docker image creation, and push succeeded!'
        }
        failure {
            echo 'Build, Docker image creation, or push failed!'
        }
    }
}
