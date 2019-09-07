
  function predict(){
    const preview = document.querySelector("img");
    let file    = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      preview.width = 227;
      preview.height = 227;
    }

    if (file) {
      reader.readAsDataURL(file); //reads the data as a URL
    } else {
      preview.src = "";
    }

    detectimage(preview)
  }

  function detectimage(input) {

    const result = document.getElementById('result');

  // Load the model.
    cocoSsd.load().then(model => {
    // Classify the image.
      model.detect(input).then(predictions => {
        console.log('Predictions: ');
        console.log(predictions);
        let detectionResult = [];
        let table = `<div class="table-responsive">
                      <table class="table">
                        <tr>
                          <th>Class</th>
                          <th>Location</th>
                        </tr>`;
        for (let i=0; i<predictions.length; i++){
          table += `<tr>
                      <td>${predictions[i].class}</td>
                      <td>${predictions[i].bbox}</td>
                    </tr>`;
        }
        table += `</table>`;
        result.innerHTML = table;
      });
    });
}      