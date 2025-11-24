# Horse Position 2D Animation

This project generates 2D animations of horse positions during a race using HTML Canvas. The animation can then be saved using the MediaRecorder API.

## Project Structure

- `index.html`: The main HTML file that sets up the canvas and includes the stylesheet and JavaScript.
- `style.css`: Provides basic styling for the HTML elements.
- `script.js`: Contains the core logic for drawing the horse animation on the canvas and utilizing the MediaRecorder API to capture the animation.
- `horsePositions.js`: Defines the `horsePositions` array, which contains keyframe data for the race. Each element is an object with a `second` property (the time of the keyframe) and a `positions` array (the `x` and `y` coordinates for each horse).

## Technology Stack

This project exclusively uses **HTML, CSS, and vanilla JavaScript**. It avoids modern frameworks, TypeScript, or ES6+ features that require a build toolchain. This approach ensures the project can be run directly in a browser without a complex local environment setup, sidestepping issues like Cross-Origin Resource Sharing (CORS) that often arise when serving assets or testing with more advanced JavaScript features without a dedicated server.

## Animation Logic

The animation simulates a 1500-meter horse race. The `horsePositions.js` file stores keyframes in an array of objects. Each object contains the `second` of the keyframe and an array of `positions` for each horse.

-   **`x` position (meters):** Represents the horse's horizontal progress in the race, ranging from 0 (start) to 1500 (finish line).
-   **`y` position (pixels):** Represents the horse's vertical position on the canvas. These values are pixel coordinates and are interpolated between keyframes.

The `script.js` file orchestrates the animation:

1.  **Keyframe Search:** For each frame of the animation, the script calculates the `currentTimeInSeconds`. It then searches the `horsePositions` array to find the two keyframes that the current time falls between.
2.  **Interpolation:** The horse's `x` and `y` positions are linearly interpolated between these two keyframes based on the `currentTimeInSeconds`. This allows for smooth animation even with unevenly spaced keyframes.
3.  **Relative Positioning:** To focus on the race leaders, the animation displays horses relative to the horse currently furthest ahead (the "top horse").
    *   The `x` position of the top horse is found for the current interpolated frame.
    *   A `scale` factor (`canvas.width / 400`) is applied, meaning a 400-meter span of the race is visually represented across the entire canvas width. This effectively "zooms in" on the leading horses.
    *   The top horse is drawn at a fixed distance (50 pixels) from the right edge of the canvas.
    *   All other horses are positioned to the left of the top horse based on their `x` difference in meters, scaled to canvas pixels.
    *   The `y` position for drawing remains the interpolated `y` from the keyframes.

This approach allows the animation to dynamically adjust its view, always keeping the most competitive part of the race visible.

## Keyframe Data (`horsePositions.js`)

```javascript
The important positions are manually set by analyzing the race movie. The race starts at 1:20 and the top horse crosses the finish line at 2:56. The animation, however, focuses on the segment from 1:39 to 2:49. Each entry in the `horsePositions` array is a keyframe, representing the state of the race at a specific time.
//
// DATA STRUCTURE:
// The `horsePositions` array is an array of objects, where each object has two properties:
// - `second`: The time in seconds from the start of the animation when this keyframe occurs.
// - `positions`: An array of 8 objects, each representing a horse's position.
- **Horse Ranking Comments**: The comments above each `positions` array indicate the ranking of horses at that specific `second` in the animation. This ranking should be respected and not violated by subsequent changes to the position data.
//
// HORSE ORDER:
// 1. white, 2. black, 3. red, 4. blue, 5. yellow, 6. green, 7. orange, 8. pink
//
// --- IMPORTANT ---
// The 'x' and 'y' values below are currently placeholders and need to be filled in.
const horsePositions = [
    // Race Start: 1:39 in the video, which is Second 0 of our animation.
    {
        second: 0,
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: ORANGE, 6: BLACK, 7: YELLOW, 8: GREEN
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:12 in the video (33 seconds into animation), black passes orange.
    {
        second: 33,
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:24 in the video (45 seconds into animation), blue passes white.
    {
        second: 45,
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:45 in the video (66 seconds into animation), blue passes pink.
    {
        second: 66,
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:49 in the video (70 seconds into animation).
    {
        second: 70,
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    }
];
```

## Gemini Agent Instructions

When interacting with this project, Gemini should strictly adhere to explicit instructions. Do not perform uninstructed actions, such as reverting commented-out code or making assumptions beyond the clear scope of the current request.