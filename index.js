// board sudoku 3 x 3
// panjang board = 3 x 3 = 9
// lebar board = 3 x 3 = 9
// panjang karakter angkanya = 3 x 3 x 3 x 3

// [
//     [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [1, 2, 3, 4, 5, 6, 7, 8, 9]
// ]



// INPUT

// angka sudoku
var angkaSudoku = '105802000090076405200400819019007306762083090000061050007600030430020501600308900';



// PROSES

// board kosong
// baris = 9
boardKosong = (baris) => {

    let board = [];

    for (let i = 0; i < baris; i++) {
        board.push([]);
    }

    return board;
}

buatBoard = () => {

    // panjang angka sudoku = 81
    // baris = 9
    let baris = Math.sqrt(angkaSudoku.length);
    
    // [[] ...]
    let board = boardKosong(baris);

    // x adalah baris
    let x = 0;
    // y adalah column
    let y = 0;

    // iterasi angka sudoku 105802 ...
    for (let i = 0; i < angkaSudoku.length; i++) {
        
        // isi baris ke x dengan urutan angka sudoku ke i
        board[x].push(Number(angkaSudoku[i]));

        // jika column adalah 8 
        if (y === baris - 1) {
            // set column menjadi 0
            y = 0;
            // baris ditambah 1
            x++;
        }
        // jika tidak
        else {
            // column ditambah 1
            y++;
        }
    }

    return board;
}

console.log(buatBoard());