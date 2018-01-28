import TagFunctions from "./TagFunctions";
import Instance from "../models/Instance";
import fileFunctions from "./fileFunctions";

const ITEMS_TO_RETURN = 50;
const MINIMUM_GOOD_ITEMS = 20;
let tags = null;
const ITEM_ZERO_THRESH = 0.1; // if the sum of the tagProbs is less than this it is considered to have no tags


/* TODO
    test this stuff
    handle when there is a tag that the user does not have a rating for
    add the return array to the stack of the memes
    write the function that makes the API call and handle its request 

*/




export default class ItemsToDisplay {

    /**
     * Gets the rating of the specified item
     * @param {Instance} item - the item to get the rating of
     * @returns {number} - the rating of the specified item
     */
    static getRating(item) {

        /*
        let rating = 0;
        
        for (const tag of TagFunctions.getTags(item.getTagProbabilities())) {
            const value = tags.get(tag);
            if (value) {
                rating += value;
            }
        }
        
        return rating;
        */

        const ITPdict = item.getTagProbabilities(); // TODO make this function (Item Tag probability)
        const UTSdict = getUserTagScores();         // TODO make this funciton (User Tag scores)

        return compareDicts( ITPdict, UTS);

    }


    static compareItems(left, right) {

        const leftRating = this.getRating(left);
        const rightRating = this.getRating(right);

        if (leftRating < rightRating) {
            return -1;
        } else if (leftRating > rightRating) {
            return 1;
        }

        return 0;
    }

    static standardDeviation(numbers) {

        let total = 0;
        for (const key of numbers) {
            total += key;
        }

        const mean = total / numbers.length;

        let sd = 0;

        for (const key of numbers) {
            sd += Math.pow(key - mean, 2);
        }
        
        return Math.sqrt(sd/numbers.length);
    }

    static getGoodThreshold(items) {
        const values = items.map((item) => ItemsToDisplay.getRating(item));
        let mean = 0;

        for (const value of values) {
            mean += value;
        }

        if (values.length != 0) {
            mean /= values.length;
        }

        return mean + (this.standardDeviation(values) / 2);
    }

    static getBadThreshold(items) {
        const values = items.map((item) => ItemsToDisplay.getRating(item));
        let mean = 0;

        for (const value of values) {
            mean += value;
        }

        if (values.length != 0) {
            mean /= values.length;
        }

        return mean - (this.standardDeviation(values) / 2);
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

    static compareDicts( d1, d2){
        // d1 item tag probs  ITP
        // d2 user tag scores UTS
        let rating = 0;

        for( let key in d1){
            // loop through the dictionary of ITP

            // TODO any keys that don't show up in the UTS need to be added and
            // set to the starting value
            if( !( key in d2)){
                // tag is not in UTS
                // TODO add it
            }

            rating += d1[key] * d2[key];

        }
        
        return rating;

    }

    // TODO: get all items from database
    // Probs need to change up how the tags:probabilities work
    static getAllItems(topicType) {
        return [new Instance()];

        /* receive json with structure
        
        items{
            1 {
                id
                url
                dict{
                    tagID:prob
                }
            }
            2{
                
            }
        }
        */ 

    

    }

    /**
     * Gets all existing items that the user has seen
     * @param {String} topicType - the topic's unique type
     * @return the unique IDs of all existing items the user has seen
     */
    static getExistingIDs(topicType) {
        return fileFunctions.readFile(topicType);
    }

    static writeNextIDs( topicType, data){
        fileFunctions.writeFile( topicType, nextIDs); //overwrite prev IDs with old + new IDs
    }

    // TODO: add to stack
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
        const prevIDs = this.getExistingIDs(topicType); // array of IDs


        const filterIDs = (item) => {
            const curID = item.getID();
            const isin = prevIDs.includes(curID);
            return (isin != True); // return the opposite of isin

        }

        const result = toDisplay.filter(filterIDs);

        const newIDs = result.map( (item) => {
            return item.getID();
        })

        const nextIDs = prevIDs.concat( newIDs);
        this.writeNextIDs( topicType, nextIDs);


        return result; // TODO put this array on the stack of items for the user to see
    }

}