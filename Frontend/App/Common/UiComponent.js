class UiComponent{
    constructor(){}

    /**
     * Construit un boutton sous forme d'image et de texte
     * @param {SVG} Svg Image du boutton en SVG
     * @param {String} Titre Titre du boutton
     * @param {Function} Action Action a effectuer sur le click du boutton
     * @returns HtmlElement Boutton
     */
    static ButtonSvgAndTitre(Svg = null, Titre = "Titre", Action = null){
        let BouttonTenueContener = NanoXBuild.DivFlexColumn(null, null, "width: 6rem;")
        let BouttonTenueImage = NanoXBuild.DivFlexColumn(null, null, "height: 6rem; margin-bottom: 1rem;")
        BouttonTenueImage.innerHTML = Svg
        BouttonTenueContener.appendChild(BouttonTenueImage)
        BouttonTenueContener.appendChild(NanoXBuild.DivText(Titre, null, "Text", "height: 3rem; display: flex; align-items: center;"))
        let bouttonTenue = NanoXBuild.Button(BouttonTenueContener.outerHTML, Action, null, "Button MarginButton")
        return bouttonTenue
    } 
}