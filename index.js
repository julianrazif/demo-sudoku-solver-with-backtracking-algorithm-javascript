// board sudoku 3 x 3
// panjang board = 3 x 3 = 9
// lebar board = 3 x 3 = 9
// panjang karakter angkanya = 3 x 3 x 3 x 3

// [
//     [1, 0, 5, 8, 0, 2, 0, 0, 0],
//     [0, 9, 0, 0, 7, 6, 4, 0, 5],
//     [2, 0, 0, 4, 0, 0, 8, 1, 9],
//     [0, 1, 9, 0, 0, 7, 3, 0, 6],
//     [7, 6, 2, 0, 8, 3, 0, 9, 0],
//     [0, 0, 0, 0, 6, 1, 0, 5, 0],
//     [0, 0, 7, 6, 0, 0, 0, 3, 0],
//     [4, 3, 0, 0, 2, 0, 5, 0, 1],
//     [6, 0, 0, 3, 0, 8, 9, 0, 0]
// ]



// INPUT

// angka sudoku
var angkaSudoku = '105802000090076405200400819019007306762083090000061050007600030430020501600308900';



// PROSES

// fungsi untuk membuat board kosong
// baris = 9
boardKosong = (baris) => {

    let board = [];

    for (let i = 0; i < baris; i++) {
        board.push([]);
    }

    return board;
}

// fungsi untuk mengisi board kosong
// dengan angka sudoku sesuai inputan
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

// fungsi untuk memeriksa
// apakah tidak ada angka yang sama
// secara horizontal
isBarisValid = (board) => {

    for (let x = 0; x < board.length; x++) {
        
        let temp = [];

        for (let y = 0; y < board[x].length; y++) {

            if (temp.includes(board[x][y])) {

                return false;
            }
            else if (board[x][y] !== 0) {

                temp.push(board[x][y]);
            }
        }
    }

    return true;
}

// fungsi untuk memeriksa
// apakah tidak ada angka yang sama
// secara vertikal
isKolomValid = (board) => {

    for (let y = 0; y < board[0].length; y++) {

        let temp = [];

        for (let x = 0; x < board.length; x++) {

            if (temp.includes(board[x][y])) {

                return false;

            }
            else if (board[x][y] !== 0) {

                temp.push(board[x][y]);
            }
        }
    }

    return true;
}

// fungsi untuk memeriksa
// apakah tidak ada angka yang sama
// secara petak kecil di board
isPetakValid = (board) => {

    for (let x = 0; x < board.length; x += Math.sqrt(board.length)) {
        
        for (let y = 0; y < board[x].length; y += Math.sqrt(board.length)) {
          
            let temp = [];
          
            for (let xz = x; xz < (x + Math.sqrt(board.length)); xz++) {
            
                for (let yz = y; yz < (y + Math.sqrt(board.length)); yz++) {
                
                    if (temp.includes(board[xz][yz])) {
                
                        return false;
                    }
                    else if (board[xz][yz] !== 0) {
                        
                        temp.push(board[xz][yz]);
                    }
                }
            }
        }
    }

    return true;
}

// fungsi untuk validasi board sudoku
onlyValidCandidates = (boards) => {
    
    return boards.filter((board) => {
      
        return isBarisValid(board) && isKolomValid(board) && isPetakValid(board);
    })
}

// fungsi untuk memeriksa
// apakah board sudoku sudah solved
isSolved = (board) => {

    for (let x = 0; x < board.length; x++) {
      
        for (let y = 0; y < board[x].length; y++) {
        
            if (board[x][y] === 0) {
          
                return false;
            }
        }
    }

    return true;
}

// fungsi untuk mengembalikan
// array [x,y] x mewakili baris,
// y mewakili kolom untuk
// nilai angka sudoku yang bernilai 0
visitedNode = (board) => {
    
    for (let x = 0; x < board.length; x++) {
      
        for (let y = 0; y < board[x].length; y++) {
        
            if (board[x][y] === 0) {
          
                return [x, y];
            }
        }
    }  
}

// fungsi backtracking
candidates = (board) => {
    
    let theCandidates = [];
    
    let coordinate = visitedNode(board);
  
    if (coordinate.length !== undefined) {
      
        let x = coordinate[0];
      
        let y = coordinate[1];
  
        for (let i = 1; i <= board.length; i++) {
        
            let candidate = [...board];
        
            let row = [...candidate[x]];
        
            row[y] = i;
        
            candidate[x] = row;
        
            theCandidates.push(candidate);
        }
    }
    
    return theCandidates;
}

// fungsi problem solver
problemSolver = (board) => {

    if (isSolved(board)) {
      
        return board;
    }

    let possibilities = candidates(board);
    
    let validCandidates = onlyValidCandidates(possibilities);
  
    return searchForSolution(validCandidates);
}

// fungsi backtracking
searchForSolution = (boards) => {

    if (boards.length < 1) {

        return false;
    }
  
    let firstCandidate = boards.shift();
    
    let tryPath = problemSolver(firstCandidate);
  
    if (tryPath != false) {

        return tryPath;
    } 
    else {
      
        return searchForSolution(boards);
    }  
}


// OUTPUT
// [
//     [1, 4, 5, 8, 9, 2, 6, 7, 3],
//     [8, 9, 3, 1, 7, 6, 4, 2, 5],
//     [2, 7, 6, 4, 3, 5, 8, 1, 9],
//     [5, 1, 9, 2, 4, 7, 3, 8, 6],
//     [7, 6, 2, 5, 8, 3, 1, 9, 4],
//     [3, 8, 4, 9, 6, 1, 7, 5, 2],
//     [9, 5, 7, 6, 1, 4, 2, 3, 8],
//     [4, 3, 8, 7, 2, 9, 5, 6, 1],
//     [6, 2, 1, 3, 5, 8, 9, 4, 7]
// ]

console.log(problemSolver(...[buatBoard()]));