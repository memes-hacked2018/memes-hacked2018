export default class User {

    /**
     * Constructs a new User object
     * @param {String} name - the name of the user
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Gets all memes to display on the page
     * @param {integer} pageIndex - the index of the current page
     */
    getMemesToDisplay(pageIndex) {

    }

    getRatings() {
        const map = new Map();
        map.set("Abc", 0.95);
        map.set("IJFAIOWJEO", 0.65);
        map.set("SSS", 0.07);
        map.set("Tag 2", 0.48);
        map.set("Tag 3", 0.51);
        return map;
    }

}