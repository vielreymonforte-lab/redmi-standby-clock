REDMI STANDBY CLOCK — MATCHED REFERENCE BUILD

This version recreates the supplied 1670x942 reference layout:
- Deep midnight background
- Warm ivory greeting and hour digits
- Muted sage minute digits and circular widget outlines
- Champagne greeting icon and weather crescent
- Oversized centered 24-hour clock
- Four small circular widgets distributed across a centered 60%-width dock
- No date header; greeting changes automatically by local time

FUNCTIONS
- Live local 24-hour clock and dynamic greeting
- Date widget shows day number; tap to see full date
- Weather fetched from Open-Meteo for Madrid by default
- Greeting icon automatically changes to match current weather (sun, clouds, rain, fog, snow, or thunderstorm)
- Spotify circle opens Spotify
- To Do opens an interactive checklist saved in local browser storage
- PWA installation support and offline app-shell cache
- Screen Wake Lock requested while visible, if supported

WEATHER LOCATION
Edit latitude and longitude in app.js to change the default weather city.

INSTALL
1. Extract this ZIP.
2. Upload all files to the root of a GitHub Pages repository.
3. Enable GitHub Pages for the main branch and root folder.
4. Open the HTTPS GitHub Pages URL in Chrome on the Redmi Note 9S.
5. Use Chrome menu > Install app / Add to Home screen.
6. Open the installed app and rotate to landscape.

LIMITS
Spotify currently opens Spotify; in-app playback controls are not connected.
Weather refresh requires internet.
A PWA cannot guarantee the phone remains awake forever; Android battery and screen timeout settings may override the Wake Lock request.

V5 display update: enlarged main clock and greeting header for landscape screens.

V6: Greeting text updates automatically by local time (Morning/Afternoon/Evening); greeting icon adapts to live weather conditions. Weather codes include drizzle, rain, showers, snow, fog, and thunderstorms.

V7: Reference image match - pure black background, approved cream/sage palette and unchanged layout. Time greeting and weather icon adapt independently.

V8 greeting schedule: Morning 01:00–11:59; Afternoon 12:00–16:59; Evening 17:00–00:59. Weather icon refreshes on load and every 30 minutes.
