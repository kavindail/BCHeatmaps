Main ideas for heatmap

Hotter areas will be where there is the most house selling is going on
Activity is based on how many homes are being sold in certain areas
Heatmap provided by the Googlemaps API and Real Estate Activity API by CREA DDF api
Query the property endpoint on crea ddf api with cities surrounding Vancouver
This will give you the latitude,longitude, StandardStatus, and the StatusChange time stamp (Use status time stamp and filter to filter by recent updates eg 1 month) to get only recent data
Then will set up a function to assign a heat level based on realtive activity in the backend for each area
