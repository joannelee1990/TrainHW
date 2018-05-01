var config = {
    apiKey: "AIzaSyC8kcmZtu3Wu48SKA5KncbIUdLLZHcykUc",
    authDomain: "train-scheduler-d8e7c.firebaseapp.com",
    databaseURL: "https://train-scheduler-d8e7c.firebaseio.com",
    projectId: "train-scheduler-d8e7c",
    storageBucket: "train-scheduler-d8e7c.appspot.com",
    messagingSenderId: "606194936919"
};

firebase.initializeApp(config);

var database = firebase.database();
    
    $("#addTrainBtn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
    
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      frequency: trainFreq,
      time: trainTime
    };
    
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.trainDest);
    console.log(newTrain.trainFreq);
    console.log(newTrain.trainTime);
  
    // Alert
    alert("Train successfully added"); 
    
  // Clears all of the text-boxes
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#freq-input").val("");
    $("#time-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
      
        // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFreq = childSnapshot.val().frequency;
    var trainTime = childSnapshot.val().time;
      
        // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(trainTime);

    var now = moment();
    // logs a formatted version of the current time 
    console.log("The current time is " + moment(now).format("HH:mm"));  

    var firstTrainTime = trainTime;

    console.log("The first train is at " + firstTrainTime);

    var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  
    // the difference between time in minutes   
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    
    // the remaining time when time difference is divided by the frequency
    var Remainder = diffTime % trainFreq;
    
    // the remainder is subtracted from the frequency and stored in minutesAway
    var minutesAway = trainFreq - Remainder;
    console.log("The next train is " + minutesAway + " minutes away");
    
    // minutesAway is added to the current time and stored in the nextArrival variable 
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
    console.log("The next train arrives at " + nextArrival);

    $("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>"+ nextArrival + "</td><td>" + minutesAway + "</td></tr>");

});
  
