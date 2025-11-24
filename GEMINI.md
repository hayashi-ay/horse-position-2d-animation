# Horse Position 2D Animation

This project generates 2D animations of horse positions during a race using HTML Canvas. The animation can then be saved using the MediaRecorder API.

## Project Structure

- `index.html`: The main HTML file that sets up the canvas and includes the stylesheet and JavaScript.
- `style.css`: Provides basic styling for the HTML elements.
- `script.js`: Contains the core logic for drawing the horse animation on the canvas and utilizing the MediaRecorder API to capture the animation.
- `frames.js`: Defines the `keyFrames` array. Each element in the array represents the positions of all horses at a specific second of the animation. The frames between these keyframes are then calculated by `script.js` to create a smooth animation.

## Technology Stack

This project exclusively uses **HTML, CSS, and vanilla JavaScript**. It avoids modern frameworks, TypeScript, or ES6+ features that require a build toolchain. This approach ensures the project can be run directly in a browser without a complex local environment setup, sidestepping issues like Cross-Origin Resource Sharing (CORS) that often arise when serving assets or testing with more advanced JavaScript features without a dedicated server.

## Gemini Agent Instructions

When interacting with this project, Gemini should strictly adhere to explicit instructions. Do not perform uninstructed actions, such as reverting commented-out code or making assumptions beyond the clear scope of the current request.