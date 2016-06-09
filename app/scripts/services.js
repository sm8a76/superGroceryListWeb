'use strict';

angular.module('confusionApp')
.constant("baseURL", "http://localhost:3000/api/")
.constant("TOKEN_KEY", "Token")
.factory('groceryFactory', ['$resource', 'baseURL', 'AuthFactory', '$localStorage', 'TOKEN_KEY', function ($resource, baseURL, AuthFactory, $localStorage, TOKEN_KEY) {
/*.factory('groceryFactory', [function () {
    
    var groceries = [
        { _id: 0,
          name: 'Leche Entera Santa Clara', 
          description: 'Leche Entera Santa Clara',
          category: 'Lacteos', 
          price: 1500, 
          bestPriceAt: 'HEB',
          unit: 'Litros', 
          available: 'HEB, Soriana, WalMart',
          label: '-5%',
          image: 'images/leche-entera-santaclara.png'         
        },
        { _id: 1,
          name: 'Leche Entera Lala', 
          description: 'Leche Entera Lala',
          category: 'Lacteos', 
          price: 1350, 
          bestPriceAt: 'HEB',
          unit: 'Litros', 
          available: 'HEB, Soriana, WalMart',
          label: '',
          image: 'images/leche-entera-lala.jpeg'         
        },  
        { _id: 2,
          name: 'Leche Deslactosada Santa Clara', 
          description: 'Leche Deslactosada Santa Clara',
          category: 'Lacteos', 
          price: 1800, 
          bestPriceAt: 'WalMart',
          unit: 'Litros', 
          available: 'HEB, WalMart',
          label: '-5%',
          image: 'images/leche-deslactosada-santaclara.jpg'         
        },
        { _id: 3,
          name: 'Leche Deslactosada Parmalat', 
          description: 'Leche Deslactosada Parmalat',
          category: 'Lacteos', 
          price: 1650, 
          bestPriceAt: 'WalMart',
          unit: 'Litros', 
          available: 'HEB, Soriana, WalMart, SMart',
          label: '',
          image: 'images/leche-deslactosada-parmalat.jpg'         
        }
        
    ];
    
    var service = {};
    
    service.query = function(){
            return groceries;
    };
    
    return service;*/
    
    //AuthFactory.setToken();
    //console.log('Token set in header');

    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    var token = credentials.token;
    
    console.log('token='+token);
    //if(token == undefined) throw Error('No token found.');

    return $resource(baseURL + "groceries/:id", {id:"@id", access_token: token}, {
        'update': {
            method: 'PUT'
        }
    });
    
}])

.factory('listsFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
/*.factory('listsFactory',[function(){
    
    var myLists = [ 
        { _id: 0,
          name: 'WeeklyList',
          theList:         [
                { _id: 0,
                  name: 'Leche Entera Santa Clara', 
                  category: 'Lacteos', 
                  price: 1500, 
                  bestPriceAt: 'HEB',
                  quantity: 4,
                  unit: 'Litros', 
                  available: 'HEB, Soriana, WalMart',
                  label: '-5%',
                  image: 'images/leche-entera-santaclara.PNG'         
                },
                { _id: 1,
                  name: 'Azucar Mascabado BlackSugar', 
                  description: 'Azucar Mascabado BlackSugar',
                  category: 'Azucar', 
                  price: 2450, 
                  bestPriceAt: 'WalMart',
                  quantity: 1,
                  unit: 'Kilos', 
                  available: 'HEB, Soriana, WalMart',
                  label: '',
                  image: 'images/Azucar_mascabado_grande.jpg'
                },  
                { _id: 2,
                  name: 'Tomates', 
                  description: 'Tomates',
                  category: 'Frutas y Verduras', 
                  price: 0950, 
                  bestPriceAt: 'WalMart',
                  quantity: 1,
                  unit: 'Kilos', 
                  available: 'HEB, Soriana, WalMart',
                  label: '-5%',
                  image: 'images/tomates.jpg'         
                },
                { _id: 3,
                  name: 'Limones', 
                  description: 'Limones',
                  category: 'Frutas y Verduras', 
                  price: 2850, 
                  bestPriceAt: 'Soriana',
                  quantity: 1,
                  unit: 'Kilos', 
                  available: 'HEB, Soriana, WalMart, SMart',
                  label: '',
                  image: 'images/limones.jpg'         
                }
    ]
    }];
    
    var service = {};
    
    service.query = function(){
            return myLists;
    };    
    
    return service;*/
    
    return $resource(baseURL + "lists/:id", null, {
        'update': {
            method: 'PUT'
        }
    });    
    
    
}])

