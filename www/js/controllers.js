angular.module('starter.controllers', [])


$scope.endQuiz = false;


$scope.initialization = function(){

  $http({
        method: 'GET',
        url: '../questions/module-one.json',
        headers: {'Content-Type': 'application/json'}
    })
    .then(function(response, status) {

      $scope.questions = response.data;
      $scope.question  = $scope.questions[0];

    }, function(response, status){
      alert('erro');
    });
}


$scope.showAnswer = function(bool){

  if(bool){
    $scope.popupCorrect = $ionicPopup.show({
        template: 'Resposta correta',
        scope: $scope,
        buttons: [
          {
            text: 'Menu',
            type: 'blue-std white',
            onTap: function(e) {
              cancela();
            }
          },
          {
            text: 'Próxima questão',
            type: 'blue-dark white',
            onTap: function(e) {
              changeQuestion();
            }
          }
        ]
      });
  }
  else {
    $scope.popupWrong = $ionicPopup.show({
        template: '<i style="color:#373737 margin-right: 0.5em" class="icon ion-close-circled"></i><span style="color:#373737"> Resposta errada</span>',
        scope: $scope,
        buttons: [
          {
            text: 'Menu',
            type: 'blue-std white',
            onTap: function(e) {
              cancela();
            }
          },
          {
            text: 'Avançar',
            type: 'blue-dark white',
            onTap: function(e) {
              changeQuestion();
            }
          }
        ]
      });
  }

}

function changeQuestion(){



  var index = $scope.questions.indexOf($scope.question);
  var numberOfQuestions = $scope.questions.length -1;


  console.log(numberOfQuestions);
  //Last question available
  if (index === numberOfQuestions){
    $scope.endQuiz = true;
    $scope.modalSimpleQuestion.hide();
    $scope.question = $scope.questions[0];

  }
  else{
    $scope.question = $scope.questions[index + 1];
  }




}

  $scope.changeQuestion = function(){
    changeQuestion();
    }

  $scope.skipIntro = function(){
    $state.go('tab.dash');
  };

  $scope.return = function(){
    cancela();
  };

  function cancela(){
      $scope.hint = '';
      $scope.modalSimpleQuestion.hide();
      $scope.question = $scope.questions[0];

      if($scope.popupWrong){
        $scope.popupWrong.close();
      }
      if($scope.popupWrong){
        $scope.popupCorrect.close();
      }

  }

  $scope.showHint = function(){
    $scope.hint = $scope.question.hint;
  }

  //modalInfoHelp
$ionicModal.fromTemplateUrl('templates/modal-simple-question.html', function($ionicModal) {
    $scope.modalSimpleQuestion = $ionicModal;
    }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    controller: 'DashCtrl',
    // The animation we want to revuse for the modal entrance
    animation: 'slide-in-up'
});

});
