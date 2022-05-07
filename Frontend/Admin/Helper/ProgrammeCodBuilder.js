class ProgrammeCodBuilder {
    constructor(ButtonActionCancel){
        this._ButtonActionCancel = ButtonActionCancel
    }

    ViewNewProgrammeCod(){
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width: 100%;")
        // Add Titre
        conteneur.appendChild(NanoXBuild.DivText("Nouvelle COD", null, "Titre MarginTitre", "text-align: center;"))
        // ToDo

        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceAround(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveCod.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this._ButtonActionCancel, null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)
        return conteneur
    }

    ClickSaveCod(){
        alert("Save COD")
        this._ButtonActionCancel()
    }
}