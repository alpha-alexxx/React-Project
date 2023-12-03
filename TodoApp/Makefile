.PHONY: install-nvm set-nvm set-nvm1 install-node

install-nvm:
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

set-nvm:
	export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 

install-node:
	nvm install --lts && node -v && clear && npm run dev
