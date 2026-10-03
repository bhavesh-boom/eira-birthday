# Eira Birthday App

A small birthday-surprise web app packaged with Capacitor for Android.

## Build the APK

1. Push these files to GitHub.
2. Open **Actions** → **Build Android APK**.
3. Click **Run workflow** (or push to `main`).
4. When the workflow finishes, download the **eira-birthday-debug-apk** artifact.
5. Extract it and install `app-debug.apk` on an Android phone.

The app is a static HTML/CSS/JavaScript project, so no web build step is required.

## Important

The photos and voice notes are bundled into the APK. The repository currently contains them in the project root, and the existing JavaScript references those root files.
