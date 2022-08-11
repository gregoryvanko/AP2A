const Option = {
    Port:5000,
    Name:"Ap2aDev",
    Debug: true,
    SplashScreenFilePath: __dirname + "/Frontend/SplashScreen/SplashScreen.html"
}

require('./index').Start(Option)