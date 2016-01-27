function matrix(){

    this.init = function(y, x){
        var M = new Array(y);
        for (var k = 0; k < y ; k ++)
        	M[k] = new Array(x);
        return M ;
     }
}

matrix.prototype.zeros = function(y, x){
    	var M = this.init(y, x);
  	    for(var i = 0; i < y; i++){
	        for(var j = 0; j < x; j++)
	            M[i][j] = 0.0; 
        } 
        return M ;  
    } 

matrix.prototype.random = function(y, x){
    	var M = this.init(y, x);
  	    for(var i = 0; i < y; i++){
	        for(var j = 0; j < x; j++)
	            M[i][j] = Math.random(); 
        } 
        return M ;  
    }  

matrix.prototype.dot = function(A, B){
	if (B[0].length === undefined)
		var l = 1;
	else
		var l = B[0].length;
    if (A[0].length === undefined)
		var r = 1;
	else
        var r = A[0].length;
	var C = this.zeros(A.length, l);
	for(var i = 0; i < A.length;i ++){
		for(var j = 0; j < l;j ++){
			for(var s = 0; s < r;s ++){
				
                C[i][j] += A[i][s] * B[s][j];

            }
        }
    }
    return C;
}

matrix.prototype.add = function(A, B){

	if (B[0].length === undefined)
		var l = 1;
	else
		var l = B[0].length;
    if (A[0].length === undefined)
		var r = 1;
	else
        var r = A[0].length;

	if(A.length <= B.length)
		var s = B.length;
	else
		var s = A.length;
	if(r <= l)
		var d = l;
	else 
		var d = r;
    var C = this.zeros(s, d);
	for (var i = 0;i < s;i++){
		for(var j = 0;j < d;j++){
			if(A[i] !== undefined){
				if(A[i][j]!== undefined)
				C[i][j] += A[i][j];
		     }
			if(B[i]!== undefined){
				if(B[i][j]!== undefined)
				C[i][j] += B[i][j];
		     }
		} 
	}
    return C;   
}

matrix.prototype.sigmoid = function(A){

	if (A[0].length === undefined)
		var l = 1;
	else
		var l = A[0].length;
    
    var C = this.zeros(A.length, l);
	for (var i = 0;i < A.length;i++){
		for(var j = 0;j < l;j++){
			C[i][j] = 1 / (1 + Math.exp(-1 * A[i][j]));
		} 
	}
    return C;   
}

matrix.prototype.transpose = function(A){
	if (A[0].length === undefined)
		var l = 1;
	else
		var l = A[0].length;
    
    var C = this.zeros(l, A.length);
	for (var i = 0;i < A.length;i++){
		for(var j = 0;j < l;j++){
			C[j][i] = A[i][j];          																																																																																																																																																																																																																																																																																				
		} 
	}
    return C;   
}
var matrix = new matrix();