class ProgrammeOredredujour{
    constructor(CallBack, IndexOfUpdatedProgramme){
        this._DivApp = NanoXGetDivApp()

        this._CallBack = CallBack
        this._IndexOfUpdatedProgramme = IndexOfUpdatedProgramme

        this._ListeOrateur = []
        this._IndexOfUpdatedOrateur = null

        this._IdconteneurOrateur = "conteneurOrateur"
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
        if (DataMorceauArchitecture == null){ DataMorceauArchitecture = {Titre: "", Valide: false, ListeOrateur: []}}
        this._ListeOrateur = DataMorceauArchitecture.ListeOrateur
        // Clear view
        this._DivApp.innerHTML=""
        // Clear liste of  updatede orateur
        this._IndexOfUpdatedOrateur = null

        // Conteneur
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width:100%; margin-bottom: 2rem; max-width: 35rem;")
        this._DivApp.appendChild(conteneur)
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Morceau architecture", null, "Titre MarginTitre", "margin-bottom: 1rem; margin-top: 1rem; text-align: center;"))
        // Titre
        conteneur.appendChild(UiComponent.InputWithTitre("Titre:", "InputTitre", DataMorceauArchitecture.Titre, "24rem"))
        // Liste Orateur
        conteneur.appendChild(NanoXBuild.DivText("Liste des orateurs", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem;"))
        let conteneurOrateur = NanoXBuild.DivFlexColumn(this._IdconteneurOrateur, null, "width:100%;")
        conteneur.appendChild(conteneurOrateur)
        // Add orateur
        this.BuildListofOrateur()
        // Boutton Add Orateur
        conteneur.appendChild(NanoXBuild.Button("Ajouter un orateur", this.BuildViewAddModifyOrateur.bind(this, null), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 
        
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

        if((Titre == "") || (this._ListeOrateur.length == 0)){
            // Popup error
            let content = NanoXBuild.DivText("Erreur: remplir le numero et le titre", null, "Text", "color: red; text-align: center;")
            NanoXBuild.PopupCreate(content)
        } else {
            let Data = {
                Type: ProgrammeOredredujour.ConstMorceauArchitecture(),
                Titre: Titre,  
                Valide: document.getElementById("InputValide").checked,
                ListeOrateur: this._ListeOrateur
            }
            this._CallBack(Data, this._IndexOfUpdatedProgramme)
        }
    }

    /* Orateur */
    BuildListofOrateur(){
        let conteneurOrateur = document.getElementById(this._IdconteneurOrateur)
        conteneurOrateur.innerHTML = ""
        this._ListeOrateur.forEach(Orateur => {
            const conteneur =  NanoXBuild.DivFlexRowSpaceBetween(null, null, "width:100%; margin-bottom: 1rem;")
            // Ordre du jour
            const Card = NanoXBuild.DivFlexColumn(null, "Card", "width:88%;")
            conteneur.appendChild(Card)
            Card.style.cursor = 'pointer'
            Card.onclick = this.BuildViewAddModifyOrateur.bind(this, Orateur)
            let PrenomNom = Orateur.Prenom + " " + Orateur.Nom
            Card.appendChild(NanoXBuild.DivText(PrenomNom, null, "TextSmall", "width:100%; margin: 0.2rem 0 0.2rem 0;"))
            let Atelier = (Orateur.DeAtelier)? "De l'Atelier" : "de la R L: " + Orateur.Loge
            Card.appendChild(NanoXBuild.DivText(Atelier, null, "TextSmall", "width:100%; margin: 0.2rem 0 0.2rem 0;"))
            // Delete button
            const conteneurBoutton = NanoXBuild.DivFlexColumn(null, null, "width:11%; max-width: 2.7rem;")
            conteneur.appendChild(conteneurBoutton)
            const bouttonDelete = NanoXBuild.Button(IconAction.Delete(), this.DeleteCardOrateur.bind(this, conteneur, Orateur), null, "ButtonAction")
            conteneurBoutton.appendChild(bouttonDelete)
            // ajout au conteneur orateur
            conteneurOrateur.appendChild(conteneur)
        });
    }

    DeleteCardOrateur(Conteneur, Orateur){
        Conteneur.parentNode.removeChild(Conteneur)
        const index = this._ListeOrateur.indexOf(Orateur);
        this._ListeOrateur.splice(index, 1);
    }

    BuildViewAddModifyOrateur(Orateur = null){
        if (Orateur == null){ 
            Orateur = {Nom:"", Prenom:"", Loge:"", DeAtelier: true}
        } else {
            this._IndexOfUpdatedOrateur = this._ListeOrateur.indexOf(Orateur)
        }
        // Conteneur
        let conteneur = NanoXBuild.DivFlexRowSpaceBetween(null, null, "width:100%; margin-top: 1rem;")
        // Orateur Prénom
        conteneur.appendChild(UiComponent.InputWithTitre("Prénom:", "InputOrateurPrenom", Orateur.Prenom, "19rem"))
        // Orateur Nom
        conteneur.appendChild(UiComponent.InputWithTitre("Nom:", "InputOrateurNom", Orateur.Nom, "19rem"))
        // De l'Atelier
        conteneur.appendChild(UiComponent.InputWithToogle("De l'Atelier:", "DeAtelier", Orateur.DeAtelier, this.OnChangeToogleDeAtelier.bind(this)))
        // Orateur Loge
        let conteneurLoge = NanoXBuild.Div(this._IdconteneurLoge, null, "display: none; flex-direction: column; width:100%;")
        conteneur.appendChild(conteneurLoge)
        conteneurLoge.appendChild(UiComponent.InputWithTitre("Loge:", "InputOrateurLoge", Orateur.Loge, "19rem"))
        // Save Cancel boutton
        const ListOfButton = [{Titre: "Save", Action: this.SaveOrateur.bind(this), Id: null}, {Titre: "Cancel", Action: NanoXBuild.PopupDelete, Id: null}]
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

    SaveOrateur(){
        // Creation orateur
        let Orateur = {
            Prenom: document.getElementById("InputOrateurPrenom").value,
            Nom: document.getElementById("InputOrateurNom").value, 
            Loge: document.getElementById("InputOrateurLoge").value, 
            DeAtelier: document.getElementById("DeAtelier").checked
        }
        // Supprimer le popup
        NanoXBuild.PopupDelete()
        // Ajouter l'orateur à la liste
        if (this._IndexOfUpdatedOrateur == null){
            this._ListeOrateur.push(Orateur)
        } else {
            this._ListeOrateur[this._IndexOfUpdatedOrateur]= Orateur
            this._IndexOfUpdatedOrateur = null
        }
        // Affichier la liste des orateurs
        this.BuildListofOrateur()
    }
}