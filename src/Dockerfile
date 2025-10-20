FROM debian:bookworm
RUN apt update -y
RUN apt-get install -y curl git vim zsh
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/tarikkudesu/My-configs/refs/heads/main/install.sh)"
WORKDIR /code
ENTRYPOINT [ "tail", "-f" ]