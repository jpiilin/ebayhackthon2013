$(function() {
    var snake = {
        level : 1,
        score : 0,
        lives : 3,
        speed : 300,
        size : 3,
        apples : 0,
        applesLeft : 5,
        tale : [],
        time : 0,
        direction : 'up',
        keys : {
            '37' : {
                direction : 'left',
                opposite : 'right'
            },
            '38' : {
                direction : 'up',
                opposite : 'down'
            },
            '39' : {
                direction : 'right',
                opposite : 'left'
            },
            '40' : {
                direction : 'down',
                opposite : 'up'
            }
        },
        keyLock : false,
        lastFrame : new Date().getTime(),
        lastClockUpdate : new Date().getTime(),
        patterns: patterns,

        init : function() {
            this.renderGrid();
            $(window).keydown(function(event) {
                snake.changeDirection(event);
            });

            this.run();
        },

        run : function() {
            clearInterval(this.interval);

            this.speed = 300;
            this.direction = 'up';
            this.applesLeft = 5;
            this.size = 3;
            this.time = 0;
            this.levelCompleted = false;

            if (this.tale.length) {
                this.tale = [];
                $('.s', '#grid').removeClass('s');
            }

            this.apples = 0;
            $('.a', '#grid').removeClass('a');

            if (this.freezeTime) {
                this.freezeTime = false;
                $(this.cells[13]).addClass('w');
            }

            this.updateStatus();
            
            // clear stage
            $('.w', '#grid').removeClass('w');
            
            this.renderWalls(this.patterns.borders);
            this.renderWalls(this.patterns['level' + this.level]);
            this.renderClock();

            this.addApples(1);

            this.interval = setInterval(function() {
                snake.beat();
            }, 100);
        },

        renderGrid : function() {
            var grid = $('#grid');
            for (var i = 0; i < 621; i++) {
                grid.append('<div></div>');
            }
            this.cells = $('#grid div');
        },

        updateStatus : function() {
            var cells = $('#footer b');
            cells[0].innerHTML = this.level;
            cells[1].innerHTML = this.score;
            cells[2].innerHTML = this.lives;
            cells[3].innerHTML = this.applesLeft;
        },

        renderWalls : function(map) {
            var sign, parts, inc = 0;
            for (var i = 0, coords; coords = map[i]; i++) {
                sign = coords[0];
                //console.log(sign, coords);
                if (coords.search('>') > -1) {
                    // horizontal line
                    parts = coords.split('>');
                    for (var n = 0; n < +parts[1]; n++) {
                        $(this.cells[n + +parts[0]]).addClass('w');
                    }
                } else if (coords.search('v') > -1) {
                    // vertical line
                    parts = coords.split('v');
                    inc = +parts[0];
                    for (var n = 0; n < +parts[1]; n++) {
                        $(this.cells[inc]).addClass('w');
                        inc += 27;
                    }
                } else {
                    // point
                    $(this.cells[coords]).addClass('w');
                }
            }
        },

        changeDirection : function(key) {
            var keyCode = this.keys[key.keyCode];
            //console.log('keyLock:', this.keyLock);
            if (!this.keyLock && keyCode && keyCode.opposite != this.direction) {
                this.keyLock = true;
                this.direction = keyCode.direction;
                //console.log('change direction to:', this.direction);
            }
        },

        beat : function() {
            var currentTime = new Date().getTime();
            if (currentTime - this.lastFrame >= this.speed) {
                // console.log('beat', this.lastFrame);
                this.lastFrame = currentTime;
                this.move();
            }

            var speedCoef = (this.speed > 0) ? this.speed * 3 : 300;
            if (!this.freezeTime && currentTime - this.lastClockUpdate >= speedCoef) {
                this.lastClockUpdate = currentTime;
                this.reduceTime();
            }
        },

        move : function() {
            if (this.levelCompleted && this.tale.length == 1) {
                alert('level completed!');
                this.level++;
                this.run();
            }
            var newCell, canibalism = false;

            if (!this.tale.length) {
                newCell = 580;
            } else {
                if (this.direction == 'left') {
                    // move left
                    newCell = this.tale[0] - 1;
                } else if (this.direction == 'up') {
                    // move up
                    newCell = this.tale[0] - 27;
                } else if (this.direction == 'right') {
                    // move right
                    newCell = this.tale[0] + 1;
                } else if (this.direction == 'down') {
                    // move down
                    newCell = this.tale[0] + 27;
                }
            }

            if ($(this.cells[newCell]).hasClass('s')) {
                // snake hit
                canibalism = true;
            }

            // pull head
            if (newCell > 0) {
                this.tale.unshift(newCell);
                $(this.cells[newCell]).addClass('s');
            } else if (!this.levelCompleted) {
                // level completed
                this.levelCompleted = true;
                this.freezeTime = true;
                this.speed = 100;
            }

            if (this.tale.length > this.size || this.levelCompleted) {
                // pull tale
                $(this.cells[this.tale[this.tale.length - 1]]).removeClass('s');
                this.tale.pop();
            }

            if ($(this.cells[newCell]).hasClass('a')) {
                // grab apple
                $(this.cells[newCell]).removeClass('a');
                this.applesLeft--;
                this.apples--;
                this.score += 10;
                this.size += 3;

                if (this.applesLeft == 0) {
                    $('.t', '#grid').removeClass('t');
                    this.freezeTime = true;
                    $(this.cells[13]).removeClass('w');
                } else {
                    if (this.apples == 0) {
                        this.addApples(1);
                        this.renderClock();
                    }
                }
                
                this.updateStatus();
            }

            if ($(this.cells[newCell]).hasClass('w') || canibalism) {
                // wall hit
                this.lives--;
                if (this.lives == 0) {
                    var dialog = confirm("Game Over! Try again?");
                    if (dialog) { 
                        this.level = 1;
                        this.lives = 3;
                        this.score = 0;
                        this.run();
                    }else {
                        clearInterval(this.interval);
                    }
                }else {
                    alert('ops!');
                    this.run();
                }
            }

            this.keyLock = false;
        },

        renderClock : function() {
            this.time = 0;
            for (var i = 0; i < 27; i++) {
                $(this.cells[i * 27]).addClass('t');
                $(this.cells[i * 27 - 1]).addClass('t');
            }
        },

        reduceTime : function() {
            var rightColCell = (this.time == 0) ? 26 : (this.time + 1) * 27 - 1;
            $(this.cells[this.time * 27]).removeClass('t');
            $(this.cells[rightColCell]).removeClass('t');
            this.time++;
            console.log('time:', this.time);
            if (this.time == 23) {
                if (this.speed > 0) {
                    this.speed -= 100;
                }
                this.renderClock();
                this.addApples(3);
            }
        },

        addApples : function(number) {
            var clearCells = this.shuffle($('div:not(.s):not(.w):not(.a)', '#grid'));
            for (var i = 0; i < number; i++) {
                $(clearCells[i]).addClass('a');
                this.apples++;
            }

            if (number > 1) {
                this.applesLeft += number;
            }
        },

        shuffle : function(cells) {
            var i = cells.length;
            if (i == 0)
                return false;
            while (--i) {
                var j = Math.floor(Math.random() * (i + 1 ));
                var tempi = cells[i];
                var tempj = cells[j];
                cells[i] = tempj;
                cells[j] = tempi;
            }

            return cells;
        }
    };

    snake.init();
}); 