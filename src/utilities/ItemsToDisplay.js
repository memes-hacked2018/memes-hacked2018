import TagFunctions from "./TagFunctions";

export default class ItemsToDisplay {

    const ITEMS_TO_RETURN = 50; //

    const MINIMUM_GOOD_ITEMS = 20;
    const ITEM_ZERO_THRESH = 0.1; // if the sum of the tagProbs is less than this it is considered to have no tags

    let tags = null;

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
        return getRating(left) < getRating(right);
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
            } else {
                // less than threshold 
                // check to see if tagProbs are close to 0
                
                const tagProbs = item.getTagProbabilities();
                const reducer = (accum, current) => accum + current;

                const sum = tagProbs.reduce( reducer);
                
                // If an item has a low tagProbs sum then add it
                // it won't be classified as a tag 
                if( sum < ITEM_ZERO_THRESH){
                    goodItems.push( item);
                }

            }
        }

        return goodItems;
    }

    static getAllItems(topicType) {
        return { new Instance()}
    }

    static getExsistingIDs( topicType){
        // return the IDs of the items currently on the stack



    }

    // TODO: pagination, add to stack
    static getItemsToDisplay(userTags, topicType) {

        tags = userTags;

        const items = this.getAllItems(topicType);
        items.sort(this.compareItems());

        // get good items to display
        let toDisplay = this.getGoodItems(items);

        // if the number of good items is less than threshold increase random chance to pick
        let pickRandomChance = 0.05;
        if (goodItems.length < MINIMUM_GOOD_ITEMS) {
            pickRandomChance += (MINIMUM_GOOD_ITEMS - goodItems.length) / (ITEMS_TO_RETURN - goodItems.length);
        }

        // get the decent items and pick the ones to include
        const decentItems = this.getDecentItems(items);

        for (const item of decentItems) {
            if (Math.random() <= pickRandomChance) {
                toDisplay.push(item);
            }
        }

        // get existing IDs and take out any items that are duplicates
        const prevIDs = getExsistingIDs( topicType);

        const filterIDs = (item) => {
            const curID = item.getID();
            const isin = prevIDs.includes( curID);
            return (isin != True); // return the opposite of isin

        }

        const result = toDisplay.filter( filterIDs);



        return toDisplay;
    }




}