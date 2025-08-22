BUILD_ARGS:= --build-arg UID=$(shell id -u) --build-arg GID=$(shell id -u)

compose: compose-clear compose-setup compose-start

compose-start:
	docker compose up --abort-on-container-exit

compose-start-database:
	docker compose up -d database

compose-stop:
	docker compose stop || true

compose-down:
	docker compose down -v --remove-orphans || true

compose-logs:
	docker compose logs -f

compose-setup: compose-build
	docker compose run --rm application make setup

compose-bash:
	docker compose run --rm application bash

compose-build:
	docker compose build

compose-console:
	docker compose run --rm application make console

compose-install: compose-app-install compose-frontend-install

compose-app-install:
	docker compose run --rm application make install-app

compose-frontend-install:
	docker compose run --rm frontend make install-frontend

compose-database-start:
	docker compose up --build -d database

compose-database-stop:
	docker compose stop database

compose-db-prepare:
	docker compose run --rm application make db-prepare

compose-lint:
	docker compose run --rm application make lint

compose-lint-fix:
	docker compose run --rm application make lint-fix

compose-test:
	docker compose run --rm application make test

compose-test-coverage:
	docker compose run --rm application make test-coverage

compose-check:
	docker compose run --rm application make check

ci:
	export BUILD_ARGS="--cache-from=type=local,src=/tmp/.docker-cache --cache-to=type=local,dest=/tmp/.docker-cache,mode=max"
	docker compose -f docker-compose.ci.yml -p hexlet-sicp-ci build ${BUILD_ARGS}
	docker compose -f docker-compose.ci.yml -p hexlet-sicp-ci run --rm application make setup
	docker compose -f docker-compose.ci.yml -p hexlet-sicp-ci up --abort-on-container-exit
	docker compose -f docker-compose.ci.yml -p hexlet-sicp-ci down -v --remove-orphans

ci-solutions:
	docker compose -f docker-compose.ci.yml -p hexlet-sicp-ci build ${BUILD_ARGS}
	docker compose -f docker-compose.ci.yml -p hexlet-sicp-ci run --rm application make install-app test-solutions
	docker compose -f docker-compose.ci.yml -p hexlet-sicp-ci down -v --remove-orphans
