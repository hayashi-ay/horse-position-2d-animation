# Horse Position 2D Animation

This project generates 2D animations of horse positions during a race using HTML Canvas. The animation can then be saved using the MediaRecorder API.

## Project Structure

- `index.html`: The main HTML file that sets up the canvas and includes the stylesheet and JavaScript.
- `style.css`: Provides basic styling for the HTML elements.
- `script.js`: Contains the core logic for drawing the horse animation on the canvas and utilizing the MediaRecorder API to capture the animation.
- `horsePositions.js`: Defines the `horsePositions` array. Each element in the array represents the positions of all horses at a specific second of the animation. The frames between these positions are then calculated by `script.js` to create a smooth animation.

## Technology Stack

This project exclusively uses **HTML, CSS, and vanilla JavaScript**. It avoids modern frameworks, TypeScript, or ES6+ features that require a build toolchain. This approach ensures the project can be run directly in a browser without a complex local environment setup, sidestepping issues like Cross-Origin Resource Sharing (CORS) that often arise when serving assets or testing with more advanced JavaScript features without a dedicated server.

## Animation Logic

The animation simulates a 1500-meter horse race. The `horsePositions.js` file stores the absolute positions of each horse (in meters) at specific one-second intervals.

-   **`x` position (meters):** Represents the horse's horizontal progress in the race, ranging from 0 (start) to 1500 (finish line).
-   **`y` position (pixels):** Represents the horse's vertical position on the canvas. These values are pixel coordinates and are interpolated between `horsePositions`, allowing horses to change their vertical alignment (e.g., to represent different lanes or jostling for position).

The `script.js` file orchestrates the animation:

1.  **Interpolation:** Between the defined `horsePositions`, the horse's `x` and `y` positions are linearly interpolated to create smooth movement at 30 frames per second (FPS).
2.  **Relative Positioning:** To focus on the race leaders, the animation displays horses relative to the horse currently furthest ahead (the "top horse").
    *   The `x` position of the top horse is found for the current interpolated frame.
    *   A `scale` factor (`canvas.width / 400`) is applied, meaning a 400-meter span of the race is visually represented across the entire canvas width. This effectively "zooms in" on the leading horses.
    *   The top horse is drawn at a fixed distance (50 pixels) from the right edge of the canvas.
    *   All other horses are positioned to the left of the top horse based on their `x` difference in meters, scaled to canvas pixels.
    *   The `y` position for drawing remains the interpolated `y` from `horsePositions.js`, ensuring horses stay in their respective lanes.

This approach allows the animation to dynamically adjust its view, always keeping the most competitive part of the race visible.

## Keyframe Data (`horsePositions.js`)

```javascript
// Each entry in this array represents the horse positions at a specific second.
// The animation will be interpolated between these keyframes.
const horsePositions = [
    // Second 0
    [
        { x: 0, y: 10 }, { x: 0, y: 25 }, { x: 0, y: 30 }, { x: 0, y: 50 },
        { x: 0, y: 60 }, { x: 0, y: 10 }, { x: 0, y: 10 }, { x: 0, y: 20 }
    ],
    // Second 1
    [
        { x: 150, y: 10 }, { x: 130, y: 25 }, { x: 150, y: 30 }, { x: 110, y: 50 },
        { x: 135, y: 60 }, { x: 145, y: 10 }, { x: 175, y: 10 }, { x: 165, y: 20 }
    ],
    // Second 2
    [
        { x: 250, y: 10 }, { x: 235, y: 25 }, { x: 220, y: 30 }, { x: 220, y: 50 },
        { x: 240, y: 60 }, { x: 250, y: 10 }, { x: 280, y: 10 }, { x: 270, y: 20 }
    ],
    // Second 3
    [
        { x: 400, y: 10 }, { x: 380, y: 25 }, { x: 410, y: 30 }, { x: 350, y: 50 },
        { x: 385, y: 60 }, { x: 395, y: 10 }, { x: 425, y: 10 }, { x: 415, y: 20 }
    ],
    // Second 4
    [
        { x: 550, y: 10 }, { x: 530, y: 25 }, { x: 560, y: 30 }, { x: 500, y: 50 },
        { x: 535, y: 60 }, { x: 545, y: 10 }, { x: 575, y: 10 }, { x: 565, y: 20 }
    ],
    // Second 5
    [
        { x: 700, y: 10 }, { x: 680, y: 25 }, { x: 710, y: 30 }, { x: 650, y: 50 },
        { x: 685, y: 60 }, { x: 695, y: 10 }, { x: 725, y: 10 }, { x: 715, y: 20 }
    ],
    // Second 6
    [
        { x: 850, y: 10 }, { x: 830, y: 25 }, { x: 860, y: 30 }, { x: 800, y: 50 },
        { x: 835, y: 60 }, { x: 845, y: 10 }, { x: 875, y: 10 }, { x: 865, y: 20 }
    ],
    // Second 7
    [
        { x: 1000, y: 10 }, { x: 980, y: 25 }, { x: 1010, y: 30 }, { x: 950, y: 50 },
        { x: 985, y: 60 }, { x: 995, y: 10 }, { x: 1025, y: 10 }, { x: 1015, y: 20 }
    ],
    // Second 8
    [
        { x: 1150, y: 10 }, { x: 1130, y: 25 }, { x: 1160, y: 30 }, { x: 1100, y: 50 },
        { x: 1135, y: 60 }, { x: 1145, y: 10 }, { x: 1175, y: 10 }, { x: 1165, y: 20 }
    ],
    // Second 9
    [
        { x: 1300, y: 10 }, { x: 1280, y: 25 }, { x: 1310, y: 30 }, { x: 1250, y: 50 },
        { x: 1285, y: 60 }, { x: 1295, y: 10 }, { x: 1325, y: 10 }, { x: 1315, y: 20 }
    ],
    // Second 10, Goal
    [
        { x: 1500, y: 10 }, { x: 1480, y: 25 }, { x: 1450, y: 30 }, { x: 1400, y: 50 },
        { x: 1490, y: 60 }, { x: 1490, y: 10 }, { x: 1425, y: 10 }, { x: 1445, y: 20 }
    ]
];
```

## Gemini Agent Instructions

When interacting with this project, Gemini should strictly adhere to explicit instructions. Do not perform uninstructed actions, such as reverting commented-out code or making assumptions beyond the clear scope of the current request.