import { Handler } from '@netlify/functions';
import * as fs from 'fs';

const handler: Handler = async (event, context) => {

    try {

        const url = new URL(event.rawUrl)
        const min = parseInt(url.searchParams.get('min') || '0', 10);
        const max = parseInt(url.searchParams.get('max') || '99', 10);
        let numberOfWords = parseInt(url.searchParams.get('number') || '1', 10);

        if (numberOfWords > 30){
            numberOfWords = 30
        }

        let wordsToReturn: string[] = []

        const allWordsStr = fs.readFileSync('./words.txt', 'utf-8')
        console.log(allWordsStr)
        let allWordsArray:  string[] = allWordsStr.split('\r\n');
        if(min !== 0 || max !== 99){
            allWordsArray = allWordsArray.filter(word =>
                word.length >= min && word.length <= max
            )
        }

        allWordsArray = shuffle(allWordsArray)
        
        for(let i = 0; i < numberOfWords; i++){
            let randomWord: string | undefined = allWordsArray.pop()
            if (randomWord !== undefined) {
                wordsToReturn.push(randomWord)
            }
        }



        return {
            statusCode: 200,
            body: JSON.stringify({ words: wordsToReturn }),
        }

    } catch (err) {
        console.error('Error reading file:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'There was an error generating a word.' }),
        }
    }
};

function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

export { handler };