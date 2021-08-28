rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m 'first commit' &&
git branch -M master &&
git remote add origin https://github.com/liuzb30/gulu-ui-website.git &&
git push -f -u origin master &&
echo https://liuzb30.github.io/gulu-ui-website/index.html