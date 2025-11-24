# Horse Position 2D Animation

This project generates 2D animations of horse positions during a race using HTML Canvas. The animation can then be saved using the MediaRecorder API.

## Project Structure

- `index.html`: The main HTML file that sets up the canvas and includes the stylesheet and JavaScript.
- `style.css`: Provides basic styling for the HTML elements.
- `script.js`: Contains the core logic for drawing the horse animation on the canvas and utilizing the MediaRecorder API to capture the animation.
- `horsePositions.js`: Defines the `horsePositions` array, which stores the absolute positions of each horse (in meters) at specific one-second intervals.

## How it Works

The animation simulates a 1500-meter horse race.

-   **`x` position (meters):** Represents the horse's horizontal progress in the race, ranging from 0 (start) to 1500 (finish line).
-   **`y` position (pixels):** Represents the horse's vertical position on the canvas. These values are pixel coordinates and are interpolated between `horsePositions`, allowing horses to change their vertical alignment.

The `script.js` file interpolates horse positions between the `horsePositions` data to create smooth movement. It then dynamically adjusts the view to focus on the leading horses, displaying their relative positions on the canvas.

## Getting Started

To view the animation, simply open `index.html` in a web browser.

To record the animation, click the "Start Recording" button. The animation will be captured as an MP4 file.

## Technology

This project uses **HTML, CSS, and vanilla JavaScript**, ensuring it can be run directly in any modern web browser without a complex build setup.
