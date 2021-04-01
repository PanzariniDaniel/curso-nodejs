// console.log(process.env.NODE_ENV)
const fetch = require('node-fetch')

const exceptionKeys = ['url'];

const getPerson = (id) => {
    fetch(`https://swapi.dev/api/people/${id}`)
    .then(response => response.json())
    .then(async person => {

        for(key of Object.keys(person)) {

            if (typeof person[key] !== 'string') {
                const myStrings = [];

                for(url of person[key]) {
                    // const auxPerson = await getData(url);
                    // myStrings.push(auxPerson.title || auxPerson.name);
                    myStrings.push(await findName(url));
                }
                person[key] = myStrings;
            } else {
                if(person[key].includes('http') && !exceptionKeys.includes(key)) {
                    // const auxPerson = await getData(person[key]);
                    // person[key] = auxPerson.title || auxPerson.name;
                    person[key] = await findName(person[key]);
                }
            }
        }

        console.log(person);
    })
    .catch(err => console.error(err))
}

getPerson(3)

async function getData(url) {
    let response = await fetch(url)
    return response.json()
    
}

async function findName(url) {
    const response = await getData(url);
    return response.title || response.name
}
