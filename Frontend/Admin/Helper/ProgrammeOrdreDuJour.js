class ProgrammeOredredujour{
    constructor(CallBack){
        this._DivApp = NanoXGetDivApp()

        this._CallBack = CallBack
        this._TenueNumero = null
        this._ListeOrateur = []
    }

    ShowMorceauArchitecture(TenueGrade = "", TenueNumero= null, Titre= "", Valide= false, ListeOrateur= this._ListeOrateur){
        this._TenueNumero = (TenueNumero == null)? "" : TenueNumero
        // Clear view
        this._DivApp.innerHTML=""

        // Conteneur
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width:100%; margin-bottom: 2rem; max-width: 35rem;")
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText(TenueGrade + ": Morceau architecture", null, "Titre MarginTitre", "margin-bottom: 1rem; margin-top: 1rem; text-align: center;"))
        // DivInput
        //let divinput = NanoXBuild.Div("", "", "display: flex; flex-direction: column; align-items: start; width: 100%; max-width: 35rem;")
        //conteneur.appendChild(divinput)
        // Numero de la tenue
        conteneur.appendChild(UiComponent.InputWithTitre("Numero:", "InputTenueNumero", this._TenueNumero, "6rem"))
        // Titre
        conteneur.appendChild(UiComponent.InputWithTitre("Titre:", "InputTitre", Titre, "24rem"))
        // Orateur
        conteneur.appendChild(NanoXBuild.DivText("Liste des orateurs", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem; text-align: center;"))
        let conteneurOrateur = NanoXBuild.DivFlexColumn("conteneurOrateur", null, "width:100%;")
        conteneur.appendChild(conteneurOrateur)
        // Boutton Add Orateur
        conteneur.appendChild(NanoXBuild.Button("Ajouter un orateur", this.AddNewOrateur.bind(this), null, "Button MarginButton Text", "width: 15rem; margin-left: auto; margin-right: auto;")) 
        

        // Valide
        conteneur.appendChild(NanoXBuild.DivText("Validation", null, "SousTitre", "width:100%; margin-bottom: 0.5rem; margin-top: 2rem; text-align: center;"))
        conteneur.appendChild(UiComponent.InputWithToogle("Validé:", "InputValide", Valide))

        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveMorceauArchitecture.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this.ClickCancel.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)

        this._DivApp.appendChild(conteneur)
        // add orateur
        this.AddNewOrateur()
    }

    BuildOrateurInput(Orateur = {Nom:"", Loge:""}){
        // Conteneur
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width:100%; margin-top: 1rem;")
        // Orateur nom
        conteneur.appendChild(UiComponent.InputWithTitre("Orateur:", "InputOrateurNom", Orateur.Nom, "24rem"))
        // Orateur Loge
        conteneur.appendChild(UiComponent.InputWithTitre("Orateur (Loge):", "InputOrateurLoge", Orateur.Loge, "24rem"))
        return conteneur
    }

    AddNewOrateur(){
        this._ListeOrateur.push({Nom:"", Loge:""})
        let conteneurOrateur = document.getElementById("conteneurOrateur")
        conteneurOrateur.innerHTML = ""
        for (let index = 0; index < this._ListeOrateur.length; index++) {
            const element = this._ListeOrateur[index];
            conteneurOrateur.appendChild(this.BuildOrateurInput(element))
            if ((index != 0) && (index != this._ListeOrateur.length - 1)){
                conteneurOrateur.appendChild(NanoXBuild.Line())
            }

        }
    }

    ClickSaveMorceauArchitecture(){
        let Data = {
            TenueNumero: document.getElementById("InputTenueNumero").value,
            //OrateurNom: document.getElementById("InputOrateurNom").value,  
            //OrateurLoge: document.getElementById("InputOrateurLoge").value,  
            Titre: document.getElementById("InputTitre").value,  
            Valide: document.getElementById("InputValide").checked
        }
        this._CallBack(Data)
    }

    ClickCancel(){
        this._CallBack(null)
    }
}