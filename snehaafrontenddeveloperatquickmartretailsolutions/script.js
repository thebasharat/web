document.addEventListener('DOMContentLoaded', function () {

    const itemCheckboxes = document.querySelectorAll('input[type="checkbox"].item-checkbox');
    const paymentRadios = document.querySelectorAll('input[type="radio"][name="paymentMethod"]');
    const paymentDisplay = document.getElementById('paymentDisplay');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBillBtn = document.getElementById('resetBillBtn');
    const totalAmountEl = document.getElementById('totalAmount');
    const discountAmountEl = document.getElementById('discountAmount');
    const finalAmountEl = document.getElementById('finalAmount');
    const itemSummaryEl = document.getElementById('itemSummary');
  
    // Discount rates by payment method
    const discountRates = {
      cash: 0,
      card: 0.05,
      upi: 0.10
    };
  
    // Update payment display whenever a payment radio is selected
    paymentRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        // while loop to find the currently selected payment method
        let index = 0;
        let selectedValue = 'None';
        while (index < paymentRadios.length) {
          if (paymentRadios[index].checked) {
            selectedValue = paymentRadios[index].value;
            break;
          }
          index++;
        }
        paymentDisplay.textContent = 'Selected Payment: ' + selectedValue;
      });
    });
  
    function getSelectedPaymentMethod() {
      let index = 0;
      let selectedValue = null;
      while (index < paymentRadios.length) {
        if (paymentRadios[index].checked) {
          selectedValue = paymentRadios[index].value;
          break;
        }
        index++;
      }
      return selectedValue;
    }
  
    function calculateBill() {
      // for loop to iterate items and compute total price
      let total = 0;
      const selectedItems = [];
      for (let i = 0; i < itemCheckboxes.length; i++) {
        if (itemCheckboxes[i].checked) {
          const price = parseFloat(itemCheckboxes[i].getAttribute('data-price')) || 0;
          total += price;
          selectedItems.push({
            name: itemCheckboxes[i].getAttribute('data-name') || itemCheckboxes[i].id,
            price: price
          });
        }
      }
  
      const paymentMethod = getSelectedPaymentMethod();
      const rate = discountRates[paymentMethod] || 0;
      const discount = parseFloat((total * rate).toFixed(2));
      const finalAmount = parseFloat((total - discount).toFixed(2));
  
      totalAmountEl.textContent = total;
      discountAmountEl.textContent = discount;
      finalAmountEl.textContent = finalAmount;
  
      // do...while loop to build the item summary list
      itemSummaryEl.innerHTML = '';
      if (selectedItems.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'None';
        itemSummaryEl.appendChild(li);
      } else {
        let idx = 0;
        do {
          const item = selectedItems[idx];
          const li = document.createElement('li');
          li.textContent = item.name + ' — Rs.' + item.price;
          itemSummaryEl.appendChild(li);
          idx++;
        } while (idx < selectedItems.length);
      }
    }
  
    function resetBill() {
      itemCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
      paymentRadios.forEach(function (radio) {
        radio.checked = false;
      });
      paymentDisplay.textContent = 'Selected Payment: None';
      totalAmountEl.textContent = '0';
      discountAmountEl.textContent = '0';
      finalAmountEl.textContent = '0';
      itemSummaryEl.innerHTML = '';
      const li = document.createElement('li');
      li.textContent = 'None';
      itemSummaryEl.appendChild(li);
    }
  
    calculateBtn.addEventListener('click', calculateBill);
    resetBillBtn.addEventListener('click', resetBill);
  
  });