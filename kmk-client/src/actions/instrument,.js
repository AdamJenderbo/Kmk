
export const instrumentOptions = [
    {value: 1, text: "Flöjt"}, 
    {value: 2, text: "Klarinett"},
    {value: 3, text: "Saxofon"}, 
    {value: 4, text: "Horn"},
    {value: 5, text: "Eufonium"}, 
    {value: 6, text: "Trombon"},
    {value: 7, text: "Trumpet"}, 
    {value: 8, text: "Tuba"},
    {value: 9, text: "Elbas"}, 
    {value: 10, text: "Slagverk"},
]


export function getInstrumentName(instrument) {
    switch(instrument) {
        case 1:
            return "Flöjt";
        case 2:
            return "Klarinett"
        case 3:
            return "Saxofon";
        case 4:
            return "Horn"
        case 5:
            return "Eufonium";
        case 6:
            return "Trombon"
        case 7:
            return "Trumpet";
        case 8:
            return "Tuba"
        case 9:
            return "Elbas";
        case 10:
            return "Slagverk"
        default:
            return "";
    }
}