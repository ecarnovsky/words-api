import { Handler } from '@netlify/functions';
import * as fs from 'fs';

const handler: Handler = async (event, context) => {

    try {

        const url = new URL(event.rawUrl)
        const min = parseInt(url.searchParams.get('min') || '0', 10);
        const max = parseInt(url.searchParams.get('max') || '99', 10);



        const wordsStr = fs.readFileSync('./words.txt', 'utf-8')
        let wordsArray = wordsStr.split('\n');
        if(min !== 0 || max !== 99){
            wordsArray = wordsArray.filter(word =>{
                word = word.replace('\r', '').trim()
                return word.length >= min && word.length <= max
            })
        }
        let randomWord = wordsArray[Math.floor(Math.random() * (wordsArray.length))]
        randomWord = randomWord.replace('\r', '').trim()


        return {
            statusCode: 200,
            body: JSON.stringify({ word: randomWord }),
        }

    } catch (err) {
        console.error('Error reading file:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'There was an error generating a word.' }),
        }
    }
};

export { handler };