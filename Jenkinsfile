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

    // stage('Run Docker Image') {
    //   steps {
    //     script {
    //       docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").run('-p 4300:80')

    //     }
    //   }
    // }

    stage('Run Docker Image') {
    steps {
        script {
            def port = 4300
            def portAvailable = true

            // Check if port 4300 is available
            try {
                ServerSocket socket = new ServerSocket(port)
                socket.close()
            } catch (IOException e) {
                portAvailable = false
            }

            if (!portAvailable) {
                // Find any available port
                ServerSocket socket = new ServerSocket(0)
                port = socket.localPort
                socket.close()
                echo "Port 4300 is not available. Running on port ${port} instead."
            } else {
                echo "Running on port ${port}."
            }

            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").run("-p ${port}:80")
        }
    }
}


    stage('Push to DockerHub') {
      steps {
        script {
            docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
                docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
          }
        }
      }
    }


    stage('Deploying to Kubernetes') {
      steps {
        script {
          sh 'kubectl apply -f deployment.yml'
          sh 'kubectl apply -f service.yml'
        }
      }
    }
  }
}
