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

// 1馬身が12
// White, Black, Red, Blue
// Yellow, Green, Orange, Pink
const horsePositions = [
    // At 1:39
    {
        second: 0,
        direction: 'left',
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: ORANGE, 6: BLACK, 7: YELLOW, 8: GREEN
        positions: [
            { x: -1, y: 15 }, { x: -5.0, y: 13 }, { x: -4, y: 35 }, { x: -3, y: 25 },
            { x: -6.5, y: 38 }, { x: -7.5, y: 53 }, { x: -5.2, y: 55 }, { x: 0, y: 40 }
        ]
    },
    // At 1:44
    {
        second: 5,
        direction: 'left',
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: ORANGE, 6: BLACK, 7: YELLOW, 8: GREEN
        positions: [
            { x: -1.5, y: 20 }, { x: -5.1, y: 15 }, { x: -4.1, y: 32 }, { x: -3, y: 25 },
            { x: -5.8, y: 38 }, { x: -9.0, y: 53 }, { x: -4.6, y: 55 }, { x: 0, y: 36 }
        ]
    },
    // At 1:48
    {
        second: 9,
        direction: 'left',
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: ORANGE, 6: BLACK, 7: YELLOW, 8: GREEN
        positions: [
            { x: -2.0, y: 25 }, { x: -5.3, y: 18 }, { x: -4.2, y: 30 }, { x: -3, y: 32 },
            { x: -6.0, y: 40 }, { x: -10.0, y: 53 }, { x: -4.9, y: 55 }, { x: 0, y: 30 }
        ]
    },
    {
        second: 10,
        direction: 'right',
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: ORANGE, 6: BLACK, 7: YELLOW, 8: GREEN
        positions: [
            { x: -2.0, y: 25 }, { x: -5.3, y: 18 }, { x: -4.2, y: 30 }, { x: -3, y: 32 },
            { x: -6.6, y: 40 }, { x: -10.0, y: 53 }, { x: -4.9, y: 55 }, { x: 0, y: 30 }
        ]
    },
    // At 1:55, all horses' positions can be confirmed
    {
        second: 16,
        direction: 'right',
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: ORANGE, 6: BLACK, 7: YELLOW, 8: GREEN
        positions: [
            { x: -1.5, y: 20 }, { x: -6.5, y: 15 }, { x: -5, y: 28 }, { x: -2.5, y: 28 },
            { x: -8.0, y: 44 }, { x: -10.5, y: 50 }, { x: -5.8, y: 45 }, { x: 0, y: 15 }
        ]
    },
    // Estimated Data at 2:05, it's assumed that black passed orange at the time
    {
        second: 26,
        direction: 'right',
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: BLACK, 6: ORANGE, 7: YELLOW, 8: GREEN
        positions: [
            { x: -0.9, y: 25 }, { x: -7, y: 15 }, { x: -4, y: 17 }, { x: -1.8, y: 15 },
            { x: -7.5, y: 20 }, { x: -10.5, y: 20 }, { x: -5.8, y: 45 }, { x: 0, y: 15 }
        ]
    },
    // At 2:12, it's confirmed that black passes orange.
    {
        second: 33,
        direction: 'right',
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: [
            { x: -0.5, y: 25 }, { x: -5, y: 10 }, { x: -3.5, y: 15 }, { x: -1.5, y: 10 },
            { x: -7, y: 35 }, { x: -10, y: 50 }, { x: -6, y: 25 }, { x: 0, y: 10 }
        ]
    },
    // Estimated at 2:16, Copy data at 2:12
    {
        second: 37,
        direction: 'right',
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: [
            { x: -0.5, y: 25 }, { x: -5, y: 10 }, { x: -3.5, y: 15 }, { x: -1.5, y: 10 },
            { x: -7, y: 35 }, { x: -10, y: 50 }, { x: -6, y: 25 }, { x: 0, y: 10 }
        ]
    },
    // Estimated at 2:21, green is approaching inner
    {
        second: 42,
        direction: 'right',
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: [
            { x: -0.5, y: 25 }, { x: -5, y: 10 }, { x: -3.5, y: 15 }, { x: -1.5, y: 10 },
            { x: -7, y: 35 }, { x: -9, y: 30 }, { x: -6, y: 25 }, { x: 0, y: 10 }
        ]
    },
    // At 2:23, blue and white are competing
    {
        second: 44,
        direction: 'right',
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: [
            { x: -1.5, y: 22 }, { x: -5, y: 25 }, { x: -4, y: 10 }, { x: -1.5, y: 9 },
            { x: -10, y: 30 }, { x: -12, y: 25 }, { x: -9, y: 40 }, { x: 0, y: 13 }
        ]
    },
    // At 2:24, blue passes white.
    {
        second: 45,
        direction: 'right',
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: [
            { x: -1.3, y: 22 }, { x: -5, y: 25 }, { x: -4, y: 10 }, { x: -1.0, y: 5 },
            { x: -10, y: 30 }, { x: -12, y: 25 }, { x: -9, y: 40 }, { x: 0, y: 10 }
        ]
    },
     // At 2:28, blue make 1 horse length to white
    {
        second: 49,
        direction: 'right',
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: [
            { x: -2.0, y: 22 }, { x: -5, y: 25 }, { x: -4, y: 10 }, { x: -1.0, y: 5 },
            { x: -10, y: 30 }, { x: -12, y: 25 }, { x: -9, y: 40 }, { x: 0, y: 10 }
        ]
    },
    // At 2:38, is's confirmed that yellow passes orange.
    {
        second: 59,
        direction: 'right',
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: -3, y: 25 }, { x: -4, y: 40 }, { x: -3, y: 15 }, { x: 0, y: 25 },
            { x: -6, y: 30 }, { x: -9, y: 22 }, { x: -7, y: 20 }, { x: 0, y: 15 }
        ]
    },
    // At 2:40
    {
        second: 61,
        direction: 'right',
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: -3, y: 25 }, { x: -4, y: 40 }, { x: -3, y: 15 }, { x: 0, y: 25 },
            { x: -6, y: 30 }, { x: -9, y: 22 }, { x: -7, y: 20 }, { x: 0, y: 15 }
        ]
    },
    // At 2:41
    {
        second: 62,
        direction: 'left',
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: -3, y: 25 }, { x: -4, y: 40 }, { x: -3, y: 15 }, { x: 0, y: 25 },
            { x: -6, y: 30 }, { x: -9, y: 22 }, { x: -7, y: 20 }, { x: 0, y: 15 }
        ]
    },
    // At 2:44 in the video, blue catches up to pink.
    {
        second: 65,
        direction: 'left',
        // 1: PINK, 2: BLUE, 3: RED, 4: WHITE, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: -3, y: 25 }, { x: -4, y: 40 }, { x: -3, y: 15 }, { x: 0, y: 23 },
            { x: -6, y: 30 }, { x: -9, y: 22 }, { x: -7, y: 20 }, { x: 0, y: 13 }
        ]
    },
    // At 2:45 in the video (66 seconds into animation), blue passes pink.
    {
        second: 66,
        direction: 'left',
        // 1: BLUE, 2: PINK, 3: RED, 4: WHITE, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: -3, y: 25 }, { x: -4, y: 40 }, { x: -3, y: 15 }, { x: 0, y: 23 },
            { x: -6, y: 30 }, { x: -9, y: 22 }, { x: -7, y: 20 }, { x: 0, y: 13 }
        ]
    },
    // At 2:47, black passes white.
    {
        second: 68,
        direction: 'left',
        // 1: BLUE, 2: PINK, 3: RED, 4: BLACK, 5: WHITE, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: -3, y: 25 }, { x: -4, y: 40 }, { x: -3, y: 15 }, { x: 0, y: 23 },
            { x: -6, y: 30 }, { x: -9, y: 22 }, { x: -7, y: 20 }, { x: 0, y: 13 }
        ]
    },
    // At 2:49
    {
        second: 70,
        direction: 'left',
        // 1: BLUE, 2: PINK, 3: RED, 4: BLACK, 5: WHITE, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: [
            { x: -3, y: 25 }, { x: -4, y: 40 }, { x: -3, y: 15 }, { x: 0, y: 23 },
            { x: -6, y: 30 }, { x: -9, y: 22 }, { x: -7, y: 20 }, { x: 0, y: 13 }
        ]
    }
];