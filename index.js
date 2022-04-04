async function Start(Port = 1234, Name = "Ap2aDev",  Debug = false, SplashScreenFilePath = null){
    // NonoX Option
    const OptionNanoX = {
        AppName: Name,
        AppColor: "rgb(20, 163, 255)",
        AppPort: Port,
        AppSecret: "TestNonoXSecret",
        MongoUrl: "mongodb://localhost:27017",
        Debug: Debug,
        //IconPath:  __dirname + "/Backend/Test-apple-icon-192x192.png",
        ApiServer: true,
        AllowSignUp: false,
        AppPath: "",
        NanoXAppOption : {
            SplashScreen : SplashScreenFilePath,
            SplashScreenBackgroundColor : "black",
            ShowMenuBar: true,
            MenuBarIstransparent: false,
            ShowNameInMenuBar: true,
            //CssClassForName: "TestClassName",
            ColorMenuBar: "white",
            ColorIconMenuBar: "black",
            HeightMenuBar: "3rem",
            AppFolderClient: __dirname + "/Frontend/App",
            //AppFolderAdmin: __dirname + "/Frontend/Admin",
            UseAppModule: true
        }
    }

    // Initiation de NanoX
    require("@gregvanko/nanox").NanoXInitiation(OptionNanoX)

     // Code a jouter pour créer les routes de l’application

    // Start NanoX
    await require("@gregvanko/nanox").NanoXStart()
}
module.exports.Start = Start