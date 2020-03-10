
// code for particle background

var canvas = document.getElementById("nokey"),
    can_w = parseInt(canvas.getAttribute("width")),
    can_h = parseInt(canvas.getAttribute("height")),
    ctx = canvas.getContext("2d");

// console.log(typeof can_w);

var ball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 0,
        alpha: 1,
        phase: 0
    },
    ball_color = {
        r: 207,
        g: 255,
        b: 4
    },
    R = 2,
    balls = [],
    alpha_f = 0.03,
    alpha_phase = 0,
    // Line
    link_line_width = 0.8,
    dis_limit = 260,
    add_mouse_point = true,
    mouse_in = false,
    mouse_ball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 0,
        type: "mouse"
    };

// Random speed
function getRandomSpeed(pos) {
    var min = -1,
        max = 1;
    switch (pos) {
        case "top":
            return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
            break;
        case "right":
            return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
            break;
        case "bottom":
            return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
            break;
        case "left":
            return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
            break;
        default:
            return;
            break;
    }
}
function randomArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumFrom(min, max) {
    return Math.random() * (max - min) + min;
}
console.log(randomNumFrom(0, 10));
// Random Ball
function getRandomBall() {
    var pos = randomArrayItem(["top", "right", "bottom", "left"]);
    switch (pos) {
        case "top":
            return {
                x: randomSidePos(can_w),
                y: -R,
                vx: getRandomSpeed("top")[0],
                vy: getRandomSpeed("top")[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            };
            break;
        case "right":
            return {
                x: can_w + R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed("right")[0],
                vy: getRandomSpeed("right")[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            };
            break;
        case "bottom":
            return {
                x: randomSidePos(can_w),
                y: can_h + R,
                vx: getRandomSpeed("bottom")[0],
                vy: getRandomSpeed("bottom")[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            };
            break;
        case "left":
            return {
                x: -R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed("left")[0],
                vy: getRandomSpeed("left")[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            };
            break;
    }
}
function randomSidePos(length) {
    return Math.ceil(Math.random() * length);
}

// Draw Ball
function renderBalls() {
    Array.prototype.forEach.call(balls, function(b) {
        if (!b.hasOwnProperty("type")) {
            ctx.fillStyle =
                "rgba(" +
                ball_color.r +
                "," +
                ball_color.g +
                "," +
                ball_color.b +
                "," +
                b.alpha +
                ")";
            ctx.beginPath();
            ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    });
}

// Update balls
function updateBalls() {
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b) {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x > -50 && b.x < can_w + 50 && b.y > -50 && b.y < can_h + 50) {
            new_balls.push(b);
        }

        // alpha change
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
        // console.log(b.alpha);
    });

    balls = new_balls.slice(0);
}

// loop alpha
function loopAlphaInf() {}

// Draw lines
function renderLines() {
    var fraction, alpha;
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
            fraction = getDisOf(balls[i], balls[j]) / dis_limit;

            if (fraction < 1) {
                alpha = (1 - fraction).toString();

                ctx.strokeStyle = "rgba(150,150,150," + alpha + ")";
                ctx.lineWidth = link_line_width;

                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// calculate distance between two points
function getDisOf(b1, b2) {
    var delta_x = Math.abs(b1.x - b2.x),
        delta_y = Math.abs(b1.y - b2.y);

    return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
}

// add balls if there a little balls
function addBallIfy() {
    if (balls.length < 20) {
        balls.push(getRandomBall());
    }
}

// Render
function render() {
    ctx.clearRect(0, 0, can_w, can_h);

    renderBalls();

    renderLines();

    updateBalls();

    addBallIfy();

    window.requestAnimationFrame(render);
}

// Init Balls
function initBalls(num) {
    for (var i = 1; i <= num; i++) {
        balls.push({
            x: randomSidePos(can_w),
            y: randomSidePos(can_h),
            vx: getRandomSpeed("top")[0],
            vy: getRandomSpeed("top")[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10)
        });
    }
}
// Init Canvas
function initCanvas() {
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    can_w = parseInt(canvas.getAttribute("width"));
    can_h = parseInt(canvas.getAttribute("height"));
}
window.addEventListener("resize", function(e) {
    console.log("Window Resize...");
    initCanvas();
});

function goMovie() {
    initCanvas();
    initBalls(30);
    window.requestAnimationFrame(render);
}
goMovie();

// Mouse effect
canvas.addEventListener("mouseenter", function() {
    console.log("mouseenter");
    mouse_in = true;
    balls.push(mouse_ball);
});
canvas.addEventListener("mouseleave", function() {
    console.log("mouseleave");
    mouse_in = false;
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b) {
        if (!b.hasOwnProperty("type")) {
            new_balls.push(b);
        }
    });
    balls = new_balls.slice(0);
});
canvas.addEventListener("mousemove", function(e) {
    var e = e || window.event;
    mouse_ball.x = e.pageX;
    mouse_ball.y = e.pageY;
    // console.log(mouse_ball);
});



















//code for button
$('.button--bubble').each(function() {
  var $circlesTopLeft = $(this).parent().find('.circle.top-left');
  var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');

  var tl = new TimelineLite();
  var tl2 = new TimelineLite();

  var btTl = new TimelineLite({ paused: true });

  tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
  tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
  tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
  tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
  tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
  tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

  var tlBt1 = new TimelineLite();
  var tlBt2 = new TimelineLite();
  
  tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
  tlBt1.add(tl);

  tl2.set($circlesBottomRight, { x: 0, y: 0 });
  tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
  tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
  tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
  tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
  tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
  tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');
  
  tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
  tlBt2.add(tl2);

  btTl.add(tlBt1);
  btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
  btTl.add(tlBt2, 0.2);
  btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

  btTl.timeScale(2.6);

  $(this).on('mouseover', function() {
    btTl.restart();
  });
});






















