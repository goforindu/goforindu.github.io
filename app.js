var app = angular.module('barcodeSlipApp', ['ngMessages','ngStorage']);
app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});

app.filter('limitRow', function() {
  return function(input, no_of_sticker) {
    var questiont = parseInt(no_of_sticker/4);
    var remainder=parseInt(no_of_sticker%4);
    var count=0;
    if(remainder==0)
    {
      count=questiont;
    }
    else{
      count=questiont+1;
    }
    for (var i=0; i<10; i++)
      input.push(i);
    return input;
  };
});

app.filter('limitTd',function() {
  return function(input, no_of_sticker) {

    for(var k=0; k<4; k++)
        input.push(k);
    return input;
  };
});

app.controller('barcodeCtrl', ['$scope', '$localStorage', function($scope,$localStorage) {
$scope.sticker_count=5;
$scope.rows_count=0;
 $scope.IsVisible = false;
 //$scope.prev_sticker_count=0;

// console.log("$localStorage.prev_row_count"+$localStorage.prev_row_count);
    $scope.generateBarcode = function() {
     $scope.IsVisible = true;
     $scope.showSticker();
  return JsBarcode("#barcode", $scope.product_id,{
  width:1.2,
  height:20,
  fontSize:12,
  textMargin:1.2,
  marginTop:-1,
  marginLeft:0
});

    },
   $scope.printBarcode=function(){
    var count_my_sticker=parseInt($localStorage.prev_row_count);
    if(count_my_sticker<10)
    {
      $localStorage.prev_row_count=parseInt($scope.rows_count)+parseInt($localStorage.prev_row_count);
    }
    else{
      $localStorage.prev_row_count=0;
    }

console.log( $localStorage.prev_sticker_count);
   window.print();
 },

 $scope.displaySticker=function(){
   var x=angular.element(document).find("td");
    var initial_val=$scope.prev_sticker_count;


   var lt=40-$scope.sticker_count;
     for(l=initial_val;l<lt;l++)
     {
       x[l].style.display="none";
     }
 },
  $scope.showSticker=function(){

    var row, rows;
if($localStorage.prev_row_count!=null)
{
  var x=parseInt($scope.rows_count)+parseInt($localStorage.prev_row_count);
  if(x>10)
  {
     $localStorage.prev_row_count=0;
  }

  //$localStorage.prev_row_count=$scope.rows_count;
}
else {
   $localStorage.prev_row_count=0;
}
// find all of the table rows that are below $elem
console.log("$localStorage.prev_row_count"+$localStorage.prev_row_count);
rows = angular.element(document).find('tr');
angular.element(document).find('tr').css("visibility","hidden");
var start_loop=parseInt($localStorage.prev_row_count);
console.log("start_loop"+start_loop);
var loop_condition=(parseInt($scope.rows_count)+parseInt($localStorage.prev_row_count));
console.log("loop_condition"+loop_condition);
for(var i = start_loop; i < loop_condition; i++) {
  // get a jqLite reference to this row
    angular.element(document).find(rows[i]).css("visibility","visible");
    }
}




}]);
