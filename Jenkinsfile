pipeline{
    agent {
        label "jenkinsDockerSlave"
    }

    environment { 
 
        VERSION = "${env.BUILD_ID}"
   
    }

    stages{

        stage('Cleanup') {
            steps {
                // Clean up the entire workspace before starting the build
                deleteDir()
            }
        }
        stage("cloning Git Repo"){
            steps{
                echo "========cloning Git Repo========"
                git url: "https://github.com/ashv9730/user-microservices.git", branch: "master"
            }
            post{
                always{
                    emailext  body: 'This is Cloning Repo Stage Start', subject: 'Cloning Repo Stage Start', to: 'ashv9730@gmail.com'
                }
                success{
                    emailext attachLog: true, body: 'This is Cloning Repo Stage Success', subject: 'Cloning Repo Stage Success', to: 'ashv9730@gmail.com'
                }
                failure{
                    emailext attachLog: true, body: 'This is Cloning Repo Stage Failure', subject: 'This is Cloning Repo Stage Success', to: 'ashv9730@gmail.com'
                }
            }
        }
        stage("Build stage"){
            steps{
                echo "====++++executing Build stage++++===="
                sh 'docker build -t user-microservices .'
            }
            post{
                always{
                    emailext  body: 'This is Starting Build Stage', subject: 'Starting Build Stage', to: 'ashv9730@gmail.com'
                }
                success{
                    emailext attachLog: true, body: 'This is Build Stage Success', subject: 'Build Stage Success', to: 'ashv9730@gmail.com'
                }
                failure{
                    emailext attachLog: true, body: 'This is Build Stage Failure', subject: 'Build Stage Failure', to: 'ashv9730@gmail.com'
                }
        
            }
        }
        stage("Push Image in Docker HUb"){
            steps{
                echo "====++++executing Push Image in Docker HUb++++===="
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh "docker tag user-microservices ${env.USERNAME}/user-microservices:${env.VERSION}"
                    sh "docker login -u ${env.USERNAME} -p ${env.PASSWORD}" 
                    sh "docker push ${env.USERNAME}/user-microservices:${env.VERSION}"
                }
            }
            post{
                always{
                    emailext  body: 'This is Starting Push Image in Docker HUb', subject: 'Starting Push Image in Docker HUb', to: 'ashv9730@gmail.com'

                }
                success{
                    emailext  attachLog: true, body: 'This is Push Image in Docker HUb Success', subject: 'Push Image in Docker HUb Success', to: 'ashv9730@gmail.com'
                }
                failure{
                    emailext  attachLog: true, body: 'This is Push Image in Docker HUb Failure', subject: 'Push Image in Docker HUb Failure', to: 'ashv9730@gmail.com'
                }
        
            }
        }


        stage("Removing Docker Images locally All"){
            steps{
                echo "====++++executing Removing Docker Images locally All++++===="
                sh 'docker rmi -f $(docker images -aq)'
            }
            post{
                always{
                    echo "====++++always++++===="
                }
                success{
                    echo "====++++Removing Docker Images locally All executed successfully++++===="
                }
                failure{
                    echo "====++++Removing Docker Images locally All execution failed++++===="
                }
        
            }
        }


        stage('Cleanup') {
            steps {
                // Clean up the entire workspace before starting the build
                deleteDir()
            }
        }
    }
    post{
        success{
            emailext  attachLog: true, body: 'This is Pipeline Success', subject: 'Pipeline Success', to: 'ashv9730@gmail.com'

        }
        failure{
            emailext  attachLog: true, body: 'This is Pipeline Failure', subject: 'Pipeline Failure', to: 'ashv9730@gmail.com'

        }
    }
}



