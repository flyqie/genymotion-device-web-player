cat <<EOF > /tmp/version.py

import json
import sys

with open("./package.json", "r") as package:
    package_info = json.loads(package.read())
    version = package_info["version"]

    print(version)

EOF

VERSION=$(C:\\Users\\Jérémy\\AppData\\Local\\Programs\\Python\\Python37\\python.exe /tmp/version.py)
sed -r -i "s/\"version\": \"[^\"]+\"/\"version\": \"$VERSION\"/g" bower.json
sed -r -i "s/\"version\": \"[^\"]+\"/\"version\": \"$VERSION\"/g" package.json
sed -r -i "s/device-web-player\@.+\/dist/device-web-player@$VERSION\/dist/g" README.md

FILENAME="beta-device-web-player-$VERSION.tgz"
mkdir beta-release
yarn build
yarn pack --filename $FILENAME
mv $FILENAME beta-release
 
#git add --force beta-release/$FILENAME
#git commit -m "add yarn tar.gz"

git stash push beta-release/$FILENAME --include-untracked
git checkout -b beta-release-$VERSION
git rm -rf .
git clean -fdx
git checkout stash@{0} -- beta-release/$FILENAME  --include-untracked
git commit -m "add yarn tar.gz"
git tag -a "beta-release-v$VERSION" -m "Beta release $VERSION"


# git checkout -b "beta-release-tests-$VERSION"
# git add --force .git .gitignore beta-release/$FILENAME
# git commit --allow-empty -m "Création d'une nouvelle branche vide"
# git rm -rf --cached `git ls-files`
# git commit --allow-empty -m "Suppression des fichiers de la nouvelle branche"

#git checkout beta-release-3.0.1 -- beta-release/$FILENAME
#git add --force  beta-release/$FILENAME
#git commit -m "Beta release of version $VERSION"
#git push origin "beta-release-$VERSION"

echo $VERSION
$SHELL