.factory('listItemFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    
    return $resource(baseURL + "GET /lists/:id/listItems/:itemId", {id:"@id", itemId: "@itemId"}, {
        'update': {
            method: 'PUT'
        }
    });       
    
}])

.factory('customerFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    
    return $resource(baseURL + "GET /customers/:id/lists/:listId", {id:"@id", listId: "@listId"}, {
        'update': {
            method: 'PUT'
        }
    });       
    
}])


.factory('supermarketFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
/*.factory('supermarketFactory',[function(){
    
    var superMarkets = [
        { name: 'HEB'},
        { name: 'Soriana'},
        { name: 'WalMart'},
        { name: 'SMart'}
    ]; 
    
    var service = {};
    
    service.query = function(){
            return superMarkets;
    };      
    
    return service;*/
    
    return $resource(baseURL + "supermarkets/:id", null, {
        'update': {
            method: 'PUT'
        }
    });       
    
}])

.factory('quoteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    
    return $resource(baseURL + "quotes/:id", null, {
        'update': {
            method: 'PUT'
        }
    });       
    
}])

.factory('groceryQuoteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    
    return $resource(baseURL + "groceries/:id/quotes/:quoteId", {id:"@id", listId: "@quoteId"}, {
        'update': {
            method: 'PUT'
        }
    });       
    
}])

/*
.factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('commentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id/comments/:commentId", {id:"@Id", commentId: "@CommentId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "promotions/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "leadership/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])


.factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "favorites/:id", null, {
            'update': {
                method: 'PUT'
            },
            'query':  {method:'GET', isArray:false}
        });

}])

.factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "feedback/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])*/

.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}])

.factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', 'TOKEN_KEY', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog, TOKEN_KEY){
    
    var authFac = {};
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;
    

  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }
 
  function storeUserCredentials(credentials) {
    $localStorage.storeObject(TOKEN_KEY, credentials);
    useCredentials(credentials);
  }
 
  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    authToken = credentials.token;
      
    console.log('user:credentials:username='+credentials.username);
    console.log('user:credentials:token='+credentials.token);
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['x-access-token'] = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['x-access-token'] = authToken;
    $localStorage.remove(TOKEN_KEY);
    console.log('User Credentials destroyed.');
  }
    
    authFac.setToken = function() {
        loadUserCredentials();
    };
     
    authFac.login = function(loginData) {
        
        $resource(baseURL + "customers/login")
        .save(loginData,
           function(response) {
              console.log('login:Successful');
              console.log('response:token='+response.id);
              storeUserCredentials({username:loginData.username, token: response.id});
              $rootScope.$broadcast('login:Successful');
           },
           function(response){
              isAuthenticated = false;
            
              /*var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.error.message + '</p><p>' +
                    response.error.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>';*/
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  'Login Failed' + '</p><p>' +
                    'LOGIN_FAILED' + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>';
            
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
           }
        
        );

    };
    
    authFac.logout = function() {
        var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
        var token = credentials.token;
        
        
        $resource(baseURL + "customers/logout", {access_token: token}).save(
            function(response){ 
                console.log('Logout:successful');        
            });
        destroyUserCredentials();
    };
    
    authFac.register = function(registerData) {
        
        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});
            if (registerData.rememberMe) {
                $localStorage.storeObject('userinfo',
                    {username:registerData.username, password:registerData.password});
            }
           
              $rootScope.$broadcast('registration:Successful');
           },
           function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.error.message + 
                  '</p><p>' + response.error.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }
        
        );
    };
    
    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        return username;  
    };

    loadUserCredentials();
    
    return authFac;
    
}])
;