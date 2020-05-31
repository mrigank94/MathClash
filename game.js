function Game(columnSize, rowSize) {
    this.board = new Board(columnSize, rowSize);
    this.score = 0;
    this.target = null;

    this.init = () => {
        this.initBoard();
        this.board.addCells();
        this.render();
        this.startTimer();
        this.initTarget();
        this.board.initCurrentSum();
        this.initScore();
    };

    this.initTarget = () => {
        this.target = 5 + Math.ceil(Math.random() * 50);
        document.getElementById('target').innerText = this.target;
    };

    this.initScore = () => {
        document.getElementById('score').innerText = 'Score : ' + this.score;
    };

    this.startTimer = () => {
        const id = setInterval(() => {

            if (this.board.cells.length === rowSize) {
                alert('Game Over');
                clearInterval(id);
                return;
            }

            this.board.addCells();

            this.render();

        }, 10000);
    };

    this.render = () => {
        for (let i = 0; i < this.board.cells.length; i++) {
            for (let j = 0; j < this.board.cells[i].length; j++) {

                const el = document.getElementById('cell' + i + j);
                el.innerText = this.board.cells[i][j].number;

                if (this.board.cells[i][j].number !== '') {
                    el.classList.add('filled-cell');
                } else if (el.classList.contains('filled-cell')) {
                    el.classList.remove('filled-cell')
                }

                if (this.board.cells[i][j].selected === true) {
                    el.classList.add('selected');
                } else if (el.classList.contains('selected')) {
                    el.classList.remove('selected');
                }
            }
        }
    };

    this.handleClick = (event, i, j) => {
        if (i >= this.board.cells.length || j >= this.board.cells[i].length) {
            console.log(i, j);
            return;
        }

        this.board.cells[i][j].selected = !this.board.cells[i][j].selected;

        if( this.board.cells[i][j].selected) {
            this.board.currentSum += this.board.cells[i][j].number;
        } else {
            this.board.currentSum -= this.board.cells[i][j].number;
        }

        if(this.board.currentSum > this.target) {
            this.board.deselectAllSelected();
            this.board.currentSum = 0;
        }

        if(this.board.currentSum === this.target) {
            const numOfElementsRemoved = this.board.removeSelectedElementsFromBoard();
            this.score += numOfElementsRemoved;
            this.board.currentSum = 0;
            this.initScore();
            this.initTarget();
        }

        this.board.initCurrentSum();
        this.render();
    };

    this.initBoard = () => {
        const board = document.getElementById('board');
        for (let i = 0; i < rowSize; i++) {
            let rowEl = document.createElement('div');
            rowEl.classList.add('row');

            for (let j = 0; j < columnSize; j++) {
                const el = document.createElement('div');
                el.setAttribute('id', 'cell' + i + j);
                el.classList.add('cell');
                el.addEventListener('click', (event) => this.handleClick(event, i, j));
                rowEl.appendChild(el);
            }

            board.appendChild(rowEl);
        }
    }
}