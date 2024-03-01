#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if ! docker ps --format '{{.Names}}' | grep -q '^react_app$'; then
    echo -e "${YELLOW}Iniciando o conteiner react_app...${NC}"
    echo ""
    docker compose -f ./Docker-compose.dev.yml up --build -d

    while ! docker ps | grep -q react_app; do   
        echo -e "${YELLOW}Esperando o conteiner react_app iniciar...${NC}"
        sleep 5
    done
else
    echo -e "${GREEN}O conteiner react_app já está em execução.${NC}"
fi

dir="./node_modules"

if [ -d "$dir" ]; then
    echo ""
    echo -e "${GREEN}Node_modules já instalado...${NC}"
    echo ""
    echo -e "${YELLOW}Acessando o terminal do conteiner${NC}"
    docker exec -it react_app sh
else
    echo ""
    echo -e "${GREEN}Instalando node_modules via container...${NC}"
    docker exec -it react_app npm install

    echo ""
    echo -e "${YELLOW}Acessando terminal do conteiner${NC}"
    docker exec -it react_app sh
fi
