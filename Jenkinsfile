pipeline {
   agent {
    kubernetes {
      yaml '''
        apiVersion: apps/v1 # Kubernetes API version
kind: Deployment  # Kubernetes resource kind we are creating
metadata:
  name: testapp-deployment
spec:
  selector:
    matchLabels:
      app: testapp
  replicas: 3 # Number of replicas that will be created for this deployment
  template:
    metadata:
      labels:
        app: testapp
    spec:
      containers:
      - name: testapp
        image: bechirbo/test-app:latest # Image that will be used to containers in the cluster
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80 # The port that the container is running on in the cluster
---

kind: Service  # Kubernetes API version
apiVersion: v1 # Kubernetes resource kind we are creating
metadata:
  name: testapp-service
spec:
  selector:
    app: testapp
  ports:
  - protocol: TCP
    port: 80   # The port that the service is running on in the cluster
    targetPort: 80   # The port exposed by the service
    nodePort: 31000
  type: NodePort     # type of the service.
        '''
    }
  }

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


    stage('Deploy to K8S') {
            steps {
                script {
                    // Deploy to Kubernetes
                    sh 'kubectl apply -f deployment.yml'
                }
            }
        }
  }
}
