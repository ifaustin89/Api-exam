$(document).ready(function() {
    // Replace 'YOUR_API_KEY' with your actual Ticketmaster API key
    const api_key = "jcUkJxiGVI5OuWKjRierbLeC0oGi6Vgw";

    // Event listener for the location input field
    $("#location").on("input", function() {
        const location = $(this).val();
        fetchEvents(api_key, location);
    });

    // Initially fetch and display all events
    fetchEvents(api_key, "");
});

function fetchEvents(api_key, location) {
    const base_url = "https://app.ticketmaster.com/discovery/v2/events";
    const params = {
        apikey: api_key,
        locale: "en-us",
        city: location,
        size: 10 // Change this number to adjust the limit of events fetched
    };

    $.ajax({
        url: base_url,
        data: params,
        success: function(response) {
            displayEvents(response._embedded.events);
        },
        error: function() {
            $("#eventsContainer").html("<p>Failed to fetch events.</p>");
        }
    });
}

function displayEvents(events) {
    let eventsHtml = "";
    
    if (events.length === 0) {
        eventsHtml = "<p>No Event Found in that Location.</p>";
    } else {
        for (const event of events) {
            eventsHtml += `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text"><strong>Date:</strong> ${event.dates.start.localDate}</p>
                            <p class="card-text"><strong>Time:</strong> ${event.dates.start.localTime}</p>
                            <p class="card-text"><strong>Venue:</strong> ${event._embedded.venues[0].name}</p>
                            <p class="card-text"><strong>Address:</strong> ${event._embedded.venues[0].address.line1}</p>
                            <p class="card-text"><strong>Ticket Availability:</strong> ${event.dates.status.code}</p>
                        </div>
                    </div>
                </div>`;
        }
    }

    $("#eventsContainer").html(eventsHtml);
}

