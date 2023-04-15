MAKEFLAGS += --silent

help: ## Справка по командам
	@printf "\033[33m%s:\033[0m\n" 'Доступные команды'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[32m%-18s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

init: install start info ## Инициализация проекта

install: ## Установка зависимостей
	cd app && yarn

start: ## Запуск проекта
	cd app && yarn serve:watch

lint: ## Проверка кода
	@printf "\033[33m%s:\033[0m\n" 'ESLint: frontend'
	cd app && yarn eslint:frontend
	@printf "\033[33m%s:\033[0m\n" 'Stylelint: frontend'
	cd app && yarn stylelint:frontend
	@printf "\033[33m%s:\033[0m\n" 'ESLint: backend'
	cd app && yarn eslint:backend

cs-fix: ## Форматирование кода
	@printf "\033[33m%s:\033[0m\n" 'Codestyle fix'
	cd app && yarn cs:fix

graph: ## Граф зависимоcтей в проекте
	cd app && yarn graph

info:
	echo "site: http://localhost:4200"
	echo "docs: http://localhost:3000/api"
	echo "graph: http://localhost:4211/projects/all"

.DEFAULT_GOAL := help
