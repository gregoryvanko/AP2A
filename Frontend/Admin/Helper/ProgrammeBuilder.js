class ProgrammeBuilder {
    constructor(){}

    static ViewNewProgrammeTenue({InDate="", InConge=false, InTemple="", InRite="", InRepas="", InSeminaireType="", InSeminaireLocal=""}={}){
        let conteneur = NanoXBuild.DivFlexColumn()
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
        conteneur.appendChild(ProgrammeBuilder.BuildInput("Temple:", "InputTemple", InTemple, ListeOfTemple))
        // Rite
        const ListeOfRite = ["Mod", "REAA"]
        conteneur.appendChild(ProgrammeBuilder.BuildInput("Rite:", "InputRite", InRite, ListeOfRite))
        // Repas
        const ListeOfRepas = ["Repas Frat", "Agapes", "Banquet", "Banquet rituel"]
        conteneur.appendChild(ProgrammeBuilder.BuildInput("Repas:", "InputRepas", InRepas, ListeOfRepas))
        // Seminaire type
        const ListeOfTypeSeminaire = ["Pas de séminaire", "Travail", "Instruction"]
        conteneur.appendChild(ProgrammeBuilder.BuildInput("Type séminaire:", "inputSeminaireType", InSeminaireType, ListeOfTypeSeminaire))
        // Seminaire local
        const ListeOfLocalSeminaire = ["Lumière"]
        conteneur.appendChild(ProgrammeBuilder.BuildInput("Local séminaire:", "inputSeminaireLocal", InSeminaireLocal, ListeOfLocalSeminaire))
        // Ordre du jour
        // ToDo
        return conteneur
    }

    static BuildInput(Titre = "Titre", InputID= "InputId", InitValue = "", ListeOfValue = []){
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

    static ViewNewProgrammeCod(){
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width: 100%;")

        return conteneur
    }
}