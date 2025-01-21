const googlemapsurl = "http://maps.google.com/maps?q="

const responseField = document.querySelector('#meetupresponse');

const eventsNumber = 10

const endPoint = `https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=overboardlondon&page=${eventsNumber}`

const request = new XMLHttpRequest()

request.open('GET',endPoint, true)

request.onload = function () {

	const data = JSON.parse(this.response)

	let eventsList = []

 console.log(data["results"])

	for(let i = 0; i < Math.min(data["results"].length, eventsNumber); i++){

  		event = data["results"][i]

//have to temporarily include this stupid stuff because meetup API is being difficult

			if (!event["venue"]) {

				eventsList.push(`

					<div class="d-sm-inline-flex bg-light rounded justify-content-center p-1 m-3">

						<div class="p-2">
							<h5 class="pb-2">${event["name"]}</h5>
							<p>${new Date(event["time"])}</p>
							<a href="https://www.google.com/maps/place/51°32'12.2"N+0°07'19.0"W/" target="_blank">
								<p>The Star of Kings, 126 York Way, Kings Cross, London N1 0AX</p>
							</a>
						</div>

						<div class="p-2 my-auto">
									<a href="${event["event_url"]}"><button type="button" class="btn btn-secondary btn-lg m-2 roboto">Sign Up</button></a>
						</div>

					</div>


					`);


			}else{


    	eventsList.push(`

				<div class="d-sm-inline-flex bg-light rounded justify-content-center p-1 m-3">

    			<div class="p-2">
    				<h5 class="pb-2">${event["name"]}</h5>
    				<p>${new Date(event["time"])}</p>
						<a href="${googlemapsurl}${event["venue"]["lat"]},${event["venue"]["lon"]}" target="_blank">
							<p>${event["venue"]["name"]}, ${event["venue"]["address_1"]}, ${event["venue"]["address_2"]}, ${event["venue"]["city"]}</p>
						</a>
    			</div>

    			<div class="p-2 my-auto">
								<a href="${event["event_url"]}"><button type="button" class="btn btn-secondary btn-lg m-2 roboto">Sign Up</button></a>
    			</div>

    		</div>


    		`);

			}

			//don't forget to remove that curly brace too or you'll be scratching your head
	}

	eventsList = eventsList.join("")

	responseField.innerHTML = eventsList
}

request.send()
