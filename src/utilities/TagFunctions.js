export default class TagFunctions {

    static getTags(probabilities) {
        const tags = [];

        probabilities.forEach((value, key) => {
           if (Math.random() <= key) {
               tags.push(value);
           }
        });

        return tags;
    }

}