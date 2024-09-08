/**
 * Returnerar an array of all naturally tabable elements
 * @param {*} element
 * @returns {Array}
 */
export function getAllFocusableElements(element) {
    if( !element ) return;
    //TODO: fixa så att tabIndex="-1" inte listas
    const notAdd = ":not([disabled])";
    const filter = [
        "[tabindex=\"0\"]",
        "a[href]",
        "button",
        "textarea",
        "input[type=\"text\"]",
        "input[type=\"radio\"]",
        "input[type=\"checkbox\"]",
        "select",
    ].join(`${notAdd}, `) + notAdd;
    return element.querySelectorAll(filter);
}