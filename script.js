// Function to initialize the list
function initList() {
    const listContainerLeft = document.getElementById('list-left');
    const listContainerRight = document.getElementById('list-right');
    
    for (let i = 1; i <= 30; i++) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${i}`;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `text-${i}`;
        
        // Retrieve the saved state from localStorage, if available
        const savedState = localStorage.getItem(`item-${i}`);
        if (savedState) {
            const { text, checked } = JSON.parse(savedState);
            input.value = text;
            checkbox.checked = checked;
        }
        
        // Save state to localStorage when input or checkbox value changes
        input.addEventListener('input', saveState);
        checkbox.addEventListener('change', saveState);

        const counterValue = i < 10 ? `0${i}` : `${i}`;
        li.style.counterReset = `my-counter ${counterValue}`;

        li.appendChild(input);
        li.appendChild(checkbox);

        if (i <= 15) {
            listContainerLeft.appendChild(li);
        } else {
            listContainerRight.appendChild(li);
        }
        
        
        listContainerLeft.appendChild(li);
        if(i > 15){
            listContainerRight.appendChild(li);
        }
    }
}

// Function to save the state of an item to localStorage
function saveState() {
    const id = this.id.split('-')[1]; // Extract the item number from the ID
    const text = document.getElementById(`text-${id}`).value;
    const checked = document.getElementById(`checkbox-${id}`).checked;
    
    const state = { text, checked };
    localStorage.setItem(`item-${id}`, JSON.stringify(state));
}

// Initialize the list when the page loads
window.addEventListener('load', initList);