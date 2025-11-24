// Each entry in this array represents the horse positions at a specific second.
// The animation will be interpolated between these keyframes.
const horsePositions = [
    // white, black, red, blue
    // yellow, green, orange, pink
    // Race Start: 1:20 but the animation's first frame is the point of 1:39
    // Second 0, 1:39
    [
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: ORANGE, 6: BLACK, 7: YELLOW, 8: GREEN
        { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
        { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }
    ],
    // Second 33, 2:12
    // At this point, it can be confirmed that the black pass the orange, so between 1:39 and 2:12, black passes orange
    [
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
        { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }      
    ],
    // Second 44, 2:23
    // At this point, blue and white is competing.
    [
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
        { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }      
    ],
    // Second 45, 2:24
    // At this point, blue passes white
    [
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
        { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }      
    ],
    // Second 59, 2:38
    // At this point, it's confirmed that yellow pass orange.
    [
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
        { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }      
    ],
    // Second 59, 2:44
    // At this point, blue catches up pink
    [
        // 1: PINK, 2: BLUE, 3: RED, 4: WHITE, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
        { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }      
    ],
    // Second 60, 2:45
    // At this point, blue passes pink
    [
        // 1: BLUE, 2: PINK, 3: RED, 4: WHITE, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
        { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }      
    ],
    // Second 62, 2:47
    // At this point, black passes white
    [
        // 1: BLUE, 2: PINK, 3: RED, 4: BLACK, 5: WHITE, 6: YELLOW 7: ORANGE, 8: GREEN
        { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
        { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }      
    ],
    // Second 64, 2:49
    // At the end of animation though the top horse goals at 2:56
    [
        // 1: BLUE, 2: PINK, 3: RED, 4: BLACK, 5: WHITE, 6: YELLOW 7: ORANGE, 8: GREEN
        { x: 195, y: 10 }, { x: 150, y: 5 }, { x: 170, y: 25 }, { x: 180, y: 20 },
        { x: 145, y: 20 }, { x: 130, y: 20 }, { x: 165, y: 30 }, { x: 200, y: 30 }      
    ]
];