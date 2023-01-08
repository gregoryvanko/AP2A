class ProgrammeOredredujour{
    constructor(CallBack, IndexOfUpdatedProgramme){
        this._DivApp = NanoXGetDivApp()

        this._CallBack = CallBack
        this._IndexOfUpdatedProgramme = IndexOfUpdatedProgramme

        this._ListeIntervenant = []
        this._IndexOfUpdatedIntervenant = null

        this._IdconteneurIntervenant = "conteneurIntervenant"
        this._IdconteneurLoge = "conteneurLoge"
    }

    static ConstMorceauArchitecture(){return "MorceauArchitecture"}
    static ConstDossier(){return "Dossier"}
    static ConstBandeau(){return "Bandeau"}
    static ConstAugmSalaire(){return "AugmSalaire"}
    static ConstAdmin(){return "Administrative"}
    static ConstAutre(){return "Autre"}

    Show(Type = "", Programme = null){
        switch (Type) {
            case ProgrammeOredredujour.ConstMorceauArchitecture():
                this.ShowMorceauArchitecture(Programme)
                break;
            case ProgrammeOredredujour.ConstDossier():
                this.ShowDossier(Programme)
                break;
            default:
                alert("Type of Programme not found: " + Type)
                break;
        }
    }

    ClickCancel(){
        this._CallBack(null, this._IndexOfUpdatedProgramme )
    }

    /* Morceau Architecture */
    ShowMorceauArchitecture(DataMorceauArchitecture = null){
        if (DataMorceauArchitecture == null){ DataMorceauArchitecture = {Titre: "", Valide: false, ListeIntervenant: []}}
        this._ListeIntervenant = DataMorceauArchitecture.ListeIntervenant
        // Clear view
        this._DivApp.innerHTML=""
        // Clear liste of  updatede Intervenant
        this._IndexOfUpdatedIntervenant = null

        // Conteneur
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width:100%; margin-bottom: 2rem; max-width: 35rem;")
        this._DivApp.appendChild(conteneur)
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Morceau architecture", null, "Titre MarginTitre", "margin-bottom: 1rem; margin-top: 1rem; text-align: center;"))
        // Titre
        conteneur.appendChild(UiComponent.InputWithTitre("Titre:", "InputTitre", DataMorceauArchitecture.Titre, "24rem"))
        // Liste Intervenant
        conteneur.appendChild(NanoXBuild.DivText("Liste des orateurs", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem;"))
        let conteneurIntervenant = NanoXBuild.DivFlexColumn(this._IdconteneurIntervenant, null, "width:100%;")
        conteneur.appendChild(conteneurIntervenant)
        // Add Intervenant
        this.BuildListofIntervenant()
        // Boutton Add Intervenant
        conteneur.appendChild(NanoXBuild.Button("Ajouter un orateur", this.BuildViewAddModifyIntervenant.bind(this, null, true), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 
        
        // Valide
        conteneur.appendChild(NanoXBuild.DivText("Validation", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem;"))
        conteneur.appendChild(UiComponent.InputWithToogle("Validé:", "InputValide", DataMorceauArchitecture.Valide))

        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveMorceauArchitecture.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this.ClickCancel.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)
    }

    ClickSaveMorceauArchitecture(){
        const Titre = document.getElementById("InputTitre").value

        if((Titre == "") || (this._ListeIntervenant.length == 0)){
            // Popup error
            let content = NanoXBuild.DivText("Erreur: remplir le titre et un orateur", null, "Text", "color: red; text-align: center;")
            NanoXBuild.PopupCreate(content)
        } else {
            let Data = {
                Type: ProgrammeOredredujour.ConstMorceauArchitecture(),
                Titre: Titre,  
                Valide: document.getElementById("InputValide").checked,
                ListeIntervenant: this._ListeIntervenant
            }
            this._CallBack(Data, this._IndexOfUpdatedProgramme)
        }
    }

    /* Dossier */
    ShowDossier(DataDossier = null){
        if (DataDossier == null){ DataDossier = {Valide: false, ListeIntervenant: []}}
        this._ListeIntervenant = DataDossier.ListeIntervenant

        // Clear view
        this._DivApp.innerHTML=""
        // Clear liste of  updatede Profane
        this._IndexOfUpdatedIntervenant = null

        // Conteneur
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width:100%; margin-bottom: 2rem; max-width: 35rem;")
        this._DivApp.appendChild(conteneur)
        // Titre
        conteneur.appendChild(NanoXBuild.DivText("Dossier", null, "Titre MarginTitre", "margin-bottom: 1rem; margin-top: 1rem; text-align: center;"))
        // Liste Profane
        conteneur.appendChild(NanoXBuild.DivText("Liste des profanes", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem;"))
        let conteneurIntervenant = NanoXBuild.DivFlexColumn(this._IdconteneurIntervenant, null, "width:100%;")
        conteneur.appendChild(conteneurIntervenant)
        // Add Intervenant
        this.BuildListofIntervenant()
        // Boutton Add Intervenant
        conteneur.appendChild(NanoXBuild.Button("Ajouter un profane", this.BuildViewAddModifyIntervenant.bind(this, null, false), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 
        
        // Valide
        conteneur.appendChild(NanoXBuild.DivText("Validation", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem;"))
        conteneur.appendChild(UiComponent.InputWithToogle("Validé:", "InputValide", DataDossier.Valide))

        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveDossier.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this.ClickCancel.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)
    }

    ClickSaveDossier(){
        if(this._ListeIntervenant.length == 0){
            // Popup error
            let content = NanoXBuild.DivText("Erreur: ajouter un profane", null, "Text", "color: red; text-align: center;")
            NanoXBuild.PopupCreate(content)
        } else {
            let Data = {
                Type: ProgrammeOredredujour.ConstDossier(), 
                Valide: document.getElementById("InputValide").checked,
                ListeIntervenant: this._ListeIntervenant
            }
            this._CallBack(Data, this._IndexOfUpdatedProgramme)
        }
    }

    /* Intervenant */
    BuildListofIntervenant(){
        let conteneurIntervenant = document.getElementById(this._IdconteneurIntervenant)
        conteneurIntervenant.innerHTML = ""
        this._ListeIntervenant.forEach(Intervenant => {
            const conteneur =  NanoXBuild.DivFlexRowSpaceBetween(null, null, "width:100%; margin-bottom: 1rem;")
            // Card intervenant
            const Card = NanoXBuild.DivFlexColumn(null, "Card", "width:88%;")
            conteneur.appendChild(Card)
            Card.style.cursor = 'pointer'
            Card.onclick = this.BuildViewAddModifyIntervenant.bind(this, Intervenant)
            let PrenomNom = Intervenant.Prenom + " " + Intervenant.Nom
            Card.appendChild(NanoXBuild.DivText(PrenomNom, null, "TextSmall", "width:100%; margin: 0.2rem 0 0.2rem 0;"))
            if(Intervenant.Macon){
                let Atelier = (Intervenant.DeAtelier)? "De l'Atelier" : "de la R L: " + Intervenant.Loge
                Card.appendChild(NanoXBuild.DivText(Atelier, null, "TextSmall", "width:100%; margin: 0.2rem 0 0.2rem 0;"))
            }
            // Delete button
            const conteneurBoutton = NanoXBuild.DivFlexColumn(null, null, "width:11%; max-width: 2.7rem;")
            conteneur.appendChild(conteneurBoutton)
            const bouttonDelete = NanoXBuild.Button(IconAction.Delete(), this.DeleteCardIntervenant.bind(this, conteneur, Intervenant), null, "ButtonAction")
            conteneurBoutton.appendChild(bouttonDelete)
            // ajout au conteneur
            conteneurIntervenant.appendChild(conteneur)
        });
    }

    DeleteCardIntervenant(Conteneur, Intervenant){
        Conteneur.parentNode.removeChild(Conteneur)
        const index = this._ListeIntervenant.indexOf(Intervenant);
        this._ListeIntervenant.splice(index, 1);
    }

    BuildViewAddModifyIntervenant(Intervenant = null, Macon = true){
        if (Intervenant == null){ 
            Intervenant = {Nom:"", Prenom:"", Macon: Macon, Loge:"", DeAtelier: true}
        } else {
            this._IndexOfUpdatedIntervenant = this._ListeIntervenant.indexOf(Intervenant)
            Macon = Intervenant.Macon
        }
        // Conteneur
        let conteneur = NanoXBuild.DivFlexRowSpaceBetween(null, null, "width:100%; margin-top: 1rem;")
        // Intervenant Prénom
        conteneur.appendChild(UiComponent.InputWithTitre("Prénom:", "InputIntervenantPrenom", Intervenant.Prenom, "19rem"))
        // Intervenant Nom
        conteneur.appendChild(UiComponent.InputWithTitre("Nom:", "InputIntervenantNom", Intervenant.Nom, "19rem"))
        // Si l'intervenant est maçon
        if (Macon){
            // De l'Atelier
            conteneur.appendChild(UiComponent.InputWithToogle("De l'Atelier:", "DeAtelier", Intervenant.DeAtelier, this.OnChangeToogleDeAtelier.bind(this)))
            // Loge
            let conteneurLoge = NanoXBuild.Div(this._IdconteneurLoge, null, "display: none; flex-direction: column; width:100%;")
            conteneur.appendChild(conteneurLoge)
            conteneurLoge.appendChild(UiComponent.InputWithTitre("Loge:", "InputIntervenantLoge", Intervenant.Loge, "19rem"))
        }
        // Save Cancel boutton
        const ListOfButton = [{Titre: "Save", Action: this.SaveIntervenant.bind(this, Macon), Id: null}, {Titre: "Cancel", Action: NanoXBuild.PopupDelete, Id: null}]
        // Creation du popup
        NanoXBuild.PopupCreate(conteneur, ListOfButton)
    }

    OnChangeToogleDeAtelier(event){
        let conteneurinfo = document.getElementById(this._IdconteneurLoge)
        if (event.target.checked){
            conteneurinfo.style.display = "none"
        } else {
            conteneurinfo.style.display = "flex"
        }
    }

    SaveIntervenant(Macon = true){
        // Creation Intervenant
        let Intervenant = (Macon)? {
            Prenom: document.getElementById("InputIntervenantPrenom").value,
            Nom: document.getElementById("InputIntervenantNom").value, 
            Macon: Macon,
            Loge: document.getElementById("InputIntervenantLoge").value, 
            DeAtelier: document.getElementById("DeAtelier").checked
        }: {
            Prenom: document.getElementById("InputIntervenantPrenom").value,
            Nom: document.getElementById("InputIntervenantNom").value,
            Macon : Macon
        }
        // Supprimer le popup
        NanoXBuild.PopupDelete()
        // Ajouter l'Intervenant à la liste
        if (this._IndexOfUpdatedIntervenant == null){
            this._ListeIntervenant.push(Intervenant)
        } else {
            this._ListeIntervenant[this._IndexOfUpdatedIntervenant]= Intervenant
            this._IndexOfUpdatedIntervenant = null
        }
        // Affichier la liste des Intervenants
        this.BuildListofIntervenant()
    }
}