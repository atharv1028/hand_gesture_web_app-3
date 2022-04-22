Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
})
camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("snapshot").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}
console.log('ml5.version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_Nd07Tf8-/model.json',modelLoaded);

function modelLoaded()
{
    console.log(' Model Loaded ! ');
}

 function speak()
 {
     var synth = window.speechSynthesis;
     speak_data_1 = "The first prediction is " + prediction_1;
     speak_data_2 = "And the second prediction is " + prediction_2;
     var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
     synth.speak(utterThis);
 }

 function PredictIMG()
 {
     img = document.getElementById('captured_image');
     classifier.classify(img, gotResults);
 }

 function gotResults(error, results)
 {
     if (error)
     {
         console.error(error);
     }else
     {
         console.log(results);
         document.getElementById("result_emotion_name").innerHTML = results[0].label;
         document.getElementById("result_emotion_name2").innerHTML = results[1].label;
         prediction_1 = results[0].label;
         prediction_2 = results[1].label;
         speak();
         if(results[0].label == "thumbsup")
         {
            document.getElementById("update_emotion").innerHTML = "&#128522;";
         }
         if(results[0].label == "nice")
         {
            document.getElementById("update_emotion").innerHTML = "&#128532;";
         }
         if(results[0].label == "thumbsdown")
         {
            document.getElementById("update_emotion").innerHTML = "&#128548;";
         }
         if(results[0].label == "victory")
         {
            document.getElementById("update_emotion").innerHTML = "&#128076;";
         }

         if(results[1].label == "thumbsup")
         {
            document.getElementById("update_emotion2").innerHTML = "&#128522;";
         }
         if(results[1].label == "nice")
         {
            document.getElementById("update_emotion2").innerHTML = "&#128532;";
         }
        if(results[1].label == "thumbsdown")
        {
           document.getElementById("update_emotion2").innerHTML = "&#128548;";
        }
        if(results[0].label == "victory")
        {
            document.getElementById("update_emotion").innerHTML = "&#128076;";
        }
    }
}