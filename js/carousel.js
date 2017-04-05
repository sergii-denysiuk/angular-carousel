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
                slideTime: '=',
                startIndex: '='
            },
            templateUrl: 'templates/carousel.html',
            link: function(scope, elem, attrs) {
                var slideTime = scope.slideTime || 5000;
                var currentIndex = scope.startIndex || 0;
                var timer;

                scope.statuses = [];
                scope.clickNext = clickNext;
                scope.clickPrev = clickPrev;

                activate();

                function activate() {
                    scope.statuses[currentIndex] = true;
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
                    scope.statuses[currentIndex] = false;
                    currentIndex < scope.images.length - 1 ?
                        currentIndex++ : currentIndex = 0;
                    scope.statuses[currentIndex] = true;
                }

                function prev() {
                    scope.statuses[currentIndex] = false;
                    currentIndex > 0 ?
                        currentIndex-- : currentIndex = scope.images.length - 1;
                    scope.statuses[currentIndex] = true;
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
