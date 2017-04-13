(function() {
    'use strict';

    angular.module('carouselApp')
        .directive('carousel', carousel);

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
