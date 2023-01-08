class ProgrammeTenueBuilder {
    constructor(ButtonActionCancel){
        this._DivApp = NanoXGetDivApp()

        this._ButtonActionCancel = ButtonActionCancel

        this._DataProgramme = {
            Date: "",
            Conge: false,
            Temple: "",
            Rite: "",
            Repas: "",
            Seminaire: {
                Type: "",
                Local: ""
            },
            OrdreDuJour : [],
            Publish : false
        }

        this._DataTenue = {TenueGrade: null, TenueNumero: "", Programme: []}
        this._IndexOfUpdatedTenue = null

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

    ViewNewProgrammeTenue(DataProgramme = this._DataProgramme){
        // Clear Action Button
        this.ClearActionButton()
        // Clear view
        this._DivApp.innerHTML=""
        // Save dataprogramme
        this._DataProgramme = DataProgramme
        // Reset Index Of Updated Element
        this._IndexOfUpdatedTenue = null
        // Reset element tenue
        this._DataTenue = {TenueGrade: null, TenueNumero: "", Programme: []}

        let conteneur = NanoXBuild.Div(null, null, "display: flex; flex-direction: column; width:100%; max-width: 35rem;")
        // Add Titre
        conteneur.appendChild(NanoXBuild.DivText("Nouvelle Tenue", null, "Titre MarginTitre", "text-align: center;"))
        // Date de la tenue
        let DivDate = NanoXBuild.DivFlexRowSpaceAround(null, null, "margin-bottom: 1rem; justify-content: space-between; width: 100%") 
        conteneur.appendChild(DivDate)
        DivDate.appendChild(NanoXBuild.DivText("Date Tenue:", null, "Text InputLabelWidth", ""))
        let InputDate = NanoXBuild.Input(this._DataProgramme.Date, "text", "InputDate", "", "InputDate", "Input Text", "width: 10rem; text-align: right;")
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
        conteneur.appendChild(UiComponent.InputWithToogle("En congé:", "Conge", this._DataProgramme.Conge, this.OnChangeToogleConge.bind(this)))

        // Div info agenda
        let conteneurinfo = NanoXBuild.Div(this._Idconteneurinfo, null, "display: flex; flex-direction: column; width:100%;")
        conteneur.appendChild(conteneurinfo)
        // Temple
        const ListeOfTemple = ["Osiris", "Beauté"]
        conteneurinfo.appendChild(UiComponent.InputWithTitreAndListeOfValue("Temple:", "InputTemple", this._DataProgramme.Temple, ListeOfTemple))
        // Rite
        const ListeOfRite = ["Mod", "REAA"]
        conteneurinfo.appendChild(UiComponent.InputWithTitreAndListeOfValue("Rite:", "InputRite", this._DataProgramme.Rite, ListeOfRite))
        // Repas
        const ListeOfRepas = ["Repas Frat", "Agapes", "Banquet", "Banquet rituel"]
        conteneurinfo.appendChild(UiComponent.InputWithTitreAndListeOfValue("Repas:", "InputRepas", this._DataProgramme.Repas, ListeOfRepas))
        // Seminaire type
        const ListeOfTypeSeminaire = ["Pas de séminaire", "Travail", "Instruction"]
        conteneurinfo.appendChild(UiComponent.InputWithTitreAndListeOfValue("Type séminaire:", "inputSeminaireType", this._DataProgramme.Seminaire.Type, ListeOfTypeSeminaire))
        // Seminaire local
        const ListeOfLocalSeminaire = ["Lumière"]
        conteneurinfo.appendChild(UiComponent.InputWithTitreAndListeOfValue("Local séminaire:", "inputSeminaireLocal", this._DataProgramme.Seminaire.Local, ListeOfLocalSeminaire))
        // Type de tenue
        conteneurinfo.appendChild(NanoXBuild.DivText("Type de tenue", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem; text-align: center;"))
        let ListeOfOrdreDuJour = NanoXBuild.DivFlexColumn(this._Idlisteordredujour, null, "width:100%; margin-bottom: 1rem;")
        conteneurinfo.appendChild(ListeOfOrdreDuJour)
        if(this._DataProgramme.OrdreDuJour.length != 0){
            // Construire la liste de l'ordre du jour
            this.BuildCardOdj(ListeOfOrdreDuJour)
        }
        // Boutton Add Ordre du jour
        conteneurinfo.appendChild(NanoXBuild.Button("Ajouter une Tenue", this.BuildPopupTenueGrade.bind(this), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 
        
        // Publish
        conteneur.appendChild(NanoXBuild.DivText("Publier", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem; text-align: left;"))
        conteneur.appendChild(UiComponent.InputWithToogle("Publier la tenue:", "Publish", this._DataProgramme.Publish))
        
        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveTenue.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this._ButtonActionCancel, null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)

        // EmptySpace
        conteneur.appendChild(NanoXBuild.Div("", "", "height: 2rem;"))

        this._DivApp.appendChild(conteneur)
    }

    OnChangeToogleConge(event){
        let conteneurinfo = document.getElementById(this._Idconteneurinfo)
        if (event.target.checked){
            conteneurinfo.style.display = "none"
        } else {
            conteneurinfo.style.display = "flex"
        }
    }

    BuildCardOdj(ListeOfOrdreDuJour){
        this._DataProgramme.OrdreDuJour.forEach(element => {
            const conteneur =  NanoXBuild.DivFlexRowSpaceBetween(null, null, "width:100%; margin-bottom: 1rem;")
            // Ordre du jour
            const ordredujour = NanoXBuild.DivFlexColumn(null, "Card", "width:88%;")
            ordredujour.style.cursor = 'pointer'
            conteneur.appendChild(ordredujour)
            // Delete button
            const conteneurBoutton = NanoXBuild.DivFlexColumn(null, null, "width:11%; max-width: 2.7rem;")
            conteneur.appendChild(conteneurBoutton)
            const bouttonDelete = NanoXBuild.Button(IconAction.Delete(), this.DeleteCardOdj.bind(this, conteneur, element), null, "ButtonAction")
            conteneurBoutton.appendChild(bouttonDelete)
            // creation ordre du jour
            switch (element.TenueGrade) {
                case this._ConstApprenti:
                    ordredujour.onclick = this.AddModifyTenueApprenti.bind(this, element)
                    let Titre = "Apprenti (A-" + element.TenueNumero + ")"
                    ordredujour.appendChild(NanoXBuild.DivText(Titre, null, "Text", "width:100%; color: var(--NanoX-appcolor);"))
                    let valide = true
                    element.Programme.forEach(elementProgramme => {
                        if (!elementProgramme.Valide){valide = false}
                        let TitreProgramme = ""
                        switch (elementProgramme.Type) {
                            case ProgrammeOredredujour.ConstMorceauArchitecture():
                                TitreProgramme = "Morc Archi : " + elementProgramme.Titre
                                ordredujour.appendChild(NanoXBuild.DivText(TitreProgramme, null, "TextSmall", "width:100%;"))
                                break;
                            case ProgrammeOredredujour.ConstDossier():
                                TitreProgramme = "Dossier : " + elementProgramme.ListeIntervenant.length + " profane(s)"
                                ordredujour.appendChild(NanoXBuild.DivText(TitreProgramme, null, "TextSmall", "width:100%;"))
                                break;
                            case ProgrammeOredredujour.ConstBandeau():
                                TitreProgramme = "Bandeau : " + elementProgramme.ListeIntervenant.length + " profane(s)"
                                ordredujour.appendChild(NanoXBuild.DivText(TitreProgramme, null, "TextSmall", "width:100%;"))
                                break;
                            case ProgrammeOredredujour.ConstAugmSalaire():
                                let TexteFrere = (elementProgramme.ListeIntervenant.length ==1)? " F de l'atelier" : " FF de l'atelier"
                                TitreProgramme = "Augmentation de salaire : " + elementProgramme.ListeIntervenant.length + TexteFrere
                                ordredujour.appendChild(NanoXBuild.DivText(TitreProgramme, null, "TextSmall", "width:100%;"))
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

    DeleteCardOdj(ConteneurOdj, element){
        ConteneurOdj.parentNode.removeChild(ConteneurOdj)
        const index = this._DataProgramme.OrdreDuJour.indexOf(element);
        this._DataProgramme.OrdreDuJour.splice(index, 1);
    }

    BuildPopupTenueGrade(){
        // Conteneur du popup
        let conteneur = NanoXBuild.DivFlexColumn()
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Grade de la Tenue", null, "SousTitre", "margin-bottom: 1rem;"))
        // Div horizontale du choix des programme
        let DivButtonTypeOfTenue = NanoXBuild.DivFlexRowSpaceEvenly()
        conteneur. appendChild(DivButtonTypeOfTenue)
        // Boutton Apprenti
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Apprenti(), this._ConstApprenti, this.ClickAddTenueApprenti.bind(this)))
        // Boutton Compagnon
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Compagnon(), "Compagnon", this.ClickAddTenueCompagnon.bind(this)))
        // Boutton Maitre
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Maitre(), "Maitre", this.ClickAddTenueMaitre.bind(this)))
        // Boutton Administrative
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Administrative(), "Admin", this.ClickAddTenueadmin.bind(this)))
        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
    }

    SaveDataProgramme(){
        this._DataProgramme.Date = document.getElementById("InputDate").value
        this._DataProgramme.Conge = document.getElementById("Conge").checked
        this._DataProgramme.Temple = document.getElementById("InputTemple").value
        this._DataProgramme.Rite = document.getElementById("InputRite").value
        this._DataProgramme.Repas = document.getElementById("InputRepas").value
        this._DataProgramme.Seminaire.Type = document.getElementById("inputSeminaireType").value
        this._DataProgramme.Seminaire.Local = document.getElementById("inputSeminaireLocal").value
        this._DataProgramme.Publish = document.getElementById("Publish").checked
    }

    ClickAddTenueApprenti(){
        // Delete popup
        NanoXBuild.PopupDelete()
        // Add Tenue Apprenti
        this.AddModifyTenueApprenti()
    }

    AddModifyTenueApprenti(Tenue = null){
        // Save Data Programme
        this.SaveDataProgramme()
        // Create tenue apprenti
        if (Tenue == null){
            let TenueApprenti = new ProgrammeTenueApprenti(this.CallBackAddTenue.bind(this))
        } else {
            this._DataTenue = Tenue
            this._IndexOfUpdatedTenue = this._DataProgramme.OrdreDuJour.indexOf(Tenue)
            let TenueApprenti = new ProgrammeTenueApprenti(this.CallBackAddTenue.bind(this), Tenue)
        }
    }

    ClickAddTenueCompagnon(){
        NanoXBuild.PopupDelete()
        // Add Tenue Apprenti
        this.AddModifyTenueCompagnon()
    }

    AddModifyTenueCompagnon(Tenue = null){
        // Save Data Programme
        this.SaveDataProgramme()
        // Create tenue apprenti
        if (Tenue == null){
            // ToDo
            //let TenueApprenti = new ProgrammeTenueApprenti(this.CallBackAddTenue.bind(this))
        } else {
            this._DataTenue = Tenue
            this._IndexOfUpdatedTenue = this._DataProgramme.OrdreDuJour.indexOf(Tenue)
            // ToDo
            //let TenueApprenti = new ProgrammeTenueApprenti(this.CallBackAddTenue.bind(this), Tenue)
        }

        // // Conteneur du popup
        // let conteneur = NanoXBuild.DivFlexColumn()
        // // Titre du popup
        // conteneur.appendChild(NanoXBuild.DivText("Choix de tenue de Compagnon", null, "SousTitre", "margin-bottom: 1rem; text-align: center;"))
        // // Div horizontale du choix des programme
        // let DivButtonTypeOfTenue = NanoXBuild.DivFlexRowSpaceEvenly()
        // conteneur. appendChild(DivButtonTypeOfTenue)
        // // Boutton Morcheau Architecture
        // DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.MorceauArchitecture(), "Morceau Architecture", this.ClickAddTenueMorceauArchitecture.bind(this)))
        // // Boutton ConsiderationAugmentationSalaire
        // DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.ConsiderationAugmentationSalaire(), "Consideration Augmentation Salaire", this.ClickAddTenueConsiderationAugmentationSalaire.bind(this)))
        // // Boutton AugmSalaire
        // DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.AugmSalaire(), "Augmentation Salaire", this.ClickAddTenueAugmSalaire.bind(this)))
        // // Boutton PassageGradeComp
        // DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.PassageGradeComp(), "Passage Grade Compagnon", this.ClickAddTenuePassageGradeComp.bind(this)))
        // // Boutton RetourComp
        // DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.RetourComp(), "Retour Compagnon", this.ClickAddTenueRetourComp.bind(this)))
        // // Boutton Autre
        // DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Autre(), "Autre", this.ClickAddTenueAutre.bind(this)))

        // // Creation du popup
        // NanoXBuild.PopupCreate(conteneur)
    }

    ClickAddTenueMaitre(){
        NanoXBuild.PopupDelete()
        // Add Tenue Apprenti
        this.AddModifyTenueMaitre()
    }

    AddModifyTenueMaitre(Tenue = null){
        // Save Data Programme
        this.SaveDataProgramme()
        // Create tenue apprenti
        if (Tenue == null){
            // ToDo
            //let TenueApprenti = new ProgrammeTenueApprenti(this.CallBackAddTenue.bind(this))
        } else {
            this._DataTenue = Tenue
            this._IndexOfUpdatedTenue = this._DataProgramme.OrdreDuJour.indexOf(Tenue)
            // ToDo
            //let TenueApprenti = new ProgrammeTenueApprenti(this.CallBackAddTenue.bind(this), Tenue)
        }

        // // Conteneur du popup
        // let conteneur = NanoXBuild.DivFlexColumn()
        // // Titre du popup
        // conteneur.appendChild(NanoXBuild.DivText("Choix de tenue de Maitre", null, "SousTitre", "margin-bottom: 1rem; text-align: center;"))
        // // Div horizontale du choix des programme
        // let DivButtonTypeOfTenue = NanoXBuild.DivFlexRowSpaceEvenly()
        // conteneur. appendChild(DivButtonTypeOfTenue)
        // // Boutton Morcheau Architecture
        // DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.MorceauArchitecture(), "Morceau Architecture", this.ClickAddTenueMorceauArchitecture.bind(this)))
        // // Boutton ConsiderationAugmentationSalaire
        // DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.ConsiderationAugmentationSalaire(), "Consideration Augmentation Salaire", this.ClickAddTenueConsiderationAugmentationSalaire.bind(this)))
        // // Boutton PassageGradeMaitre
        // DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.PassageGradeMaitre(), "Elevation a la Maitrise", this.ClickAddTenuePassageGradeMaitre.bind(this)))
        // // Boutton Autre
        // DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Autre(), "Autre", this.ClickAddTenueAutre.bind(this)))

        // // Creation du popup
        // NanoXBuild.PopupCreate(conteneur)
    }

    ClickAddTenueadmin(){
        NanoXBuild.PopupDelete()
        // Add Tenue Apprenti
        this.AddModifyTenueAdmin()
    }

    AddModifyTenueAdmin(Tenue = null){
        // Save Data Programme
        this.SaveDataProgramme()
        // Create tenue apprenti
        if (Tenue == null){
            // ToDo
            //let TenueApprenti = new ProgrammeTenueApprenti(this.CallBackAddTenue.bind(this))
        } else {
            this._DataTenue = Tenue
            this._IndexOfUpdatedTenue = this._DataProgramme.OrdreDuJour.indexOf(Tenue)
            // ToDo
            //let TenueApprenti = new ProgrammeTenueApprenti(this.CallBackAddTenue.bind(this), Tenue)
        }
    }

    CallBackAddTenue(Tenue){
        if (Tenue != null){
            if (this._IndexOfUpdatedTenue == null){
                this._DataProgramme.OrdreDuJour.push(Tenue)
            } else {
                this._DataProgramme.OrdreDuJour[this._IndexOfUpdatedTenue]= Tenue
            }
        }
        this.ViewNewProgrammeTenue(this._DataProgramme)
    }

    ClickSaveTenue(){
        alert("Save Tenue") // ToDo
        this._ButtonActionCancel()
    }
}