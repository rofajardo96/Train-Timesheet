


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBtBTQMysdl41MBvDS6DSdeGCUVLKDge-I",
  authDomain: "train2-1ca26.firebaseapp.com",
  databaseURL: "https://train2-1ca26.firebaseio.com",
  projectId: "train2-1ca26",
  storageBucket: "train2-1ca26.appspot.com"
};
firebase.initializeApp(config);

// Variable for database ref
var database = firebase.database();

// Add Train Button
$('#addTrnBtn').on("click", function(){

	//Take user input
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTrain = $('#firstTrainInput').val().trim();
	var frequency = $('#frequencyInput').val().trim();

	// Holding the train data
	var newTrain = {
		name: trainName,
		dest: destination,
		first: firstTrain,
		freq: frequency
	}

	//Taking the data and pushing to the database
	database.ref().push(newTrain);

	

	// Clearing the values for each of the inputs
	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#firstTrainInput').val("");
	$('#frequencyInput').val("");

	return false;
});

// Addings trains to the firebase and adds the values to the html row set up at bottom of this page
database.ref().on("child_added", function(childSnapshot){
	


	// Store everything into a variable
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().dest;
	var firstTrain = childSnapshot.val().first;
	var frequency = childSnapshot.val().freq;

	// Train inf

	//First time
	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
	

	// Current time
	var currentTime = moment();
	

	// Difference between times
	var diffInTime = moment().diff(moment(firstTimeConverted), "minutes");
	

	// Time apart (remainder)
	var tRemainder = diffInTime % frequency;
	

	// Mins until train
	var tMinsUntilTrain = frequency - tRemainder;
	

	// Variable for next train time
	var nextTrain = moment().add(tMinsUntilTrain, "minutes").format("hh:mm");
	


	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinsUntilTrain + "</td></tr>");

});


 

