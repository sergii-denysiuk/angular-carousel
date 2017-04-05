(function() {
    'use strict';

    angular.module('carouselApp', [
            'ngAnimate'
        ])
        .controller('CarouselController', CarouselController)
        .directive('carousel', carousel);

    CarouselController.$inject = ['$scope'];

    function CarouselController($scope) {
        $scope.images = [
            { src: 'img/img1.png', title: 'Pic 1' },
            { src: 'img/img2.jpg', title: 'Pic 2' },
            { src: 'img/img3.jpg', title: 'Pic 3' },
            { src: 'img/img4.png', title: 'Pic 4' },
            { src: 'img/img5.png', title: 'Pic 5' }
        ];
    }

    carousel.$inject = ['$interval'];

    function carousel($interval) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                images: '=',
                slideTime: '='
            },
            templateUrl: 'templates/carousel.html',
            link: function(scope, elem, attrs) {
                var slideTime = scope.slideTime || 3000;

                scope.currentIndex = 0;

                scope.next = function() {
                    scope.images[scope.currentIndex].visible = false;
                    scope.currentIndex < scope.images.length - 1 ?
                        scope.currentIndex++ : scope.currentIndex = 0;
                    scope.images[scope.currentIndex].visible = true;
                };

                scope.prev = function() {
                    scope.images[scope.currentIndex].visible = false;
                    scope.currentIndex > 0 ?
                        scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
                    scope.images[scope.currentIndex].visible = true;
                };

                /* Start: For Automatic slideshow*/
                var timer = $interval(function() {
                    scope.next();
                }, slideTime);

                scope.$on('$destroy', function() {
                    $interval.cancel(timer);
                });
                /* End : For Automatic slideshow*/
            }
        };
    }
})();
