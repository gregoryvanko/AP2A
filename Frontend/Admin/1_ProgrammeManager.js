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

    BuildAddProgrammeChoiceView(){
        // Conteneur du popup
        let conteneur = NanoXBuild.DivFlexColumn()
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Select type of Program", null, "SousTitre", "margin-bottom: 1rem;"))
        // Div horizontale du choix des programme
        let DivButtonTypeOfProgramme = NanoXBuild.DivFlexRowSpaceAround()
        conteneur. appendChild(DivButtonTypeOfProgramme)
        // Boutton Tenue
        let BouttonTenueContener = NanoXBuild.DivFlexColumn(null, null, "width: 6rem;")
        let BouttonTenueImage = NanoXBuild.DivFlexColumn(null, null, "height: 6rem; margin-bottom: 1rem;")
        BouttonTenueImage.innerHTML = IconAction.Tenue()
        BouttonTenueContener.appendChild(BouttonTenueImage)
        BouttonTenueContener.appendChild(NanoXBuild.DivText("Tenue", null, "Text", null))
        let bouttonTenue = NanoXBuild.Button(BouttonTenueContener.outerHTML, this.ClickAddProgrammeTenue.bind(this), null, "Button MarginButton")
        DivButtonTypeOfProgramme.appendChild(bouttonTenue)
        // Boutton COD
        let BouttonCodContener = NanoXBuild.DivFlexColumn(null, null, "width: 6rem;")
        let BouttonCodImage = NanoXBuild.DivFlexColumn(null, null, "height: 6rem; margin-bottom: 1rem;")
        BouttonCodImage.innerHTML = IconAction.Cod()
        BouttonCodContener.appendChild(BouttonCodImage)
        BouttonCodContener.appendChild(NanoXBuild.DivText("COD", null, "Text", null))
        let bouttonCod = NanoXBuild.Button(BouttonCodContener.outerHTML, this.ClickAddProgrammeCod.bind(this), null, "Button MarginButton")
        DivButtonTypeOfProgramme.appendChild(bouttonCod)

        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
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
        console.log("ToDo")
    }

    /**
     * Click sur le boutton ajouter un programme de type Cod
     */
    ClickAddProgrammeCod(){
        NanoXBuild.PopupDelete()
        console.log("ToDo")
    }
}

let MyProgrammeManager = new ProgrammeManager()
NanoXAddModule("Programme", IconModule.ProgrammeManager(), MyProgrammeManager.Initiation.bind(MyProgrammeManager), false)