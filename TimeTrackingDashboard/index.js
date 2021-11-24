const timeframes_buttons = document.timeframes.timeframe;
var prev_timeframe = null;

timeframes_buttons.forEach(element => {
    element.addEventListener( 'click', getData );
});

function getData()
{
    if ( prev_timeframe !== this.value )
    {
        var prev_timeframe = this.value;
        var response;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'data.json');
        xhr.onload = () =>
        {
            if ( xhr.status == 200 ) {
                response = JSON.parse(xhr.response);
                for ( let i = 0 ; i < response.length ; i ++ )
                {
                    document.querySelector("#" + response[i].title + " * .current").innerHTML = response[i].timeframes[prev_timeframe].current + "hrs";
                    let text;
                    switch (prev_timeframe) {
                        case "daily":
                            text = "Yesterday";
                            break;
                        case "weekly":
                            text = "Last week";
                            break;
                        case "monthly":
                            text = "last month";
                            break;
                    }   
                    document.querySelector( "#" + response[i].title + " * .previous").innerHTML = text + " - " + response[i].timeframes[prev_timeframe].previous + "hrs";
                }
            }
        }
        xhr.send();
    }
};
