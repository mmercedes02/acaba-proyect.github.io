// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCR5hQAYNMKouHLYyOygvEEY6dX9WUSxJg",
    authDomain: "acaba-infotep.firebaseapp.com",
    databaseURL: "https://acaba-infotep-default-rtdb.firebaseio.com",
    projectId: "acaba-infotep",
    storageBucket: "acaba-infotep.appspot.com",
    messagingSenderId: "1082030107993",
    appId: "1:1082030107993:web:88951c347cbd0c85c03048",
    measurementId: "G-4NWQT62586"
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase
const analytics = getAnalytics(app);
const db = getDatabase(app);
const starCountRef = ref(db, 'Sensores');
const sensorPlaceHolder =
    `
            <div class="col-auto">
                <div class="item-trash small p-2 mx-2 my-4">
                    <h2 class="data-title h5">{Nombre}</h2>
                    <div class="data-batery text-secondary d-flex gap-1 justify-content-center mt-3 mb-3 text-center align-items-center">
                        <span class="material-symbols-outlined">battery_horiz_075</span>
                        <span class="small">{Batteria}%</span>
                    </div>
                    <div class="box-sensors d-flex h-100 small sensors fw-bold justify-content-betwen align-items-center text-center">
                        <div class="w-50 data-sensor-1">
                            <div class="bar-sensor small d-grid">
                                {Sensor1}
                                <span class="material-symbols-outlined">sensors</span>
                                <span class="small">1</span>
                            </div>
                        </div>
                        <div class="w-50 data-sensor-2">
                            <div class="bar-sensor small d-grid">
                                {Sensor2}
                                <span class="material-symbols-outlined">sensors</span>
                                <span class="small">2</span>
                            </div>
                        </div>
                    </div>
                    <div class="data-ip text-muted small shadow rounded w-100 text-center mt-3">{IPAdd}</div>

                </div>
            </div>
            `
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                let sensorsHtml = '';
                for (let i in data) {
                    const sensor = data[i];
                    let sensorHtml = sensorPlaceHolder;
                    for (let k in sensor) {
                        sensorHtml = sensor[k] ? sensorHtml.replace(`{${k}}`, sensor[k]) : '';
                    }
                    sensorsHtml += sensorHtml;
                }
                document.getElementById("garbageContainer").innerHTML = sensorsHtml;
            
            });