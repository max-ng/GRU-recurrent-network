 // Max Ng Kei Sing 2016 //

       var rate = 0.01;
       var w_x = Math.random() - 0.5 ;
       var U_x = Math.random() - 0.5 ;
       var U_z = Math.random() - 0.5 ;
       var U_r = Math.random() - 0.5 ;
       var w_r = Math.random() - 0.5 ;
       var w_z = Math.random() - 0.5 ;
       
       var bz = Math.random() - 0.5 ;
       var br = Math.random() - 0.5 ;
       var bx = Math.random() - 0.5 ;


function GRU(input){
  

       var l = input[0].length;
       var z = matrix.zeros(1, l);
       var r = matrix.zeros(1, l);
       var h = Math.random();
       var h0 = matrix.zeros(1, l);
       var h1 = 0.0;
       var h2 = 0.0;
       var h3 = 0.0;
       

       var output = matrix.zeros(1, l);
       var delta ;
       var delta1 ;
       var delta2 ;

      
       for (var i = 0; i < 300; i++) {

         for (var j = 0; j < l -1 ; j++){

            h1 = w_z * input[0][j] + U_z * output[0][j] +bz ;
            z[0][j] = 1 / (1 + Math.exp(-1* h1)); 

            h2 = w_r * input[0][j] + U_r * output[0][j] +br ;
            r[0][j] = 1 / (1 + Math.exp(-1* h2)); 

            h3 = w_x * input[0][j] + U_x * output[0][j] * r[0][j] +bx;
            h0[0][j] = Math.tanh(h3); 

            output[0][j + 1] = (1 - z[0][j]) * output[0][j] + z[0][j] * h0[0][j];

         }
        

         for (var j = 0; j < l - 1 ; j++){

             for (var t = 0; t < j + 1; t++){
                var d = j - t;
                if (t == 0){
                  
                  delta = (output[0][d + 1] - input[0][d + 1]) ;
                    
                }

                else{

                    delta =( z[0][d+1]* (1  -  h0[0][d+1] * h0[0][d+1])* ( U_x * r[0][d+1] + U_x * output[0][d+1] * r[0][d+1] * (1 - r[0][d+1]) * U_r ) + h0[0][d+1]*z[0][d+1] * (1 - z[0][d+1]) *U_z + (1 - z[0][d+1]) + output[0][d+1]  *-1 * z[0][d+1] * (1 - z[0][d+1]) *U_z ) * delta;
                  }

              

                  w_z = w_z - rate * (h0[0][d] - output[0][d]) * z[0][d] * ( 1 - z[0][d]) * delta * input[0][d];
                  U_z = U_z - rate * (h0[0][d] - output[0][d]) * z[0][d] * ( 1 - z[0][d]) * delta * output[0][d];
                  bz =  bz -  rate   * (h0[0][d] - output[0][d]) * z[0][d] * ( 1 - z[0][d]) * delta ;




                  w_r = w_r - rate * z[0][d]* (1 - h0[0][d] * h0[0][d])* U_x * output[0][d] * r[0][d] * ( 1 - r[0][d]) * delta *  input[0][d];
                  U_r = U_r - rate * z[0][d]* (1 - h0[0][d] * h0[0][d])* U_x * output[0][d] * r[0][d] * ( 1 - r[0][d]) * delta * output[0][d];
                  br =  br -  rate * z[0][d]* (1 - h0[0][d] * h0[0][d])* U_x * output[0][d] * r[0][d] * ( 1 - r[0][d]) * delta  ;




                  w_x = w_x - rate * z[0][d]* (1 - h0[0][d] * h0[0][d]) * delta * input[0][d];
                  U_x = U_x - rate * z[0][d]* (1 - h0[0][d] * h0[0][d]) * delta * output[0][d] ;
                   bx = bx -  rate * z[0][d]* (1 - h0[0][d] * h0[0][d]) * delta;
                
            }
         }
      }
      for (var j = 0; j < l -1 ; j++){
           h1 = w_z * input[0][j] + U_z * output[0][j] +bz ;
            z[0][j] = 1 / (1 + Math.exp(-1* h1)); 

            h2 = w_r * input[0][j] + U_r * output[0][j] +br ;
            r[0][j] = 1 / (1 + Math.exp(-1* h2)); 

            h3 = w_x * input[0][j] + U_x * output[0][j] * r[0][j] +bx;
            h0[0][j] = Math.tanh(h3); 

            output[0][j + 1] = (1 - z[0][j]) * output[0][j] + z[0][j] * h0[0][j];
          }
          loss = 0 ;
          for (var j = 0; j < l  ; j++){
              
              loss += (output[0][j] - input[0][j]) * (output[0][j] - input[0][j]);
            }

           if (loss <= 0.5)
               rate = 0.0001;
          for (var j = 0; j < l  ; j++){
              if (output[0][j] > 0.5 ) {
                  output[0][j] = 1; 
                }
              else {
                  output[0][j] = 0;
                }
             
            }



    document.getElementById("result").innerHTML = "output=" + output[0];
    return [output, loss];
  }
