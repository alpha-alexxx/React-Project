git-config:
	@read -p "Enter config name: " name; \
	git config --global user.name "$$name"
	@read -p "Enter config email: " email; \
	git config --global user.email "$$email"

commit:
	@read -p "Enter commit message: " message; \
	git add . && git commit -m "$$message" && git push origin main