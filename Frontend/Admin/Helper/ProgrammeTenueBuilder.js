class ProgrammeTenueBuilder {
    constructor(ButtonActionCancel){
        this._ButtonActionCancel = ButtonActionCancel

        this._OrdreDuJour = []
        this._TenueGrade = null
    }

    ViewNewProgrammeTenue({InDate="", InConge=false, InTemple="", InRite="", InRepas="", InSeminaireType="", InSeminaireLocal="", InOrdreDuJour = []}={}){
        this._OrdreDuJour = InOrdreDuJour
        let conteneur = NanoXBuild.Div(null, null, "display: flex; flex-direction: column; width:100%;")
        // Add Titre
        conteneur.appendChild(NanoXBuild.DivText("Nouvelle Tenue", null, "Titre MarginTitre", "text-align: center;"))
        // Date de la tenue
        let DivDate = NanoXBuild.DivFlexRowSpaceAround(null, null, "margin-bottom: 1rem;") 
        conteneur.appendChild(DivDate)
        DivDate.appendChild(NanoXBuild.DivText("Date Tenue:", null, "Text InputLabelWidth", ""))
        let InputDate = NanoXBuild.Input(InDate, "text", "InputDate", "", "InputDate", "Input Text", "width: 12rem;")
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
        let DivConge = NanoXBuild.DivFlexRowSpaceAround(null, null, "margin-bottom: 1rem;") 
        conteneur.appendChild(DivConge)
        DivConge.appendChild(NanoXBuild.DivText("En congé:", null, "Text InputLabelWidth", ""))
        let DivToogle = NanoXBuild.DivFlexRowEnd(null, null, "width: 12rem;")
        DivConge.appendChild(DivToogle)
        DivToogle.appendChild(NanoXBuild.ToggleSwitch({Id : "Conge", Checked : InConge, OnChange : null, HeightRem : 2}))
        // Temple
        const ListeOfTemple = ["Osiris", "Beauté"]
        conteneur.appendChild(UiComponent.InputWithTitreAndListeOfValue("Temple:", "InputTemple", InTemple, ListeOfTemple))
        // Rite
        const ListeOfRite = ["Mod", "REAA"]
        conteneur.appendChild(UiComponent.InputWithTitreAndListeOfValue("Rite:", "InputRite", InRite, ListeOfRite))
        // Repas
        const ListeOfRepas = ["Repas Frat", "Agapes", "Banquet", "Banquet rituel"]
        conteneur.appendChild(UiComponent.InputWithTitreAndListeOfValue("Repas:", "InputRepas", InRepas, ListeOfRepas))
        // Seminaire type
        const ListeOfTypeSeminaire = ["Pas de séminaire", "Travail", "Instruction"]
        conteneur.appendChild(UiComponent.InputWithTitreAndListeOfValue("Type séminaire:", "inputSeminaireType", InSeminaireType, ListeOfTypeSeminaire))
        // Seminaire local
        const ListeOfLocalSeminaire = ["Lumière"]
        conteneur.appendChild(UiComponent.InputWithTitreAndListeOfValue("Local séminaire:", "inputSeminaireLocal", InSeminaireLocal, ListeOfLocalSeminaire))
        // Ordre du jour ToDo
        conteneur.appendChild(NanoXBuild.DivText("Ordre du jour:", null, "SousTitre", "width:100%; margin-bottom: 0.5rem;"))
        let ListeOfOrdreDuJour = NanoXBuild.DivFlexColumn(null, null, "width:100%; margin-bottom: 1rem;")
        conteneur.appendChild(ListeOfOrdreDuJour)
        if(this._OrdreDuJour.length == 0){
            ListeOfOrdreDuJour.appendChild(NanoXBuild.DivText("Pas d'ordre du jour", null, "Text", ""))
        } else {
            // Construire la liste de l'ordre du jour
            this.BuildViewOdjListe()
        }
        conteneur.appendChild(NanoXBuild.Button("Add", this.BuildViewOdjTenueGrade.bind(this), null, "Button MarginButton Text", "width: 6rem; margin-left: auto; margin-right: auto;")) 
        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceAround(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveTenue.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this._ButtonActionCancel, null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)
        return conteneur
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

    ClickAddTenueMorceauArchitecture(){
        NanoXBuild.PopupDelete()
        alert("ToDo " + this._TenueGrade)
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