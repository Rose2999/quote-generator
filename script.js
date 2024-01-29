const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes=[];
//Show new Quote
//show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    
    quoteContainer.hidden=false; 
    loader.hidden=true;
}
function newQuote(){
    //Pick a randon quote from apiQuotes array
    loading();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //Check if author field is null
    if(!quote.author){
        authorText.textContent='Unknown';
    }
    else{
        authorText.textContent=quote.author;
    }
 // Check Quote length to determine styling
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    complete();
}
// GET Quotes from API//
async function getQuotes(){
    loading();
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
    const response=await fetch(apiUrl);
    apiQuotes=await response.json();
    newQuote();
    }catch(error){
        
        //Catch error
    }
}
//TWEET Quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent}  -${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
//Event-listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
getQuotes();