<!--

# this type of import => @import
npm install -D tsconfig-paths
npm install -D tsc-alias

==============

"scripts": {
    "dev": "nodemon --watch src --exec ts-node -r tsconfig-paths/register src/index.ts",
    "build": "tsc && tsc-alias",
    "start": "node dist/index.js",
    "test": "jest"
  },



 -->
