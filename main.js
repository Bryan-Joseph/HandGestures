Webcam.set({
    width: 309,
    height: 259,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach('#camera');

function takeSnap() {
    Webcam.snap(img => {
        document.getElementById('result').innerHTML = `<img id="capturedImage" src="${img}">`;
    });
}

console.log(`ml5 version : ${ml5.version}`);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6zQLskn7H/model.json', modelLoaded);

function modelLoaded() {
    console.log('model succesfully loaded');
}

function check() {
    var img = document.getElementById('capturedImage');
    classifier.classify(img, afterClassification);
}

function afterClassification(error, result) {
    if (error) {
        console.error(`An Error occured : ${error}`);
    }else {
        console.log(result);
        var gesture = result[0].label;
        var confidence = ((result[0].confidence) * 100).toFixed(2);
        console.log(`confidence : ${confidence}`);

        console.log(`gesture : ${gesture}`);
        
        document.getElementById('result_gesture_name').innerHTML = gesture;
        document.getElementById('result_gesture_confidence').innerHTML = confidence + '%';

        if (gesture == 'amazing') {
            document.getElementById('result_gesture').innerHTML = '👌';
        } else if (gesture == 'yo') {
            document.getElementById('result_gesture').innerHTML = '🤟';
        } else if (gesture == 'thumbs up') {
            document.getElementById('result_gesture').innerHTML = '👍';
        } else if (gesture == 'thumbs down') {
            document.getElementById('result_gesture').innerHTML = '👎';
        } else if (gesture == 'victory') {
            document.getElementById('result_gesture').innerHTML = '✌';
        }
    }

}

