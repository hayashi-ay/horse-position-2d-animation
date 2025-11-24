// This file defines the key moments of a horse race.
// Each entry in the `horsePositions` array is a keyframe, representing the state of the race at a specific time.
// The animation will be interpolated between these keyframes.
//
// DATA STRUCTURE:
// The `horsePositions` array is an array of objects, where each object has two properties:
// - `second`: The time in seconds from the start of the animation when this keyframe occurs.
// - `positions`: An array of 8 objects, each representing a horse's position.
//
// HORSE ORDER:
// The order of horses in the `positions` array is fixed and corresponds to the `horseProperties` array in `script.js`:
// 1. white
// 2. black
// 3. red
// 4. blue
// 5. yellow
// 6. green
// 7. orange
// 8. pink
//
// POSITION DATA:
// For each horse in the `positions` array:
// - `x`: The distance covered by the horse in meters (from 0 to 1500).
// - `y`: The vertical position of the horse on the canvas in pixels.
//
// --- IMPORTANT ---
// The 'x' and 'y' values below are currently placeholders and need to be filled in for each keyframe
// to reflect the actual progress of the race at that specific second.
// The user's notes on horse rankings are for reference to help fill in this data.

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
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: [
            { x: 300, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:23 in the video (44 seconds into animation), blue and white are competing.
    {
        second: 44,
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:24 in the video (45 seconds into animation), blue passes white.
    {
        second: 45,
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:38 in the video (59 seconds into animation), yellow passes orange.
    {
        second: 59,
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:44 in the video (65 seconds into animation), blue catches up to pink.
    {
        second: 65,
        // 1: PINK, 2: BLUE, 3: RED, 4: WHITE, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:45 in the video (66 seconds into animation), blue passes pink.
    {
        second: 66,
        // 1: BLUE, 2: PINK, 3: RED, 4: WHITE, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:47 in the video (68 seconds into animation), black passes white.
    {
        second: 68,
        // 1: BLUE, 2: PINK, 3: RED, 4: BLACK, 5: WHITE, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    },
    // At 2:49 in the video (70 seconds into animation).
    {
        second: 70,
        // 1: BLUE, 2: PINK, 3: RED, 4: BLACK, 5: WHITE, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
            { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
        ]
    }
];