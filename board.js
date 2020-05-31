function Board(columnSize) {

    this.currentSum = 0;
    this.cells = [];

    this.addCells = () => {
        const arr = [];
        for (let i = 0; i < columnSize; i++) {
            arr.push(new Cell());
        }
        this.cells.unshift(arr);
    };

    this.initCurrentSum = () => {
        document.getElementById('currentSum').innerText = this.currentSum;
    };

    this.removeSelectedElementsFromBoard = () => {
        let count = 0;
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                if (this.cells[i][j].selected === true) {
                    count++;
                    this.cells[i][j].number = '';
                    this.cells[i][j].selected = false;
                }
            }
        }
        return count;
    };

    this.deselectAllSelected = () => {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                if (this.cells[i][j].selected === true) {
                    this.cells[i][j].selected = false;
                }
            }
        }
    }
}