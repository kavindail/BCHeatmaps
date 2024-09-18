Main ideas for heatmap

Hotter areas will be where there is the most house selling is going on
Activity is based on how many homes are being sold in certain areas
Heatmap provided by the Googlemaps API and Real Estate Activity API by Datafinity api
Query the property endpoint on crea ddf api with cities surrounding Vancouver / Maybe US
This will give you the latitude,longitude(both for google maps api), and mostRecentStatusDate (This will be when the status of a property was changed and what will be used to calculate where houses are being listed most frequently)
Then will set up a function to assign a heat level based on realtive activity in the backend for each area
