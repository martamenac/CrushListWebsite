document.addEventListener('DOMContentLoaded', () => {
    const textFields = document.querySelectorAll('.text-field');
    const checkboxes = document.querySelectorAll('.complete-checkbox');

    // Load saved data from localStorage
    textFields.forEach((textField, index) => {
        const savedText = localStorage.getItem(`textField-${index}`);
        const isCompleted = localStorage.getItem(`completed-${index}`) === 'true';

        if (savedText) {
            textField.value = savedText;
        }

        if (isCompleted) {
            textField.classList.add('completed');
            textField.setAttribute('disabled', 'true');
            checkboxes[index].checked = true;
        }
    });

    // Add event listeners to checkboxes and text fields
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', (event) => {
            const textField = textFields[index];
            if (event.target.checked) {
                textField.classList.add('completed', 'completed-effect');
                textField.setAttribute('disabled', 'true');
                localStorage.setItem(`completed-${index}`, 'true');
                setTimeout(() => {
                    textField.classList.remove('completed-effect');
                }, 500); // Duration of the animation
            } else {
                textField.classList.remove('completed');
                textField.removeAttribute('disabled');
                localStorage.setItem(`completed-${index}`, 'false');
            }
        });
    });

    textFields.forEach((textField, index) => {
        textField.addEventListener('input', () => {
            localStorage.setItem(`textField-${index}`, textField.value);
        });
    });
});