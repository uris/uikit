#!/bin/bash

set -euo pipefail

shopt -s nullglob

tarballs=(./*.tgz)

if [ ${#tarballs[@]} -eq 0 ]; then
	echo "No root tarballs found."
	exit 0
fi

# Move root tarballs to the pack folder.
mkdir -p pack
mv ./*.tgz pack/

echo "npm tarballs moved from root to pack/"
