const petrolPriceInput = document.getElementById('petrolPrice');
const litersInput = document.getElementById('liters');
const calculateBtn = document.getElementById('calculateBtn');
const result = document.getElementById('result');
const totalCost = document.getElementById('totalCost');


function calculateTotal() {
    const pricePerLiter = parseFloat(petrolPriceInput.value) || 0;
    const liters = parseFloat(litersInput.value) || 0;
    
    const total = pricePerLiter * liters;
    
    totalCost.textContent = '£' + total.toFixed(2);
    
    result.classList.remove('hidden');
}

calculateBtn.addEventListener('click', calculateTotal);

petrolPriceInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateTotal();
    }
});

litersInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateTotal();
    }
});
