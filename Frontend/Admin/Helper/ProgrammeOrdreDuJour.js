class ProgrammeOredredujour{
    constructor(CallBack, IndexOfUpdatedElement){
        this._DivApp = NanoXGetDivApp()

        this._CallBack = CallBack
        this._IndexOfUpdatedElement = IndexOfUpdatedElement

        this._ListeOrateur = []
        
    }

    static ConstMorceauArchitecture(){return "MorceauArchitecture"}

    Show(Type = "", Data = {}){
        switch (Type) {
            case ProgrammeOredredujour.ConstMorceauArchitecture():
                this.ShowMorceauArchitecture(Data)
                break;
        
            default:
                alert("Type of Programme not found: " + Type)
                break;
        }
    }

    ShowMorceauArchitecture({Titre= "", Valide= false, ListeOrateur= this._ListeOrateur} = {}){
        // Clear view
        this._DivApp.innerHTML=""

        // Conteneur
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width:100%; margin-bottom: 2rem; max-width: 35rem;")
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Morceau architecture", null, "Titre MarginTitre", "margin-bottom: 1rem; margin-top: 1rem; text-align: center;"))
        // Titre
        conteneur.appendChild(UiComponent.InputWithTitre("Titre:", "InputTitre", Titre, "24rem"))
        // Orateur
        conteneur.appendChild(NanoXBuild.DivText("Liste des orateurs", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem;"))
        let conteneurOrateur = NanoXBuild.DivFlexColumn("conteneurOrateur", null, "width:100%;")
        conteneur.appendChild(conteneurOrateur)
        // Boutton Add Orateur
        conteneur.appendChild(NanoXBuild.Button("Ajouter un orateur", this.AddNewOrateur.bind(this), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 
        
        // Valide
        conteneur.appendChild(NanoXBuild.DivText("Validation", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem;"))
        conteneur.appendChild(UiComponent.InputWithToogle("Validé:", "InputValide", Valide))

        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveMorceauArchitecture.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this.ClickCancel.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)

        this._DivApp.appendChild(conteneur)
        // add orateur
        if (ListeOrateur.length == 0){
            this.AddNewOrateur()
        } else {
            ListeOrateur.forEach(element => {
                conteneurOrateur.appendChild(this.BuildOrateurInput(element))
            });
        }
    }

    BuildOrateurInput(Orateur = {Nom:"", Loge:""}){
        // Conteneur
        let conteneur = NanoXBuild.DivFlexRowSpaceBetween(null, null, "width:100%; margin-top: 1rem;")
        // Conteneur des data
        let conteneurOrateur = NanoXBuild.DivFlexColumn(null, null, "width:88%;")
        conteneurOrateur.setAttribute("data-orateur","orateur")
        conteneur.appendChild(conteneurOrateur)
        // Delete button
        let conteneurBoutton = NanoXBuild.DivFlexColumn(null, null, "width:11%; max-width: 3rem;")
        conteneur.appendChild(conteneurBoutton)
        let bouttonDelete = NanoXBuild.Button(IconAction.Delete(), this.DeleteOrateur.bind(this, conteneur), null, "ButtonAction")
        conteneurBoutton.appendChild(bouttonDelete)
        // Orateur nom
        conteneurOrateur.appendChild(UiComponent.InputWithTitre("Orateur:", "InputOrateurNom", Orateur.Nom, "19rem"))
        // Orateur Loge
        conteneurOrateur.appendChild(UiComponent.InputWithTitre("Orateur (Loge):", "InputOrateurLoge", Orateur.Loge, "19rem"))
        return conteneur
    }

    AddNewOrateur(){
        let conteneurOrateur = document.getElementById("conteneurOrateur")
        conteneurOrateur.appendChild(this.BuildOrateurInput())
    }

    DeleteOrateur(conteneur){
        conteneur.parentNode.removeChild(conteneur)
    }

    GetListeOrateur(){
        let listeorateur = []
        const AllElements = document.querySelectorAll('[data-orateur="orateur"]')
        if(AllElements.length != 0){
            AllElements.forEach(element => {
                const OrateurName = element.querySelector('#InputOrateurNom').value
                const OrateurLoge = element.querySelector('#InputOrateurLoge').value
                listeorateur.push({Nom:OrateurName, Loge:OrateurLoge})
            })
        }
        return listeorateur
    }

    ClickSaveMorceauArchitecture(){
        const Titre = document.getElementById("InputTitre").value
        const ListeOrateur= this.GetListeOrateur()

        if((Titre == "") || (ListeOrateur.length == 0)){
            // Popup error
            let content = NanoXBuild.DivText("Erreur: remplir le numero et le titre", null, "Text", "color: red; text-align: center;")
            NanoXBuild.PopupCreate(content)
        } else {
            let Data = {
                Type: ProgrammeOredredujour.ConstMorceauArchitecture(),
                Titre: Titre,  
                Valide: document.getElementById("InputValide").checked,
                ListeOrateur: ListeOrateur
            }
            this._CallBack(Data, this._IndexOfUpdatedElement)
        }
    }

    ClickCancel(){
        this._CallBack(null, this._IndexOfUpdatedElement )
    }
}