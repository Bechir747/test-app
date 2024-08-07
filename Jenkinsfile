pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'bechirbo/test-app'
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub'
    }

    stages {
        stage('Docker Build') {
            steps {
                echo 'build successfully !'
            }
        }

       stage('Test') {
            steps {
                echo 'Test successfully !'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy successfully !'
            }
        }
    }

}
