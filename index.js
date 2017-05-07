(function() {
    'use strict';

    angular.module('carouselApp', [
            'ngAnimate'
        ])
        .controller('CarouselController', CarouselController);

    CarouselController.$inject = ['$scope'];

    function CarouselController($scope) {
        $scope.images = [
            { src: 'static/img/img1.png', title: 'Pic 1' },
            { src: 'static/img/img2.jpg', title: 'Pic 2' },
            { src: 'static/img/img3.jpg', title: 'Pic 3' },
            { src: 'static/img/img4.png', title: 'Pic 4' },
            { src: 'static/img/img5.png', title: 'Pic 5' }
        ];
    }
})();
