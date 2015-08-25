/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

window.findNRooksSolution = function(n) {
  var solutions = [];
  var board = new Board({n:n});

  var operation = function(rowIndex) {
    //finished recursion
    if (rowIndex === n) {
      var temp = [];
      _.each(board.rows(),function(row){
        temp.push(row.slice())
      });
      solutions.push(temp);
      return;
    }
    
    // Iterating over columns
    for (var index = 0;index < n; index++) {
      board.togglePiece(rowIndex,index);
      if (!board.hasColConflictAt(index)){
        operation(rowIndex+1);
      }
      //revert back
      //untoggle each piece for next iteration
      board.togglePiece(rowIndex,index);
    }
  }

  operation(0);

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions[0]));
  return solutions[0];
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = [];
  var board = new Board({n:n});

  var operation = function(rowIndex) {
    //finished recursion
    if (rowIndex === n) {
      var temp = [];
      _.each(board.rows(),function(row){
        temp.push(row.slice())
      });
      solutions.push(temp);
      return;
    }
    
    // Iterating over columns
    for (var index = 0;index < n; index++) {
      board.togglePiece(rowIndex,index);
      if (!board.hasColConflictAt(index)){
        operation(rowIndex+1);
      }
      //revert back
      //untoggle each piece for next iteration
      board.togglePiece(rowIndex,index);
    }
  }

  operation(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
  return solutions.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = [];
  var board = new Board({n:n});

  var operation = function(rowIndex) {
    //finished recursion
    if (rowIndex === n) {
      var temp = [];
      _.each(board.rows(),function(row){
        temp.push(row.slice())
      });
      solutions.push(temp);
      return;
    }
    
    // Iterating over columns
    for (var colIndex = 0;colIndex < n; colIndex++) {
      board.togglePiece(rowIndex,colIndex);
      // console.log(rowIndex);
      if (!board.hasColConflictAt(colIndex) && !board.hasMajorDiagonalConflictAt(colIndex - rowIndex) && !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)){
        operation(rowIndex+1);
      }
      //revert back
      //untoggle each piece for next iteration
      board.togglePiece(rowIndex,colIndex);
    }
  }

  if (n !== 2 && n !== 3) {
    operation(0);
  } else {
    return makeEmptyMatrix(n);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions[0]));
  return solutions[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
