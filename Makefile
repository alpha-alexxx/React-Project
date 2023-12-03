git-config:
	git config --global user.name 'Ankit Kumar'
	git config --global user.email 'ankithome8@gmail.com'

commit:
	@read -p "Enter commit message: " message; \
	git add . && git commit -m "$$message" && git push origin main