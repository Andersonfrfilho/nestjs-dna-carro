api:
	docker-compose -p dna-carro-compose up -d dna-carro-api
.PHONY: api

database:
	docker-compose -p dna-carro-compose up -d dna-carro-database
.PHONY: database

migrations:
	docker exec -it dna-carro-api sh -c "npm install && npm run migration:run:container"
.PHONY: migrations

cache:
	docker-compose -p dna-carro-compose up -d dna-carro-cache
.PHONY: cache

setup-env:
	cp .env.example .env
.PHONY: setup-env

stop:
	docker-compose stop
.PHONY: stop

down:
	docker-compose -p dna-carro-compose rm -f -s dna-carro-api
	docker-compose -p dna-carro-compose stop dna-carro-database
.PHONY: down

all: cache database api migrations
.PHONY: all