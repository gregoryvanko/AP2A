class ProgrammeTenueBuilder {
    constructor(ButtonActionCancel){
        this._DivApp = NanoXGetDivApp()

        this._ButtonActionCancel = ButtonActionCancel

        this._Date = ""
        this._Conge = false
        this._Temple = ""
        this._Rite = ""
        this._Repas = ""
        this._SeminaireType = ""
        this._SeminaireLocal = ""
        this._OrdreDuJour = []
        this._Publish = false
        this._TenueGrade = null
        this._TenueType = null
        this._TenueNumero = null

        this._Idconteneurinfo = "conteneurinfo"
        this._Idlisteordredujour = "listeordredujour"
    }

    /**
     * Efface les button action dans la barre de menu
     */
     ClearActionButton(){
        // On efface les bouttons existants a gauche et a droite
        NanoXClearMenuButtonLeft()
        NanoXClearMenuButtonRight()
        NanoXClearMenuButtonSettings()
    }

    ViewNewProgrammeTenue({InDate= this._Date, InConge= this._Conge , InTemple= this._Temple, InRite= this._Rite , InRepas= this._Repas, InSeminaireType= this._SeminaireType, InSeminaireLocal= this._SeminaireLocal, InOrdreDuJour = this._OrdreDuJour, InPublish = this._Publish}={}){
        // Clear Action Button
        this.ClearActionButton()
        // Clear view
        this._DivApp.innerHTML=""

        this._OrdreDuJour = InOrdreDuJour
        let conteneur = NanoXBuild.Div(null, null, "display: flex; flex-direction: column; width:100%; max-width: 35rem;")
        // Add Titre
        conteneur.appendChild(NanoXBuild.DivText("Nouvelle Tenue", null, "Titre MarginTitre", "text-align: center;"))
        // Date de la tenue
        let DivDate = NanoXBuild.DivFlexRowSpaceAround(null, null, "margin-bottom: 1rem; justify-content: space-between; width: 100%") 
        conteneur.appendChild(DivDate)
        DivDate.appendChild(NanoXBuild.DivText("Date Tenue:", null, "Text InputLabelWidth", ""))
        let InputDate = NanoXBuild.Input(InDate, "text", "InputDate", "", "InputDate", "Input Text", "width: 10rem; text-align: right;")
        InputDate.setAttribute("inputmode","none")
        DivDate.appendChild(InputDate)
        // https://mymth.github.io/vanillajs-datepicker
        const datepicker = new Datepicker(InputDate, {
            autohide : true,
            daysOfWeekHighlighted : [2],
            format : "dd/mm/yyyy",
            language : "fr",
            todayHighlight : true,
            updateOnBlur : false
        });
        // Congé
        conteneur.appendChild(UiComponent.InputWithToogle("En congé:", "Conge", InConge, this.OnChangeToogleConge.bind(this)))

        // Div info agenda
        let conteneurinfo = NanoXBuild.Div(this._Idconteneurinfo, null, "display: flex; flex-direction: column; width:100%;")
        conteneur.appendChild(conteneurinfo)
        // Temple
        const ListeOfTemple = ["Osiris", "Beauté"]
        conteneurinfo.appendChild(UiComponent.InputWithTitreAndListeOfValue("Temple:", "InputTemple", InTemple, ListeOfTemple))
        // Rite
        const ListeOfRite = ["Mod", "REAA"]
        conteneurinfo.appendChild(UiComponent.InputWithTitreAndListeOfValue("Rite:", "InputRite", InRite, ListeOfRite))
        // Repas
        const ListeOfRepas = ["Repas Frat", "Agapes", "Banquet", "Banquet rituel"]
        conteneurinfo.appendChild(UiComponent.InputWithTitreAndListeOfValue("Repas:", "InputRepas", InRepas, ListeOfRepas))
        // Seminaire type
        const ListeOfTypeSeminaire = ["Pas de séminaire", "Travail", "Instruction"]
        conteneurinfo.appendChild(UiComponent.InputWithTitreAndListeOfValue("Type séminaire:", "inputSeminaireType", InSeminaireType, ListeOfTypeSeminaire))
        // Seminaire local
        const ListeOfLocalSeminaire = ["Lumière"]
        conteneurinfo.appendChild(UiComponent.InputWithTitreAndListeOfValue("Local séminaire:", "inputSeminaireLocal", InSeminaireLocal, ListeOfLocalSeminaire))
        // Ordre du jour
        conteneurinfo.appendChild(NanoXBuild.DivText("Ordre du jour", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem; text-align: center;"))
        let ListeOfOrdreDuJour = NanoXBuild.DivFlexColumn(this._Idlisteordredujour, null, "width:100%; margin-bottom: 1rem;")
        conteneurinfo.appendChild(ListeOfOrdreDuJour)
        if(this._OrdreDuJour.length == 0){
            ListeOfOrdreDuJour.appendChild(NanoXBuild.DivText("Pas d'ordre du jour", null, "Text", ""))
        } else {
            // Construire la liste de l'ordre du jour
            this.BuildViewOdjListe()
        }
        // Boutton Add Ordre du jour
        conteneurinfo.appendChild(NanoXBuild.Button("Ajouter Ordre du jour", this.BuildViewOdjTenueGrade.bind(this), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 
        
        // Publish
        conteneur.appendChild(NanoXBuild.DivText("Publier", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem; text-align: center;"))
        conteneur.appendChild(UiComponent.InputWithToogle("Public:", "Publish", InPublish))
        
        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveTenue.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this._ButtonActionCancel, null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)

        // EmptySpace
        conteneur.appendChild(NanoXBuild.Div("", "", "height: 2rem;"))

        this._DivApp.appendChild(conteneur)
    }

    BuildViewOdjListe(){
        // ToDo
    }

    BuildViewOdjTenueGrade(){
        // Conteneur du popup
        let conteneur = NanoXBuild.DivFlexColumn()
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Grade de la Tenue", null, "SousTitre", "margin-bottom: 1rem;"))
        // Div horizontale du choix des programme
        let DivButtonTypeOfTenue = NanoXBuild.DivFlexRowSpaceEvenly()
        conteneur. appendChild(DivButtonTypeOfTenue)
        // Boutton Apprenti
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Apprenti(), "Apprenti", this.BuildViewOdjTenueApprenti.bind(this)))
        // Boutton Compagnon
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Compagnon(), "Compagnon", this.BuildViewOdjTenueCompagnon.bind(this)))
        // Boutton Maitre
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Maitre(), "Maitre", this.BuildViewOdjTenueMaitre.bind(this)))
        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
    }

    BuildViewOdjTenueApprenti(){
        this._TenueGrade = "Apprenti"
        NanoXBuild.PopupDelete()
        // Conteneur du popup
        let conteneur = NanoXBuild.DivFlexColumn()
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Choix de tenue Apprenti", null, "SousTitre", "margin-bottom: 1rem; text-align: center;"))
        // Div horizontale du choix des programme
        let DivButtonTypeOfTenue = NanoXBuild.DivFlexRowSpaceEvenly()
        conteneur. appendChild(DivButtonTypeOfTenue)
        // Boutton Morcheau Architecture
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.MorceauArchitecture(), "Morceau Architecture", this.ClickAddTenueMorceauArchitecture.bind(this)))
        // Boutton Dossier
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Dossier(), "Dossier", this.ClickAddTenueDossier.bind(this)))
        // Boutton Bandeau
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Bandeau(), "Bandeau", this.ClickAddTenueBandeau.bind(this)))
        // Boutton AugmSalaire
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.AugmSalaire(), "Augmentation Salaire", this.ClickAddTenueAugmSalaire.bind(this)))
        // Boutton Administrative
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Administrative(), "Administrative", this.ClickAddTenueAdministrative.bind(this)))
        // Boutton Autre
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Autre(), "Autre", this.ClickAddTenueAutre.bind(this)))

        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
    }

    BuildViewOdjTenueCompagnon(){
        this._TenueGrade = "Compagnon"
        NanoXBuild.PopupDelete()
        // Conteneur du popup
        let conteneur = NanoXBuild.DivFlexColumn()
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Choix de tenue de Compagnon", null, "SousTitre", "margin-bottom: 1rem; text-align: center;"))
        // Div horizontale du choix des programme
        let DivButtonTypeOfTenue = NanoXBuild.DivFlexRowSpaceEvenly()
        conteneur. appendChild(DivButtonTypeOfTenue)
        // Boutton Morcheau Architecture
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.MorceauArchitecture(), "Morceau Architecture", this.ClickAddTenueMorceauArchitecture.bind(this)))
        // Boutton ConsiderationAugmentationSalaire
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.ConsiderationAugmentationSalaire(), "Consideration Augmentation Salaire", this.ClickAddTenueConsiderationAugmentationSalaire.bind(this)))
        // Boutton AugmSalaire
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.AugmSalaire(), "Augmentation Salaire", this.ClickAddTenueAugmSalaire.bind(this)))
        // Boutton PassageGradeComp
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.PassageGradeComp(), "Passage Grade Compagnon", this.ClickAddTenuePassageGradeComp.bind(this)))
        // Boutton RetourComp
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.RetourComp(), "Retour Compagnon", this.ClickAddTenueRetourComp.bind(this)))
        // Boutton Autre
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Autre(), "Autre", this.ClickAddTenueAutre.bind(this)))

        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
    }

    BuildViewOdjTenueMaitre(){
        this._TenueGrade = "Maitre"
        NanoXBuild.PopupDelete()
        // Conteneur du popup
        let conteneur = NanoXBuild.DivFlexColumn()
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Choix de tenue de Maitre", null, "SousTitre", "margin-bottom: 1rem; text-align: center;"))
        // Div horizontale du choix des programme
        let DivButtonTypeOfTenue = NanoXBuild.DivFlexRowSpaceEvenly()
        conteneur. appendChild(DivButtonTypeOfTenue)
        // Boutton Morcheau Architecture
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.MorceauArchitecture(), "Morceau Architecture", this.ClickAddTenueMorceauArchitecture.bind(this)))
        // Boutton ConsiderationAugmentationSalaire
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.ConsiderationAugmentationSalaire(), "Consideration Augmentation Salaire", this.ClickAddTenueConsiderationAugmentationSalaire.bind(this)))
        // Boutton PassageGradeMaitre
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.PassageGradeMaitre(), "Elevation a la Maitrise", this.ClickAddTenuePassageGradeMaitre.bind(this)))
        // Boutton Autre
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Autre(), "Autre", this.ClickAddTenueAutre.bind(this)))

        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
    }

    OnChangeToogleConge(event){
        let conteneurinfo = document.getElementById(this._Idconteneurinfo)
        if (event.target.checked){
            conteneurinfo.style.display = "none"
        } else {
            conteneurinfo.style.display = "flex"
        }
    }

    ClickAddTenueMorceauArchitecture(){
        NanoXBuild.PopupDelete()
        // Clear Action Button
        this.ClearActionButton()
        // Save data
        this._Date = document.getElementById("InputDate").value
        this._Conge = document.getElementById("InputDate").checked
        this._Temple = document.getElementById("InputTemple").value
        this._Rite = document.getElementById("InputRite").value
        this._Repas = document.getElementById("InputRepas").value
        this._SeminaireType = document.getElementById("inputSeminaireType").value
        this._SeminaireLocal = document.getElementById("inputSeminaireLocal").value
        this._Publish = document.getElementById("Publish").checked

        // Clear view
        this._DivApp.innerHTML=""
        // Create view ordre du jour
        this._TenueType = "MorceauArchitecture"
        let Oredredujour = new ProgrammeOredredujour(this.CallBackAddOrdreDuJour.bind(this))
        Oredredujour.ShowMorceauArchitecture(this._TenueGrade, this._TenueNumero)
    }

    CallBackAddOrdreDuJour(Data){
        if (Data != null){
            this._OrdreDuJour = Data
        }
        this.ViewNewProgrammeTenue()
        console.log(this._OrdreDuJour )
    }

    ClickAddTenueDossier(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickAddTenueBandeau(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickAddTenueAugmSalaire(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickAddTenueAdministrative(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickAddTenueAutre(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickAddTenueConsiderationAugmentationSalaire(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickAddTenuePassageGradeComp(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickAddTenueRetourComp(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickAddTenuePassageGradeMaitre(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickSaveTenue(){
        alert("Save Tenue") // ToDo
        this._ButtonActionCancel()
    }
}