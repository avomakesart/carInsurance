// QUOTE CONSTRUCTOR
class Insurance {
    constructor(brand, year, type){
        this.brand = brand;
        this.year = year;
        this.type = type;
    }
    quoteInsurance() {
        /**
         * 
         * 1 = American 1.15
         * 2 = Asian 1.05
         * 3 = European 1.35
         * 
         */
        let quantity;
         const base = 2000;
     
         switch(this.brand) {
             case '1':
             quantity = base * 1.15;
             break;
     
             case '2':
             quantity = base * 1.05;
             break;
     
             case '3':
             quantity = base * 1.35;
             break;
         }
     
         // READ THE YEAR
         const difference = new Date().getFullYear() - this.year;
         // EVERY YEAR WE NEED TO REDUCE 3%THE VALUE FROM THE INSURANCE 
         quantity -= ((difference * 3)* quantity) / 100;
     
         /**
          * if the insurance it's basic its multiply by 30% more
          * if the insurance it's full its multiply by 50% more
          * **/
     
          if (this.type === 'basico') {
              quantity *= 1.30;
          } else {
              quantity *= 1.50;
          }
     
          return quantity;
     }
}




// EVERYTHING THAT ITS SHOWS

class Interface {
 // MESSAGE PRINTED IN THE HTML
    showError(message, type) {
        const div = document.createElement('div');
        
        if(type === 'error') {
            div.classList.add('message', 'error');
        } else {
            div.classList.add('message', 'correct');
        }
        div.innerHTML = `${message}`;
        form.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function() {
            document.querySelector('.message').remove();
        }, 3000);
    }

    // PRINT THE QUOTE RESULT
showResult(insurance, total) {
    const result = document.getElementById('result');
    let brand;
    switch (insurance.brand) {
        case '1':
            brand = 'American';
            break;
    
        case '2':
            brand = 'Asian';
            break;
            
        case '3':
            brand = 'European';
            break;
    }
    // CREATE A DIV
    const div = document.createElement('div');
    // INSERT THE INFORMATION
    div.innerHTML = `
       <p class="header"> Your resume: </p>
       <p><b> Brand: </b> ${brand} </p>
       <p><b> Year:  </b>  ${insurance.year} </p>
       <p><b> Type:  </b>  ${insurance.type} </p>
       <p><b> Total: </b> $ ${total} </p>
    `;
    
    const spinner = document.querySelector('#charging img');
    spinner.style.display = 'block';
    setTimeout(function() {
        spinner.style.display = 'none';
        result.appendChild(div);
    }, 3000); 

    setTimeout(function() {
        Swal.fire(
            '🎉',
            'You got your quote!',
            'success'
          )
    }, 3000);
 
    
 }
 
}



// EVENT LISTENERS

const form = document.getElementById('quote-insurance');

form.addEventListener('submit', function(e) {
   e.preventDefault();
   
   // READ THE BRAND FROM THE SELECT
   const brand = document.getElementById('brand');
   const selectedBrand = brand.options[brand.selectedIndex]
   .value;

   // READ THE YEAR FROM THE SELECT 
   const year = document.getElementById('year');
   const selectedYear = year.options[year.selectedIndex]
   .value;

   // READ THE VALUE FROM THE RADIO
   const type = document.querySelector('input[name="type"]:checked')
   .value;

   // CREATE AND INTERFACE INSTANCE
   const interface = new Interface();

   // REVIEW FIELDS ARE NOT EMPTY
   if (selectedBrand === '' || selectYear === '' || type === '') {

       // INTERFACE PRINTING AN ERROR
       interface.showError('Data incomplete, check the form and try again', 'error');

   } else {
       // CLEAN RESULTS
       const results = document.querySelector('#result div');
       if (results != null) {
           results.remove();
       }

       // INSURANCE INSTANCE
       const insurance = new Insurance(selectedBrand, selectedYear, type);

       // QUOTE THE INSURANCE
       const quantity = insurance.quoteInsurance();
       // SHOW THE RESULT 
       interface.showResult(insurance, quantity);
       interface.showError('Quoting....', 'correct');

   }

});

const max = new Date().getFullYear(),
    min = max - 20;


const selectYear = document.getElementById('year'); 

for(let i = max; i > min; i--) {
   let option = document.createElement('option');
   option.value = i;
   option.innerHTML = i;
   selectYear.appendChild(option);
}