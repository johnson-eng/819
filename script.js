// script.js
document.addEventListener('DOMContentLoaded', () => {
    const medicineForm = document.getElementById('medicineForm');
    const medicineTable = document.getElementById('medicineTable').getElementsByTagName('tbody')[0];
    let editIndex = -1;

    let medicines = JSON.parse(localStorage.getItem('medicines')) || [];

    function renderMedicines() {
        medicineTable.innerHTML = '';
        medicines.forEach((medicine, index) => {
            const row = medicineTable.insertRow();
            row.insertCell(0).textContent = medicine.name;
            row.insertCell(1).textContent = medicine.number;
            row.insertCell(2).textContent = medicine.quantity;
            row.insertCell(3).textContent = medicine.price;
            row.insertCell(4).textContent = medicine.expiryDate;
            row.insertCell(5).textContent = medicine.manufacturer;
            row.insertCell(6).textContent = medicine.quantity * medicine.price;
            const actionsCell = row.insertCell(7);
            
            const editButton = document.createElement('button');
            editButton.textContent = 'تعديل';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => {
                document.getElementById('medicineName').value = medicine.name;
                document.getElementById('medicineNumber').value = medicine.number;
                document.getElementById('medicineQuantity').value = medicine.quantity;
                document.getElementById('medicinePrice').value = medicine.price;
                document.getElementById('expiryDate').value = medicine.expiryDate;
                document.getElementById('manufacturer').value = medicine.manufacturer;
                editIndex = index;
                document.querySelector('button[type="submit"]').textContent = 'تحديث الدواء';
            });
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'حذف';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => {
                medicines.splice(index, 1);
                localStorage.setItem('medicines', JSON.stringify(medicines));
                renderMedicines();
            });
            actionsCell.appendChild(deleteButton);
        });
    }

    medicineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('medicineName').value;
        const number = document.getElementById('medicineNumber').value;
        const quantity = parseInt(document.getElementById('medicineQuantity').value);
        const price = parseFloat(document.getElementById('medicinePrice').value);
        const expiryDate = document.getElementById('expiryDate').value;
        const manufacturer = document.getElementById('manufacturer').value;

        const newMedicine = { name, number, quantity, price, expiryDate, manufacturer };

        if (editIndex === -1) {
            medicines.push(newMedicine);
        } else {
            medicines[editIndex] = newMedicine;
            editIndex = -1;
            document.querySelector('button[type="submit"]').textContent = 'إضافة الدواء';
        }

        localStorage.setItem('medicines', JSON.stringify(medicines));
        renderMedicines();
        medicineForm.reset();
    });

    renderMedicines();
});
