const wetherForm = document.querySelector('form');
const address_search = document.getElementById('city');
const country_search = document.getElementById('country');

var messageOne = document.getElementById('message-1');
var messageTwo = document.getElementById('message-2');
wetherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = address_search.value;
    const country = country_search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    if (!address && !country) {
        messageOne.textContent = 'you must provide country & City !';
    } else {
        fetch(`http://localhost:8000/wether?address=${address}&country=${country}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    console.log(data);
                    messageOne.textContent= `Temprature of ${data.region} is ${data.temp_c} degree C'`;
                    messageTwo.textContent=`Temprature of ${data.region} is ${data.temp_f} degree F'`
                }
            })
        })
    }

})