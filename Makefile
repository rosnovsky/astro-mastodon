.PHONY: help commit
.DEFAULT_GOAL := help

help: ## Show this help.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

commit: ## Stage all files and commit with `commitizen`
	git add .
	pnpm commit
	git push

release: ## Release a new version
	pnpm release
	git push --follow-tags origin main
