# NouveauProjet
A Node.js application for...

## Installation
First, install the package using npm:
```bash
npm install @gregvanko/ap2a --save
```

## Usage
Create a file "App.js" with this content:
```js
const Option = {
    Port:9000,
    Name:"Ap2a",
    Debug: false,
    SplashScreenFilePath: __dirname + "/SplashScreen.html"
}
require('@gregvanko/ap2a').Start(Option)
```

It is possible to start the application with default values (Port=9000, Name=Ap2a, Debug=false, SplashScreenFilePath= default splach screen):
```js
require('@gregvanko/ap2a').Start()
```

## Env variable
PORT and MONGOURL are available as env variables