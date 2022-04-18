class ProgrammeBuilder {
    constructor(){}

    static ViewNewProgrammeTenue(){
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width: 100%; align-content: start;")
        // Date de la tenue
        let DivDate = NanoXBuild.DivFlexRowStart(null, null, "width: 100%; margin-bottom: 1rem;") 
        conteneur.appendChild(DivDate)
        DivDate.appendChild(NanoXBuild.DivText("Date de la Tenue:", null, "Text", "width: 12rem;"))
        let InputDate = NanoXBuild.Input("", "text", "InputDate", "", "InputDate", "Text", "width: 8rem;")
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
        DivConge.appendChild(NanoXBuild.DivText("En congé:", null, "Text", "width: 12rem;"))
        DivConge.appendChild(NanoXBuild.ToggleSwitch({Id : "Conge", Checked : false, OnChange : null, HeightRem : 2}))

        return conteneur
    }

    static ViewNewProgrammeCod(){
        let conteneur = NanoXBuild.DivFlexColumn(null, null, "width: 100%;")

        return conteneur
    }
}