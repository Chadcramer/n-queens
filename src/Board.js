// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
    
      // set a new var
      // get the row set to new var
      let row = this.get(rowIndex)
      // need a counter
      let counter = 0;
      // check if the row as a 1 in it
      for(var i = 0; i < row.length; i++){
        if(row[i] === 1){
          counter++;
        }
      }
      // if more that 1 one change the false to true
      // return back true or false
      if(counter > 1){
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // get a list of keys
      let keys = Object.keys(this.attributes)
      keys.pop();
      // check every key:row
      for(var i = 0; i < keys.length; i++){
        if(this.hasRowConflictAt(keys[i]) === true){
          return true;
        }
      }
      // pass into hasrowconflicat function
      // if it return true or false
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // set a col var
      let col = [];
      let index = colIndex;
      // let keys = Object.keys(this.attributes)
      let colCount = this.attributes.n;
      let counter = 0;
      
      for(var i = 0; i < colCount; i++){
        col.push(this.attributes[i][index])
      }

      for(var i = 0; i < col.length; i++){
        if(col[i] === 1){
          counter++;
        }
      }

      if(counter > 1){
        return true;
      }

      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      let keys = Object.keys(this.attributes);
      keys.pop();

      for(var i = 0; i < keys.length; i++){
        if(this.hasColConflictAt(keys[i]) === true){
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    
    let diagonal = [];
    let index = majorDiagonalColumnIndexAtFirstRow;
    let counter = 0;
    let n = this.attributes.n;
    let key = 0;
    // console.log('index', index)
    // console.log('I AM INSIDE HASMAJOR')
    // left side
    // if the index = 0 - left side
    if(index  < 1){
      // console.log('i am inside major diagola left')
      // set key 0, set index 0
      //repeat untill key === n-1
      while(key < n){
        // set a diagonal var as an empty array
        diagonal = [];
        let indexIncrementer = index;
        let keyIncrementer = key;
        counter = 0;
        
        // run till key === n-1
        while(keyIncrementer < n){
          // push into array the values
          // push in key,index
          diagonal.push(this.attributes[keyIncrementer][indexIncrementer]);
          // increment key++, index++
          indexIncrementer++;
          keyIncrementer++;
        }
    
      //set new key++
        key++
        for(let i = 0; i < diagonal.length; i++){
          if(diagonal[i] === 1){
            counter++;
          }
        }
        if(counter > 1){
          return true;
        }
      }
    }

    // right side
    if(index > 0){
      diagonal = [];
      let indexIncrementer = index;
      let keyIncrementer = key;
      while(indexIncrementer < n){
        diagonal.push(this.attributes[keyIncrementer][indexIncrementer]);
        indexIncrementer++;
        keyIncrementer++;
      }
      for(let i = 0; i < diagonal.length; i++){
        if(diagonal[i] === 1){
          counter++;
        }
      }
      if(counter > 1){
        return true;
      }
    }


      return false;
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // let keys = Object.keys(this.attributes
      let keys = Object.keys(this.attributes)
      keys.pop();
      for(var i = 0; i < keys.length; i++){
        if(this.hasMajorDiagonalConflictAt(keys[i]) === true){
          return true;
        }
      }

      
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let diagonal = [];
      let index = minorDiagonalColumnIndexAtFirstRow;
      let counter = 0;
      let n = this.attributes.n;
      let key = n - 1;

      // left - include middle row and all rows to the left
      if(index < 1){
        console.log('left of minor diagonal')
        while(key > 0){
          diagonal = [];
          let indexIncrementer = index;
          let keyDecrementer = key;
          counter = 0;

          while(keyDecrementer >= 0){
            diagonal.push(this.attributes[keyDecrementer][indexIncrementer]);
            indexIncrementer++;
            keyDecrementer--;
          }
          key--;
          for(let i = 0; i < diagonal.length; i++){
            if(diagonal[i] === 1){
              counter++;
            }
          }
          if(counter > 1){
            return true;
          }
        }
      }

     // right side - one row at a time
      if(index > 0) {
        console.log('right of minor diagonal')
        diagonal = [];
        let indexIncrementer = index;
        let keyDecrementer = key;
        while(indexIncrementer < n){
          diagonal.push(this.attributes[keyDecrementer][indexIncrementer]);
          indexIncrementer++;
          keyDecrementer--;
        }
        for(let i = 0; i < diagonal.length; i++){
          if(diagonal[i] === 1){
            counter++;
          }
        }
        if(counter > 1){
          return true;
        }

      }



      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let keys = Object.keys(this.attributes)
      keys.pop();
      for(var i = 0; i < keys.length; i++){
        if(this.hasMinorDiagonalConflictAt(keys[i]) === true){
          return true;
        }
      }
      return false; 
    }



    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
