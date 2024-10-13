import AsyncStorage from '@react-native-async-storage/async-storage';

let attractionDataArray:any = [];

// Function to fetch tourist attractions using Overpass API
async function fetchTouristAttractions(latitude:any, longitude:any, radius = 10000) {
  const query = `
    [out:json];
    (
      node["tourism"="attraction"](around:${radius}, ${latitude}, ${longitude});
      way["tourism"="attraction"](around:${radius}, ${latitude}, ${longitude});
      relation["tourism"="attraction"](around:${radius}, ${latitude}, ${longitude});
    );
    out body;
  `;

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query,
    headers: { 'Content-Type': 'text/plain' }
  });
  const data = await response.json();
  return data.elements;
}

// Function to calculate road distance using OSRM
async function calculateRoadDistance(startLat:any, startLon:any, endLat:any, endLon:any) {
  const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=false&geometries=polyline&steps=false`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.routes && data.routes.length > 0) {
    const distance = data.routes[0].distance; // Distance in meters
    const duration = data.routes[0].duration; // Duration in seconds
    return { distance, duration };
  } else {
    throw new Error('No route found');
  }
}


export const fetchAttractions = (latitude:any, longitude:any) =>{


fetchTouristAttractions(latitude, longitude).then(async attractions => {
  // Use a Set to track unique attraction IDs
  const uniqueAttractions = new Set();
  
  // Array to hold the tourist attractions with distance and time
 

  for (let attraction of attractions) {
    const attractionId = attraction.id;
    
    // Check if the attraction is already processed (avoids duplicates)
    if (!uniqueAttractions.has(attractionId)) {
      uniqueAttractions.add(attractionId);  // Mark this attraction as processed

      if (attraction.lat && attraction.lon) {
        const name = attraction.tags?.name || 'Unnamed';  // Get the name or fallback to 'Unnamed'

        // Calculate road distance to the tourist attraction
        const distanceData = await calculateRoadDistance(latitude, longitude, attraction.lat, attraction.lon);
        const distanceKm = (distanceData.distance / 1000).toFixed(2); // Convert distance to kilometers
        const durationMinutes = Math.round(distanceData.duration / 60); // Convert duration to minutes

        // Add the attraction data to the array
        attractionDataArray.push({
          name: name,
          lat: attraction.lat,
          lon: attraction.lon,
          distance: distanceKm, // Store as number for sorting
          time: durationMinutes // Store as number for sorting
        });
      }
    }
    if (attractionDataArray.length >= 10) {
      break;
    }
  }

 

  // Sort attractions by distance
  attractionDataArray.sort((a:any, b:any) => a.distance - b.distance);

  // Get the five closest attractions
  const closestAttractions = attractionDataArray;
try {
    await AsyncStorage.setItem('closestAttractions', JSON.stringify(closestAttractions));
    console.log('Closest attractions saved to storage');
} catch (error) {
    console.error('Error saving closest attractions to storage:', error);
}
  // Log the five closest tourist attractions
  console.log(closestAttractions.map((attraction:any) => ({
    name: attraction.name,
    lat: attraction.lat,
    lon: attraction.lon,
    distance: `${attraction.distance} km`,
    time: `${attraction.time} minutes`
  })));
  
}).catch(error => {
  console.error('Error:', error);
});
}



console.log(attractionDataArray)