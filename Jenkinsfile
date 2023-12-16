pipeline{
    agent {
        label "jenkinsDockerSlave"
    }
    stages{
        stage("cloning Git Repo"){
            steps{
                echo "========cloning Git Repo========"
                git url: "https://github.com/ashv9730/user-microservices.git", branch: "master"
                sh 'docker version'
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
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}