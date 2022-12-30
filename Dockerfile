FROM amazonlinux:2.0.20221103.3

RUN amazon-linux-extras enable epel && \
    yum clean metadata && \
    yum install -y epel-release

RUN yum update -y && \
    yum install --disablerepo="*" --enablerepo=epel -y \
      nodejs \
      npm \
      && \
    yum clean all

RUN yum update -y && \
    yum install -y \
      man \
      which \
      make \
      less \
      && \
    yum clean all

RUN npm install --global aws-cdk
