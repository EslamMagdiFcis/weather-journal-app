/* Global Variables */
const APIKey = '&appid={put your api key}&units=imperial'; //&units=metric 
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const generateButton = document.getElementById('generate');

generateButton.addEventListener('click', clickEvent);

function clickEvent(){
    performAction();
}

const performAction = async()=>{
    
    const zipcode = `zip=${document.getElementById('zip').value}`;

    try{
        const data =  await getTemperature(baseURL, zipcode, APIKey);

        newEntry = {
            temperature: data.main.temp,
            date: newDate,
            user:'User'
        }

        postData('/add', newEntry)
        .then(updateUI());
    }catch(error){
        console.log('error', error);    
    }
    
}

const getTemperature = async (baseURL, zipcode, apiKey) =>{

    const endpoint = baseURL + zipcode + apiKey;
    const response = await fetch(endpoint);
    
    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.log('error', error);
    }

}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();

        let newP = document.createElement('p');
        newP.innerHTML = `Date : ${allData.date}`;
        document.getElementById('date').appendChild(newP);

        newP = document.createElement('p');
        newP.innerHTML = `Temperature :${allData.temperature}`;
        document.getElementById('temp').appendChild(newP);

        newP = document.createElement('p');
        newP.innerHTML = `Content : ${document.getElementById('feelings').value}`;
        document.getElementById('content').appendChild(newP);
  
    }catch(error){
        const newP = document.createElement('p');
        newP.innerHTML = 'Sorry, There is an erro on connect API';
        document.getElementById('entryHolder').appendChild(newP);

      console.log("error", error);
    }
  }


// Async POST
const postData = async (url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    try {
        const newData = await response.json();
        return newData
    }catch(error) {
        console.log("error", error);
    }
}
