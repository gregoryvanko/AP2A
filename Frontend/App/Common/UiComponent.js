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
    static InputWithTitreAndListeOfValue(Titre = "Titre", InputID= "InputId", InitValue = "", ListeOfValue = [], Width = "10rem"){
        let Div = NanoXBuild.DivFlexRowSpaceAround(null, null, "margin-bottom: 1rem; justify-content: space-between; width: 100%;") 
        Div.appendChild(NanoXBuild.DivText(Titre, null, "Text InputLabelWidth", ""))
        let Myinput = NanoXBuild.Input(InitValue, "text", InputID, "", InputID, "Input Text", `width: ${Width}; text-align: right;`)
        Myinput.autocomplete = "off"
        Myinput.setAttribute("inputmode","none")
        Myinput.setAttribute ("onfocus" , "this.value = ''; ")
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
                container.style.textAlign = "right"
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

    /**
     * Construit un Div contentant in Input, son titre, et sa liste de valeur
     * @param {String} Titre Titre de l'input
     * @param {String} InputID Id de l'input
     * @param {String} InitValue Valeur intitial de l'input
     * @returns HtmlElement Div
     */
     static InputWithTitre(Titre = "Titre", InputID= "InputId", InitValue = "", Width = "10rem"){
        let Div = NanoXBuild.DivFlexRowSpaceAround(null, null, "margin-bottom: 1rem; justify-content: space-between; width:100%;") 
        Div.appendChild(NanoXBuild.DivText(Titre, null, "Text InputLabelWidth", ""))
        let Myinput = NanoXBuild.Input(InitValue, "text", InputID, "", InputID, "Input Text", `max-width: ${Width}; width:100%; text-align: right;`)
        Myinput.autocomplete = "off"
        Myinput.setAttribute("inputmode","none")
        Div.appendChild(Myinput)
        return Div
    }

    /**
     * Construit un Div contentant in Input, son titre, et sa liste de valeur
     * @param {String} Titre Titre de l'input
     * @param {String} InputID Id de l'input
     * @param {String} InitValue Valeur intitial de l'input
     * @param {String} Width Largeur de l'input
     * @param {Function} OnChangeToogle Fonction a executer lors du changement du toogle
     * @param {Number} HeightRem Hauteur en rem du toogle
     * @returns HtmlElement Div
     */
     static InputWithToogle(Titre = "Titre", InputID= "InputId", InitValue = false, OnChangeToogle = null, HeightRem = 2){
        let Div = NanoXBuild.DivFlexRowSpaceAround(null, null, "margin-bottom: 1rem; justify-content: space-between; width: 100%;") 
        Div.appendChild(NanoXBuild.DivText(Titre, null, "Text InputLabelWidth", ""))
        let DivToogle = NanoXBuild.DivFlexRowEnd(null, null, null)
        Div.appendChild(DivToogle)
        DivToogle.appendChild(NanoXBuild.ToggleSwitch({Id : InputID, Checked : InitValue, OnChange : OnChangeToogle, HeightRem : HeightRem}))
        return Div
    }
}