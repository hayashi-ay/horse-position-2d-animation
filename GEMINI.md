# Horse Position 2D Animation

This project generates 2D animations of horse positions during a race using HTML Canvas. The animation can then be saved using the MediaRecorder API.

## Project Structure

- `index.html`: The main HTML file that sets up the canvas and includes the stylesheet and JavaScript.
- `style.css`: Provides basic styling for the HTML elements.
- `script.js`: Contains the core logic for drawing the horse animation on the canvas and utilizing the MediaRecorder API to capture the animation.
- `frames.js`: Defines the `keyFrames` array. Each element in the array represents the positions of all horses at a specific second of the animation. The frames between these keyframes are then calculated by `script.js` to create a smooth animation.

## Technology Stack

This project exclusively uses **HTML, CSS, and vanilla JavaScript**. It avoids modern frameworks, TypeScript, or ES6+ features that require a build toolchain. This approach ensures the project can be run directly in a browser without a complex local environment setup, sidestepping issues like Cross-Origin Resource Sharing (CORS) that often arise when serving assets or testing with more advanced JavaScript features without a dedicated server.

## Animation Logic

The animation simulates a 1500-meter horse race. The `frames.js` file stores the absolute positions of each horse (in meters) at specific one-second intervals.

-   **`x` position (meters):** Represents the horse's horizontal progress in the race, ranging from 0 (start) to 1500 (finish line).
-   **`y` position (pixels):** Represents the horse's vertical position on the canvas. These values are pixel coordinates and are interpolated between keyframes, allowing horses to change their vertical alignment (e.g., to represent different lanes or jostling for position).

The `script.js` file orchestrates the animation:

1.  **Interpolation:** Between the defined keyframes, the horse's `x` and `y` positions are linearly interpolated to create smooth movement at 30 frames per second (FPS).
2.  **Relative Positioning:** To focus on the race leaders, the animation displays horses relative to the horse currently furthest ahead (the "top horse").
    *   The `x` position of the top horse is found for the current interpolated frame.
    *   A `scale` factor (`canvas.width / 400`) is applied, meaning a 400-meter span of the race is visually represented across the entire canvas width. This effectively "zooms in" on the leading horses.
    *   The top horse is drawn at a fixed distance (50 pixels) from the right edge of the canvas.
    *   All other horses are positioned to the left of the top horse based on their `x` difference in meters, scaled to canvas pixels.
    *   The `y` position for drawing remains the interpolated `y` from `frames.js`, ensuring horses stay in their respective lanes.

This approach allows the animation to dynamically adjust its view, always keeping the most competitive part of the race visible.

## Gemini Agent Instructions

When interacting with this project, Gemini should strictly adhere to explicit instructions. Do not perform uninstructed actions, such as reverting commented-out code or making assumptions beyond the clear scope of the current request.