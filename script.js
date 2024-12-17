// Array to store submitted form data
const foodItems = [];

// Function to handle the form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting (page refresh)

    // Get values from the form
    const foodId = generateFoodId(); // Call the function to generate an ID
    const foodName = document.getElementById('food-name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    // Add the form data to the foodItems array
    foodItems.push({
        "Food ID": foodId,
        "Food Name": foodName,
        "Category": category,
        "Price": price,
        "Description": description
    });

    // Log the updated array as a table in the console
    console.clear(); // Clears previous console output for better visibility
    console.table(foodItems);

    // Reset the form fields
    document.querySelector('form').reset();
}

// Function to generate a unique food ID
let foodCounter = 1000; // Start from 1000 and increment
function generateFoodId() {
    return foodCounter++;
}

// Attach the form submission handler to the form
document.querySelector('form').addEventListener('submit', handleSubmit);
