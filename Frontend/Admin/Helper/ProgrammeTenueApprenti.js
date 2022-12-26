class ProgrammeTenueApprenti{
    constructor(CallBack= null, Tenue = {TenueGrade: "", TenueNumero: "", Programme: []}){
        this._DivApp = NanoXGetDivApp()

        this._CallBack = CallBack
        this._Tenue = Tenue

        this._ConstApprenti = "Apprenti"
        if (this._Tenue.TenueGrade == ""){this._Tenue.TenueGrade = this._ConstApprenti}

        this.BuildViewTenueApprenti()
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

    BuildViewTenueApprenti(){
        // Clear view
        this._DivApp.innerHTML=""

        // Clear button
        this.ClearActionButton()

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
            this.BuildViewProgrammeCard(this._Tenue.Programme)
        }
        // Boutton Add Programme Apprenti
        conteneur.appendChild(NanoXBuild.Button("Ajouter Programme", this.BuildViewPopupProgramme.bind(this), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 

        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveTenue.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this.ClickCancelTenue.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)

        // EmptySpace
        conteneur.appendChild(NanoXBuild.Div("", "", "height: 2rem;"))
    }

    ClickSaveTenue(){
        // Save Tenue numero
        this._Tenue.TenueNumero = document.getElementById("InputTenueNumero").value
        // Go to programme
        this._CallBack(this._Tenue)
    }

    ClickCancelTenue(){
        this._CallBack(null)
    }

    BuildViewPopupProgramme(){
        // Conteneur du popup
        let conteneur = NanoXBuild.DivFlexColumn()
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Choix de tenue Apprenti", null, "SousTitre", "margin-bottom: 1rem; text-align: center;"))
        // Div horizontale du choix des programme
        let DivButtonTypeOfTenue = NanoXBuild.DivFlexRowSpaceEvenly()
        conteneur. appendChild(DivButtonTypeOfTenue)
        // Boutton Morcheau Architecture
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.MorceauArchitecture(), "Morceau Architecture", this.ClickAddMorceauArchitecture.bind(this)))
        // Boutton Dossier
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Dossier(), "Dossier", this.ClickAddDossier.bind(this)))
        // Boutton Bandeau
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Bandeau(), "Bandeau", this.ClickAddBandeau.bind(this)))
        // Boutton AugmSalaire
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.AugmSalaire(), "Augmentation Salaire", this.ClickAddAugmSalaire.bind(this)))
        // Boutton Administrative
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Administrative(), "Administrative", this.ClickAddTenueAdministrative.bind(this)))
        // Boutton Autre
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Autre(), "Autre", this.ClickAddTenueAutre.bind(this)))

        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
    }

    BuildViewProgrammeCard(ProgrammeApprenti){
        const ListeOfProgramme = document.getElementById(this._Idlisteordredujour)
        ProgrammeApprenti.forEach(element => {
            switch (element.Type) {
                case ProgrammeOredredujour.ConstMorceauArchitecture():
                    let conteneur =  NanoXBuild.DivFlexRowSpaceBetween(null, null, "width:100%; margin-bottom: 1rem;")
                    // Ordre du jour
                    const ordredujour = NanoXBuild.DivFlexColumn(null, "OredreDuJourResume", "width:88%;")
                    ordredujour.style.cursor = 'pointer'
                    ordredujour.onclick = this.ClickModifyMorceauArchitecture.bind(this, element)
                    if (!element.Valide){
                        ordredujour.classList.add("BorderColorRed")
                    }
                    conteneur.appendChild(ordredujour)
                    // Delete button
                    const conteneurBoutton = NanoXBuild.DivFlexColumn(null, null, "width:11%; max-width: 3rem;")
                    conteneur.appendChild(conteneurBoutton)
                    const bouttonDelete = NanoXBuild.Button(IconAction.Delete(), this.ClickDeleteProgramme.bind(this, conteneur, element), null, "ButtonAction")
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

    ClickDeleteProgramme(ConteneurProgramme, element){
        ConteneurProgramme.parentNode.removeChild(ConteneurProgramme)
        const index = this._Tenue.Programme.indexOf(element);
        this._Tenue.Programme.splice(index, 1);
    }

    CallBackAddProgramme(Data, IndexOfUpdatedElement){
        if (Data != null){
            if (IndexOfUpdatedElement == null){
                this._Tenue.Programme.push(Data)
            } else {
                this._Tenue.Programme[IndexOfUpdatedElement] = Data
            }
        }
        this.BuildViewTenueApprenti()
    }

    ClickAddMorceauArchitecture(){
        NanoXBuild.PopupDelete()
        this.BuildViewTenueMorceauArchitecture()
    }

    ClickModifyMorceauArchitecture(element){
        this.BuildViewTenueMorceauArchitecture(element, this._Tenue.Programme.indexOf(element))
    }

    BuildViewTenueMorceauArchitecture(Data = {}, IndexOfUpdatedElement = null){
        // Save Tenue numero
        this._Tenue.TenueNumero = document.getElementById("InputTenueNumero").value
        // Clear view
        this._DivApp.innerHTML=""
        // Create view ordre du jour
        let Oredredujour = new ProgrammeOredredujour(this.CallBackAddProgramme.bind(this), IndexOfUpdatedElement)
        Oredredujour.Show(ProgrammeOredredujour.ConstMorceauArchitecture(), Data)
    }

    ClickAddDossier(){
        //ToDo
    }

    ClickAddBandeau(){
        // ToDo
    }

    ClickAddAugmSalaire(){
        // ToDo
    }

    ClickAddTenueAdministrative(){
        // ToDo
    }

    ClickAddTenueAutre(){
        // ToDo
    }
}