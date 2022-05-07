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
        DivButtonTypeOfProgramme.appendChild(UiComponent.ButtonSvgAndTitre(IconAction.Tenue(), "Tenue", this.ClickAddProgrammeTenue.bind(this)))
        // Boutton COD
        DivButtonTypeOfProgramme.appendChild(UiComponent.ButtonSvgAndTitre(IconAction.Cod(), "COD", this.ClickAddProgrammeCod.bind(this)))

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
        // Add Tenu vue
        let ProgBuilder = new ProgrammeTenueBuilder(this.ClickNewProgrammeCancel.bind(this))
        this._DivApp.appendChild(ProgBuilder.ViewNewProgrammeTenue())
    }

    /**
     * Construit la vue qui permet de créer une nouvelle COD dans le programme
     */
    BuildViewNewCod(){
        // Clear Action Button
        this.ClearActionButton()
        // Clear view
        this._DivApp.innerHTML=""
        // Add COD vue
        let ProgBuilder = new ProgrammeCodBuilder(this.ClickNewProgrammeCancel.bind(this))
        this._DivApp.appendChild(ProgBuilder.ViewNewProgrammeCod())
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
     * Click sur le boutton pour faire un cancel d'un nouveau programme
     */
    ClickNewProgrammeCancel(){
        this.BuildViewMonthlyProgramme(this._MonthCurrent, this._YearCurrent)
    }
}

let MyProgrammeManager = new ProgrammeManager()
NanoXAddModule("Programme", IconModule.ProgrammeManager(), MyProgrammeManager.Initiation.bind(MyProgrammeManager), false)