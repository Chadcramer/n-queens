/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of 
//them can attack each other



window.findNRooksSolution = function(n) {

  var board = new Board({n:n});
  var solution = [];

  // if(n === 1){
  //   solution.push(board)
  // }

  //if n === 1 return 1


  // loop throuth the board and toggle pices on and off
  let index = 0
  let key = 0

  while(key < n){
    index = 0;
    while(index < n) {
      board.togglePiece(index, key)
      if(board.hasRowConflictAt(index) || board.hasColConflictAt(key)){
        board.togglePiece(index, key)
      }
      index++;
    }
    solution.push(board.attributes[key])
    key++;
  }
    // check for any conflicts
  // when you reach end of row move to next row
  // ens of the baord stop

 
  
  
  

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;
  let end = n-1;
  let board = new Board({n:n});




  if(n === 1){
    return 1
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({n:n});
  var solution = [];

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  
  
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
