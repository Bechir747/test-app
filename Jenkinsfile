pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'bechirbo/test-app'
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/username/test-app.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build --prod'
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE_NAME}:${env.BUILD_ID}")
                }
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS_ID}") {
                        dockerImage.push('latest')
                        dockerImage.push("${env.BUILD_ID}")
                    }
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
