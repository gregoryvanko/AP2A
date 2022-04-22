class ProgrammeBuilder {
    constructor(){}

    static ViewNewProgrammeTenue({InDate = "", InConge = false, InTemple = "", InRite = "", InRepas = "" }={}){
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width: 100%; align-content: start;")
        // Date de la tenue
        let DivDate = NanoXBuild.DivFlexRowStart(null, null, "width: 100%; margin-bottom: 1rem;") 
        conteneur.appendChild(DivDate)
        DivDate.appendChild(NanoXBuild.DivText("Date de la Tenue:", null, "Text InputLabelWidth", ""))
        let InputDate = NanoXBuild.Input(InDate, "text", "InputDate", "", "InputDate", "Input Text", "width: 10rem;")
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
        let DivConge = NanoXBuild.DivFlexRowStart(null, null, "width: 100%; margin-bottom: 1rem;") 
        conteneur.appendChild(DivConge)
        DivConge.appendChild(NanoXBuild.DivText("En congé:", null, "Text InputLabelWidth", ""))
        DivConge.appendChild(NanoXBuild.ToggleSwitch({Id : "Conge", Checked : InConge, OnChange : null, HeightRem : 2}))
        // Temple
        const ListeOfTemple = ["Osiris", "Beauté"]
        let DivTemple = NanoXBuild.DivFlexRowStart(null, null, "width: 100%; margin-bottom: 1rem;") 
        conteneur.appendChild(DivTemple)
        DivTemple.appendChild(NanoXBuild.DivText("Temple:", null, "Text InputLabelWidth", ""))
        let inputtemple = NanoXBuild.Input(InTemple, "text", "InputTemple", "", "InputTemple", "Input Text", "width: 10rem")
        inputtemple.autocomplete = "off"
        inputtemple.setAttribute("inputmode","none")
        DivTemple.appendChild(inputtemple)
        autocomplete({
            input: inputtemple,
            minLength: 0,
            showOnFocus: true,
            //debounceWaitMs: 200,
            emptyMsg: 'No suggestion',
            fetch: function(text, update) {
                text = text.toLowerCase();
                var GroupFiltred = ListeOfTemple.filter(n => n.toLowerCase().startsWith(text))
                var suggestions = []
                GroupFiltred.forEach(element => {
                    var MyObject = new Object()
                    MyObject.label = element
                    suggestions.push(MyObject)
                });
                update(suggestions);
            },
            onSelect: function(item) {
                document.getElementById("InputTemple").value = item.label;
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
        // Rite
        const ListeOfRite = ["Mod", "REAA"]
        let DivRite = NanoXBuild.DivFlexRowStart(null, null, "width: 100%; margin-bottom: 1rem;") 
        conteneur.appendChild(DivRite)
        DivRite.appendChild(NanoXBuild.DivText("Rite:", null, "Text InputLabelWidth", ""))
        let inputrite = NanoXBuild.Input(InRite, "text", "InputRite", "", "InputRite", "Input Text", "width: 10rem")
        inputrite.autocomplete = "off"
        inputrite.setAttribute("inputmode","none")
        DivRite.appendChild(inputrite)
        autocomplete({
            input: inputrite,
            minLength: 0,
            showOnFocus: true,
            //debounceWaitMs: 200,
            emptyMsg: 'No suggestion',
            fetch: function(text, update) {
                text = text.toLowerCase();
                var GroupFiltred = ListeOfRite.filter(n => n.toLowerCase().startsWith(text))
                var suggestions = []
                GroupFiltred.forEach(element => {
                    var MyObject = new Object()
                    MyObject.label = element
                    suggestions.push(MyObject)
                });
                update(suggestions);
            },
            onSelect: function(item) {
                document.getElementById("InputRite").value = item.label;
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
        // Repas
        const ListeOfRepas = ["Repas Frat", "Agapes", "Banquet", "Banquet rituel"]
        let DivRepas = NanoXBuild.DivFlexRowStart(null, null, "width: 100%; margin-bottom: 1rem;") 
        conteneur.appendChild(DivRepas)
        DivRepas.appendChild(NanoXBuild.DivText("Repas:", null, "Text InputLabelWidth", ""))
        let inputrepas = NanoXBuild.Input(InRepas, "text", "InputRepas", "", "InputRepas", "Input Text", "width: 10rem")
        inputrepas.autocomplete = "off"
        inputrepas.setAttribute("inputmode","none")
        DivRepas.appendChild(inputrepas)
        autocomplete({
            input: inputrepas,
            minLength: 0,
            showOnFocus: true,
            //debounceWaitMs: 200,
            emptyMsg: 'No suggestion',
            fetch: function(text, update) {
                text = text.toLowerCase();
                var GroupFiltred = ListeOfRepas.filter(n => n.toLowerCase().startsWith(text))
                var suggestions = []
                GroupFiltred.forEach(element => {
                    var MyObject = new Object()
                    MyObject.label = element
                    suggestions.push(MyObject)
                });
                update(suggestions);
            },
            onSelect: function(item) {
                document.getElementById("InputRepas").value = item.label;
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
        // Ordre du jour
        // ToDo
        return conteneur
    }

    static ViewNewProgrammeCod(){
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width: 100%;")

        return conteneur
    }
}