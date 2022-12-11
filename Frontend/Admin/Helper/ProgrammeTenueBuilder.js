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

        this._Tenue = {TenueGrade: null, TenueNumero: "", Programme: []}
        this._IndexOfUpdatedElement = null

        this._Idconteneurinfo = "conteneurinfo"
        this._Idlisteordredujour = "listeordredujour"

        this._ConstApprenti = "Apprenti"
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

        // Reset Index Of Updated Element
        this._IndexOfUpdatedElement = null
        // Reset element tenue
        this._Tenue = {TenueGrade: null, TenueNumero: "", Programme: []}

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
        // Type de tenue
        conteneurinfo.appendChild(NanoXBuild.DivText("Type de tenue", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem; text-align: center;"))
        let ListeOfOrdreDuJour = NanoXBuild.DivFlexColumn(this._Idlisteordredujour, null, "width:100%; margin-bottom: 1rem;")
        conteneurinfo.appendChild(ListeOfOrdreDuJour)
        if(this._OrdreDuJour.length != 0){
            // Construire la liste de l'ordre du jour
            this.BuildViewOdjListe(ListeOfOrdreDuJour)
        }
        // Boutton Add Ordre du jour
        conteneurinfo.appendChild(NanoXBuild.Button("Ajouter une Tenue", this.BuildViewOdjTenueGrade.bind(this), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 
        
        // Publish
        conteneur.appendChild(NanoXBuild.DivText("Publier", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem; text-align: left;"))
        conteneur.appendChild(UiComponent.InputWithToogle("Publier la tenue:", "Publish", InPublish))
        
        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveTenue.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this._ButtonActionCancel, null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)

        // EmptySpace
        conteneur.appendChild(NanoXBuild.Div("", "", "height: 2rem;"))

        this._DivApp.appendChild(conteneur)
    }

    BuildViewOdjListe(ListeOfOrdreDuJour){
        this._OrdreDuJour.forEach(element => {
            const conteneur =  NanoXBuild.DivFlexRowSpaceBetween(null, null, "width:100%; margin-bottom: 1rem;")
            // Ordre du jour
            const ordredujour = NanoXBuild.DivFlexColumn(null, "OredreDuJourResume", "width:88%;")
            ordredujour.style.cursor = 'pointer'
            
            conteneur.appendChild(ordredujour)
            // Delete button
            const conteneurBoutton = NanoXBuild.DivFlexColumn(null, null, "width:11%; max-width: 3rem;")
            conteneur.appendChild(conteneurBoutton)
            const bouttonDelete = NanoXBuild.Button(IconAction.Delete(), this.DeleteOrdreDuJour.bind(this, conteneur, element), null, "ButtonAction")
            conteneurBoutton.appendChild(bouttonDelete)
            // creation ordre du jour
            switch (element.TenueGrade) {
                case this._ConstApprenti:
                    ordredujour.onclick = this.ModifyViewTenueApprenti.bind(this, element)
                    let Titre = "A-" + element.TenueNumero
                    ordredujour.appendChild(NanoXBuild.DivText(Titre, null, "Text", "width:100%; color: var(--NanoX-appcolor);"))
                    let valide = true
                    element.Programme.forEach(elementProgramme => {
                        if (!elementProgramme.Valide){valide = false}
                        switch (elementProgramme.Type) {
                            case ProgrammeOredredujour.ConstMorceauArchitecture():
                                let TitreProgramme = "Morc Archi : " + elementProgramme.Titre
                                ordredujour.appendChild(NanoXBuild.DivText(TitreProgramme, null, "Text", "width:100%;"))
                                break;
                            default:
                                alert("Tenue Programme not found: " + elementProgramme.Type)
                                break;
                        }
                    });
                    // Validation
                    if (!valide){
                        ordredujour.classList.add("BorderColorRed")
                    }
                    break;
                default:
                    alert("Tenue Grage not found: " + element.TenueGrade)
                    break;
            }
            // ajout ordre du jour
            ListeOfOrdreDuJour.appendChild(conteneur)
        })
    }

    ModifyViewTenueApprenti(element){
        this._Tenue = element
        this._IndexOfUpdatedElement = this._OrdreDuJour.indexOf(element)
        this.BuildViewOdjTenueApprentiAndSave()
    }

    DeleteOrdreDuJour(ConteneurOdj, element){
        ConteneurOdj.parentNode.removeChild(ConteneurOdj)
        const index = this._OrdreDuJour.indexOf(element);
        this._OrdreDuJour.splice(index, 1);
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
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Apprenti(), this._ConstApprenti, this.ClickBuildViewOdjTenueApprenti.bind(this)))
        // Boutton Compagnon
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Compagnon(), "Compagnon", this.BuildViewOdjTenueCompagnon.bind(this)))
        // Boutton Maitre
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Maitre(), "Maitre", this.BuildViewOdjTenueMaitre.bind(this)))
        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
    }

    BuildViewOdjTenueApprenti(){
        // Clear view
        this._DivApp.innerHTML=""

        // Conteneur
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width:100%; margin-bottom: 2rem; max-width: 35rem;")
        this._DivApp.appendChild(conteneur)
        // Titre
        conteneur.appendChild(NanoXBuild.DivText("Grade: " + this._Tenue.TenueGrade, null, "Titre MarginTitre", "margin-bottom: 1rem; margin-top: 1rem; text-align: center;"))
        // Numero de la tenue
        conteneur.appendChild(UiComponent.InputWithTitre("Numero de la tenue:", "InputTenueNumero", this._Tenue.TenueNumero, "6rem"))
        // Programme Apprenti
        conteneur.appendChild(NanoXBuild.DivText("Programme", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem; text-align: center;"))
        let ListeOfProgramme = NanoXBuild.DivFlexColumn(this._Idlisteordredujour, null, "width:100%; margin-bottom: 1rem;")
        conteneur.appendChild(ListeOfProgramme)
        if(this._Tenue.Programme.length != 0){
            // Construire la liste de l'ordre du jour
            this.BuildViewProgrammeApprenti(this._Tenue.Programme)
        }
        // Boutton Add Programme Apprenti
        conteneur.appendChild(NanoXBuild.Button("Ajouter Programme", this.BuildViewPopupProgrammeApprenti.bind(this), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 

        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveTenueApprenti.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this.ViewNewProgrammeTenue.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)

        // EmptySpace
        conteneur.appendChild(NanoXBuild.Div("", "", "height: 2rem;"))
    }

    BuildViewProgrammeApprenti(ProgrammeApprenti){
        const ListeOfProgramme = document.getElementById(this._Idlisteordredujour)
        ProgrammeApprenti.forEach(element => {
            switch (element.Type) {
                case ProgrammeOredredujour.ConstMorceauArchitecture():
                    let conteneur =  NanoXBuild.DivFlexRowSpaceBetween(null, null, "width:100%; margin-bottom: 1rem;")
                    // Ordre du jour
                    const ordredujour = NanoXBuild.DivFlexColumn(null, "OredreDuJourResume", "width:88%;")
                    ordredujour.style.cursor = 'pointer'
                    ordredujour.onclick = this.ModifyViewTenueMorceauArchitecture.bind(this, element)
                    if (!element.Valide){
                        ordredujour.classList.add("BorderColorRed")
                    }
                    conteneur.appendChild(ordredujour)
                    // Delete button
                    const conteneurBoutton = NanoXBuild.DivFlexColumn(null, null, "width:11%; max-width: 3rem;")
                    conteneur.appendChild(conteneurBoutton)
                    const bouttonDelete = NanoXBuild.Button(IconAction.Delete(), this.DeleteProgramme.bind(this, conteneur, element), null, "ButtonAction")
                    conteneurBoutton.appendChild(bouttonDelete)
                    // creation ordre du jour
                    ordredujour.appendChild(NanoXBuild.DivText("Morceau Architecture", null, "Text", "width:100%; color: var(--NanoX-appcolor);"))
                    ordredujour.appendChild(NanoXBuild.DivText("Titre: " + element.Titre, null, "Text", "width:100%"))
                    element.ListeOrateur.forEach(elementorateur => {
                        ordredujour.appendChild(NanoXBuild.DivText("Orateur: " + elementorateur.Nom, null, "Text", "width:100%"))
                        ordredujour.appendChild(NanoXBuild.DivText("Loge: " + elementorateur.Loge, null, "Text", "width:100%"))
                    });
                    ListeOfProgramme.appendChild(conteneur)
                    break;
            
                default:
                    alert("Programme type not found: " + element.Type)
                    break;
            }
        });
    }

    ModifyViewTenueMorceauArchitecture(element){
        this.BuildViewTenueMorceauArchitecture(element, this._Tenue.Programme.indexOf(element))
    }

    DeleteProgramme(ConteneurProgramme, element){
        ConteneurProgramme.parentNode.removeChild(ConteneurProgramme)
        const index = this._Tenue.Programme.indexOf(element);
        this._Tenue.Programme.splice(index, 1);
    }

    BuildViewPopupProgrammeApprenti(){
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
        this.BuildViewTenueMorceauArchitecture()
    }

    BuildViewTenueMorceauArchitecture(Data = {}, IndexOfUpdatedElement = null){
        // Clear Action Button
        this.ClearActionButton()
        // Save Tenue numero
        this._Tenue.TenueNumero = document.getElementById("InputTenueNumero").value
        // Clear view
        this._DivApp.innerHTML=""
        // Create view ordre du jour
        let Oredredujour = new ProgrammeOredredujour(this.CallBackAddProgrammeApprenti.bind(this), IndexOfUpdatedElement)
        Oredredujour.Show(ProgrammeOredredujour.ConstMorceauArchitecture(), Data)
    }

    CallBackAddProgrammeApprenti(Data, IndexOfUpdatedElement){
        if (Data != null){
            if (IndexOfUpdatedElement == null){
                this._Tenue.Programme.push(Data)
            } else {
                this._Tenue.Programme[IndexOfUpdatedElement] = Data
            }
        }
        this.BuildViewOdjTenueApprenti()
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

    ClickSaveTenueApprenti(){
        // Save Tenue numero
        this._Tenue.TenueNumero = document.getElementById("InputTenueNumero").value

        if (this._IndexOfUpdatedElement == null){
            this._OrdreDuJour.push(this._Tenue)
        } else {
            this._OrdreDuJour[this._IndexOfUpdatedElement]= this._Tenue
        }
        this.ViewNewProgrammeTenue()
    }

    ClickBuildViewOdjTenueApprenti(){
        // Delete popup
        NanoXBuild.PopupDelete()
        this.BuildViewOdjTenueApprentiAndSave()
    }

    BuildViewOdjTenueApprentiAndSave(){
        this._Tenue.TenueGrade = this._ConstApprenti
        // Clear Action Button
        this.ClearActionButton()
        // Save data
        this._Date = document.getElementById("InputDate").value
        this._Conge = document.getElementById("Conge").checked
        this._Temple = document.getElementById("InputTemple").value
        this._Rite = document.getElementById("InputRite").value
        this._Repas = document.getElementById("InputRepas").value
        this._SeminaireType = document.getElementById("inputSeminaireType").value
        this._SeminaireLocal = document.getElementById("inputSeminaireLocal").value
        this._Publish = document.getElementById("Publish").checked

        this.BuildViewOdjTenueApprenti()
    }
    
}