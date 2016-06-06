'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', function ($scope, menuFactory, favoriteFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = false;
    $scope.showMenu = false;
    $scope.message = 'Loading ...';

    menuFactory.query(
        function (response) {
            $scope.dishes = response;
            $scope.showMenu = true;

        },
        function (response) {
            $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = 'appetizer';
        } else if (setTab === 3) {
            $scope.filtText = 'mains';
        } else if (setTab === 4) {
            $scope.filtText = 'dessert';
        } else {
            $scope.filtText = '';
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.addToFavorites = function(dishid) {
        console.log('Add to favorites', dishid);
        favoriteFactory.save({_id: dishid});
        $scope.showFavorites = !$scope.showFavorites;
    };
}])

.controller('ContactController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

    $scope.feedback = {
        mychannel: '',
        firstName: '',
        lastName: '',
        agree: false,
        email: ''
    };

    var channels = [{
        value: 'tel',
        label: 'Tel.'
    }, {
        value: 'Email',
        label: 'Email'
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

    $scope.sendFeedback = function () {


        if ($scope.feedback.agree && ($scope.feedback.mychannel === '')) {
            $scope.invalidChannelSelection = true;
        } else {
            $scope.invalidChannelSelection = false;
            feedbackFactory.save($scope.feedback);
            $scope.feedback = {
                mychannel: '',
                firstName: '',
                lastName: '',
                agree: false,
                email: ''
            };
            $scope.feedback.mychannel = '';
            $scope.feedbackForm.$setPristine();
        }
    };
}])

.controller('DishDetailController', ['$scope', '$state', '$stateParams', 'menuFactory', 'commentFactory', function ($scope, $state, $stateParams, menuFactory, commentFactory) {

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = 'Loading ...';

    $scope.dish = menuFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
            }
        );

    $scope.mycomment = {
        rating: 5,
        comment: ''
    };

    $scope.submitComment = function () {

        commentFactory.save({id: $stateParams.id}, $scope.mycomment);

        $state.go($state.current, {}, {reload: true});
        
        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: ''
        };
    };
}])

// implement the IndexController and About Controller here

.controller('HomeController', ['$scope', '$state', 'groceryFactory', function ($scope, $state, groceryFactory) {
    
    $scope.searchCriteria = '';
    
    $scope.search = function(){
        $state.go('app.searchresults', {criteria: $scope.searchCriteria}, {reload: true});
    };
    
}])

.controller('SearchResultsController', ['$scope', '$stateParams', 'ngDialog', 'groceryFactory', function ($scope, $stateParams, ngDialog, groceryFactory){
    
    groceryFactory.query({name: { $regex:/*$stateParams.criteria*/i})
        .$promise.then(
            function (response) {
                $scope.results = response;
            },
            function (response) {
                $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
            }
        );                                           
    
    $scope.addToList = function(id){
        console.log('Adding item ' + id);  
        $scope.currentItem = $scope.results[id];
        
        ngDialog.open({ template: 'views/addToList.html', scope: $scope, className: 'ngdialog-theme-default', controller:'AddToListController' });        
    };

    
    $scope.openAddToList = function (id) {
        console.log('Adding item... ' + id);  
        $scope.currentItem = $scope.results[id];
        
        ngDialog.open({ template: 'views/addToList.html', scope: $scope, className: 'ngdialog-theme-default', controller:'AddToListController' });
    };
        
    
    console.log('Entering SearchResultsController...');    
}])

.controller('AddToListController', ['$scope', 'ngDialog', 'listsFactory', function ($scope,ngDialog, listsFactory){
   $scope.quantity = 1;
   $scope.whichList = {};
    
    $scope.addToList = function() {
        ngDialog.close();
    };
    
     $scope.closeThisDialog = function() {
        ngDialog.close();
    };      
    
   $scope.myLists = listsFactory.query();
}])

.controller('MyListsController', ['$scope', 'listsFactory', 'supermarketFactory', function ($scope, listsFactory, supermarketFactory){
    $scope.showDetails = true;
    
    $scope.superMarkets = supermarketFactory.query();
    
    $scope.currentListId = 0;
    $scope.currentList = {};
    $scope.currentSuperMarket = {};
    $scope.totalCost = 0.0;
    
    $scope.myLists = listsFactory.query();
        
    
    $scope.addToList = function(id){
        console.log('Adding item ' + id);  
    };
    
    $scope.selectList = function(id){
        console.log('Selecting list ' + id); 
        for(var i=0; i < $scope.myLists.length; i++){
            if($scope.myLists[i]._id === id ){
                $scope.currentList = $scope.myLists[id];
                break;
            }
        }
        console.log('Showing selected list ' + $scope.currentList.theList); 
    };
    
    
    console.log('Entering MyListsController...');    
}])


.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

    $scope.leaders = corporateFactory.query();

}])

.controller('FavoriteController', ['$scope', '$state', 'favoriteFactory', function ($scope, $state, favoriteFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showDelete = false;
    $scope.showMenu = false;
    $scope.message = 'Loading ...';

    favoriteFactory.query(
        function (response) {
            $scope.dishes = response.dishes;
            $scope.showMenu = true;
        },
        function (response) {
            $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = 'appetizer';
        } else if (setTab === 3) {
            $scope.filtText = 'mains';
        } else if (setTab === 4) {
            $scope.filtText = 'dessert';
        } else {
            $scope.filtText = '';
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleDelete = function () {
        $scope.showDelete = !$scope.showDelete;
    };
    
    $scope.deleteFavorite = function(dishid) {
        console.log('Delete favorites', dishid);
        favoriteFactory.delete({id: dishid});
        $scope.showDelete = !$scope.showDelete;
        $state.go($state.current, {}, {reload: true});
    };
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:'LoginController' });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe){
           $localStorage.storeObject('userinfo',$scope.loginData);
        }

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:'RegisterController' });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])
;