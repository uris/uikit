#!/bin/bash

# Copy CSS files to dist
cp src/theme/colors/colors.css dist/colors.css
cp src/theme/type/type.css dist/type.css
cp src/util/flexBox.module.css dist/flexBox.module.css
cp src/util/type.module.css dist/type.module.css

echo "CSS files copied to dist/"
