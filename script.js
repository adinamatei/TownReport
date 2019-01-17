/*
Coding challenge

Suppose that you're working in a small town administration and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At the end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (formula: number of trees/park area)
2. Average age of each town's park (formula: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. if the size is unknown, the default is normal

All the report data should be printed to the console, like this:
----PARKS REPORT-----
Our 3 parks have a average age of 71.33333333333333 years.
Green Park has a tree density of 1075 trees per square km.
National Park has a tree density of 1221.0344827586207 trees per square km.
Oak Park has a tree density of 2372.5 trees per square km.
National Park has more than 1000 trees.
----STREETS REPORT-----
Our 4 streets have a total length of 7.10000000000005 km, with an average of 1.77500000000001 km.
Ocean Avenue, built in 1999, is a big street.
Evergreen Street, built in 2008, is a small street.
4th Street, built in 2015, is a normal street.
Sunset Boulevard, built in 1982, is a huge street.

HINT: Use some of the ES6 feature: classes, subclasses, template, default parameters, maps, arrow function, destructuring, etc.
 */

class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, treeNum, parkArea) {
        super(name, buildYear);
        this.treeNum = treeNum;
        this.parkArea = parkArea;
    }
    treeDensity() {
        const calcDensity = this.treeNum/this.parkArea;
        console.log(`${this.name} has a tree density of ${calcDensity} trees per square km.`);
    }
}


class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');

        console.log(`${this.name}, built in ${this.buildYear}, is a ${classification.get(this.size)} street.`)
    }
}


const park1 = new Park('Green Park', 1965,475, 0.3);
const park2 = new Park('National Park', 1930, 3105, 2.7);
const park3 = new Park('Oak Park', 1980, 1750, 0.6);

const street1 = new Street('Ocean Avenue', 1999, 1.2, 4);
const street2 = new Street('Evergreen Street', 2008, 2.1, 2);
const street3 = new Street('4th Street', 2015, 0.9);
const street4 = new Street('Sunset Boulevard', 1982, 2.8, 5);


const parks = [park1, park2, park3];
const streets = [street1, street2, street3, street4];


function calc(arr) {
    let sum = 0;
    const len = arr.length;

    arr.forEach(el => sum = sum + el);

    return [sum, sum/len];

}


function parksReport(prk) {

    console.log(`----PARKS REPORT-----`);
    // Density
    prk.forEach(el => el.treeDensity());

    // Average age
    const ages = prk.map(el => new Date().getFullYear() - el.buildYear);
    const[totalAge, avrAge] = calc(ages);
    console.log(`Our ${prk.length} parks have a average age of ${avrAge} years.`);

    // Which park has more than 1000 trees
    const i = prk.map(el => el.treeNum).findIndex(el => el >= 1000);
    console.log(`${prk[i].name} has more than 1000 trees.`);
}


function streetsReport(str) {

    console.log(`----STREETS REPORT-----`);

    //Total and average length of the town's streets
    const lng = str.map(el => el.length);
    const[totalLength, avrLength] = calc(lng);
    console.log(`Our ${str.length} have a total length of ${totalLength} km, with an average of ${avrLength} km.`);

    // Classify sizes
    str.forEach(el => el.classifyStreet());
}

parksReport(parks);
streetsReport(streets);