class ProgrammeManager {
    constructor(){
        this._DivApp = NanoXGetDivApp()

        this._MonthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
        this._MonthCurrent = null
        this._YearCurrent = null
    }

    /**
     * Initialisation de la classe
     */
    Initiation(){
        // Clear view
        this._DivApp.innerHTML=""
        // Set DivApp With
        this._DivApp.style.width = "90%"
        this._DivApp.style.maxWidth = "60rem"
        // Build start view
        this.BuildViewMonthlyProgramme()
    }

    /**
     * Efface les button action dans la barre de menu
     */
    ClearActionButton(){
        // On efface les bouttons existants a gauche et a droite
        NanoXClearMenuButtonLeft()
        NanoXClearMenuButtonRight()
    }

    /**
     * Ajoute les button action dans la barre de menu
     */
    BuildActionButton(){
        // Ajout du boutton Add programme
        NanoXAddMenuButtonRight("Add", "Add", IconAction.AddProgramme(NanoXGetColorIconMenuBar()), this.ClickAddProgramme.bind(this))
    }

    /**
     * Construit la vue qui liste le programme d'un mois
     */
    BuildViewMonthlyProgramme(Mois = null, Annee = null){
        // Clear Action Button
        this.ClearActionButton()
        // Add Action Button
        this.BuildActionButton()
        // Clear view
        this._DivApp.innerHTML=""
        // Add Titre
        this._DivApp.appendChild(NanoXBuild.DivText("Programme Manager", null, "Titre MarginTitre"))
        // Calcule du mois et annee
        let MonthToShow = "Month Error"
        let YearToShow = "Year Error"
        if (Mois == null){
            const d = new Date()
            MonthToShow = this._MonthNames[d.getMonth()]
            this._MonthCurrent = d.getMonth() + 1
        } else {
            MonthToShow = this._MonthNames[Mois -1]
            this._MonthCurrent = Mois
        }
        if (Annee == null){
            const d = new Date()
            YearToShow = d.getFullYear()
        } else {
            YearToShow = Annee
        }
        this._YearCurrent = YearToShow
        // Month Selector
        let ConteneurMonth = NanoXBuild.DivFlexRowStart(null, null, "margin-bottom: 1rem; width: 100%;")
        this._DivApp.appendChild(ConteneurMonth)
        ConteneurMonth.appendChild(NanoXBuild.Button(IconAction.Previous(), this.ClickMonthPrevious.bind(this), null, "ButtonRond", "margin: 0.5rem; padding: 0.2rem; width: 1.5rem;"))
        ConteneurMonth.appendChild(NanoXBuild.DivText(MonthToShow + " " + YearToShow, null, "Text", "width: 9rem; text-align: center;"))
        ConteneurMonth.appendChild(NanoXBuild.Button(IconAction.Next(), this.ClicklMonthNext.bind(this), null, "ButtonRond", "margin: 0.5rem; padding: 0.2rem; width: 1.5rem;"))
        // Waiting Data
        this._DivApp.appendChild(NanoXBuild.DivText("Waiting Data...", "WaitingData", "Text"))
        // Call api get programme
        // ToDo
    }

    /**
     * Construit le popup permettant de choisir le type de programme a ajouter
     */
    BuildViewAddProgrammeChoice(){
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
     * Construit la vue qui permet de créer une nouvelle tenue dans le programme
     */
    BuildViewNewTenue(){
        // Clear Action Button
        this.ClearActionButton()
        // Clear view
        this._DivApp.innerHTML=""
        // Add Titre
        this._DivApp.appendChild(NanoXBuild.DivText("Nouvelle Tenue", null, "Titre MarginTitre"))
        // Add Tenu vue
        this._DivApp.appendChild(ProgrammeBuilder.ViewNewProgrammeTenue())
        // Save and Cancel
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceAround(null, null, "width: 100%; margin-top: 1rem;")
        this._DivApp.appendChild(ConteneurAction)
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickNewProgrammeTenueSave.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this.ClickNewProgrammeCancel.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
    }

    /**
     * Construit la vue qui permet de créer une nouvelle COD dans le programme
     */
    BuildViewNewCod(){
        // Clear Action Button
        this.ClearActionButton()
        // Clear view
        this._DivApp.innerHTML=""
        // Add Titre
        this._DivApp.appendChild(NanoXBuild.DivText("Nouvelle COD", null, "Titre MarginTitre"))
        // Add COD vue
        this._DivApp.appendChild(ProgrammeBuilder.ViewNewProgrammeCod())
        // Save and Cancel
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceAround(null, null, "width: 100%; margin-top: 1rem;")
        this._DivApp.appendChild(ConteneurAction)
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickNewProgrammeCodSave.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this.ClickNewProgrammeCancel.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
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
        this.BuildViewAddProgrammeChoice()
    }

    /**
     * Click sur le boutton ajouter un programme de type tenue
     */
    ClickAddProgrammeTenue(){
        NanoXBuild.PopupDelete()
        this.BuildViewNewTenue()
    }

    /**
     * Click sur le boutton ajouter un programme de type Cod
     */
    ClickAddProgrammeCod(){
        NanoXBuild.PopupDelete()
        this.BuildViewNewCod()
    }

    /**
     * Click sur le boutton pour reculer d'un mois
     */
    ClickMonthPrevious(){
        let NewMonth = this._MonthCurrent - 1
        if (NewMonth <= 0){
            NewMonth = 12
            this._YearCurrent -= 1
        }
        this.BuildViewMonthlyProgramme(NewMonth, this._YearCurrent)
    }

    /**
     * Click sur le boutton pour avancer d'un mois
     */
    ClicklMonthNext(){
        let NewMonth = this._MonthCurrent + 1
        if (NewMonth >= 13){
            NewMonth = 1
            this._YearCurrent += 1
        }
        this.BuildViewMonthlyProgramme(NewMonth, this._YearCurrent)
    }

    /**
     * Click sur le boutton pour sauver un nouveau programme Tenue
     */
    ClickNewProgrammeTenueSave(){
        // ToDo
    }

    /**
     * Click sur le boutton pour sauver un nouveau programme COD
     */
    ClickNewProgrammeCodSave(){
        // ToDo
    }

    /**
     * Click sur le boutton pour faire un cancel d'un nouveau programme
     */
    ClickNewProgrammeCancel(){
        this.BuildViewMonthlyProgramme(this._MonthCurrent, this._YearCurrent)
    }
}

let MyProgrammeManager = new ProgrammeManager()
NanoXAddModule("Programme", IconModule.ProgrammeManager(), MyProgrammeManager.Initiation.bind(MyProgrammeManager), false)