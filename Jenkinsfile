pipeline {
    agent any

    // environment {
    //     DOCKER_IMAGE_NAME = 'bechirbo/test-app'
    //     DOCKERHUB_CREDENTIALS_ID = 'dockerhub'
    // }

    // environment {
    //     DOCKER_USERNAME = credentials('bechirbo')
    //     DOCKER_PASSWORD = credentials('Bechir747@')
    // }

    stages {

        stage('Run test-app') {
            steps {
                echo 'executing npm ...!'
                nodejs('Node-18.18.1'){
                    sh 'npm install'
                }
            }
        }


         stage('Build') {
            steps {
                
                // Build Docker image
                sh 'docker build -t my-image-name:latest .'
               
            }
        }

       stage('Test') {
            steps {
                echo 'Test successfully !!'
            }
        }

        stage('Deploy in DockerHub') {
            steps {
                echo 'Deploy successfully !!'
            }
        }
    }

}
