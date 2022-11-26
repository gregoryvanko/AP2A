class ProgrammeCodBuilder {
    constructor(ButtonActionCancel){
        this._DivApp = NanoXGetDivApp()

        this._ButtonActionCancel = ButtonActionCancel
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

    ViewNewProgrammeCod(){
        // Clear Action Button
        this.ClearActionButton()
        // Clear view
        this._DivApp.innerHTML=""
        
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width: 100%;")
        // Add Titre
        conteneur.appendChild(NanoXBuild.DivText("Nouvelle COD", null, "Titre MarginTitre", "text-align: center;"))
        // ToDo

        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceAround(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveCod.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this._ButtonActionCancel, null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)

        this._DivApp.appendChild(conteneur)
    }

    ClickSaveCod(){
        alert("Save COD")
        this._ButtonActionCancel()
    }
}