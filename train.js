

// get firebase cdn and add and then do apply it

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBe5_Dpb8F2pO2nDoRFcETGfsUPXMDoUzk",
    authDomain: "trainschedule-137d3.firebaseapp.com",
    databaseURL: "https://trainschedule-137d3.firebaseio.com",
    projectId: "trainschedule-137d3",
    storageBucket: "trainschedule-137d3.appspot.com",
    messagingSenderId: "834637664616"
  };
  firebase.initializeApp(config);

    var trainData = firebase.database();
    

// make function to take in put and append to schedule
$("#add-train").click(function(event) {

    event.preventDefault();

    var train = $("#train-name").val().trim();
    var destination = $("#destination-name").val().trim();
    var startTime = moment($("#first-train").val().trim(), "HH:mm").format("");
    var frequency = $("#frequency").val().trim();

    var firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in Time: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("Minutes Till Train: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var nextTrainConverted = moment(nextTrain).format("HH:mm a");
    // console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));
    console.log(nextTrainConverted);
    console.log(train);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);

    trainData.ref().push({
        train: train,
        destination: destination,
        frequency: frequency,
        nextTrain: nextTrain.format("HH:mm"),
        tMinutesTillTrain: tMinutesTillTrain
    }) ;


});


    trainData.ref().on("child_added", function(snapshot) {

        // var train = snapshot.val().train;
        // var destination = snapshot.val().destination;
        var startTime = snapshot.val().startTime;
        var frequency = snapshot.val().frequency;

        console.log(snapshot.val().train);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().startTime);
        // console.log(snapshot.val().frequency);
        // console.log(snapshot.val().tMinutesTillTrain);
        
        $("#new-train-info").append("<tr class = 'well'><td class = 'train-name'>" + 
        snapshot.val().train +
        "</td><td class = 'destination'>" + snapshot.val().destination +
        "</td><td class = 'frequency'>" + snapshot.val().frequency +
        "</td><td class = 'startTime'>" + snapshot.val().nextTrain +
        "</td><td class = 'tminutesTillTrain'>" + snapshot.val().tMinutesTillTrain + "</td></tr>");


    }), function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    };
