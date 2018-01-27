import TagFunctions from "./TagFunctions";
import Instance from "../models/Instance";

const ITEMS_TO_RETURN = 50;
const MINIMUM_GOOD_ITEMS = 20;
let tags = null;

export default class ItemsToDisplay {

    /**
     * Gets the rating of the specified item
     * @param {Instance} item - the item to get the rating of
     * @returns {number} - the rating of the specified item
     */
    static getRating(item) {

        let rating = 0;

        for (const tag of TagFunctions.getTags(item.getTagProbabilities())) {
            const value = tags.get(tag);
            if (value) {
                rating += value;
            }
        }

        return rating;
    }

    static compareItems(left, right) {

        console.error(left);
        console.error(right);

        const leftRating = this.getRating(left);
        const rightRating = this.getRating(right);

        return leftRating < rightRating;

        //return this.getRating(left) < this.getRating(right);
    }

    static getGoodThreshold(items) {
        return 0.5;
    }

    static getBadThreshold(items) {
        return 0.2;
    }

    static getGoodItems(items) {

        const threshold = this.getGoodThreshold(items);
        const goodItems = [];

        for (const item of items) {
            if (this.getRating(item) >= threshold) {
                goodItems.push(item);
            }
        }

        return goodItems;
    }

    static getDecentItems(items) {
        const goodThreshold = this.getGoodThreshold(items);
        const badThreshold = this.getBadThreshold(items);

        const goodItems = [];

        for (const item of items) {
            const rating = this.getRating(item);
            if (rating < goodThreshold && rating > badThreshold) {
                goodItems.push(item);
            }
        }

        return goodItems;
    }

    static getAllItems(topicType) {
        return [new Instance()];
    }

    // TODO: pagination, add to stack
    static getItemsToDisplay(userTags, topicType) {

        tags = userTags;

        const items = this.getAllItems(topicType);
        items.sort(this.compareItems());

        const toDisplay = this.getGoodItems(items);

        let pickRandomChance = 0.05;
        if (goodItems.length < MINIMUM_GOOD_ITEMS) {
            pickRandomChance += (MINIMUM_GOOD_ITEMS - goodItems.length) / (ITEMS_TO_RETURN - goodItems.length);
        }

        if (Math.random() <= pickRandomChance) {
            const decentItems = this.getDecentItems(items);

            for (const item of decentItems) {
                if (Math.random() <= pickRandomChance) {
                    toDisplay.push(item);
                }
            }

        }

        return toDisplay;
    }

}