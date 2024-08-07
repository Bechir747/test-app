pipeline {
    agent any
    stages {

        stage('Run test-app') {
            steps {
                echo 'executing npm ...!'
                nodejs('Node-18.18.1'){
                    sh 'npm install'
                }
            }
        }


        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("test-app-image")
                }
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
