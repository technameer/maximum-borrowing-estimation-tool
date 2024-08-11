document.getElementById('calculate-button').addEventListener('click', function() {
    // Get input values
    const itemPrice = parseFloat(document.getElementById('item-price').value);
    const downPayment = parseFloat(document.getElementById('down-payment').value);
    const duration = parseInt(document.getElementById('duration').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);

    // Validate inputs
    if (isNaN(itemPrice) || isNaN(downPayment) || isNaN(duration) || isNaN(interestRate)) {
        alert('Please enter valid values in all fields.');
        return;
    }

    // Calculate loan amount
    const loanAmount = itemPrice - downPayment;

    // Calculate monthly interest rate
    const monthlyInterestRate = interestRate / 100 / 12;

    // Calculate monthly payment using the formula for an amortizing loan
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -duration));

    // Update result
    document.getElementById('monthly-payment').textContent = monthlyPayment.toFixed(2);
});
