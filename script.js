const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}



video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    var checkBox1 = document.getElementById("btn-box");
    var checkBox2 = document.getElementById("btn-face");
    var checkBox3 = document.getElementById("btn-expr");
    
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    if (checkBox1.checked == true) {
      faceapi.draw.drawDetections(canvas, resizedDetections)
    }
    if (checkBox2.checked == true) {
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    }
    if (checkBox3.checked == true) {
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }
  }, 100)
})