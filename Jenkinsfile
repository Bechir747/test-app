pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: apps/v1
kind: Deployment
metadata:
  name: testapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: testapp
  template:
    metadata:
      labels:
        app: testapp
    spec:
      containers:
      - name: testapp
        image: bechirbo/test-app:latest
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: testapp-service
spec:
  selector:
    app: testapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
    nodePort: 31000
  type: NodePort
            '''
        }
    }

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE = 'bechirbo/test-app'
        DOCKER_TAG = 'latest'
        DOCKER_CREDENTIALS = 'docker-hub-cred'
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

        stage('Run Docker Image') {
            steps {
                script {
                    def port = 4300
                    def portAvailable = true

                    // Check if port 4300 is available
                    try {
                        def socket = new ServerSocket(port)
                        socket.close()
                    } catch (IOException e) {
                        portAvailable = false
                    }

                    if (!portAvailable) {
                        // Find any available port
                        def socket = new ServerSocket(0)
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
                    docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS) {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy to K8S') {
            steps {
                script {
                    // Deploy the embedded Kubernetes YAML
                    sh 'kubectl apply -f - <<EOF\n' + 
                       "${yaml}\n" + 
                       'EOF'
                }
            }
        }
    }
}
