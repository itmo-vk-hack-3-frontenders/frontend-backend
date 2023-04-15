MAKEFLAGS += --silent

export COMPOSE_PROJECT_NAME ?= itmo-vk-ok
export TEAM_ID ?= 333
export DOCKER_BUILDKIT = 1
export DOCKER_COMPOSE = docker compose -f docker-compose.yml --env-file .env

export FRONTEND_PORT ?= 1${TEAM_ID}
export BACKEND_PORT ?= 2${TEAM_ID}

help: ## Справка по командам
	@printf "\033[33m%s:\033[0m\n" 'Доступные команды'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[32m%-18s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

init: clean install start info ## Инициализация проекта

clean: ## Очистка проекта
	$(DOCKER_COMPOSE) down --rmi local -v

install: ## Установка зависимостей
	$(DOCKER_COMPOSE) run --no-deps --rm -T app yarn

start: ## Запуск проекта
	$(DOCKER_COMPOSE) up -d --no-build
restart: stop start info ## Перезапуск проекта
stop:
	$(DOCKER_COMPOSE) down

lint: ## Проверка кода
	@printf "\033[33m%s:\033[0m\n" 'ESLint: frontend'
	$(DOCKER_COMPOSE) exec -T app yarn eslint:frontend
	@printf "\033[33m%s:\033[0m\n" 'Stylelint: frontend'
	$(DOCKER_COMPOSE) exec -T app yarn stylelint:frontend
	@printf "\033[33m%s:\033[0m\n" 'ESLint: backend'
	$(DOCKER_COMPOSE) exec -T app yarn eslint:backend

cs-fix: ## Форматирование кода
	@printf "\033[33m%s:\033[0m\n" 'Codestyle fix'
	$(DOCKER_COMPOSE) exec -T app yarn cs:fix
info:
	echo "site: http://localhost:${FRONTEND_PORT}"
	echo "api: http://localhost:${BACKEND_PORT}/api"
	echo "docs: http://localhost:${BACKEND_PORT}/api/docs"

.DEFAULT_GOAL := help
