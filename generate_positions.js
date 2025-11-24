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
        positions: []
    },
    // At 2:23 in the video (44 seconds into animation), blue and white are competing.
    {
        second: 44,
        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: []
    },
    // At 2:24 in the video (45 seconds into animation), blue passes white.
    {
        second: 45,
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: ORANGE 7: YELLOW, 8: GREEN
        positions: []
    },
    // At 2:38 in the video (59 seconds into animation), yellow passes orange.
    {
        second: 59,
        // 1: PINK, 2: BLUE, 3: WHITE, 4: RED, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: []
    },
    // At 2:44 in the video (65 seconds into animation), blue catches up to pink.
    {
        second: 65,
        // 1: PINK, 2: BLUE, 3: RED, 4: WHITE, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: []
    },
    // At 2:45 in the video (66 seconds into animation), blue passes pink.
    {
        second: 66,
        // 1: BLUE, 2: PINK, 3: RED, 4: WHITE, 5: BLACK, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: []
    },
    // At 2:47 in the video (68 seconds into animation), black passes white.
    {
        second: 68,
        // 1: BLUE, 2: PINK, 3: RED, 4: BLACK, 5: WHITE, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: []
    },
    // At 2:49 in the video (70 seconds into animation).
    {
        second: 70,
        // 1: BLUE, 2: PINK, 3: RED, 4: BLACK, 5: WHITE, 6: YELLOW 7: ORANGE, 8: GREEN
        positions: []
    }
];

const horseOrder = ['white', 'black', 'red', 'blue', 'yellow', 'green', 'orange', 'pink'];
const originalY = {
    white: 10, black: 5, red: 25, blue: 20, yellow: 20, green: 20, orange: 30, pink: 30
};

const rankingsBySecond = {
    33: ['PINK', 'WHITE', 'BLUE', 'RED', 'BLACK', 'ORANGE', 'YELLOW', 'GREEN'],
    44: ['PINK', 'WHITE', 'BLUE', 'RED', 'BLACK', 'ORANGE', 'YELLOW', 'GREEN'],
    45: ['PINK', 'BLUE', 'WHITE', 'RED', 'BLACK', 'ORANGE', 'YELLOW', 'GREEN'],
    59: ['PINK', 'BLUE', 'WHITE', 'RED', 'BLACK', 'YELLOW', 'ORANGE', 'GREEN'],
    65: ['PINK', 'BLUE', 'RED', 'WHITE', 'BLACK', 'YELLOW', 'ORANGE', 'GREEN'],
    66: ['BLUE', 'PINK', 'RED', 'WHITE', 'BLACK', 'YELLOW', 'ORANGE', 'GREEN'],
    68: ['BLUE', 'PINK', 'RED', 'BLACK', 'WHITE', 'YELLOW', 'ORANGE', 'GREEN'],
    70: ['BLUE', 'PINK', 'RED', 'BLACK', 'WHITE', 'YELLOW', 'ORANGE', 'GREEN']
};

const totalDistance = 1500;
const totalTime = 70;
const gap = 5;

for (let i = 1; i < horsePositions.length; i++) {
    const frame = horsePositions[i];
    const second = frame.second;
    const rankings = rankingsBySecond[second];
    
    if (!rankings) continue;

    const x_base = (second / totalTime) * totalDistance;
    
    const positions = {};
    for (let j = 0; j < rankings.length; j++) {
        const horseName = rankings[j].toLowerCase();
        positions[horseName] = {
            x: Math.round(x_base - (j * gap)),
            y: originalY[horseName]
        };
    }

    const newPositions = [];
    for(const name of horseOrder) {
        newPositions.push(positions[name]);
    }
    frame.positions = newPositions;
}

let outputString = `const horsePositions = [\n`;

horsePositions.forEach((frame, index) => {
    outputString += `    {\n`;
    outputString += `        second: ${frame.second},\n`;
    // Add the comments back in for the second 0 position
    if (frame.second === 0) {
      outputString += `        // 1: PINK, 2: WHITE, 3: BLUE, 4: RED, 5: ORANGE, 6: BLACK, 7: YELLOW, 8: GREEN\n`;
    } else {
        // Add comments for other seconds if available in rankingsBySecond
        const rankings = rankingsBySecond[frame.second];
        if (rankings) {
            outputString += `        // 1: ${rankings[0]}, 2: ${rankings[1]}, 3: ${rankings[2]}, 4: ${rankings[3]}, 5: ${rankings[4]}, 6: ${rankings[5]}, 7: ${rankings[6]}, 8: ${rankings[7]}\n`;
        }
    }


    outputString += `        positions: [`;
    const positionStrings = frame.positions.map(p => `{ x: ${p.x}, y: ${p.y} }`);

    // Split the positions into lines of 4 items each, or fewer if not enough items
    for (let i = 0; i < positionStrings.length; i += 4) {
        if (i === 0) {
            outputString += positionStrings.slice(i, i + 4).join(', ');
            // Add a comma after the first line if there are more elements
            if (positionStrings.length > 4) {
                outputString += `,`;
            }
        } else {
            outputString += `\n            ${positionStrings.slice(i, i + 4).join(', ')}`;
        }
    }
    outputString += `]\n`;
    outputString += `    }${index < horsePositions.length - 1 ? ',' : ''}\n`;
});

outputString += `];`;

console.log(outputString);
