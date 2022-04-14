class ProgrammeManager {
    constructor(){
        this._DivApp = NanoXGetDivApp()

    }

    /**
     * Initialisation de la classe
     */
    Initiation(){
        // Clear view
        this._DivApp.innerHTML=""
        // Build start view
        this.BuildStartview()
    }

    /**
     * Construit la vue de depart
     */
    BuildStartview(){
        // Clear view
        this._DivApp.innerHTML=""
        // Add Action Button
        this.BuildActionButton()
        // Add Titre
        this._DivApp.appendChild(NanoXBuild.DivText("Programme Manager", null, "Titre MarginTitre"))
    }

    /**
     * Ajoute les button action dans la barre de menu
     */
    BuildActionButton(){
        // On efface les bouttons existants a gauche et a droite
        NanoXClearMenuButtonLeft()
        NanoXClearMenuButtonRight()
        // Ajout du boutton Add programme
        NanoXAddMenuButtonRight("Add", "Add", IconAction.AddProgramme(NanoXGetColorIconMenuBar()), this.ClickAddProgramme.bind(this))
    }

    /**
     * Construit le popup permettant de choisir le type de programme a ajouter
     */
    BuildAddProgrammeChoiceView(){
        // Conteneur du popup
        let conteneur = NanoXBuild.DivFlexColumn()
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Select type of Program", null, "SousTitre", "margin-bottom: 1rem;"))
        // Div horizontale du choix des programme
        let DivButtonTypeOfProgramme = NanoXBuild.DivFlexRowSpaceAround()
        conteneur. appendChild(DivButtonTypeOfProgramme)
        // Boutton Tenue
        DivButtonTypeOfProgramme.appendChild(this.BuildButtonTypeOfProgramme("Tenue", IconAction.Tenue(), this.ClickAddProgrammeTenue.bind(this)))
        // Boutton COD
        DivButtonTypeOfProgramme.appendChild(this.BuildButtonTypeOfProgramme("COD", IconAction.Cod(), this.ClickAddProgrammeCod.bind(this)))

        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
    }

    /**
     * Construit un boutton sous forme d'image et de texte
     * @param {String} Titre Titre du boutton
     * @param {SVG} Svg Image du boutton en SVG
     * @param {Function} Action Action a effectuer sur le click du boutton
     * @returns HtmlElement Boutton
     */
    BuildButtonTypeOfProgramme(Titre = "Titre", Svg = null, Action = null){
        let BouttonTenueContener = NanoXBuild.DivFlexColumn(null, null, "width: 6rem;")
        let BouttonTenueImage = NanoXBuild.DivFlexColumn(null, null, "height: 6rem; margin-bottom: 1rem;")
        BouttonTenueImage.innerHTML = Svg
        BouttonTenueContener.appendChild(BouttonTenueImage)
        BouttonTenueContener.appendChild(NanoXBuild.DivText(Titre, null, "Text", null))
        let bouttonTenue = NanoXBuild.Button(BouttonTenueContener.outerHTML, Action, null, "Button MarginButton")
        return bouttonTenue
    }

    /**
     * Click on action button "Add programme"
     */
    ClickAddProgramme(){
        this.BuildAddProgrammeChoiceView()
    }

    /**
     * Click sur le boutton ajouter un programme de type tenue
     */
    ClickAddProgrammeTenue(){
        NanoXBuild.PopupDelete()
        console.log("ToDo Tenue")
    }

    /**
     * Click sur le boutton ajouter un programme de type Cod
     */
    ClickAddProgrammeCod(){
        NanoXBuild.PopupDelete()
        console.log("ToDo COD")
    }
}

let MyProgrammeManager = new ProgrammeManager()
NanoXAddModule("Programme", IconModule.ProgrammeManager(), MyProgrammeManager.Initiation.bind(MyProgrammeManager), false)