class ProgrammeTenueBuilder {
    constructor(ButtonActionCancel){
        this._ButtonActionCancel = ButtonActionCancel

        this._OrdreDuJour = []
    }

    ViewNewProgrammeTenue({InDate="", InConge=false, InTemple="", InRite="", InRepas="", InSeminaireType="", InSeminaireLocal="", InOrdreDuJour = []}={}){
        this._OrdreDuJour = InOrdreDuJour
        let conteneur = NanoXBuild.Div(null, null, "display: flex; flex-direction: column; width:100%;")
        // Add Titre
        conteneur.appendChild(NanoXBuild.DivText("Nouvelle Tenue", null, "Titre MarginTitre", "text-align: center;"))
        // Date de la tenue
        let DivDate = NanoXBuild.DivFlexRowSpaceAround(null, null, "margin-bottom: 1rem;") 
        conteneur.appendChild(DivDate)
        DivDate.appendChild(NanoXBuild.DivText("Date Tenue:", null, "Text InputLabelWidth", ""))
        let InputDate = NanoXBuild.Input(InDate, "text", "InputDate", "", "InputDate", "Input Text", "width: 12rem;")
        InputDate.setAttribute("inputmode","none")
        DivDate.appendChild(InputDate)
        // https://mymth.github.io/vanillajs-datepicker
        const datepicker = new Datepicker(InputDate, {
            autohide : true,
            daysOfWeekHighlighted : [2],
            format : "dd/mm/yyyy",
            language : "fr",
            todayHighlight : true,
            updateOnBlur : false
        });
        // Congé
        let DivConge = NanoXBuild.DivFlexRowSpaceAround(null, null, "margin-bottom: 1rem;") 
        conteneur.appendChild(DivConge)
        DivConge.appendChild(NanoXBuild.DivText("En congé:", null, "Text InputLabelWidth", ""))
        let DivToogle = NanoXBuild.DivFlexRowEnd(null, null, "width: 12rem;")
        DivConge.appendChild(DivToogle)
        DivToogle.appendChild(NanoXBuild.ToggleSwitch({Id : "Conge", Checked : InConge, OnChange : null, HeightRem : 2}))
        // Temple
        const ListeOfTemple = ["Osiris", "Beauté"]
        conteneur.appendChild(this.BuildInput("Temple:", "InputTemple", InTemple, ListeOfTemple))
        // Rite
        const ListeOfRite = ["Mod", "REAA"]
        conteneur.appendChild(this.BuildInput("Rite:", "InputRite", InRite, ListeOfRite))
        // Repas
        const ListeOfRepas = ["Repas Frat", "Agapes", "Banquet", "Banquet rituel"]
        conteneur.appendChild(this.BuildInput("Repas:", "InputRepas", InRepas, ListeOfRepas))
        // Seminaire type
        const ListeOfTypeSeminaire = ["Pas de séminaire", "Travail", "Instruction"]
        conteneur.appendChild(this.BuildInput("Type séminaire:", "inputSeminaireType", InSeminaireType, ListeOfTypeSeminaire))
        // Seminaire local
        const ListeOfLocalSeminaire = ["Lumière"]
        conteneur.appendChild(this.BuildInput("Local séminaire:", "inputSeminaireLocal", InSeminaireLocal, ListeOfLocalSeminaire))
        // Ordre du jour ToDo
        conteneur.appendChild(NanoXBuild.DivText("Ordre du jour:", null, "SousTitre", "width:100%; margin-bottom: 0.5rem;"))
        let ListeOfOrdreDuJour = NanoXBuild.DivFlexColumn(null, null, "width:100%; margin-bottom: 1rem;")
        conteneur.appendChild(ListeOfOrdreDuJour)
        if(this._OrdreDuJour.length == 0){
            ListeOfOrdreDuJour.appendChild(NanoXBuild.DivText("Pas d'ordre du jour", null, "Text", ""))
        } else {
            // Construire la liste de l'ordre du jour
            this.BuildViewOdjListe()
        }
        conteneur.appendChild(NanoXBuild.Button("Add", this.BuildViewOdjTenueChoice.bind(this), null, "Button MarginButton Text", "width: 6rem; margin-left: auto; margin-right: auto;")) 
        // Save Cancel boutton
        let ConteneurAction = NanoXBuild.DivFlexRowSpaceAround(null, null, "width: 100%; margin-top: 1rem;")
        ConteneurAction.appendChild(NanoXBuild.Button("Save", this.ClickSaveTenue.bind(this), null, "Button MarginButton Text", "width: 6rem;"))
        ConteneurAction.appendChild(NanoXBuild.Button("Cancel", this._ButtonActionCancel, null, "Button MarginButton Text", "width: 6rem;"))
        conteneur.appendChild(ConteneurAction)
        return conteneur
    }

    BuildInput(Titre = "Titre", InputID= "InputId", InitValue = "", ListeOfValue = []){
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

    BuildViewOdjListe(){
        // ToDo
    }

    BuildViewOdjTenueChoice(){
        // Conteneur du popup
        let conteneur = NanoXBuild.DivFlexColumn()
        // Titre du popup
        conteneur.appendChild(NanoXBuild.DivText("Select type of Tenue", null, "SousTitre", "margin-bottom: 1rem;"))
        // Div horizontale du choix des programme
        let DivButtonTypeOfTenue = NanoXBuild.DivFlexRowSpaceAround()
        conteneur. appendChild(DivButtonTypeOfTenue)
        // Boutton Morcheau Architecture
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.MorceauArchitecture(), "Morceau Architecture", this.ClickAddTenueMorceauArchitecture.bind(this)))
        // Boutton Administrative
        DivButtonTypeOfTenue.appendChild(UiComponent.ButtonSvgAndTitre(IconTypeTenue.Administrative(), "Administrative", this.ClickAddTenueAdministrative.bind(this)))
        // ToDo
        
        // Creation du popup
        NanoXBuild.PopupCreate(conteneur)
    }

    ClickAddTenueMorceauArchitecture(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickAddTenueAdministrative(){
        NanoXBuild.PopupDelete()
        alert("ToDo")
    }

    ClickSaveTenue(){
        alert("Save Tenue") // ToDo
        this._ButtonActionCancel()
    }
}