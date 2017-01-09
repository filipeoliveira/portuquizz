angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state, $ionicModal, $ionicPopup) {


$scope.questions = [
  {
    id: 1,
    title: 'Marque a alternativa onde só há ditongos decrescentes',
    alternatives: [
      {
        id: 1,
        description: 'Pai; mau; papéis',
        correct: true
      },
      {
        id: 2,
        description: 'Véu, herói, ópio',
        correct: false
      },
      {
        id: 3,
        description: 'Água, sábia, leite',
        correct: false
      },
      {
        id: 4,
        description: 'Vácuo, gratuito, fui',
        correct: false
      }
    ],
    hint: 'Ditongo decrescente é o encontro vocálico, numa única sílaba, de uma vogal(/a/, /e/, /o/) + semivogal (/i/, /u/)'
  },
  {
    id: 2,
    title: 'Quanto a separação silábica, marque a única alternativa incorreta',
    alternatives: [
      {
        id: 1,
        description: 'Co-e-lho; Ân-si-a; gai-o-la',
        correct: false
      },
      {
        id: 2,
        description: 'Ba-lei-a; des-mai-a-do; ap-ti-dão;',
        correct: false
      },
      {
        id: 3,
        description: 'Di-gno; di-sen-te-ria; subs-tân-ci-a',
        correct: true
      },
      {
        id: 4,
        description: 'Hi-dre-lé-tri-ca; fe-é-ri-co; af-ta',
        correct: false
      }
    ],
    hint: 'As alternativas (3) e (4) estão incorretas. '
  },
  {
    id: 1,
    title: 'Marque a alternativa onde só há ditongos crescentes',
    alternatives: [
      {
        id: 1,
        description: 'Mãe; várias; serie',
        correct: false
      },
      {
        id: 2,
        description: 'Vaidade; nódoa; infância',
        correct: false
      },
      {
        id: 3,
        description: 'Rei; coitado; muita',
        correct: false
      },
      {
        id: 4,
        description: 'Quadra; tênue; infância',
        correct: true
      }
    ],
    hint: 'Ditongo crescente é o encontro vocálico, numa única sílaba, de uma semivogal (/i/, /u/) + vogal(/a/, /e/, /o/).'
  },
]

$scope.initialization = function(){
  $scope.question = $scope.questions[0];
}


$scope.showAnswer = function(bool){

  if(bool){
    var popupCorrect = $ionicPopup.show({
        template: 'Resposta correta',
        scope: $scope,
        buttons: [
          { text: 'Menu principal' },
          {
            text: 'Próxima questão',
            type: 'blue-std',
            onTap: function(e) {
              changeQuestion();
            }
          }
        ]
      });
  }
  else {
    var popupWrong = $ionicPopup.show({
        template: 'Resposta errada',
        scope: $scope,
        buttons: [
          {
            text: 'Menu principal',
            type: 'blue-grey',
            onTap: function(e) {
              cancel();
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

}

function changeQuestion(){
  var index = $scope.questions.indexOf($scope.question);
  console.log(index);
  $scope.question = $scope.questions[index + 1];
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
      popupWrong.hide();
      popupCorrect.hide();

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
