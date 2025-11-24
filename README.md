# Horse Position 2D Animation

This project generates 2D animations of horse positions during a race using HTML Canvas. The animation can then be saved using the MediaRecorder API.

## Project Structure

- `index.html`: The main HTML file that sets up the canvas and includes the stylesheet and JavaScript.
- `style.css`: Provides basic styling for the HTML elements.
- `script.js`: Contains the core logic for drawing the horse animation on the canvas and utilizing the MediaRecorder API to capture the animation.
- `horsePositions.js`: Defines the `horsePositions` array, which stores the absolute positions of each horse (in meters) at specific one-second intervals.

## How it Works

The animation simulates a 1500-meter horse race, with data defined in `horsePositions.js`. This file contains an array of keyframe objects, each specifying the `second` of the keyframe and the `positions` of all horses at that moment.

-   **`x` position (meters):** Represents the horse's horizontal progress in the race (0-1500m).
-   **`y` position (pixels):** Represents the horse's vertical position on the canvas.

The `script.js` file reads this sparse keyframe data and:

1.  **Finds the relevant keyframes** for the current animation time.
2.  **Linearly interpolates** the `x` and `y` positions for each horse between those keyframes to create smooth movement.
3.  **Displays horses relative to the leader**, dynamically adjusting the view to keep the most competitive part of the race visible.

## Getting Started

To view the animation, simply open `index.html` in a web browser.

To record the animation, click the "Start Recording" button. The animation will be captured as an MP4 file.

## Technology

This project uses **HTML, CSS, and vanilla JavaScript**, ensuring it can be run directly in any modern web browser without a complex build setup.
