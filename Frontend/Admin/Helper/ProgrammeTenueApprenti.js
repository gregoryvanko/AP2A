class ProgrammeTenueApprenti{
    constructor(CallBack= null, Tenue = {TenueGrade: "", TenueNumero: "", Programme: []}){
        this._DivApp = NanoXGetDivApp()

        this._CallBack = CallBack
        this._Tenue = Tenue

        this._ConstApprenti = "Apprenti"
        if (this._Tenue.TenueGrade == ""){this._Tenue.TenueGrade = this._ConstApprenti}

        this._Idlisteordredujour = "listeordredujour"

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
            this.BuildCardProgramme(this._Tenue.Programme)
        }
        // Boutton Add Programme Apprenti
        conteneur.appendChild(NanoXBuild.Button("Ajouter Programme", this.BuildPopupProgramme.bind(this), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 

        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveTenue.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this.ClickCancelTenue.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)

        // EmptySpace
        conteneur.appendChild(NanoXBuild.Div("", "", "height: 2rem;"))
    }

    SaveDataTenue(){
        // Save Tenue numero
        this._Tenue.TenueNumero = document.getElementById("InputTenueNumero").value
    }

    ClickSaveTenue(){
        // Save Data
        this.SaveDataTenue()
        // Go to programme
        this._CallBack(this._Tenue)
    }

    ClickCancelTenue(){
        this._CallBack(null)
    }

    BuildPopupProgramme(){
        // Conteneur du popup
        let conteneur = NanoXBuild.DivFlexColumn()
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Choix de tenue Apprenti", null, "SousTitre", "margin-bottom: 1rem; text-align: center;"))
        // Div horizontale du choix des programme
        let DivButtonTypeOfTenue = NanoXBuild.DivFlexRowSpaceEvenly()
        conteneur. appendChild(DivButtonTypeOfTenue)
        // Boutton Morcheau Architecture
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.MorceauArchitecture(), "Morceau Architecture", this.ClickAddProgramme.bind(this, ProgrammeOredredujour.ConstMorceauArchitecture())))
        // Boutton Dossier
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Dossier(), "Dossier", this.ClickAddProgramme.bind(this, ProgrammeOredredujour.ConstDossier())))
        // Boutton Bandeau
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Bandeau(), "Bandeau", this.ClickAddProgramme.bind(this, ProgrammeOredredujour.ConstBandeau())))
        // Boutton AugmSalaire
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.AugmSalaire(), "Augmentation Salaire", this.ClickAddProgramme.bind(this, ProgrammeOredredujour.ConstAugmSalaire())))
        // Boutton Administrative
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Administrative(), "Administrative", this.ClickAddProgramme.bind(this, ProgrammeOredredujour.ConstAdmin())))
        // Boutton Autre
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Autre(), "Autre", this.ClickAddProgramme.bind(this, ProgrammeOredredujour.ConstAutre())))

        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
    }

    BuildCardProgramme(ProgrammeApprenti){
        const ListeOfProgramme = document.getElementById(this._Idlisteordredujour)
        ProgrammeApprenti.forEach(element => {
            switch (element.Type) {
                case ProgrammeOredredujour.ConstMorceauArchitecture():
                    let conteneur =  NanoXBuild.DivFlexRowSpaceBetween(null, null, "width:100%; margin-bottom: 1rem;")
                    // Ordre du jour
                    const ordredujour = NanoXBuild.DivFlexColumn(null, "Card", "width:88%;")
                    ordredujour.style.cursor = 'pointer'
                    ordredujour.onclick = this.ClickModifyMorceauArchitecture.bind(this, element.Type, element)
                    if (!element.Valide){
                        ordredujour.classList.add("BorderColorRed")
                    }
                    conteneur.appendChild(ordredujour)
                    // Delete button
                    const conteneurBoutton = NanoXBuild.DivFlexColumn(null, null, "width:11%; max-width: 2.7rem;")
                    conteneur.appendChild(conteneurBoutton)
                    const bouttonDelete = NanoXBuild.Button(IconAction.Delete(), this.DeleteCardProgramme.bind(this, conteneur, element), null, "ButtonAction")
                    conteneurBoutton.appendChild(bouttonDelete)
                    // creation ordre du jour
                    ordredujour.appendChild(NanoXBuild.DivText("Morceau Architecture", null, "Text", "width:100%; color: var(--NanoX-appcolor);"))
                    ordredujour.appendChild(NanoXBuild.DivText("Titre: " + element.Titre, null, "TextSmall", "width:100%"))
                    element.ListeOrateur.forEach(elementorateur => {
                        ordredujour.appendChild(NanoXBuild.DivText("Orateur: " + elementorateur.Prenom + " " + elementorateur.Nom, null, "TextSmall", "width:100%"))
                        let Atelier = (elementorateur.DeAtelier)? "De l'Atelier" : "de la R L: " + elementorateur.Loge
                        ordredujour.appendChild(NanoXBuild.DivText("Loge: " + Atelier, null, "TextSmall", "width:100%"))
                    });
                    ListeOfProgramme.appendChild(conteneur)
                    break;
            
                default:
                    alert("Programme type not found: " + element.Type)
                    break;
            }
        });
    }

    DeleteCardProgramme(ConteneurProgramme, element){
        ConteneurProgramme.parentNode.removeChild(ConteneurProgramme)
        const index = this._Tenue.Programme.indexOf(element);
        this._Tenue.Programme.splice(index, 1);
    }

    CallBackAddProgramme(Data, IndexOfUpdatedProgramme){
        if (Data != null){
            if (IndexOfUpdatedProgramme == null){
                this._Tenue.Programme.push(Data)
            } else {
                this._Tenue.Programme[IndexOfUpdatedProgramme] = Data
            }
        }
        this.BuildViewTenueApprenti()
    }

    ClickAddProgramme(Type = null){
        NanoXBuild.PopupDelete()
        this.BuildViewProgramme(Type)
    }

    ClickModifyMorceauArchitecture(Type, Programme){
        this.BuildViewProgramme(Type, Programme, this._Tenue.Programme.indexOf(Programme))
    }

    BuildViewProgramme(Type = null, Programme = null, IndexOfUpdatedProgramme = null){
        // Save Data
        this.SaveDataTenue()
        // Create view ordre du jour
        let Oredredujour = new ProgrammeOredredujour(this.CallBackAddProgramme.bind(this), IndexOfUpdatedProgramme)
        Oredredujour.Show(Type, Programme)
    }
}