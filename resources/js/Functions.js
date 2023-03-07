export default class Functions {
    /**
     * creates an html element
     * 
     * @param {string} tag 
     * @param {string} className 
     * @param {HTMLElement} parent 
     * @param {string} inner 
     * 
     * @returns {HTMLElement}
     */

    createHTMLElement(tag, className, parent, inner = '') {
        let element = document.createElement(tag)
        element.className = className
        parent.appendChild(element)

        if (inner !== null){
            element.innerHTML = inner;
        }
        return element;
    }
}