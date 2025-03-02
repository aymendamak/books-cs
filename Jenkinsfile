pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID  = "f5c9c855-9e5e-423a-ac7c-f966af6de465"
        NETLIFY_AUTH_TOKEN = credentials('netlify-book-cs')
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    node --version
                    npm --version
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "Testing stage"
                '''
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm install netlify-cli
                    npx netlify --version
                    echo "Deploying to production. Site ID: $NETLIFY_SITE_ID"
                    npx netlify status
                    npx netlify deploy --dir=dist --prod
                '''
            }
        }
    }
}