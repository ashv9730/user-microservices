pipeline{
    agent {
        label "jenkinsDockerSlave"
    }

    environment { 
 
        VERSION = "${env.BUILD_ID}"
   
    }

    stages{
        stage("cloning Git Repo"){
            steps{
                echo "========cloning Git Repo========"
                git url: "https://github.com/ashv9730/user-microservices.git", branch: "master"
            }
            post{
                always{
                    echo "========always========"
                }
                success{
                    echo "========A executed successfully========"
                }
                failure{
                    echo "========A execution failed========"
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
                    echo "====++++always++++===="
                }
                success{
                    echo "====++++A executed successfully++++===="
                }
                failure{
                    echo "====++++A execution failed++++===="
                }
        
            }
        }
        stage("Push Image in Docker HUb"){
            steps{
                echo "====++++executing Push Image in Docker HUb++++===="
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh "docker tag user-microservices ${env.USERNAME}/user-microservices:${env.VERSION}"
                    sh "docker login -u ${env.USERNAME} -p ${env.PASSWORD}" 
                    sh "docker push ${env.USERNAME}/user-microservices:latest"
                }
            }
            post{
                always{
                    echo "====++++always++++===="
                }
                success{
                    echo "====++++Push Image in Docker HUb executed successfully++++===="
                }
                failure{
                    echo "====++++Push Image in Docker HUb execution failed++++===="
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
    }
    post{
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}