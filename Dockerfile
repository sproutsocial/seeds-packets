FROM ubuntu:bionic

ENV DEBIAN_FRONTEND=noninteractive

RUN echo 'jenkins:x:10037:10037:Jenkins Leeroy:/home/jenkins:/bin/bash' >> /etc/passwd

ARG KEYFILE_NAME
RUN mkdir -p /home/jenkins/.ssh
COPY ${KEYFILE_NAME} /home/jenkins/.ssh/id_rsa
RUN chmod 400 /home/jenkins/.ssh/id_rsa; chown -R 10037 /home/jenkins

# node / yarn

ARG YARN_VERSION="1.16.0"
ARG NODE_VERSION="8"

RUN \
    apt-get update && \
    apt-get install -y curl gnupg2 wget build-essential git && \
    curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash && \
    apt-get install -y nodejs && \
    wget https://github.com/yarnpkg/yarn/releases/download/v${YARN_VERSION}/yarn_${YARN_VERSION}_all.deb && \
    dpkg -i yarn_${YARN_VERSION}_all.deb && \
    ssh-keyscan github.com >> /home/jenkins/.ssh/known_hosts;

USER 10037
RUN git config --global user.email "techops+sproutjenkins@sproutsocial.com" && \
    git config --global user.name "Sprout Jenkins"
