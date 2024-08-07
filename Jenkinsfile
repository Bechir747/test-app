pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'bechirbo/test-app'
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub'
    }

    stages {

        stage('Run test-app') {
            steps {
                echo 'executing npm ...!!!'
                nodejs('Node-18.18.1'){
                    sh 'npm install'
                }
            }
        }


        stage('Build') {
            steps {
                echo 'build successfully !!!!'
            }
        }

       stage('Test') {
            steps {
                echo 'Test successfully !!!!'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy successfully !!!!'
            }
        }
    }

}
