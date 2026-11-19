REDMI STANDBY CLOCK — V11 MASTER DESIGN BUILD

Design is locked to the supplied reference image:
- Pure black background
- Greeting and weather icon at the top
- Large centered 24-hour clock
- Warm cream hours, sage-green minutes and ring accents, gray colon
- Four bottom widgets in the exact order: Date, Weather, Spotify, To Do
- No extra widgets or layout changes


FUNCTIONS
- Live local 24-hour clock
- Greeting schedule: Morning 01:00–11:59; Afternoon 12:00–16:59; Evening 17:00–00:59
- Weather from Open-Meteo using Madrid coordinates as default; updates every 30 minutes
- Weather icon in both greeting and Weather circle
- Date widget shows today's day number; tap to reveal full date
- Spotify opens Spotify in a new tab
- To Do list lets you add, check off and delete tasks; tasks are saved on this phone
- To Do badge shows remaining tasks, including 0
- Screen Wake Lock is requested when visible, if supported by browser/device
- PWA install support
- Service worker cache version updated and HTML navigation uses network-first strategy to reduce stale deployments

INSTALL / UPDATE
1. Extract this ZIP.
2. Upload all seven files to the root of your GitHub Pages repository, replacing old versions.
3. Ensure GitHub Pages is serving the latest commit from the correct branch and root.
4. On the phone, open the site in Chrome. If an installed PWA is showing old files, remove its old installation and clear the site's storage/cache, then install again from the updated HTTPS site.
5. Open the app and use landscape orientation to match the reference.

LIMITATIONS
- Weather uses Madrid as the default location. To use a different city, update the latitude/longitude constants in app.js.
- Weather requires internet access.
- Spotify is a shortcut; playback is not embedded in the clock.
- Wake Lock cannot override Android screen timeout, battery saver, or manufacturer restrictions.
