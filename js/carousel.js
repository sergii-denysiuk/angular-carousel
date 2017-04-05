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
                var slideTime = scope.slideTime || 5000;
                var timer;

                scope.currentIndex = 0;
                scope.clickNext = clickNext;
                scope.clickPrev = clickPrev;

                activate();

                function activate() {
                    startTimer();
                }

                function clickNext() {
                    stopTimer();
                    next();
                    startTimer();
                }

                function clickPrev() {
                    stopTimer();
                    prev();
                    startTimer();
                }

                function next() {
                    scope.images[scope.currentIndex].visible = false;
                    scope.currentIndex < scope.images.length - 1 ?
                        scope.currentIndex++ : scope.currentIndex = 0;
                    scope.images[scope.currentIndex].visible = true;

                }

                function prev() {
                    scope.images[scope.currentIndex].visible = false;
                    scope.currentIndex > 0 ?
                        scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
                    scope.images[scope.currentIndex].visible = true;

                }

                /**
                 * Start for Automatic slideshow
                 */
                function startTimer() {
                    timer = $interval(function() {
                        next();
                    }, slideTime);
                }

                /**
                 * End for Automatic slideshow
                 */
                function stopTimer() {
                    $interval.cancel(timer);
                }

                scope.$on('$destroy', function() {
                    stopTimer();
                });
            }
        };
    }
})();
