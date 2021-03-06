class UiComponent{
    constructor(){}

    /**
     * Construit un boutton avec d'image et de texte
     * @param {SVG} Svg Image du boutton en SVG
     * @param {String} Titre Titre du boutton
     * @param {Function} Action Action a effectuer sur le click du boutton
     * @returns HtmlElement Boutton
     */
    static ButtonSvgAndTitre(Svg = null, Titre = "Titre", Action = null){
        let BouttonTenueContener = NanoXBuild.DivFlexColumn(null, null, "width: 6rem;")
        let BouttonTenueImage = NanoXBuild.DivFlexColumn(null, null, "height: 5rem; margin-bottom: 1rem;")
        BouttonTenueImage.innerHTML = Svg
        BouttonTenueContener.appendChild(BouttonTenueImage)
        BouttonTenueContener.appendChild(NanoXBuild.DivText(Titre, null, "Text", "height: 3.5rem; display: flex; align-items: center;"))
        let bouttonTenue = NanoXBuild.Button(BouttonTenueContener.outerHTML, Action, null, "Button MarginButton")
        return bouttonTenue
    }

    /**
     * Construit un Div contentant in Input, son titre, et sa liste de valeur
     * @param {String} Titre Titre de l'input
     * @param {String} InputID Id de l'input
     * @param {String} InitValue Valeur intitial de l'input
     * @param {Array} ListeOfValue Liste des valeurs possible de l'input
     * @returns HtmlElement Div
     */
    static InputWithTitreAndListeOfValue(Titre = "Titre", InputID= "InputId", InitValue = "", ListeOfValue = []){
        let Div = NanoXBuild.DivFlexRowSpaceAround(null, null, "margin-bottom: 1rem;") 
        Div.appendChild(NanoXBuild.DivText(Titre, null, "Text InputLabelWidth", ""))
        let Myinput = NanoXBuild.Input(InitValue, "text", InputID, "", InputID, "Input Text", "width: 12rem")
        Myinput.autocomplete = "off"
        Myinput.setAttribute("inputmode","none")
        Div.appendChild(Myinput)
        autocomplete({
            input: Myinput,
            minLength: 0,
            showOnFocus: true,
            //debounceWaitMs: 200,
            emptyMsg: 'No suggestion',
            fetch: function(text, update) {
                text = text.toLowerCase();
                var GroupFiltred = ListeOfValue.filter(n => n.toLowerCase().startsWith(text))
                var suggestions = []
                GroupFiltred.forEach(element => {
                    var MyObject = new Object()
                    MyObject.label = element
                    suggestions.push(MyObject)
                });
                update(suggestions);
            },
            onSelect: function(item) {
                document.getElementById(InputID).value = item.label;
            },
            customize: function(input, inputRect, container, maxHeight) {
                if (container.childNodes.length == 1){
                    if (container.childNodes[0].innerText == 'No suggestion'){
                        input.style.backgroundColor = "lightcoral"
                    } else {
                        input.style.backgroundColor = "white"
                    }
                } else {
                    input.style.backgroundColor = "white"
                }
            },
            disableAutoSelect: false
        });
        return Div
    }
}