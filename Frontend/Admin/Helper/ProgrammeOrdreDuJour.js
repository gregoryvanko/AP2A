class ProgrammeOredredujour{
    constructor(){
        this._TenueNumero = null
    }

    ShowMorceauArchitecture(TenueGrade = "", TenueNumero= null, Titre= "", Valide= false, ListeOrateur= [{Nom:"", Loge:""}]){
        this._TenueNumero = (TenueNumero == null)? "" : TenueNumero

        // Conteneur
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width:100%; margin-bottom: 2rem;")
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText(TenueGrade + ": Morceau architecture", null, "Titre MarginTitre", "margin-bottom: 1rem; text-align: center;"))
        // DivInput
        let divinput = NanoXBuild.Div("", "", "display: flex; flex-direction: column; align-items: start;")
        conteneur.appendChild(divinput)
        // Numero de la tenue
        divinput.appendChild(UiComponent.InputWithTitre("Numero:", "InputTenueNumero", this._TenueNumero, "6rem"))

        // Orateur nom
        //divinput.appendChild(UiComponent.InputWithTitre("Orateur:", "InputOrateurNom", OrateurNom, "20rem"))
        // Orateur Loge
        //divinput.appendChild(UiComponent.InputWithTitre("Orateur (Loge):", "InputOrateurLoge", OrateurLoge, "20rem"))

        // Titre
        divinput.appendChild(UiComponent.InputWithTitre("Titre:", "InputTitre", Titre, "20rem"))
        // Valide
        divinput.appendChild(UiComponent.InputWithToogle("Publish:", "InputValide", Valide, "20rem"))

        // return
        return conteneur
    }
}