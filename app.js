
// Reference to the Firebase database
const database = firebase.database();

// Function to write data to Firebase
function writeData() {
  const textInput = document.getElementById('textInput');
  const textValue = textInput.value;

  // Push data to Firebase
  database.ref('items').push({
    text: textValue,
    numbers:5678
  });

  textInput.value = ''; // Clear input field after adding data
}

// Function to read data from Firebase
function readData() {
  database.ref('items').on('value', function(snapshot) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // Clear previous data

    snapshot.forEach(function(childSnapshot) {
      console.log('yes2');
      const data = childSnapshot.val();
      const key = childSnapshot.key; // Get the key of the data
      const listItem = document.createElement('li');
      listItem.textContent = data.text;

      // Add delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
        deleteData(key);
      };

      // Add update button
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.onclick = function(e) {
        const newText = prompt('Enter the new text', data.text);
        if (newText === null) {
          return;
        }
        updateData(key, newText);
      };

      listItem.appendChild(deleteButton);
      listItem.appendChild(updateButton);
      dataList.appendChild(listItem);
    });
  });
}

// Function to delete data from Firebase
function deleteData(key) {
  database.ref('items').child(key).remove();
}

// Function to update data in Firebase
function updateData(key, newText) {
  database.ref('items').child(key).update({
    text: newText
  });
}

// Call readData function to initially load data
readData();