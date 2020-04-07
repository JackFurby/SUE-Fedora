document.addEventListener('DOMContentLoaded', skipTime(), false);

function changeTime(checkbox) {
    if (checkbox.checked) {
        activeTime();
    } else {
        skipTime();
    }
}

function activeTime() {
    clearMap();

    window.datetime = new Date("2020-03-04T16:10:10Z");
    window.cendtime = new Date("2020-03-04T16:10:45Z");

    const skipSwitch = document.getElementById("skipSwitch");

    getAllSensorMarkers(function (data) {
        window.sensorlst = data;
        let sensorlist = window.sensorlst;

        for (let i in sensorlist) {
            let sensor = sensorlist[i];

            if (skipSwitch.checked == true) {
                clearInterval(refreshId);
            } else {
                addMarker(sensor, cameraIcon);

                addListItem(sensor, "sensor", sensor.properties.sensorType);
            }
        } 
    });

    let refreshId = setInterval( function() { 

        if (skipSwitch.checked == true) {
            clearInterval(refreshId);
        }

        window.datetime.setSeconds( window.datetime.getSeconds() + 5 );
               
        getEventMarkers(function (data) {

            if ( data != window.eventlst ) {

                window.eventlst = data;
                let eventlist = window.eventlst;

                for ( let i in eventlist ) {
                    let event = eventlist[i];

                    if (skipSwitch.checked == true) {
                        clearInterval(refreshId);
                    } else {
                        addMarker(event, null);
            
                        addListItem(event, "event", event.properties.eventType);
                    }
                } 
            }
        });

        if (window.datetime <= window.cendtime) {
            getComplexEvents(function (data) {

                if ( JSON.stringify(data) != JSON.stringify(window.complexlst) ) {

                    window.complexlst = data;
                    let complexlist = window.complexlst;

                    if ( complexlist.length > 1 ) {
                        refreshComplex();
                    }

                    let refinedList = refineList(complexlist);

                    for ( let i in refinedList ) {
                        let complex = refinedList[i];

                        if (skipSwitch.checked == true) {
                            clearInterval(refreshId);
                        } else {
                            processComplexEvent(complex);

                            addListItem(complex, "complex", null);
                        }
                    } 
                }
            });
        }
    }, 5000);
}

function skipTime() {

    window.complexTime = 600;
    window.complexDist = 50;

    clearMap();
     
    getAllSensorMarkers(function (data) {
        window.sensorlst = data;
        let sensorlist = window.sensorlst;

        for ( let i in sensorlist ) {
            let sensor = sensorlist[i];

            addMarker(sensor, cameraIcon);

            addListItem(sensor, "sensor", sensor.properties.sensorType);
        } 
    });

    getAllEventMarkers(function (data) {
        window.eventlst = data;
        let eventlist = window.eventlst;
        
        for ( let i in eventlist ) {
            let event = eventlist[i];
        
            addMarker(event, null);
        
            addListItem(event, "event", event.properties.eventType);
        } 
    });

    getAllComplexEvents(function (data) {
        window.complexlst = data;
        let complexlist = window.complexlst;

        let refinedList = refineList(complexlist);

        for ( let i in refinedList ) {
            let complex = refinedList[i];

            processComplexEvent(complex);

            addListItem(complex, "complex", null);
        } 
    });

    window.sensorCamera.addTo(window.leafletmap);
    window.sensorPerson.addTo(window.leafletmap);
    window.sensorCameraRange.addTo(window.leafletmap);
    window.sensorPersonRange.addTo(window.leafletmap);

    window.eventPerson.addTo(window.leafletmap);
    window.eventVehicle.addTo(window.leafletmap);
    window.eventPlanned.addTo(window.leafletmap);

    window.personEventRange.addTo(window.leafletmap);
    window.vehicleEventRange.addTo(window.leafletmap);
    window.plannedEventRange.addTo(window.leafletmap);

    window.complexEvent.addTo(window.leafletmap);

}